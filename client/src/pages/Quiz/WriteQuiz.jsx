import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import Quiz_QuestionPaperWrite from "../../components/Quizzes_Container/Quiz_QP_Write/Quiz_QuestionPaperWrite";
// import QuizInstructions from "../../components/Quizzes_Container/Quiz_QP_Write/QuizInstructions";

export default function WriteQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const { QuizId } = useParams(); // Get the quiz ID from the URL parameters

  const getQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:5500/quiz");
      console.log(response.data); // Log the response
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  const quiz = quizzes.find((quiz) => quiz.QuizId === QuizId);
  console.log(quiz);

  if (!quiz) {
    return <Typography>Not Found</Typography>;
  }

  return (
    <div>
      {/* <QuizInstructions/> */}
      <Quiz_QuestionPaperWrite QuizQuestionsData={quiz} />
    </div>
  );
}
