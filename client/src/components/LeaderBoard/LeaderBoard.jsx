import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ConfettiSparks from "../animation/ConfettieSparks";
import WrongOption from "../animation/WrongOption";

const LeaderBoard = () => {
  const [animationType, setAnimationType] = useState(null);

  useEffect(() => {
    const answerStatus = sessionStorage.getItem("answerStatus");
    if (answerStatus === "correct") {
      setAnimationType("correct");
    } else if (answerStatus === "wrong") {
      setAnimationType("wrong");
    }
    sessionStorage.removeItem("answerStatus");
  }, []);

  const dummyParticipants = [
    { rollNumber: "S12345", name: "John Doe", points: 150 },
    { rollNumber: "AP22110010750", name: "Jane Smith", points: 140 },
    { rollNumber: "S12347", name: "Emily Johnson", points: 130 },
    { rollNumber: "S12348", name: "Michael Brown", points: 120 },
    { rollNumber: "AP22110010750", name: "Sarah Davis", points: 110 },
    { rollNumber: "S12350", name: "David Wilson", points: 100 },
    { rollNumber: "S12351", name: "Laura Martinez", points: 90 },
    { rollNumber: "S12352", name: "James Anderson", points: 80 },
    { rollNumber: "S12353", name: "Olivia Thomas", points: 70 },
    { rollNumber: "S12354", name: "William Garcia", points: 60 },
    { rollNumber: "S12355", name: "Sophia Miller", points: 50 },
    { rollNumber: "S12356", name: "Daniel Rodriguez", points: 40 },
    { rollNumber: "S12357", name: "Isabella Martinez", points: 30 },
    { rollNumber: "S12358", name: "Ethan Lee", points: 20 },
    { rollNumber: "S12359", name: "Mia Walker", points: 10 },
    { rollNumber: "S12360", name: "Alexander Hall", points: 5 },
    { rollNumber: "S12361", name: "Ava Young", points: 3 },
    { rollNumber: "S12362", name: "Liam Scott", points: 2 },
    { rollNumber: "S12363", name: "Emma Harris", points: 1 },
    { rollNumber: "S12364", name: "Noah Nelson", points: 0 },
  ];

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

  const barHeights = [300, 250, 200]; // Manual control over the bar heights
  const barWidths = [80, 70, 60]; // Manual control over the bar widths

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={2}
      sx={{
        background: "#f9f9f9",
        minHeight: "100vh",
        overflowY: "hidden",
        width: "100%",
      }}
    >
      <Typography
        variant="h5"
        mb={2}
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
        >
          <ConfettiSparks />
        </Box>
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
        >
          <WrongOption />
        </Box>
      )}

      {/* Top Three Positions */}
      <Box
        display="flex"
        justifyContent="center"
        mb={2}
        sx={{
          width: "100%",
          maxWidth: "1000px",
          position: "relative",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {dummyParticipants.slice(0, 3).map((participant, index) => (
          <Box
            key={index}
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

      {/* User's Position */}
      <Box
        display="flex"
        justifyContent="center"
        mb={2}
        sx={{
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            background: "#dcdcdc",
            height: 100,
            width: 100,
            borderRadius: 2,
            boxShadow: 1,
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Your Position
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {/* Example position, replace with the actual user's position */}
            {dummyParticipants.length > 3 ? dummyParticipants[3].name : "N/A"}
          </Typography>
        </Box>
      </Box>

      {/* Remaining Positions */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px",
          overflowY: "auto",
          maxHeight: "400px",
        }}
      >
        {dummyParticipants.slice(3, 20).map((participant, index) => (
          <Grid
            container
            key={index}
            spacing={1}
            sx={{
              background: "#fff",
              borderRadius: 2,
              p: 1,
              mb: 1,
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
            <Grid item xs={3}>
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
    </Box>
  );
};

export default LeaderBoard;
