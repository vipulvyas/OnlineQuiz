import React, { useState, useEffect } from "react";
import "./QiuzView.scss";
import axios from "axios";
import QuestionModal from "./questionModal";

function QuestionRend({ userAnswersHandler, showSubmitButton }) {
  const [quizes, SetQuizes] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [indexNumber, setIndexNumber] = useState(0);

  async function fetchQuestion() {
    try {
      const questions = await axios.get(
        "http://localhost:5000/quiz/getQuiz?category=Science: Computers"
      );
      const quizArray = questions.data.result;
      localStorage.setItem('totalQuestions', quizArray.length);
      SetQuizes(quizArray);
    } catch (e) {
      console.error(e.message);
    }
  }
  useEffect(() => {
    fetchQuestion();
  }, []);

  function setUserSelectedAnswer(e) {
    const id = e.target.id;
    const value = e.target.value;
    quizes[indexNumber].userSelected = value;
    SetQuizes(quizes);
    setUserAnswers(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  useEffect(() => {
    userAnswersHandler(userAnswers);
  }, [userAnswers]);
  
  
  useEffect(() => {
    if (indexNumber === 9 || quizes.length === indexNumber + 1) {
      showSubmitButton();
    }
  }, [indexNumber]);

  function indexNumberHandler(action) {
    console.log(action)
    if (action === 'prev' && indexNumber !== 0) {
      setIndexNumber(indexNumber - 1)
    } else if (action === 'next' && quizes.length !== indexNumber + 1) {
      setIndexNumber(indexNumber + 1)
    }
  }


  return (
    <div>
      <div className="question_card">

        {quizes.length > 0 ? (

          <QuestionModal 
          quize = {quizes[indexNumber]}
          setUserSelectedAnswer = {
            setUserSelectedAnswer
          }
          onIndexChange={indexNumberHandler}
        />
        ) : (<h1> Data is not present for this catogory.</h1>)}
      </div>
    </div>
  );
}

export default QuestionRend;
