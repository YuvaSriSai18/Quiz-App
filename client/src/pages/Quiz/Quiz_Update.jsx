import React, { useState, useEffect } from "react";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import {
  Card,
  CardContent,
  TextField,
  IconButton,
  Button,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useSelector } from "react-redux";
import RoomPassKeyCopyModal from "../../components/Modals/RoomPassKeyModal";
import { useParams, useNavigate } from "react-router-dom";

const Quiz_Update = () => {
  const { QuizId } = useParams(); // Get QuizId from URL
  const navigate = useNavigate(); // Use navigate for redirection
  const userData = useSelector((state) => state.auth.userData);
  const [questionPaper, setQuestionPaper] = useState({
    QuizId: "",
    CreatorMail: userData?.email || "",
    title: "",
    questions: [
      {
        question: "",
        options: [""],
        correctOption: 0,
        mark: 1,
      },
    ],
    duration: 0,
    roomPass: Math.floor(100000 + Math.random() * 900000),
    // openTime: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (QuizId) {
      axios
        .get(`http://localhost:5500/quiz/${QuizId}`)
        .then((response) => {
          const data = response.data;
          setQuestionPaper((prevState) => ({
            ...prevState,
            ...data,
            questions: data.questions || prevState.questions,
          }));
        })
        .catch((err) => console.error(err));
    }
  }, [QuizId]);

  const handleAddQuestion = () => {
    setQuestionPaper((prevState) => ({
      ...prevState,
      questions: [
        ...prevState.questions,
        {
          question: "",
          options: [""],
          correctOption: 0,
          mark: 1,
        },
      ],
    }));
  };

  const handleRemoveQuestion = (index) => {
    setQuestionPaper((prevState) => ({
      ...prevState,
      questions: prevState.questions.filter((_, i) => i !== index),
    }));
  };

  const handleChangeQuestion = (index, field, value) => {
    const updatedQuestions = [...questionPaper.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setQuestionPaper((prevState) => ({
      ...prevState,
      questions: updatedQuestions,
    }));
  };

  const handleChangeOption = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questionPaper.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestionPaper((prevState) => ({
      ...prevState,
      questions: updatedQuestions,
    }));
  };

  const handleAddOption = (index) => {
    const updatedQuestions = [...questionPaper.questions];
    updatedQuestions[index].options.push("");
    setQuestionPaper((prevState) => ({
      ...prevState,
      questions: updatedQuestions,
    }));
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    const updatedQuestions = [...questionPaper.questions];
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter(
      (_, i) => i !== oIndex
    );
    setQuestionPaper((prevState) => ({
      ...prevState,
      questions: updatedQuestions,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { roomPass, CreatorMail, ...updateData } = questionPaper;
    updateData.noOfQuestions = questionPaper.questions.length; // Compute noOfQuestions

    axios
      .put(`http://localhost:5500/quiz/${QuizId}`, updateData)
      .then((response) => {
        console.log(response.data);
        alert("Quiz updated successfully");
        navigate("/"); // Redirect to home page
      })
      .catch((error) => {
        console.error("There was an error updating the quiz!", error);
      });
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Card sx={{ width: { xs: "100%", md: "50%" }, margin: "30px auto" }}>
      <CardContent>
        <Typography variant="h5" fontWeight={600} textAlign={"center"}>
          Update Quiz
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={questionPaper.title}
            onChange={(e) =>
              setQuestionPaper((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Duration (in minutes)"
            type="number"
            value={questionPaper.duration}
            onChange={(e) =>
              setQuestionPaper((prevState) => ({
                ...prevState,
                duration: e.target.value,
              }))
            }
            fullWidth
            margin="normal"
          />
          {/* <TextField
            label="Open Time (YYYY-MM-DD HH:MM)"
            value={questionPaper.openTime}
            type="datetime-local"
            onChange={(e) =>
              setQuestionPaper((prevState) => ({
                ...prevState,
                openTime: e.target.value,
              }))
            }
            fullWidth
            margin="normal"
          /> */}
          {questionPaper.questions.map((question, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <Tooltip
                title={`Remove Question ${index + 1}`}
                sx={{ float: "right" }}
              >
                <IconButton onClick={() => handleRemoveQuestion(index)}>
                  <RemoveCircleRoundedIcon color="error" />
                </IconButton>
              </Tooltip>
              <TextField
                label={`Question ${index + 1}`}
                fullWidth
                value={question.question}
                onChange={(e) =>
                  handleChangeQuestion(index, "question", e.target.value)
                }
                margin="normal"
              />
              {question.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <TextField
                    label={`Option ${optionIndex + 1}`}
                    fullWidth
                    value={option}
                    onChange={(e) =>
                      handleChangeOption(index, optionIndex, e.target.value)
                    }
                    margin="normal"
                  />
                  <IconButton
                    onClick={() => handleRemoveOption(index, optionIndex)}
                  >
                    <CloseRoundedIcon />
                  </IconButton>
                </div>
              ))}
              <center>
                <Tooltip title="Add Option">
                  <IconButton
                    variant="contained"
                    onClick={() => handleAddOption(index)}
                    sx={{
                      backgroundColor: "#559dc2",
                      color: "#fff",
                      ":hover": {
                        backgroundColor: "#0b70a3",
                        color: "#fff",
                      },
                    }}
                  >
                    <Add />
                  </IconButton>
                </Tooltip>
              </center>
              <Box display={"flex"} justifyContent={"space-around"} mt={1}>
                <TextField
                  label="Correct Option"
                  type="number"
                  value={question.correctOption}
                  onChange={(e) =>
                    handleChangeQuestion(
                      index,
                      "correctOption",
                      parseInt(e.target.value, 10)
                    )
                  }
                  sx={{ width: "40%" }}
                />
                <TextField
                  label="Mark"
                  type="number"
                  value={question.mark}
                  onChange={(e) =>
                    handleChangeQuestion(
                      index,
                      "mark",
                      parseInt(e.target.value, 10)
                    )
                  }
                  sx={{ width: "40%" }}
                />
              </Box>
            </div>
          ))}
          <Box
            display={"flex"}
            flexDirection={"column"}
            rowGap={2}
            width={"fit-content"}
            m={"auto"}
          >
            <Button
              onClick={handleAddQuestion}
              variant="contained"
              color="primary"
            >
              Add Question
            </Button>
            <Button type="submit" variant="contained" color="success">
              Update Quiz
            </Button>
          </Box>
        </form>
      </CardContent>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <RoomPassKeyCopyModal roomPass={questionPaper.roomPass} />
      </Modal>
    </Card>
  );
};

export default Quiz_Update;
