import React, { useState, useEffect } from "react";
import "./Quizzes.css";
import QuizCard from "./QuizCard";
import { Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import CreateQuiz from "../Quiz_Create/CreateQuiz";
export default function QuizzesContainer() {
  const [quizzes, setQuizzes] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  const getQuizzes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/quiz"
      );
      const filteredQuizzes = response.data.filter(
        (quiz) => quiz.CreatorMail === userData.email
      );
      // console.log(filteredQuizzes); // Log the filtered quizzes
      // setQuizzes(filteredQuizzes);
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    getQuizzes();
  }, [quizzes]);

  return (
    <div className="cardsContainer">
      {quizzes.map((quiz, index) => (
        <QuizCard key={index} QuizObj={quiz} />
      ))}
      <CreateQuiz />
    </div>
  );
}
