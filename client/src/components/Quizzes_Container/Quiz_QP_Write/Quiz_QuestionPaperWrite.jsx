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
  // console.log(responses)
  const handleResponseChange = (questionIndex, answer) => {
    const updatedResponses = responses.answers.map((response, index) => {
      if (index === questionIndex) {
        return { ...response, givenAnswer: answer };
      }
      return response;
    });

    setResponses({ ...responses, answers: updatedResponses });
  };

  const postResponse = async () => {
    try {
      await axios.post("http://localhost:5500/response/submit", responses);
      alert("Quiz Submitted Successfully");
      window.location.href("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div>
      {QuizQuestionsData.questions.length > 0 ? (
        QuizQuestionsData.questions.map((question, index) => (
          <QuestionCard
            key={index}
            question={question}
            questionNumber={index + 1}
            handleResponseChange={handleResponseChange}
          />
        ))
      ) : (
        <>
          <h1>No Questions Found</h1>
        </>
      )}
      {QuizQuestionsData.questions.length > 0 && (
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
