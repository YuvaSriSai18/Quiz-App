import React, { useState } from "react";
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
  Grid,
  Modal,
  Box,
} from "@mui/material";
import { Add, ArrowBack } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import RoomPassKeyCopyModal from "../../components/Modals/RoomPassKeyModal";

const Quiz_QP_Create = () => {
  const userData = useSelector((state) => state.auth.userData);
  const [questionPaper, setQuestionPaper] = useState({
    QuizId: uuidv4(),
    CreatorMail: userData?.email || "abc@gmail.com",
    title: "",
    questions: [
      {
        question: "",
        options: [""],
        correctOption: 1, // Default to 1 (1-based index for user convenience)
        mark: 1,
        duration: 10, // Default duration set to 10 seconds
      },
    ],
    openTime: "",
    roomPass: Math.floor(100000 + Math.random() * 900000),
  });

  const [errors, setErrors] = useState({
    title: "",
    openTime: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      openTime: "",
    };

    if (!questionPaper.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (!questionPaper.openTime.trim()) {
      newErrors.openTime = "Open time is required";
      isValid = false;
    }

    questionPaper.questions.forEach((question, index) => {
      if (!question.question.trim()) {
        newErrors[`question_${index}`] = "Question is required";
        isValid = false;
      }
      if (
        question.options.length < 1 ||
        question.options.some((option) => !option.trim())
      ) {
        newErrors[`options_${index}`] =
          "Each question must have at least one non-empty option";
        isValid = false;
      }
      if (question.duration < 10) {
        newErrors[`duration_${index}`] = "Duration must be at least 10 seconds";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field, value) => {
    setQuestionPaper((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questionPaper.questions];
    newQuestions[index] = {
      ...newQuestions[index],
      [field]: value,
    };
    setQuestionPaper((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newOptions = [...questionPaper.questions[qIndex].options];
    newOptions[oIndex] = value;
    handleQuestionChange(qIndex, "options", newOptions);
  };

  const addQuestion = () => {
    setQuestionPaper((prevState) => ({
      ...prevState,
      questions: [
        ...prevState.questions,
        {
          question: "",
          options: [""],
          correctOption: 1, // Default to 1 (1-based index for user convenience)
          mark: 1,
          duration: 10, // Default duration set to 10 seconds
        },
      ],
    }));
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questionPaper.questions];
    newQuestions.splice(index, 1);
    setQuestionPaper((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const addOption = (qIndex) => {
    const newOptions = [...questionPaper.questions[qIndex].options, ""];
    handleQuestionChange(qIndex, "options", newOptions);
  };

  const removeOption = (qIndex, oIndex) => {
    const newOptions = [...questionPaper.questions[qIndex].options];
    newOptions.splice(oIndex, 1);
    handleQuestionChange(qIndex, "options", newOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (validate()) {
      try {
        const response = await axios.post(
          "https://quiz-app-dummy.onrender.com/quiz/create",
          questionPaper
        );
        console.log(response.data);

        if (response.data.quiz) {
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error("Error creating quiz:", error);
        alert("An error occurred while creating the quiz. Please try again.");
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    window.location.href = "/"; // Redirect to home after successful quiz creation
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "80%", md: "45%" },
        margin: "auto",
        marginBottom: 10,
        padding: 2,
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom:"15px" }}>
          <IconButton onClick={handleBack} sx={{ marginRight: "auto" }}>
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h5"
            fontWeight={600}
            textAlign="center"
            sx={{ flexGrow: 1 }}
          >
            Create Quiz
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              value={questionPaper.title}
              onChange={(e) => handleChange("title", e.target.value)}
              fullWidth
              error={!!errors.title}
              helperText={errors.title}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Open Time"
              type="datetime-local"
              value={questionPaper.openTime}
              onChange={(e) => handleChange("openTime", e.target.value)}
              fullWidth
              error={!!errors.openTime}
              helperText={errors.openTime}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </CardContent>

      {questionPaper.questions.map((question, qIndex) => (
        <Card key={qIndex} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Tooltip title={`Remove Question ${qIndex + 1}`}>
                  <IconButton
                    onClick={() => removeQuestion(qIndex)}
                    sx={{ float: "right" }}
                    color="error"
                  >
                    <RemoveCircleRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={12} display={"flex"}>
                <TextField
                  label={`Question ${qIndex + 1}`}
                  value={question.question}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "question", e.target.value)
                  }
                  fullWidth
                  error={!!errors[`question_${qIndex}`]}
                  helperText={errors[`question_${qIndex}`]}
                  required
                />
              </Grid>
              {question.options.map((option, oIndex) => (
                <Grid item xs={12} key={oIndex} display={"flex"}>
                  <TextField
                    label={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    fullWidth
                    required
                  />
                  <IconButton onClick={() => removeOption(qIndex, oIndex)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Grid>
              ))}
              <Grid item xs={12}>
                <center>
                  <Tooltip title="Add Option" placement="right-end">
                    <IconButton
                      variant="contained"
                      onClick={() => addOption(qIndex)}
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
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Correct Option"
                  type="number"
                  value={question.correctOption}
                  onChange={(e) =>
                    handleQuestionChange(
                      qIndex,
                      "correctOption",
                      e.target.value
                    )
                  }
                  fullWidth
                  InputProps={{
                    inputProps: { min: 1, max: question.options.length },
                  }}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Marks"
                  type="number"
                  value={question.mark}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "mark", e.target.value)
                  }
                  fullWidth
                  InputProps={{ inputProps: { min: 1 } }}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Duration (seconds)"
                  type="number"
                  value={question.duration}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "duration", e.target.value)
                  }
                  fullWidth
                  InputProps={{ inputProps: { min: 10 } }}
                  error={!!errors[`duration_${qIndex}`]}
                  helperText={errors[`duration_${qIndex}`]}
                  required
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
      <center>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={addQuestion}
          sx={{ marginTop: 2, marginBottom: 2 }}
        >
          Add Question
        </Button>
      </center>
      <center>
        <Button
          type="submit"
          variant="contained"
          color="success"
          onClick={handleSubmit}
        >
          Create Quiz
        </Button>
      </center>

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <RoomPassKeyCopyModal
          roomPass={questionPaper.roomPass}
          handleClose={handleModalClose}
        />
      </Modal>
    </Card>
  );
};

export default Quiz_QP_Create;
