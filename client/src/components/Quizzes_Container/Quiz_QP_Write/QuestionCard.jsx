import React, { useState, useEffect } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

// Initialize Socket.IO client
const socket = io("https://quiz-app-dummy.onrender.com");
socket.connect();

export default function QuestionCard({
  question,
  questionNumber,
  onTimeUp,
  quizId,
  isNewQuestion,
}) {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(question.duration || 10);
  const [response, setResponse] = useState({
    QuizId: quizId,
    StudentRoll: userData.rollNo,
    StudentEmail: userData.email,
    StudentName: userData.displayName,
    answers: [],
  });
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    // Reset timeUp and timeLeft when a new question is presented
    if (isNewQuestion) {
      setTimeUp(false);
      setTimeLeft(question.duration || 10); // Reset timeLeft
    }
  }, [isNewQuestion, question.duration]);

  useEffect(() => {
    if (timeUp) {
      postResponse();
      onTimeUp();
      return;
    }

    if (timeLeft <= 1) {
      setTimeUp(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, timeUp, onTimeUp]);

  const handleOptionChange = (event) => {
    const selectedOptionIndex = parseInt(event.target.value, 10);
    setResponse((prevResponse) => {
      // Check if answer for the current question already exists, if not add it
      const existingAnswer = prevResponse.answers.find(
        (ans) => ans.questionNumber === questionNumber
      );
      if (existingAnswer) {
        return {
          ...prevResponse,
          answers: prevResponse.answers.map((ans) =>
            ans.questionNumber === questionNumber
              ? { ...ans, givenAnswer: selectedOptionIndex }
              : ans
          ),
        };
      } else {
        return {
          ...prevResponse,
          answers: [
            ...prevResponse.answers,
            { questionNumber, givenAnswer: selectedOptionIndex },
          ],
        };
      }
    });
  };

  const postResponse = async () => {
    try {
      // Ensure givenAnswer is a number
      const modifiedResponse = {
        ...response,
        answers: response.answers.map((answer) => ({
          ...answer,
          givenAnswer: Number(answer.givenAnswer),
        })),
      };

      await axios.post(
        "https://quiz-app-dummy.onrender.com/response/submit",
        modifiedResponse
      );
      console.log("Posting response:", modifiedResponse);
      const quizDetails = await axios.get(
        `https://quiz-app-dummy.onrender.com/quiz/${quizId}`
      );
      // Emit message to Socket.IO server`
      socket.emit("send_message", {
        room: quizDetails.data.roomPass,
        message: `${userData.displayName} answered question ${questionNumber}`,
      });
    } catch (err) {
      console.error("Error posting response:", err);
      alert(err.response ? err.response.data.msg : "Submission failed");
    }
  };

  return (
    <Box
      sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "10px" }}
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
            border: "2.5px solid #ebe6e6",
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>{questionNumber} . </strong> {question.question}
          </p>
          <p style={{ margin: 0, fontWeight: "600" }}>{question.mark} M</p>
        </Box>

        <Box
          sx={{
            padding: "10px",
            borderRadius: "12px",
            marginTop: "12px",
            border: "2.5px solid #ebe6e6",
          }}
        >
          <FormControl component="fieldset">
            <RadioGroup
              name={`question-${questionNumber}`}
              value={
                response.answers.find(
                  (ans) => ans.questionNumber === questionNumber
                )?.givenAnswer ?? ""
              }
              onChange={handleOptionChange}
            >
              {question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index} // Use string value for Radio input
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            fontWeight: "bold",
            padding: "10px",
            borderRadius: "12px",
            background:
              "linear-gradient(135deg, #F0F4FD 0%, #D9EAF5 50%, #BFD4E6 100%)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ margin: 0 }}>Time left: {timeLeft}s</p>
        </Box>
      </Box>
    </Box>
  );
}
