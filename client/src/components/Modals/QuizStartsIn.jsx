import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function QuizStartsIn({ currentTime, quizStartTime }) {
  const [timeRemaining, setTimeRemaining] = useState(
    quizStartTime - currentTime
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        border: "1px solid #000",
        borderRadius: 2,
        width: 200,
        margin: "0 auto",
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h6" component="h2">
        Quiz Starts In
      </Typography>
      <Typography sx={{ mt: 2 }}>{formatTime(timeRemaining)}</Typography>
    </Box>
  );
}
