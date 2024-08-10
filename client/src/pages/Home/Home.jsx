import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { Box, Modal, Card, CardContent } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import JoinRoomModal from "../../components/Modals/JoinRoomModal";
import LappyLottie from "../../components/animation/LappyLottie";
import JoinRoomWithoutAuth from "../../components/Modals/JoinRoomWithoutAuth";
import StartQuizCard from "../../components/StartQuizCard";
import LineGraph from "../../components/Home/LineGraph";
import useMediaQuery from "@mui/material";
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
function studentRank(num) {
  if (num === 1) {
    return "st";
  } else if (num === 2) {
    return "nd";
  } else if (num === 3) {
    return "rd";
  } else {
    return "th";
  }
}
export default function Home() {

  const isMobile = useMediaQuery("(max-width:600px)");

  const userData = useSelector((state) => state.auth.userData);
  const leaderBoard = useSelector(
    (state) => state.LeaderBoard.LeaderBoardUserData
  );

  const processQuizData = (attemptedQuizzes) => {
    // Extract pointsEarned and quizTitle from attemptedQuizzes
    const quizScores = attemptedQuizzes.map((quiz) => quiz.pointsEarned);
    const quizLabels = attemptedQuizzes.map(
      (quiz, index) => `Quiz ${index + 1}`
    );

    return { quizScores, quizLabels };
  };

  const [name, setName] = useState("User");
  const [averageScore, setAverageScore] = useState(75);
  const [quizScores, setQuizScores] = useState([]);
  const [quizLabels, setQuizLabels] = useState([]);
  const [totalQuizzes, setTotalQuizzes] = useState(10);

  useEffect(() => {
    if (leaderBoard && leaderBoard.attemptedQuizzes) {
      const { quizScores, quizLabels } = processQuizData(
        leaderBoard.attemptedQuizzes
      );
      setQuizScores(quizScores);
      setQuizLabels(quizLabels);
      setTotalQuizzes(leaderBoard.totalQuizzesAttempted);
      setAverageScore(
        (leaderBoard.points / leaderBoard.totalQuizzesAttempted).toFixed(2)
      );
    }
  }, [leaderBoard]);

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
      <Box
        display="flex"
        justifyContent={{ md: "space-between", lg: "space-around" }}
      >
        <Card
          sx={{
            mt: { xs: 3, md: 10 },
            ml: { xs: 3, md: 10 },
            p: 1,
            borderRadius: 3,
            boxShadow: 3,
            maxWidth: { xs: "100%", md: "350px" },
            height: { xs: "fit-content" },
            width: { xs: "100%" },
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
                    fontSize: { xs: 13, md: 16 },
                  }}
                  mb={0.5}
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
                      xs: "90%",
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
                    {leaderBoard.successRate ? leaderBoard.successRate : "N/A"}{" "}
                    %
                  </Typography>
                </Box>

                <Box
                  component="div"
                  sx={{
                    width: {
                      md: "225px",
                      xs: "80%",
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
                    Ranking <br />{" "}
                    {leaderBoard.rank ? `${leaderBoard.rank}${studentRank(leaderBoard.rank)}` : "N/A "} 
                  </Typography>
                </Box>

                <Box component="button" sx={buttonStyle} onClick={handleOpen}>
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
        {/* {!isMobile && <LineGraph />} */}
      </Box>
      {/* {isMobile && <LineGraph />} */}
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
