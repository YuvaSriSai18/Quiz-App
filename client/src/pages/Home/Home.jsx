import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { Box, Modal, Card, CardContent ,useMediaQuery } from "@mui/material";
import JoinRoomModal from "../../components/Modals/JoinRoomModal";
import LappyLottie from "../../components/animation/LappyLottie";
import JoinRoomWithoutAuth from "../../components/Modals/JoinRoomWithoutAuth";
import StartQuizCard from "../../components/StartQuizCard";
import ScoreCharts from "../../components/Home/ScoreCharts";

import './Home.css'
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
  "--color": "#1679ab",
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

  const userData = useSelector((state) => state.auth.userData);
  const leaderBoard = useSelector(
    (state) => state.LeaderBoard.LeaderBoardUserData
  );

  const isMobile = useMediaQuery("(max-width:600px)");

  const [name, setName] = useState("User");

  useEffect(() => {
    if (userData) {
      const userName = userData.displayName
        ? userData.displayName.split(" ")[0]
        : "User";
      setName(userName);
    }
  }, [userData]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        display="flex"
        justifyContent={{xs:'start', md: "space-between", lg: "space-around" }}
        height={{xs:"60vh",md:'fit-content'}}
        // width={'100vw'}
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
                  fontWeight={400}
                  mt={0.5}
                  sx={{
                    fontSize: { xs: 14, md: 16 },
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
                    {leaderBoard.rank
                      ? `${leaderBoard.rank}${studentRank(leaderBoard.rank)}`
                      : "N/A "}
                  </Typography>
                </Box>

                <Box component="button" sx={buttonStyle} onClick={handleOpen}>
                  Join Room
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
       {!isMobile && <LappyLottie />}
      </Box>

      {/* Gauges and Line Chart */}
      <ScoreCharts />

      {userData.role === "Faculty" && <StartQuizCard />}

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
    </>
  );
}
