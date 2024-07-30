import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Button, Box, Paper } from "@mui/material";
import { useTimer } from 'react-timer-hook';
import Quiz_QuestionPaperWrite from "../../components/Quizzes_Container/Quiz_QP_Write/Quiz_QuestionPaperWrite";

export default function WriteQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const { QuizId } = useParams(); // Get the quiz ID from the URL parameters

  const getQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:5500/quiz");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    getQuizzes();
  }, [QuizId]);

  const quiz = quizzes.find((quiz) => quiz.QuizId === QuizId);

  // Timer configuration based on quiz duration
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: new Date().getTime() + (quiz?.duration || 30) * 60 * 1000, // Duration in minutes
    autoStart: true,
    onExpire: () => console.warn('Timer expired'),
  });

  if (!quiz) {
    return <Typography>Not Found</Typography>;
  }

  const isLastQuestion = quiz.questions && quiz.questions.length > 0
    ? quiz.questions[quiz.questions.length - 1].id === quiz.currentQuestionId
    : false;

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 2,
        // No background color needed; uses global background from index.css
      }}
    >
      <Paper
        sx={{
          marginTop: '-10%',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          position: 'relative',
          width: '90%',
          maxWidth: 800,
          backgroundColor: 'white',
          border: 'none', // Ensure no border
          '& .MuiPaper-root': {
            border: 'none', // Ensure no border for all child Paper components
          },
        }}
      >
        <Typography 
          sx={{
            position: 'absolute',
            top: 15,
            right: 15,
            fontSize: '16px',
            color: '#333',
            backgroundColor: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: 'none', // Ensure no border
          }}//master timer
        >
          {`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
        </Typography>

        <Quiz_QuestionPaperWrite QuizQuestionsData={quiz} />

        {/* {isLastQuestion && (
          <Box 
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 3,
            }}
          >
            <Button 
              variant="contained"
              color="primary"
              sx={{
                width: '70%',
                padding: '10px 0',
                border: 'none', // Ensure no border
                '&:focus': {
                  outline: 'none', // Remove focus outline
                },
              }}
            >
              Submit Quiz
            </Button>
          </Box>
        )} */}
      </Paper>
    </Box>
  );
}
