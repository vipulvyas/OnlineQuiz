import React, { useState } from "react";
import "./QiuzView.scss";
import QuestionRend from "./QuestionRend";
import { ResultCountUpdate } from "../../DataContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

function QuizPage() {
  const [userAnswers, setUserAnswers] = useState({});
  const [showSubmit, setShowSubmit] = useState(false);

  //Cunstom made hook for contextapi
  // const count = ResultCount();
  const setCount = ResultCountUpdate();
  const history = useHistory();

  async function quizSubmit(e) {
    e.preventDefault();
    const marksData = await axios.post(
      "http://localhost:5000/quiz/result",
      {
        userAnswers: userAnswers
      }
    );
    const {data: {totalMarks}} = marksData;
    setCount(totalMarks);
    history.push("/UserResult");
  }

  function showSubmitButton() {
    setShowSubmit(true);
  }

  function userAnswersHandler(userAns) {
    setUserAnswers(userAns);
  }
  
  return (
    <div className="quiz_view d-flex justify-content-center">
      <div className="quiz-container">
        <QuestionRend
          showSubmitButton={showSubmitButton}
          userAnswersHandler={userAnswersHandler}
        />
        {showSubmit ? <div className="d-flex justify-content-center align-items-center">
          <button
            type="submit"
            className="quizsubmit"
            onClick={(e) => quizSubmit(e)}
          >
            Submit
          </button> 
        </div>: ''}
      </div>
    </div>
  );
}

export default QuizPage;
