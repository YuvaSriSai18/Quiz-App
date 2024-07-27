import React, { useState } from "react";
import { Box, TextField, InputAdornment, Button } from "@mui/material";
import HttpsIcon from "@mui/icons-material/Https";
import { useSelector } from "react-redux";

export default function JoinRoomModal() {
  const userData = useSelector((state) => state.auth.userData);

  const [roomNumber, setRoomNumber] = useState("");
  const [error, setError] = useState("");

  const handleRoomNumberChange = (event) => {
    const value = event.target.value;
    setRoomNumber(value);

    // Validation logic
    const roomNumberPattern = /^\d{6}$/;
    if (value && !roomNumberPattern.test(value)) {
      setError(
        "Room Number should be exactly 6 digits and contain no letters."
      );
    } else {
      setError("");
    }
  };

  const handleSubmit = () => {
    if (error || !roomNumber) {
      // Show an error if there's an error or roomNumber is empty
      setError("Please enter a valid Room Number.");
      return;
    }
    // Handle the form submission logic here
    console.log({ roomNumber });
    // You can add your API call or other logic here
  };

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
        error={!!error}
        helperText={error}
      />
      <center>
        <Button variant="contained" onClick={handleSubmit}>
          Join Room
        </Button>
      </center>
    </Box>
  );
}
