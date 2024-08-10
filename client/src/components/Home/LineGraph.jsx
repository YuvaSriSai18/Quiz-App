import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
export default function LineGraph() {
  const leaderBoard = useSelector(
    (state) => state.LeaderBoard.LeaderBoardUserData
  );

  const processQuizData = (attemptedQuizzes) => {
    // Extract pointsEarned and quizTitle from attemptedQuizzes
    const quizScores = attemptedQuizzes.map((quiz) => quiz.pointsEarned / 10);
    const quizLabels = attemptedQuizzes.map(
      (quiz, index) => `Quiz ${index + 1}`
    );

    return { quizScores, quizLabels };
  };

  const [averageScore, setAverageScore] = useState(75);
  const [quizScores, setQuizScores] = useState([]);
  const [quizLabels, setQuizLabels] = useState([]);
  const [totalQuizzes, setTotalQuizzes] = useState(10);

  useEffect(() => {
    if (leaderBoard && leaderBoard.attemptedQuizzes) {
      const { quizScores, quizLabels } = processQuizData(
        leaderBoard.attemptedQuizzes
      );
      setQuizScores(quizScores);
      setQuizLabels(quizLabels);
      setTotalQuizzes(leaderBoard.totalQuizzesAttempted);
      setAverageScore(
        (leaderBoard.points / leaderBoard.totalQuizzesAttempted).toFixed(2)
      );
    }
  }, [leaderBoard]);
  return (
    <Box
      sx={{
        border: "1px solid #BFD4E6",
        borderRadius: 1,
        p: 2,
        maxWidth: { xs: "100%", md: 500 },
        width: "100%",
        overflowX: "scroll",
        margin:'10px'
      }}
      mb={5}
    >
      {quizScores.length > 0 && quizLabels.length > 0 ? (
        <LineChart
          width={500}
          height={300}
          series={[{ data: quizScores, label: "Score", curve: "linear" }]}
          xAxis={[{ scaleType: "point", data: quizLabels }]}
          yAxis={[{ min: 0, max: 1 }]}
          sx={{
            ".MuiLineElement-root": {
              stroke: "#8884d8",
              strokeWidth: 2,
            },
            ".MuiMarkElement-root": {
              stroke: "#8884d8",
              scale: "0.6",
              fill: "#fff",
            },
          }}
        />
      ) : (
        <Typography>No quiz data available</Typography>
      )}
    </Box>
  );
}
