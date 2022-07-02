const express = require("express");
const router = express.Router();
const quizModel = require("../models/Quiz");

router.get("/getQuiz", (req, res) => {
  const {
    query : {
      category: cat = 'Science: Computers'
    }
  } = req;
  quizModel.aggregate([{$match: {category: cat}},{ $sample: { size: 10 } }], (err, data) => {
    if (err) {
      res.status(400).send({ message: "this is an error" });
    } else {
      data = data.map(question => { 
        delete question.correct_answer 
        return question;
      });
      res.send({ result: data });
    }
  });
});

router.post("/postQuiz", (req, res) => {
  const quizData = new quizModel(req.body);
  quizData.save((err) => {
    if (err) {
      console.log("data loading to database failed for", err);
      res.status(400).send({ message: "this is an error" });
    } else {
      console.log("successfully data loaded");
      res.send("data sent successfully");
    }
  });
});

router.post("/result", async (req, res) => {

  const { body: {
    userAnswers
  } } = req;
  
  let totalMarks = 0 ;
  const questionsIds = [];
  let actualAnswer = {};
  for (const [key, value] of Object.entries(userAnswers)) {
    totalMarks = totalMarks + 1;
    questionsIds.push(key);
  }
  const questionsData = await quizModel.find( { _id: { $in: questionsIds } });
  for (let question of questionsData) {
    actualAnswer[question._id] = question.correct_answer;
  }
  console.log(actualAnswer)
  for (const [key, value] of Object.entries(userAnswers)) {
    if (userAnswers[key] !== actualAnswer[key]) {
      totalMarks = totalMarks - 0.5;
    }
  }
  res.send({ totalMarks});
});
module.exports = router;
