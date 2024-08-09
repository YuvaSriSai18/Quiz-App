import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { parseISO, differenceInSeconds } from "date-fns";

export default function WaitingRoom() {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomNumber, quiz, userData } = location.state || {};
  const [timeRemaining, setTimeRemaining] = useState("");
  const [isOnWaitingRoom, setIsOnWaitingRoom] = useState(true);

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

      // Redirect if the current time is more than 5 minutes past openTime and user is on the WaitingRoom page
      if (isOnWaitingRoom) {
        const currentTime = new Date();
        const openTime = parseISO(quiz.openTime);
        const fiveMinutesAfterOpenTime = new Date(
          openTime.getTime() + 5 * 60 * 1000
        ); // 5 minutes in milliseconds

        if (currentTime >= fiveMinutesAfterOpenTime) {
          // More than or equal to 5 minutes after quiz open time
          navigate(`/writequiz/${quiz.QuizId}`);
          setIsOnWaitingRoom(false); // Set to false to avoid further navigation
          return;
        }
      }

      if (totalSeconds > 0) {
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setTimeRemaining(
          `${hours} Hours ${minutes} Min ${seconds} Sec`
        );
      } else {
        setTimeRemaining("Quiz has started");
      }
    };

    calculateTimeRemaining();
    const timerId = setInterval(calculateTimeRemaining, 1000);

    return () => {
      clearInterval(timerId);
      setIsOnWaitingRoom(false); // Ensure we set it to false on component unmount
    };
  }, [quiz, navigate, roomNumber, userData, isOnWaitingRoom]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      margin={"auto"}
      height="90vh"
      // bgcolor="#f0f0f0"
    >
      <Card
        sx={{
          maxWidth: 800,
          width: "100%",
          p: 3,
          maxHeight: "85vh",
          overflowY: "auto",
          bgcolor: "#ffffff",
          boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.2)",
          borderRadius: "12px",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            fontWeight={700}
            textAlign="center"
            sx={{ mb: 3, fontFamily: "'Roboto', sans-serif", color: "#1976d2" }} // Changed font style and color
          >
            You are in the Waiting Room
          </Typography>
          <Box>
            <Typography
              fontWeight={600}
              fontSize={{ xs: 18, md: 25 }}
              textAlign="left"
              mb={1}
              color="black" // Subtle text color for details
            >
              𝙌𝙪𝙞𝙯 𝘿𝙚𝙩𝙖𝙞𝙡𝙨 :
            </Typography>
            <Typography
              fontWeight={500}
              fontSize={{ xs: 16, md: 20 }}
              mb={1}
              color="#424242"
            >
              <b>Title:</b> {quiz.title}
            </Typography>
            <Typography
              fontWeight={500}
              fontSize={{ xs: 16, md: 20 }}
              mb={1}
              color="#424242"
            >
              <b>Number of Questions:</b> {quiz.noOfQuestions}
            </Typography>
          </Box>
          <Box mt={5} textAlign="center">
            {timeRemaining !== "Quiz has started" && (
              <Typography fontWeight={600} color="#1976d2">
                Quiz Starts in
              </Typography>
            )}
            <Typography
              fontWeight={600}
              fontSize={{ xs: 18, md: 23 }}
              mt={2}
              color="#1976d2"
            >
              {timeRemaining}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
