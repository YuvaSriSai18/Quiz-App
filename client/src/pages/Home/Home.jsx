import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import LottieFile from "../../components/animation/LottieFile";
import QuizzesContainer from "../../components/Quizzes_Container/getAllQuizzes/QuizzesContainer";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useSelector } from "react-redux";

export default function Home() {
  const userData = useSelector((state) => state.auth.userData);
  const [Name, setName] = useState("");
  useEffect(() => {
    setName(
      userData.displayName
        ? userData.displayName.split(" ")[0].toUpperCase()
        : "User"
    );
  }, [userData]);
  return (
    <div>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" mt={0}>
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
            Hi, {Name} 👋
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
              <Typography fontSize={35} m={"auto"} fontWeight={800}>
                🎯
              </Typography>
              <Typography m={"auto"} textAlign={"center"}>
                Success Rate <br /> {userData ? userData.successRate : "N/A"}%
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
              <Typography fontSize={35} m={"auto"} fontWeight={800}>
                🏆
              </Typography>
              <Typography m={"auto"} textAlign={"center"}>
                Ranking <br /> {userData ? userData.ranking : "N/A"}
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
            >
              <Typography fontSize={35} m={"auto"} fontWeight={800}>
                <AddCircleOutlineRoundedIcon
                  sx={{ fontSize: "35px", fontWeight: 800 }}
                />
              </Typography>
              <Typography m={"auto"} textAlign={"center"}>
                Join Room
              </Typography>
            </Box>
          </Box>
        </Box>
        <LottieFile />
      </Box>
      <QuizzesContainer />
    </div>
  );
}
