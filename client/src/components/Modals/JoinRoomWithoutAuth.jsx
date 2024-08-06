import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Typography,
} from "@mui/material";
import HttpsIcon from "@mui/icons-material/Https";

export default function JoinRoomModal() {
  const [email, setEmail] = useState("");
  const [regdNo, setRegdNo] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    regdNo: "",
    roomNumber: "",
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRegdNoChange = (event) => {
    setRegdNo(event.target.value);
  };

  const handleRoomNumberChange = (event) => {
    setRoomNumber(event.target.value);
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      regdNo: "",
      roomNumber: "",
    };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Name is required.";
      isValid = false;
    }

    if (!regdNo.trim() || !regdNo.startsWith("AP")) {
      newErrors.regdNo = "Use Institute Registered Number";
      isValid = false;
    }

    const roomNumberPattern = /^\d{6}$/;
    if (!roomNumberPattern.test(roomNumber)) {
      newErrors.roomNumber = "Please enter a valid Room Number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Handle the form submission logic here
      console.log({ email, regdNo, roomNumber });
      // You can add your API call or other logic here
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        label="Name"
        id="user-email"
        value={email}
        onChange={handleEmailChange}
        variant="outlined"
        sx={{ color: "black", mb: 2, width: "100%" }}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Roll No"
        id="user-id"
        value={regdNo}
        onChange={handleRegdNoChange}
        variant="outlined"
        sx={{ color: "black", mb: 2, width: "100%" }}
        error={!!errors.regdNo}
        helperText={errors.regdNo}
      />
      <TextField
        id="room-number"
        label="Room Number"
        value={roomNumber}
        onChange={handleRoomNumberChange}
        sx={{ color: "black", mb: 2, width: "100%" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HttpsIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        error={!!errors.roomNumber}
        helperText={errors.roomNumber}
      />
      <center>
        <Button variant="contained" onClick={handleSubmit}>
          Join Room
        </Button>
      </center>
    </Box>
  );
}
