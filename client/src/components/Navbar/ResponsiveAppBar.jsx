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
import axios from "axios";

const settings = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Leaderboard", path: "/leaderboard" },
  { name: "Logout", path: "/logout", action: "logout" },
];

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5500/login/success", {
        withCredentials: true,
      });
      if (response.data.authenticated) {
        dispatch(setUserData(response.data.user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    window.open("http://localhost:5500/auth/google", "_self");
  };

  const handleLogout = () => {
    window.open("http://localhost:5500/logout", "_self");
    dispatch(clearUserData());
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
                mr: "20px", // Adjust spacing between icon and text
              }}
            >
              Quiz App
            </Typography>
          </Box>

          {userData && userData.email ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open Profile">
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
              onClick={handleLogin}
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
