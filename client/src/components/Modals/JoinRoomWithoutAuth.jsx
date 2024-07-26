import { Box, TextField, InputAdornment, Button } from "@mui/material";
import React, { useState } from "react";
import HttpsIcon from "@mui/icons-material/Https";
import { useSelector } from "react-redux";

export default function JoinRoomModal() {
  const [email, setEmail] = useState("");
  const [regdNo, setRegdNo] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRegdNoChange = (event) => {
    setRegdNo(event.target.value);
  };

  const handleRoomNumberChange = (event) => {
    setRoomNumber(event.target.value);
  };

  const handleSubmit = () => {
    // Handle the form submission logic here
    console.log({ email, regdNo, roomNumber });
    // You can add your API call or other logic here
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        label="Name"
        id="user-email"
        value={email}
        onChange={handleEmailChange}
        variant="outlined"
        sx={{ color: "black", mb: 2, width: { xs: "90%", md: "100%" } }}
      />
      <TextField
        label="Roll No"
        id="user-id"
        value={regdNo}
        onChange={handleRegdNoChange}
        variant="outlined"
        sx={{ color: "black", mb: 2, width: { xs: "90%", md: "100%" } }}
      />
      <TextField
        id="room-number"
        label="Room Number"
        value={roomNumber}
        onChange={handleRoomNumberChange}
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
        <Button variant="contained" onClick={handleSubmit}>
          Join Room
        </Button>
      </center>
    </Box>
  );
}
