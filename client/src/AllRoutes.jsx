import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Home from "./pages/Home/Home";
import { Box } from "@mui/material";
import QuizInstructions from "./components/Quizzes_Container/Quiz_QP_Write/QuizInstructions";
import WriteQuiz from "./pages/Quiz/WriteQuiz";
import Quiz_QP_Create from "./pages/Quiz/Quiz_QP_Create";
import Quiz_Update from "./pages/Quiz/Quiz_Update";
import LeaderboardAfterQuestion from "./components/Quizzes_Container/LeaderboardAfterQuestion.jsx";

function AllRoutes() {
  return (
    <Box mt="70px">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/writequiz/:QuizId" element={<WriteQuiz />} />
        <Route path="/create" element={<Quiz_QP_Create />} />
        <Route path="/update/:QuizId" element={<Quiz_Update />} />
        <Route path="/quizinstructions" element={<QuizInstructions />} />
        <Route path="/leaderboard-after-question" element={<LeaderboardAfterQuestion />} />
      </Routes>
    </Box>
  );
}

export default AllRoutes;
