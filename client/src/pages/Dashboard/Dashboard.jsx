import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "88vh", backgroundColor: "#eee", padding: 2 }}
    >
      <Grid container item xs={12} md={10} lg={8} spacing={2}>
        {/* Profile Card */}
        <Grid item xs={12} md={5} lg={4}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              height: { xs: "auto", md: "30rem" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardContent align="center">
              <img
                src={
                  userData.photoUrl ||
                  "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                }
                alt={`${userData.firstName}`}
                style={{
                  width: "100px",
                  height: "100px",
                  marginBottom: "10px",
                }}
              />
              <Typography variant="h6">{userData.displayName}</Typography>

              {isMobile && (
                <>
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    Email: {userData.email}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    Course: {userData.course}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    Year: {userData.year}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side Cards Container */}
        <Grid item xs={12} md={7} lg={8}>
          <Grid
            container
            spacing={2}
            direction="column"
            sx={{ height: "100%" }}
          >
            {/* Details Card */}
            {!isMobile && (
              <Grid item>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    marginBottom: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                      User Details
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      Reg. No: {userData.rollNo}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      Email: {userData.email}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      Course:{" "}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      Year:{" "}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Statistics Card */}
            <Grid item>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <CardContent>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Attempted:{" "}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Score:{" "}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Performance: %
                  </Typography>
                  <Typography variant="body1">Position🏆: </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
