import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Modal } from "@mui/material";
import LottieFile from "../../components/animation/LottieFile";
import QuizzesContainer from "../../components/Quizzes_Container/getAllQuizzes/QuizzesContainer";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useSelector } from "react-redux";
import JoinRoomModal from "../../components/Modals/JoinRoomModal";
<<<<<<< HEAD
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { LineChart } from "@mui/x-charts/LineChart";

=======
import JoinRoomWithoutAuth from "../../components/Modals/JoinRoomWithoutAuth";
>>>>>>> 6f982c78a0af5c93b0075a0709981f8f6ae0538c
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
  margin: {
    xs: "0px 10px",
    md: "0px",
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
  borderRadius: "5px",
};

export default function Home() {
  const userData = useSelector((state) => state.auth.userData);
  const [name, setName] = useState("User");
  const [averageScore, setAverageScore] = useState(75); // Dummy data
  const [quizScores, setQuizScores] = useState([0.2,0.8,0.5,0.9,0.6,0.7]); // Dummy data
  const [quizLabels, setQuizLabels] = useState(["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5","Quiz 6"]); // Dummy data
  const [totalQuizzes, setTotalQuizzes] = useState(10); // Dummy data

  // useEffect(() => {
  //   if (userData) {
  //     setName(userData.displayName ? userData.displayName.split(" ")[0].toUpperCase() : "User");
  //     setAverageScore(userData.averageScore || 0);
  //     setQuizScores(userData.quizScores || []);
  //     setQuizLabels(userData.quizLabels || []);
  //     setTotalQuizzes(userData.totalQuizzes || 0);
  //   }
  // }, [userData]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography
            fontSize={30}
            variant="h1"
            sx={{
              mt: { xs: 3, md: 10 },
              ml: { xs: 3, md: 10 },
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

          <Box m={{ md: "2rem 0px 0px 5rem", xs: "8px 0px 12px 1.2rem" }}>
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
                Success Rate <br /> {userData?.successRate || "N/A"}%
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
                Ranking <br /> {userData?.ranking || "N/A"}
              </Typography>
            </Box>

            <Box
              component="button"
              sx={{
                width: {
                  md: "200px",
                  xs: "160px",
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
                cursor: "pointer",
              }}
              onClick={handleOpen}
            >
              <Typography fontSize={35} m="auto" fontWeight={800}>
                <AddCircleOutlineRoundedIcon
                  sx={{ fontSize: "35px", fontWeight: 800 }}
                />
              </Typography>
              <Typography m="auto" textAlign="center">
                Join Room
              </Typography>
            </Box>
          </Box>
        </Box>
        <LottieFile />
      </Box>

      {/* Gauges and Line Chart */}
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center" justifyContent="center" mt={4}>
        <Box mt={{ xs: 4, md: 0 }} mr={{ md: 4 }}>
          <Gauge
            value={averageScore}
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
            value={totalQuizzes}
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
        <Box sx={{ border: "1px solid black", p: 2 }}>
          {quizScores.length > 0 && quizLabels.length > 0 ? (
            <LineChart
              width={500}
              height={300}
              series={[
                { data: quizScores, label: "Score", curve: "linear" },
              ]}
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
          <Typography variant="h6" align="center" mt={2}>
            Quiz Performance
          </Typography>
        </Box>
      </Box>

      <QuizzesContainer />

      {/* Modals */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          margin: {
            xs: "0px 8px",
            md: "0px",
          },
        }}
      >
        <Box sx={style}>
          {userData.email ? <JoinRoomModal /> : <JoinRoomWithoutAuth />}
        </Box>
      </Modal>
    </div>
  );
}
