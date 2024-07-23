import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Home from "./pages/Home/Home";
import { Box } from "@mui/material";

import QuizInstructions from "./components/Quizzes_Container/Quiz_QP_Write/QuizInstructions";
import WriteQuiz from "./pages/Quiz/WriteQuiz";
import Quiz_QP_Create from "./pages/Quiz/Quiz_QP_Create";
// import Logout from './pages/Logout/Logout'; // Uncomment if you have a Logout component

function AllRoutes() {
  return (
    <Box mt="70px">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/writequiz/:QuizId" element={<WriteQuiz />} />
        <Route path="/quizinstructions" element={<QuizInstructions />} />
        <Route path="/create" element={<Quiz_QP_Create />} />
        {/* <Route path="/logout" element={<Logout />} /> */}
      </Routes>
    </Box>
  );
}

export default AllRoutes;
