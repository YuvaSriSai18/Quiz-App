import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Home from "./pages/Home/Home";
import { Box } from "@mui/material";
import WriteQuiz from "./pages/Quiz_Write/WriteQuiz";
import QuizInstructions from "./components/Quizzes_Container/Quiz_QP_Write/QuizInstructions";
// import Logout from './pages/Logout/Logout'; // Uncomment if you have a Logout component

function AllRoutes() {
  return (
    <Box mt="70px">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/writequiz" element={<WriteQuiz />} />
        <Route path="/quizinstructions" element={<QuizInstructions />} />
        {/* <Route path="/logout" element={<Logout />} /> */}
      </Routes>
    </Box>
  );
}

export default AllRoutes;
