import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import LeaderBoard from "../../LeaderBoard/LeaderBoard";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Quiz_QuestionPaperWrite({ QuizQuestionsData }) {
  const navigate = useNavigate(); // Initialize useNavigate

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false); // Track if quiz is completed

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
    }, 3000); // Show LeaderBoard for 3 seconds
  };

  useEffect(() => {
    if (QuizQuestionsData.questions.length > 0) {
      const question = QuizQuestionsData.questions[currentQuestionIndex];
      const timer = setTimeout(handleTimeUp, question.duration * 1000 || 10000); // Use question time or default to 10 seconds

      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, QuizQuestionsData.questions]);

  useEffect(() => {
    if (quizCompleted) {
      alert("Quiz Completed");
      navigate("/"); // Use navigate for redirection
      location.reload()
    }
  }, [quizCompleted, navigate]); // Ensure this effect runs when quizCompleted changes

  return (
    <div>
      {showLeaderBoard ? (
        <div style={{ marginTop: "70px" }}>
          <LeaderBoard />
        </div>
      ) : (
        QuizQuestionsData.questions.length > 0 && (
          <QuestionCard
            quizId={QuizQuestionsData.QuizId}
            question={QuizQuestionsData.questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            onTimeUp={handleTimeUp}
            isNewQuestion={true} // Set to true for the first question, false for subsequent questions
          />
        )
      )}
    </div>
  );
}
