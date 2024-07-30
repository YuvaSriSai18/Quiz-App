import React from "react";
import { Box, Typography } from "@mui/material";

const LeaderboardAfterQuestion = ({ topParticipants }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      p={2}
      bgcolor="#f5f5f5"
    >
      <Typography variant="h4" mb={4}>Leaderboard</Typography>
      <Box
        width="100%"
        maxWidth="600px"
        borderRadius={1}
        boxShadow={3}
        p={3}
        bgcolor="white"
      >
        {topParticipants.slice(0, 20).map((participant, index) => (
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

export default LeaderboardAfterQuestion;
