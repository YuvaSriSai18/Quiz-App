import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import Button from "@mui/material/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import LeaderBoard from "../../LeaderBoard/LeaderBoard";

export default function Quiz_QuestionPaperWrite({ QuizQuestionsData }) {
  const userData = useSelector((state) => state.auth.userData);

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
      window.location.href = "/";
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
      handleNextQuestion();
    }, 15000); // Show LeaderBoard for 15 seconds
  };

  return (
    <div>
      {showLeaderBoard ? (
        <LeaderBoard />
      ) : (
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
          {isLastQuestion && (
            <center>
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
                onClick={postResponse}
              >
                Submit
              </Button>
            </center>
          )}
        </div>
      )}
    </div>
  );
}
