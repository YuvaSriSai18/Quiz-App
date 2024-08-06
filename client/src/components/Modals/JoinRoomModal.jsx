import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JoinRoomModal() {
  const userData = useSelector((state) => state.auth.userData);
  const [roomNumber, setRoomNumber] = useState("");
  const [error, setError] = useState("");
  const [quiz, setQuiz] = useState();
  const navigate = useNavigate();
  const socket = io("http://localhost:8080");

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleRoomNumberChange = (event) => {
    const value = event.target.value;
    setRoomNumber(value);

    const roomNumberPattern = /^\d{6}$/;
    if (value && !roomNumberPattern.test(value)) {
      setError(
        "Room Number should be exactly 6 digits and contain no letters."
      );
    } else {
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (error || !roomNumber) {
      setError("Please enter a valid Room Number.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5500/room/${roomNumber}`
      );
      setQuiz(response.data.quiz);
      if (response.data.exists) {
        const currentTime = new Date();
        const openTime = new Date(response.data.quiz.openTime);
        const entryDeadline = new Date(openTime.getTime() + 3 * 60 * 1000);
        if (currentTime < entryDeadline) {
          // alert("Room exists");
          socket.emit("join_room", roomNumber);
          navigate("/wr", {
            state: { roomNumber, quiz: response.data.quiz, userData },
          });
        } else {
          setError("Entry time has been completed.");
        }
      } else {
        setError("Room number does not exist.");
      }
    } catch (err) {
      console.error("Error checking room number:", err);
      setError("Failed to check room number.");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        label="Name"
        id="user-name"
        value={userData?.displayName || "No Name"}
        readOnly
        variant="outlined"
        sx={{ color: "black", mb: 2, width: "100%" }}
      />
      <TextField
        label="Regd No"
        id="user-id"
        value={userData?.rollNo || "No ID"}
        readOnly
        variant="outlined"
        sx={{ color: "black", mb: 2, width: "100%" }}
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
              <LockIcon />
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
