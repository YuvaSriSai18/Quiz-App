import { Box, TextField, InputAdornment, Button } from "@mui/material";
import React from "react";
import HttpsIcon from "@mui/icons-material/Https";
import { useSelector } from "react-redux";

export default function JoinRoomModal() {
  const userData = useSelector((state) => state.auth.userData);

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        label="Email"
        id="user-email"
        value={userData?.email || "No email"}
        readOnly
        variant="outlined"
        sx={{ color: "black", mb: 2, width: { xs: "90%", md: "100%" } }}
      />
      <TextField
        label="Regd No"
        id="user-id"
        value={userData?.rollNo || "No ID"}
        readOnly
        variant="outlined"
        sx={{ color: "black", mb: 2, width: { xs: "90%", md: "100%" } }}
      />
      <TextField
        id="room-number"
        label="Room Number"
        sx={{ color: "black", mb: 2, width: { xs: "90%", md: "100%" } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HttpsIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      <center>
        <Button variant="contained">Join Room</Button>
      </center>
    </Box>
  );
}
