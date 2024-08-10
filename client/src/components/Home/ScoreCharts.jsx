import React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useMediaQuery } from "@mui/material";
import LineGraph from "../../components/Home/LineGraph";
export default function ScoreCharts() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const leaderBoard = useSelector(
    (state) => state.LeaderBoard.LeaderBoardUserData
  );
  return (
    <>
      <Box
        display="flex"
        flexDirection={{ xs: "row", md: "row" }}
        alignItems="center"
        justifyContent="center"
      >
        <Box mt={{ xs: 0, md: 0 }} ml={{ xs: 5 }}>
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
          <Typography variant="h6" align="center">
            Average Score
          </Typography>
        </Box>
        <Box mt={{ xs: 0, md: 0 }} mr={{ xs: 0, md: 8 }}>
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
          <Typography variant="h6" align="center">
            Total Quizzes
          </Typography>
        </Box>
        {!isMobile && <LineGraph />}
      </Box>
      {isMobile && <LineGraph />}
    </>
  );
}
