import React from "react";
import { Grid, Card, CardContent, Typography, Avatar } from "@mui/material";

const StudentDashboard = ({ userData, isMobile, LeaderBoardData }) => {
  // Calculate studentName
  const studentName = userData ? userData.displayName : "";

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="stretch"
      sx={{ minHeight: "88vh", backgroundColor: "transparent", padding: 2 }}
    >
      <Grid container item xs={12} md={10} lg={8} spacing={2}>
        {/* Top row */}
        <Grid container item xs={12} spacing={2}>
          {/* Profile Card */}
          <Grid item xs={12} md={5} lg={4}>
            <Card
              sx={{
                borderRadius: 2,
                // boxShadow: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              elevation={8}
            >
              <CardContent align="center">
                <Avatar
                  src={
                    userData.photoUrl ||
                    "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                  }
                  alt={studentName}
                  sx={{ width: 200, height: 200, borderRadius: "50%" }}
                />
                <div title={studentName}>
                  <Typography variant="h6" mt={2} noWrap>
                    {studentName}
                  </Typography>
                </div>

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
                  // boxShadow: 3,
                  height: "100%",
                  // display: "flex",
                  // flexDirection: "column",
                  // justifyContent: "center",
                }}
                elevation={8}
              >
                <CardContent>
                  <Typography
                    fontSize={"20px"}
                    fontWeight={500}
                    textAlign={"center"}
                    m={0}
                    p={0}
                    mb={2}
                    mt={2}
                  >
                    User Details
                  </Typography>
                  {/* <Typography variant="body1" noWrap mb={1}>
                    Full Name : {userData.displayName}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                    Reg. No: {userData.rollNo}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Email: {userData.email}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                    Course: {userData.course}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                    Batch: {userData.batch}
                  </Typography> */}
                  <table>
                    <tr>
                      <th>Full Name</th>
                      <td>{userData.displayName}</td>
                    </tr>
                    <tr>
                      <th>Registration Number</th>
                      <td>{userData.rollNo}</td>
                    </tr>
                    <tr>
                      <th>Email ID </th>
                      <td>{userData.email}</td>
                    </tr>
                    <tr>
                      <th>Course</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Batch</th>
                      <td>{userData.batch}</td>
                    </tr>
                  </table>
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
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // mt: 2,
              padding: "12px",
            }}
            elevation={8}
          >
            <CardContent>
              {/* <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                Attempted: {LeaderBoardData.totalQuizzesAttempted}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                Score: {LeaderBoardData.points}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                Performance:  {LeaderBoardData.successRate} %
              </Typography>
              <Typography variant="body1" noWrap>
                Position🏆:{" "}
              </Typography> */}

              <table>
                <tr>
                  <th>Attempted</th>
                  <td>{LeaderBoardData.totalQuizzesAttempted}</td>
                </tr>
                <tr>
                  <th>Score</th>
                  <td>{LeaderBoardData.points}</td>
                </tr>
                <tr>
                  <th>Performance</th>
                  <td>{LeaderBoardData.successRate} % </td>
                </tr>
                <tr>
                  <th>Position</th>
                  <td> 7 🏆 </td>
                </tr>
              </table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StudentDashboard;
