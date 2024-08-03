import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Box, Paper } from "@mui/material";
import Quiz_QuestionPaperWrite from "../../components/Quizzes_Container/Quiz_QP_Write/Quiz_QuestionPaperWrite";
import { useNavigate } from "react-router-dom";

export default function WriteQuiz() {
  const [quiz, setQuiz] = useState(null);
  const { QuizId } = useParams(); // Get the quiz ID from the URL parameters
  const navigate = useNavigate(); // Hook to navigate to the leaderboard
  const [answerStatus, setAnswerStatus] = useState(null); // To store the status of the answer

  const getQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:5500/quiz/${QuizId}`);
      setQuiz(response.data);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  useEffect(() => {
    getQuiz();
  }, [QuizId]);

  // Handle answer selection
  const handleAnswerSelection = (isCorrect) => {
    setAnswerStatus(isCorrect ? "correct" : "wrong");
    // Navigate to leaderboard after showing animation
    setTimeout(() => navigate("/leaderboard"), 3000); // Adjust timing as needed
  };

  if (!quiz) {
    return <Typography>Not Found</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "85vh",
        maxWidth: "70%",
        margin: "auto",
      }}
    >
      <Paper
        sx={{
          marginTop: "-10%",
          padding: 3,
          borderRadius: 2,
          boxShadow: "5px 2px 14px -7px rgba(235,230,230,1)",
          position: "relative",
          width: "100%",
          backgroundColor: "transparent",
          border: "none",
          "& .MuiPaper-root": {
            border: "none",
          },
        }}
      >
        <Quiz_QuestionPaperWrite
          QuizQuestionsData={quiz}
          onAnswerSelection={handleAnswerSelection}
        />
      </Paper>
    </Box>
  );
}
