import React from "react";
import "./Quizzes.css";
import { NavLink } from "react-router-dom";
export default function QuizCard() {
  return (
    <div
      className="outer_card"
      style={{
        width: {
          xs: "100%",
          md: "200px",
        },
        height: "250px",
        border: "2px solid #bbbbbb",
        borderRadius: "12px",
        padding: "8px",

        display: "flex",
        flexDirection: "column",
        textAlign: "left",
      }}
    >
      <p className="inner_card"></p>
      <h6 className="heading_1">React Quiz</h6>
      <p className="para_1">
        <p>Time : 120 Min</p>
        <p>Questions : 7</p>
      </p>
      <NavLink to={"/writequiz"}>
        <button className="button">Start</button>
      </NavLink>
    </div>
  );
}
