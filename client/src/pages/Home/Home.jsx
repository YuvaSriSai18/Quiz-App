import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { Box, Modal, Card, CardContent } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { LineChart } from "@mui/x-charts/LineChart";

import JoinRoomModal from "../../components/Modals/JoinRoomModal";
import LappyLottie from "../../components/animation/LappyLottie";
import JoinRoomWithoutAuth from "../../components/Modals/JoinRoomWithoutAuth";
import StartQuizCard from "../../components/StartQuizCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "100%",
  width: {
    xs: "100%",
    md: 400,
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
  borderRadius: "5px",
};

const buttonStyle = {
  "--color": "#146c99",
  fontFamily: "inherit",
  display: "inline-block",
  width: "170px",
  height: "60px",
  lineHeight: "2.5em",
  marginTop: "2px",
  position: "relative",
  cursor: "pointer",
  overflow: "hidden",
  border: "2px solid var(--color)",
  transition: "color 0.5s",
  zIndex: 1,
  fontSize: "17px",
  borderRadius: "6px",
  fontWeight: 500,
  color: "var(--color)",
  "&:hover": {
    color: "#fff",
  },
  "&:before": {
    content: '""',
    position: "absolute",
    zIndex: -1,
    background: "var(--color)",
    height: "150px",
    width: "200px",
    borderRadius: "50%",
    top: "100%",
    left: "100%",
    transition: "all 0.7s",
  },
  "&:hover:before": {
    top: "-30px",
    left: "-30px",
  },
  "&:active:before": {
    background: "#3a0ca3",
    transition: "background 0s",
  },
};

export default function Home() {
  const userData = useSelector((state) => state.auth.userData);
  const leaderBoard = useSelector(
    (state) => state.LeaderBoard.LeaderBoardUserData
  );

  const [name, setName] = useState("User");
  const [averageScore, setAverageScore] = useState(75); // Dummy data
  const [quizScores, setQuizScores] = useState([0.2, 0.8, 0.5, 0.9, 0.6, 0.7]); // Dummy data
  const [quizLabels, setQuizLabels] = useState([
    "Quiz 1",
    "Quiz 2",
    "Quiz 3",
    "Quiz 4",
    "Quiz 5",
    "Quiz 6",
  ]); // Dummy data
  const [totalQuizzes, setTotalQuizzes] = useState(10); // Dummy data

  useEffect(() => {
    if (userData) {
      const userName = userData.displayName
        ? userData.displayName.split(" ")[0]
        : "User";
      setName(userName);
      // setAverageScore(userData.averageScore || 0);
      // setQuizScores(userData.quizScores || []);
      // setQuizLabels(userData.quizLabels || []);
      // setTotalQuizzes(userData.totalQuizzes || 0);
    }
  }, [userData]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box display="flex" justifyContent="space-around">
        <Card
          sx={{
            mt: { xs: 3, md: 10 },
            ml: { xs: 3, md: 10 },
            p: 6,
            borderRadius: 3,
            boxShadow: 3,
            maxWidth: { xs: "100%", md: "350px" },
          }}
        >
          <CardContent>
            <Box>
              <Typography
                fontSize={30}
                variant="h1"
                sx={{
                  fontSize: { xs: "23px", md: "30px" },
                  fontWeight: "600",
                }}
              >
                Hi, {name} 👋
                <br />
                <Typography
                  fontWeight={300}
                  mt={0.5}
                  sx={{
                    fontSize: { xs: 10, md: 16 },
                  }}
                >
                  Let's make this day productive
                </Typography>
              </Typography>

              <Box>
                <Box
                  component="div"
                  sx={{
                    width: {
                      md: "250px",
                      xs: "200px",
                    },
                    height: {
                      md: "70px",
                      xs: "60px",
                    },
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "2px solid #eeeeee",
                    boxShadow: "2px 2px #eeeeee",
                    display: "flex",
                  }}
                  mb={1}
                >
                  <Typography fontSize={35} m="auto" fontWeight={800}>
                    🎯
                  </Typography>
                  <Typography m="auto" textAlign="center">
                    Success Rate <br />{" "}
                    {leaderBoard.successRate ? leaderBoard.successRate : "N/A"} %
                  </Typography>
                </Box>

                <Box
                  component="div"
                  sx={{
                    width: {
                      md: "225px",
                      xs: "180px",
                    },
                    height: {
                      md: "70px",
                      xs: "60px",
                    },
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "2px solid #eeeeee",
                    boxShadow: "2px 2px #eeeeee",
                    display: "flex",
                  }}
                  mb={1}
                >
                  <Typography fontSize={35} m="auto" fontWeight={800}>
                    🏆
                  </Typography>
                  <Typography m="auto" textAlign="center">
                    Ranking <br /> {userData?.ranking || "N/A "}
                  </Typography>
                </Box>

                <Box
                  component="button"
                  sx={buttonStyle}
                  onClick={handleOpen}
                >
                  Join Room
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <LappyLottie />
      </Box>

      {/* Gauges and Line Chart */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
      >
        <Box mt={{ xs: 4, md: 0 }} mr={{ md: 4 }}>
          <Gauge
            value={leaderBoard.points / leaderBoard.totalQuizzesAttempted || 0}
            min={0}
            max={100}
            valueFormat={(value) => `${value.toFixed(1)}%`}
            startAngle={-110}
            endAngle={110}
            sx={{
              width: 200,
              height: 200,
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 30,
                fontWeight: "bold",
              },
            }}
          />
          <Typography variant="h6" align="center" mt={2}>
            Average Score
          </Typography>
        </Box>
        <Box mt={{ xs: 4, md: 0 }} mr={{ md: 4 }}>
          <Gauge
            value={leaderBoard.totalQuizzesAttempted || 0}
            min={0}
            max={50}
            valueFormat={(value) => `${value}`}
            startAngle={-110}
            endAngle={110}
            sx={{
              width: 200,
              height: 200,
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 30,
                fontWeight: "bold",
              },
            }}
          />
          <Typography variant="h6" align="center" mt={2}>
            Total Quizzes
          </Typography>
        </Box>
        <Box
          sx={{
            border: "1px solid #BFD4E6",
            borderRadius: 1,
            p: 2,
            maxWidth: { xs: "100%", md: 500 },
            width: "100%",
            overflowX: "scroll",
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
      </Box>

      <StartQuizCard />

      {/* Modals */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          margin: "60px",
        }}
      >
        <Box sx={style}>
          {userData.email ? <JoinRoomModal /> : <JoinRoomWithoutAuth />}
        </Box>
      </Modal>
    </div>
  );
}
