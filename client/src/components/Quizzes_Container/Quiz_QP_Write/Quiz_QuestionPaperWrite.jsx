import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import Button from "@mui/material/Button";
import axios from "axios";
import { useSelector } from "react-redux";

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

  const isLastQuestion = currentQuestionIndex === QuizQuestionsData.questions.length - 1;

  return (
    <div>
      {QuizQuestionsData.questions.length > 0 ? (
        <div>
          <QuestionCard
            question={QuizQuestionsData.questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            handleResponseChange={handleResponseChange}
          />
          <div style={{ marginTop: "16px" }}>
            <Button
              variant="contained"
              sx={{
                width: "150px",
                height: "50px",
                fontSize: "16px",
                marginRight: "8px",
                borderRadius: "14px",
              }}
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "150px",
                height: "50px",
                fontSize: "16px",
                borderRadius: "14px",
              }}
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === QuizQuestionsData.questions.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <>
          <h1>No Questions Found</h1>
        </>
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
  );
}
