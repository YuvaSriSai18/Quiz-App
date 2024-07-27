import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import QuizzesContainer from "../../components/Quizzes_Container/getAllQuizzes/QuizzesContainer";

const FacultyDashboard = ({ isMobile }) => {
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
                    "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                  }
                  alt="FacultyName"
                  sx={{ width: 200, height: 200, borderRadius: "50%" }}
                />
                <Typography variant="h6" noWrap mt={2}>
                  Faculty Name
                </Typography>
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
                  // <>
                  //   {/* <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  //     Faculty Details
                  //   </Typography> */}
                  //   <table>
                  //     <tr>
                  //       <th>Department</th>
                  //       <td>Computer Science and Engineering</td>
                  //     </tr>
                  //     <tr>
                  //       <th>Email ID </th>
                  //       <td>facultymail@srmap.edu.in</td>
                  //     </tr>
                  //     <tr>
                  //       <th>Registration Number : </th>
                  //       <td>AP46519165</td>
                  //     </tr>
                  //   </table>
                  // </>
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
                  <Typography variant="h6" mb={2} mt={2}>
                    Faculty Details
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                    Department : Computer Science and Engineering
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                    Email ID : facultymail@srmap.edu.in
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                    Registration Number : AP46519165
                  </Typography>
                  {/* <table>
                    <tr>
                      <th>Department</th>
                      <td>Computer Science and Engineering</td>
                    </tr>
                    <tr>
                      <th>Email ID </th>
                      <td>facultymail@srmap.edu.in</td>
                    </tr>
                    <tr>
                      <th>Registration Number : </th>
                      <td>AP46519165</td>
                    </tr>
                  </table> */}
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
              // boxShadow: 3,
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center"
            }}
            elevation={8}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Faculty Details
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                Quizzes Created:
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                Number of :
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }} noWrap>
                Projects:
              </Typography>
              {/* <table>
                <tr>
                  <th>Quizzes Created:</th>
                  <td>Computer Science and Engineering</td>
                </tr>
                <tr>
                  <th>Projects: </th>
                  <td>7</td>
                </tr>
              </table> */}
              {/* <Typography variant="body1" fontWeight={600} mb={1} noWrap>
                Quizzes Created 
              </Typography> */}
              <QuizzesContainer />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FacultyDashboard;
