import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserData,
  clearUserData,
} from "../../reducers/authentication/authSlice";
import {
  setLeaderBoardUserData,
  clearLeaderBoardUserData,
} from "../../reducers/LeaderBoard/LeaderBoardSlice";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";

const settings = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Leaderboard", path: "/leaderboard" },
  { name: "Logout", path: "/logout", action: "logout" },
];

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const fetchLeaderBoard = async (email) => {
    try {
      const response = await axios.get(
        `https://quiz-app-dummy.onrender.com/leaderboard`
      );
      if(response.data){
        const leaderBoardUserInfo = response.data.find((user => user.email === email))
        if(leaderBoardUserInfo){
          dispatch(setLeaderBoardUserData(response.data));
        }else{
          console.log(`User with E-Mail ${email} not found`)
        }
      }else{
        console.log(`LeaderBoard Data is empty`)
      }
    } catch (error) {
      console.log("Error fetching LeaderBoard data:", error);
    }
  };

  const fetchDatabaseUsers = async (email) => {
    try {
      const response = await axios.get(
        `https://quiz-app-dummy.onrender.com/profiledata`
      );
      if (response.data) {
        const userInfo = response.data.find((user) => user.email === email)
        if(userInfo){
          dispatch(setUserData(response.data));
        }else{
          console.log(`User not found in the database`)
        }
      } else {
        console.log(`User with email ${email} not found.`);
      }
    } catch (error) {
      console.log("Error fetching database users:", error);
    }
  };

  useEffect(() => {
    if (userData && userData.email) {
      const email = userData.email;
      fetchDatabaseUsers(email);
      fetchLeaderBoard(email);
    }
  }, [userData, dispatch]); // Added `dispatch` to dependencies to ensure proper handling

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        dispatch(setUserData(response.data));
        await axios
          .post(`https://quiz-app-dummy.onrender.com/profiledata/post`, response.data)
          .then(() => {
            console.log(`User Data Posted !!`);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log("Error during login process:", error);
      }
    },
  });

  const handleLogout = () => {
    googleLogout();
    dispatch(clearUserData());
    dispatch(clearLeaderBoardUserData());
    window.location.href = "/";
  };

  const handleMenuItemClick = (setting) => {
    if (setting.action === "logout") {
      handleLogout();
    } else {
      handleCloseUserMenu();
    }
  };

  return (
    <AppBar position="fixed" elevation={4}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box display={"flex"} alignItems="center">
            <PsychologyIcon sx={{ fontSize: "36px", mr: "10px" }} />
            <Typography
              variant="h6"
              noWrap
              component={NavLink}
              to="/"
              sx={{
                textDecoration: "none",
                fontSize: "22px",
                color: "#fff",
                fontWeight: "600",
                mr: "20px",
              }}
            >
              Quiz App
            </Typography>
          </Box>

          {userData && userData.email ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open Profile" arrow placement="bottom">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="User Avatar"
                    src={
                      userData.photoUrl ||
                      "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
                    }
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => handleMenuItemClick(setting)}
                  >
                    <Typography
                      component={NavLink}
                      to={setting.path}
                      variant="body1"
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <IconButton
              color="inherit"
              fontSize={{ xs: 15, md: 20 }}
              onClick={() => login()}
            >
              <Typography variant="h6" mr={1}>
                Login
              </Typography>
              <LoginRoundedIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
