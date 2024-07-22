import React from "react";
import "./Quizzes.css";
import QuizCard from "./QuizCard";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
export default function QuizzesContainer() {
  return (
    <div style={{ border: "2px solid #c9c3c3", borderRadius: "12px" }}>
      <Typography variant="h6" ml={5} mt={2} fontWeight={700}>
        Live Quizzes{" "}
      </Typography>
      <div className="cardsContainer">
        <QuizCard />
        <QuizCard />
        <QuizCard />
      </div>
    </div>
  );
}
