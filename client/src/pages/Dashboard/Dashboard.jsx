import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const StudentDashboard = ({ userData, isMobile }) => (
  <Grid
    container
    justifyContent="center"
    alignItems="stretch"
    sx={{ minHeight: "88vh", backgroundColor: "#eee", padding: 2 }}
  >
    <Grid container item xs={12} md={10} lg={8} spacing={2}>
      {/* Top row */}
      <Grid container item xs={12} spacing={2}>
        {/* Profile Card */}
        <Grid item xs={12} md={5} lg={4}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardContent align="center">
              <Avatar
                src={
                  userData.photoUrl ||
                  "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                }
                alt={userData.firstName}
                sx={{ width: 100, height: 100, margin: "0 auto 10px" }}
              />
              <Typography variant="h6" noWrap>{userData.displayName}</Typography>

              {isMobile && (
                <>
                  <Typography variant="body2" sx={{ marginBottom: 1 }} noWrap>
                    {userData.email}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }} noWrap>
                    {userData.course}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }} noWrap>
                    {userData.year}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Details Card */}
        <Grid item xs={12} md={7} lg={8}>
          {!isMobile && (
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  User Details
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                  Reg. No: {userData.rollNo}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }} >
                  Email: {userData.email}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                  Course: {userData.course}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                  Year: {userData.year}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Bottom row */}
      <Grid item xs={12}>
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <CardContent>
            <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
              Attempted: 
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
              Score: 
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
              Performance: %
            </Typography>
            <Typography variant="body1" noWrap>Position🏆: </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Grid>
);

const FacultyDashboard = ({ isMobile }) => (
  <Grid
    container
    justifyContent="center"
    alignItems="stretch"
    sx={{ minHeight: "88vh", backgroundColor: "#eee", padding: 2 }}
  >
    <Grid container item xs={12} md={10} lg={8} spacing={2}>
      {/* Top row */}
      <Grid container item xs={12} spacing={2}>
        {/* Profile Card */}
        <Grid item xs={12} md={5} lg={4}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardContent align="center">
              <Avatar
                src="https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                alt="Faculty"
                sx={{ width: 100, height: 100, margin: "0 auto 10px" }}
              />
              <Typography variant="h6" noWrap>Faculty Name</Typography>
              {isMobile && (
                <>
                  <Typography variant="body2" sx={{ marginBottom: 1 }} noWrap>
                    Department: 
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }} noWrap>
                    Email: 
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }} noWrap>
                    ID: 
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Details Card */}
        <Grid item xs={12} md={7} lg={8}>
          {!isMobile && (
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Faculty Details
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                  Department: 
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                  Email: 
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                  ID: 
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                  Designation: 
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Bottom row */}
      <Grid item xs={12}>
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <CardContent>
            <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
              Quizzes Created: 
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
              Number of : 
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
              Projects: 
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Grid>
);

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const [isStudent, setIsStudent] = useState(true);

  const handleToggle = () => {
    setIsStudent(!isStudent);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleToggle}
        sx={{ marginBottom: 2 }}
      >
        Switch to {isStudent ? "Faculty" : "Student"} Dashboard
      </Button>
      {isStudent ? (
        <StudentDashboard userData={userData} isMobile={isMobile} />
      ) : (
        <FacultyDashboard isMobile={isMobile} />
      )}
    </>
  );
};

export default Dashboard;