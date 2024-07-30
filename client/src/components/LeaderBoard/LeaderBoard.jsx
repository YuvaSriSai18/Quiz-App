import React from "react";
import { Box, Typography } from "@mui/material";

const LeaderBoard = () => {
  const dummyParticipants = [
    { rollNumber: "S12345", name: "John Doe", points: 150 },
    { rollNumber: "S12346", name: "Jane Smith", points: 140 },
    { rollNumber: "S12347", name: "Emily Johnson", points: 130 },
    { rollNumber: "S12348", name: "Michael Brown", points: 120 },
    { rollNumber: "S12349", name: "Sarah Davis", points: 110 },
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

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      p={2}
      bgcolor="#f5f5f5"
    >
      <Typography variant="h4" mb={4}>
        Leaderboard
      </Typography>
      <Box
        width="100%"
        maxWidth="600px"
        borderRadius={1}
        boxShadow={3}
        p={3}
        bgcolor="white"
      >
        {dummyParticipants.slice(0, 20).map((participant, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            p={1}
            mb={1}
            borderBottom={1}
            borderColor="grey.300"
          >
            <Typography>{index + 1}</Typography>
            <Typography>{participant.rollNumber}</Typography>
            <Typography>{participant.name}</Typography>
            <Typography>{participant.points}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LeaderBoard;
