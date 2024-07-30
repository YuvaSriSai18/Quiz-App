import React, { useState, useEffect } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function QuestionCard({
  question,
  questionNumber,
  handleResponseChange,
  nextPath,
}) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(question.time || 10); // Default time 10 seconds

  const handleOptionChange = (event) => {
    handleResponseChange(questionNumber - 1, event.target.value);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      navigate(nextPath); // Navigate to the next path (e.g., leaderboard or next question)
      return; // Exit the effect
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate, nextPath]);

  return (
    <Box
      sx={{ width: { xs: "70%", md: "50%" }, margin: "auto", padding: "10px" }}
    >
      <Box
        sx={{
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            padding: "10px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>{questionNumber} . </strong> {question.question}
          </p>
          <p style={{ margin: 0, fontWeight: "600" }}>{question.mark} M </p>
        </Box>

        <Box
          sx={{
            padding: "10px",
            borderRadius: "12px",
            marginTop: "12px",
          }}
        >
          <FormControl component="fieldset">
            <RadioGroup
              name={`question-${questionNumber}`}
              onChange={handleOptionChange}
            >
              {question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Timer Box with Gradient Background and Rounded Edges */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            fontWeight: "bold",
            padding: "10px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #F0F4FD 0%, #D9EAF5 50%, #BFD4E6 100%)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ margin: 0 }}>Time left: {timeLeft}s</p>
        </Box>
      </Box>
    </Box>
  );
}
