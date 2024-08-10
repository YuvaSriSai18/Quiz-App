import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faStar, faTrophy } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";

const getBackgroundColor = (index) => {
  switch (index) {
    case 0:
      return "linear-gradient(135deg, #f5efd0, #f5e295)"; // Gold gradient
    case 1:
      return "linear-gradient(135deg, #ebe6e6, #d3d3d3)"; // Silver gradient
    case 2:
      return "linear-gradient(135deg, #d9b089, #e3cfbf)"; // Bronze gradient
    default:
      return "#f0f0f0";
  }
};

const getBorderStyle = (index) => {
  switch (index) {
    case 0:
      return "linear-gradient(135deg, #ffd700, #f5c300)"; // Gold metallic border
    case 1:
      return "linear-gradient(135deg, #c0c0c0, #b0b0b0)"; // Silver metallic border
    case 2:
      return "linear-gradient(135deg, #cd7f32, #b87333)"; // Bronze metallic border
    default:
      return "black";
  }
};

const getIcon = (index) => {
  switch (index) {
    case 0:
      return <FontAwesomeIcon icon={faTrophy} size="3x" color="#ffd700" />;
    case 1:
      return <FontAwesomeIcon icon={faStar} size="3x" color="#c0c0c0" />;
    case 2:
      return <FontAwesomeIcon icon={faMedal} size="3x" color="#cd7f32" />;
    default:
      return null;
  }
};

const Leaderboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [leaderBoardUsers, setLeaderBoardUsers] = useState([]);

  useEffect(() => {
    const getLeaderBoardUsers = async () => {
      try {
        const response = await axios.get(`https://quiz-app-dummy.onrender.com/leaderboard`);
        setLeaderBoardUsers(response.data);
      } catch (error) {
        console.log(`Error occurred in getting leaderboard users : ${err}`);
      }
    };
    getLeaderBoardUsers();
  }, []);

  // const socket = io("http://localhost:8080");
  // socket.connect();

  // socket.on("setAllLeaderBoardUsersRanking", (response) => {
  //   console.log(response.message);
  //   setLeaderBoardUsers(response.data);
  // });

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
        {/* {
          true && <SadEmoji/>
        } */}
        {/* Top 3 positions */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center alignment
            gap: 2,
            mb: 4,
          }}
        >
          {leaderBoardUsers.slice(0, 3).map((row, index) => (
            <Paper
              key={row.rank}
              sx={{
                padding: 2,
                borderRadius: 2,
                textAlign: "center",
                width: isMobile ? "90%" : `${800 - index * 90}px`, // Responsive width
                maxWidth: "100%",
                background: getBackgroundColor(index), // Apply gradient background
                position: "relative", // Position relative for child alignment
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end", // Ensure elements are aligned at the bottom
                border: `4px solid transparent`, // Transparent border
                borderImage: `linear-gradient(135deg, ${getBorderStyle(
                  index
                )}) 1`, // Metallic gradient border
                boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff", // Existing shadow
              }}
            >
              {getIcon(index)} {/* Display icon */}
              <Typography
                variant="h6"
                sx={{
                  mt: 1,
                  fontSize: "1.3rem",
                }}
              >
                {row.rank === 1 ? "1st" : row.rank === 2 ? "2nd" : "3rd"}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: 1,
                  fontWeight: "600",
                  fontSize: "1.25rem",
                }}
              >
                {row.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginTop: isMobile ? 1 : 0,
                  position: isMobile ? "static" : "absolute",
                  bottom: isMobile ? "auto" : 10,
                  left: 10,
                  margin: 0,
                }}
              >
                {row.rollNumber}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginTop: isMobile ? 1 : 0,
                  position: isMobile ? "static" : "absolute",
                  bottom: isMobile ? "auto" : 10,
                  right: 10,
                  margin: 0,
                }}
              >
                Score: {row.points}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Remaining positions */}

        {leaderBoardUsers[3] ? (
          <Box sx={{ width: "100%" }}>
            <TableContainer
              component={Paper}
              sx={{
                backgroundColor: "#f0f0f0", // Light gray background
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)", // Floating effect
                borderRadius: 2,
                border: "4px solid #a8a8a8", // Dark gray border
                mt: 4, // Margin top to separate from the leaderboard
              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {leaderBoardUsers.slice(3).map((row) => (
                    <TableRow
                      key={row.rank}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        backgroundColor: "#f0f0f0", // Light gray background for rows
                      }}
                    >
                      <TableCell align="center" sx={{ color: "#333333" }}>
                        {row.rank}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#333333" }}>
                        {row.rollNumber}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#333333" }}>
                        {row.name}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#333333" }}>
                        {row.points}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Container>
  );
};

export default Leaderboard;
