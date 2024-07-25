import React, { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import FacultyDashboard from "./FacultyDashboard";
import StudentDashboard from "./StudentDashboard";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  // Assuming you want to render both dashboards:
  return (
    <>
      {/* {userData.role === "Faculty" ? (
        <StudentDashboard userData={userData} isMobile={isMobile} />
        
      ) : (
        <FacultyDashboard isMobile={isMobile} />
      )} */}

        <StudentDashboard userData={userData} isMobile={isMobile} />
        <FacultyDashboard isMobile={isMobile} />
    </>
  );
};

export default Dashboard;
