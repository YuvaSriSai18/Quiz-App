import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import Button from "@mui/material/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import LeaderBoard from "../../LeaderBoard/LeaderBoard";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Quiz_QuestionPaperWrite({ QuizQuestionsData }) {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate(); // Initialize useNavigate

  const [responses, setResponses] = useState({
    QuizId: QuizQuestionsData.QuizId,
    StudentRoll: userData.rollNo,
    answers: QuizQuestionsData.questions.map((_, index) => ({
      questionNumber: index + 1,
      givenAnswer: null,
    })),
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false); // Track if quiz is completed

  const handleResponseChange = (questionIndex, answer) => {
    const updatedResponses = responses.answers.map((response, index) => {
      if (index === questionIndex) {
        return { ...response, givenAnswer: answer };
      }
      return response;
    });

    setResponses({ ...responses, answers: updatedResponses });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QuizQuestionsData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const postResponse = async () => {
    try {
      await axios.post("http://localhost:5500/response/submit", responses);
      alert("Quiz Submitted Successfully");
      navigate("/"); // Use navigate for redirection
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const isLastQuestion =
    currentQuestionIndex === QuizQuestionsData.questions.length - 1;

  const handleTimeUp = () => {
    setShowLeaderBoard(true);

    setTimeout(() => {
      setShowLeaderBoard(false);
      if (isLastQuestion) {
        setQuizCompleted(true); // Mark quiz as completed if it's the last question
      } else {
        handleNextQuestion();
      }
    }, 5000); // Show LeaderBoard for 5 seconds
  };

  useEffect(() => {
    if (QuizQuestionsData.questions.length > 0) {
      const question = QuizQuestionsData.questions[currentQuestionIndex];
      const timer = setTimeout(handleTimeUp, question.time * 1000 || 10000); // Use question time or default to 10 seconds

      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, QuizQuestionsData.questions]);

  useEffect(() => {
    if (quizCompleted) {
      alert("Quiz Completed");
      navigate("/"); // Use navigate for redirection
    }
  }, [quizCompleted, navigate]); // Ensure this effect runs when quizCompleted changes

  if (showLeaderBoard) {
    return (
      <div style={{ marginTop: "70px" }}>
        <LeaderBoard />
      </div>
    );
  }

  return (
    <div>
      {QuizQuestionsData.questions.length > 0 ? (
        <QuestionCard
          question={QuizQuestionsData.questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          handleResponseChange={handleResponseChange}
          onTimeUp={handleTimeUp}
        />
      ) : (
        <h1>No Questions Found</h1>
      )}
      {/* Commented out for potential simplification */}
      {/* {!isLastQuestion && (
        <Button
          variant="contained"
          sx={{
            width: "200px",
            height: "50px",
            fontSize: "18px",
            marginTop: "16px",
            marginBottom: "16px",
            borderRadius: "14px",
          }}
          onClick={handleNextQuestion}
        >
          Next
        </Button>
      )} */}
    </div>
  );
}
