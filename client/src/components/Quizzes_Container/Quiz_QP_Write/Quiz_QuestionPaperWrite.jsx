import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import Button from "@mui/material/Button";

export default function Quiz_QuestionPaperWrite({ QuizQuestionsData }) {
  const [responses, setResponses] = useState({
    QuizId: QuizQuestionsData.QuizId,
    StudentEmail: "", // You can set this dynamically based on the logged-in user
    answers: QuizQuestionsData.questions.map((_, index) => ({
      questionNumber: index + 1,
      givenAnswer: null,
    })),
  });

  const handleResponseChange = (questionIndex, answer) => {
    const updatedResponses = responses.answers.map((response, index) => {
      if (index === questionIndex) {
        return { ...response, givenAnswer: answer };
      }
      return response;
    });

    setResponses({ ...responses, answers: updatedResponses });
  };
  console.log(responses);
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
          >
            Submit
          </Button>
        </center>
      )}
      {/* You can add a submit button here to handle the submission of the responses */}
    </div>
  );
}
