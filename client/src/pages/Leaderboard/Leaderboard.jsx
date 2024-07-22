import React from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

// Generate leaderboard data with random scores and times
const leaderboardData = Array.from({ length: 100 }, (_, index) => ({
  position: index + 1,
  rollNumber: `Roll-${index + 1}`,
  fullName: `Member ${index + 1}`,
  score: Math.floor(Math.random() * 100) + 1, // Random score between 1 and 100
  timeMinutes: Math.floor(Math.random() * 60), // Random minutes between 0 and 59
  timeSeconds: Math.floor(Math.random() * 60), // Random seconds between 0 and 59
}));

// Sort data by score in decreasing order, then by minutes and seconds in increasing order
leaderboardData.sort(
  (a, b) =>
    b.score - a.score ||
    a.timeMinutes - b.timeMinutes ||
    a.timeSeconds - b.timeSeconds
);

// Update position based on sorted data
leaderboardData.forEach((item, index) => {
  item.position = index + 1;
});

const Leaderboard = () => {
  return (
    <Container>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Leaderboard
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Position</TableCell>
                <TableCell align="center">Roll Number</TableCell>
                <TableCell align="center">Full Name</TableCell>
                <TableCell align="center">Score</TableCell>
                <TableCell align="center">Time (min:sec)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData.map((row) => (
                <TableRow key={row.position}>
                  <TableCell align="center">{row.position}</TableCell>
                  <TableCell align="center">{row.rollNumber}</TableCell>
                  <TableCell align="center">{row.fullName}</TableCell>
                  <TableCell align="center">{row.score}</TableCell>
                  <TableCell align="center">{`${
                    row.timeMinutes
                  }:${row.timeSeconds.toString().padStart(2, "0")}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Leaderboard;
