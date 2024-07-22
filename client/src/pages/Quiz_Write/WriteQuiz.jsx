import React from "react";
import Quiz_QuestionPaperWrite from "../../components/Quizzes_Container/Quiz_QP_Write/Quiz_QuestionPaperWrite";
import QuizInstructions from "../../components/Quizzes_Container/Quiz_QP_Write/QuizInstructions";
const sampleData = {
  QuizId: "quiz-001",
  CreatorMail: "teacher1@example.com",
  title: "Math Quiz",
  noOfQuestions: 5,
  questions: [
    {
      question: "What is 2 + 2?",
      options: ["1", "2", "3", "4"],
      correctOption: 3,
      mark: 1,
    },
    {
      question: "What is the square root of 9?",
      options: ["1", "3", "5", "7"],
      correctOption: 1,
      mark: 1,
    },
  ],
  durationOfQuiz: 30,
};
export default function WriteQuiz() {
  return (
    <div>
      {/* <QuizInstructions/> */}
      <Quiz_QuestionPaperWrite QuizQuestionsData={sampleData} />
    </div>
  );
}
