import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import FacultyDashboard from "./FacultyDashboard";
import StudentDashboard from "./StudentDashboard";
import "./Dashboard.css";
const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const userData = useSelector((state) => state.auth.userData);
  // const leaderBoardUser = useSelector(
  //   (state) => state.leaderBoard.LeaderBoardUserData
  // );
  const leaderBoard = useSelector((state) => state.LeaderBoard.LeaderBoardUserData )
  return (
    <div className="dashboard">
      {/* {userData.role === "Faculty" ? (
        <StudentDashboard userData={userData} isMobile={isMobile} />
        
      ) : (
        <FacultyDashboard isMobile={isMobile} />
      )} */}

      <StudentDashboard userData={userData} LeaderBoardData={leaderBoard} isMobile={isMobile} />
      <FacultyDashboard isMobile={isMobile} />
    </div>
  );
};

export default Dashboard;
