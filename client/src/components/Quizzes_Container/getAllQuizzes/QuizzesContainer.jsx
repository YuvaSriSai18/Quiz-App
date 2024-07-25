import React, { useState, useEffect } from "react";
import "./Quizzes.css";
import QuizCard from "./QuizCard";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";

export default function QuizzesContainer() {
  const [quizzes, setQuizzes] = useState([]);

  const getQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:5500/quiz");
      // const filteredQuizzes = response.data.filter(
      //   (quiz) => quiz.visibility === "openToAll"
      // );
      // console.log(filteredQuizzes); // Log the filtered quizzes
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <div style={{ border: "2px solid #c9c3c3", borderRadius: "12px" }}>
      <Typography variant="h6" ml={5} mt={2} fontWeight={700}>
        Live Quizzes <br /> <NavLink to={"/create"}>Create Quiz</NavLink>
      </Typography>
      <div className="cardsContainer">
        {quizzes.map((quiz, index) => (
          <QuizCard key={index} QuizObj={quiz} />
        ))}
      </div>
    </div>
  );
}
