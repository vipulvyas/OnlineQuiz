import React from "react";
import { ResultCount } from "../DataContext";
import "./UserResult.scss";
import { useHistory } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { MdReplay } from "react-icons/md";


function UserResult() {
  const uname = localStorage.getItem("userName");
  const count = ResultCount();
  const history = useHistory();
  function handleRplay(e) {
    history.push("/");
  }
  const totalQuestions = localStorage.getItem('totalQuestions') || 10;

  return (
    <div className="result">
      <div className="d-flex align-items-center justify-content-center">
        <div className="res_card_btns">
          <button
            className="res_btns d-flex align-items-center justify-content-center"
            onClick={(e) => {
              handleRplay(e);
            }}
          >
            Play Again
            <MdReplay />
          </button>
        </div>
      </div>
      <div className="result_card">
        <div className="d-flex justify-content-center align-items-center">
          <div className="res_head center">
            <h3 style={{ margin: "0px" }}>Your score card</h3>
          </div>
        </div>

        <div className="result_card_body">
          <div className="result_uname center w-40">
            <h6>{uname}</h6>
          </div>
          <div className="result_Bar center">
            <CircularProgressbar
              className="bar_prog"
              value={count}
              maxValue={totalQuestions}
              text={`${count}/${totalQuestions}`}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "butt",
                textSize: "30px",
                pathTransitionDuration: 0.5,
                pathColor: `${count > 3 ? "#5eff86" : "red"}`,
                textColor: `${count > 3 ? "#5eff86" : "red"}`,
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserResult;
