import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { parseISO, differenceInSeconds } from "date-fns";

export default function WaitingRoom() {
  const location = useLocation();
  const { roomNumber, quiz, userData } = location.state || {};
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    if (!roomNumber || !quiz || !userData) {
      console.error("Missing necessary data for WaitingRoom");
      // Handle missing data (e.g., redirect back or show an error)
      return;
    }

    const calculateTimeRemaining = () => {
      const openTime = parseISO(quiz.openTime);
      const now = new Date();
      const totalSeconds = differenceInSeconds(openTime, now);

      if (totalSeconds > 0) {
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setTimeRemaining(
          `${days} Days ${hours} Hours ${minutes} Min ${seconds} Sec`
        );
      } else {
        setTimeRemaining("Quiz has started");
      }
    };

    calculateTimeRemaining();
    const timerId = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timerId);
  }, [quiz]);

  console.log(roomNumber);
  console.log(quiz);
  console.log(userData);

  return (
    <center>
      <Typography variant={{ xs: "h5", md: "h6" }} fontWeight={600}>
        You are in the Waiting Room
      </Typography>
      <Box sx={{ width: "70%" }} mt={3}>
        <Typography
          fontWeight={600}
          fontSize={{ xs: 18, md: 23 }}
          textAlign={"left"}
          ml={2}
        >
          Quiz Details
        </Typography>
        <Typography
          fontWeight={500}
          fontSize={{ xs: 18, md: 23 }}
          textAlign={"left"}
        >
          <b>Title:</b> {quiz.title}
        </Typography>
        <Typography
          fontWeight={500}
          fontSize={{ xs: 18, md: 23 }}
          textAlign={"left"}
        >
          <b>Number of Questions:</b> {quiz.noOfQuestions}
        </Typography>
      </Box>
      <Box mt={5}>
        {timeRemaining != "Quiz has started" && (
          <Typography fontWeight={600}>Quiz Starts in</Typography>
        )}
        <Typography
          fontWeight={600}
          fontSize={{ xs: 18, md: 23 }}
          textAlign={"center"}
          mt={2}
        >
          {timeRemaining}
        </Typography>
      </Box>
    </center>
  );
}
