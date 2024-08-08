import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios"; // Don't forget to import axios
import io from "socket.io-client";

const LeaderBoard = () => {
  const [animationType, setAnimationType] = useState(null);
  const [leaderBoardUsers, setLeaderBoardUsers] = useState([]);

  useEffect(() => {
    const answerStatus = sessionStorage.getItem("answerStatus");
    if (answerStatus === "correct") {
      setAnimationType("correct");
    } else if (answerStatus === "wrong") {
      setAnimationType("wrong");
    }
    sessionStorage.removeItem("answerStatus");
  }, []);

  const socket = io("http://localhost:8080");
  socket.connect();
  socket.on("leaderBoard_update", (response) => {
    console.log(response.message);
    setLeaderBoardUsers(sortByPointsDescending(response.data));
  });

  const sortByPointsDescending = (arr) =>
    arr.sort((a, b) => b.points - a.points);

  const getBackgroundColor = (index) => {
    switch (index) {
      case 0:
        return "linear-gradient(135deg, #f5efd0, #f5e295)"; // Gold gradient
      case 1:
        return "linear-gradient(135deg, #ebe6e6, #d3d3d3)"; // Silver gradient
      case 2:
        return "linear-gradient(135deg, #d9b089, #e3cfbf)"; // Bronze gradient
      default:
        return "white";
    }
  };

  const barHeights = [300, 250, 200]; // Gold (middle) is the tallest
  const barWidths = [80, 70, 60]; // Manual control over the bar widths

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={2}
      sx={{
        background: "transparent",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Typography
        variant="h5"
        mb={4}
        sx={{ color: "#333", fontWeight: "bold" }}
      >
        Leaderboard
      </Typography>

      {animationType === "correct" && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            background: "rgba(255, 255, 255, 0.8)",
          }}
        ></Box>
      )}

      {animationType === "wrong" && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            background: "rgba(255, 255, 255, 0.8)",
          }}
        ></Box>
      )}

      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{ width: "100%", maxWidth: "1000px" }}
      >
        <Grid item xs={12} md={6} lg={4}>
          <Box display="flex" justifyContent="space-around" mb={2}>
            {leaderBoardUsers.slice(0, 3).map((participant, index) => (
              <Box
                key={participant.rollNumber} // Use unique key based on rollNumber
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{
                  background: getBackgroundColor(index),
                  height: barHeights[index],
                  width: barWidths[index],
                  borderRadius: 2,
                  boxShadow: 2,
                  mx: 1,
                  mb: 2,
                  position: "relative",
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: "-1.5rem",
                    background: "#fff",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                  }}
                >
                  {index + 1}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    writingMode: "vertical-rl",
                    mt: "auto",
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  {participant.name}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box display="flex" justifyContent="space-around" mb={4}>
            {leaderBoardUsers.slice(0, 3).map((participant, index) => (
              <Box
                key={participant.rollNumber} // Use unique key based on rollNumber
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{
                  mx: 1,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  {participant.rollNumber}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  {participant.points} Points
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <Box
            sx={{
              width: "100%",
              overflowY: "auto",
              height: "600px",
              p: 2,
              background: "transparent",
              paddingRight: "10px",
              borderRadius: 2,
            }}
          >
            {leaderBoardUsers.slice(3).map((participant, index) => (
              <Grid
                container
                key={participant.rollNumber} // Use unique key based on rollNumber
                spacing={1}
                sx={{
                  background: "#f5f5f5",
                  borderRadius: 2,
                  p: 1,
                  mb: 1.2,
                  alignItems: "center",
                  boxShadow: 1,
                }}
              >
                <Grid item xs={1}>
                  <Typography sx={{ fontWeight: 500 }}>{index + 4}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography sx={{ fontWeight: 500, fontSize: "0.9rem" }}>
                    {participant.name}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography sx={{ textAlign: "right", fontSize: "0.9rem" }}>
                    {participant.rollNumber}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography sx={{ textAlign: "right", fontSize: "0.9rem" }}>
                    {participant.points} Points
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeaderBoard;
