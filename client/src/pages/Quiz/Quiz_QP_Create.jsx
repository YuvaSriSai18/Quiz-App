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
} from "@mui/material";
import { Add } from "@mui/icons-material";
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
        correctOption: 1,
        mark: 1,
      },
    ],
    openTime: "",
    duration: "",
    roomPass: Math.floor(100000 + Math.random() * 900000),
  });

  const [errors, setErrors] = useState({
    title: "",
    openTime: "",
    duration: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      openTime: "",
      duration: "",
    };

    if (!questionPaper.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (!questionPaper.openTime.trim()) {
      newErrors.openTime = "Open time is required";
      isValid = false;
    }

    if (!questionPaper.duration.trim()) {
      newErrors.duration = "Duration is required";
      isValid = false;
    } else if (questionPaper.duration <= 0) {
      newErrors.duration = "Duration must be greater than 0";
      isValid = false;
    }

    questionPaper.questions.forEach((question) => {
      if (!question.question.trim() || question.options.length < 1) {
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
          correctOption: 1,
          mark: 1,
        },
      ],
    }));
  };

  const removeQuestion = (index) => {
    if (questionPaper.questions.length > 1) {
      const newQuestions = questionPaper.questions.filter((_, i) => i !== index);
      setQuestionPaper((prevState) => ({
        ...prevState,
        questions: newQuestions,
      }));
    }
  };

  const addOption = (qIndex) => {
    const newOptions = [...questionPaper.questions[qIndex].options, ""];
    handleQuestionChange(qIndex, "options", newOptions);
  };

  const removeOption = (qIndex, oIndex) => {
    const currentOptions = questionPaper.questions[qIndex].options;
    if (currentOptions.length > 1) {
      const newOptions = currentOptions.filter((_, i) => i !== oIndex);
      handleQuestionChange(qIndex, "options", newOptions);
    }
  };

  const createQuiz = async () => {
    try {
      await axios.post("http://localhost:5500/quiz/create", questionPaper);
      window.alert("Quiz is Created");
      setIsModalOpen(true);
    } catch (err) {
      window.alert("Error in creating Quiz");
      console.error(err);
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log(questionPaper);
      createQuiz();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.href = "/";
  };

  return (
    <center>
      <Card
        sx={{
          padding: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: {
            xs: "100%",
            md: "50%",
          },
          height: "80%",
          background: "rgb(255, 255, 255)",
          borderRadius: "1rem",
          margin: "50px auto",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          transition: "all ease-in-out 0.3s",
          "&:hover": {
            backgroundColor: "#fdfdfd",
            boxShadow:
              "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
          },
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Create Quiz
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Quiz Title"
                variant="outlined"
                fullWidth
                value={questionPaper.title}
                onChange={(e) => handleChange("title", e.target.value)}
                margin="normal"
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Open Time"
                type="datetime-local"
                variant="outlined"
                fullWidth
                value={questionPaper.openTime}
                onChange={(e) => handleChange("openTime", e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                error={!!errors.openTime}
                helperText={errors.openTime}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Duration"
                type="number"
                variant="outlined"
                fullWidth
                value={questionPaper.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                margin="normal"
                InputProps={{ inputProps: { min: 1 } }}
                error={!!errors.duration}
                helperText={errors.duration}
              />
            </Grid>
            {questionPaper.questions.map((question, qIndex) => (
              <Grid item xs={12} key={qIndex}>
                <Card sx={{ margin: "20px 0" }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Tooltip title="Remove Question">
                          <IconButton
                            variant="outlined"
                            color="error"
                            onClick={() => removeQuestion(qIndex)}
                            sx={{ float: "right", margin: 0, fontSize: "18px" }}
                            disabled={questionPaper.questions.length <= 1}
                          >
                            <RemoveCircleRoundedIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label={`Question ${qIndex + 1}`}
                          variant="outlined"
                          fullWidth
                          value={question.question}
                          onChange={(e) =>
                            handleQuestionChange(
                              qIndex,
                              "question",
                              e.target.value
                            )
                          }
                          margin="normal"
                        />
                      </Grid>
                      {question.options.map((option, oIndex) => (
                        <Grid item xs={11} key={oIndex} display={"flex"}>
                          <TextField
                            label={`Option ${oIndex + 1}`}
                            variant="outlined"
                            fullWidth
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(qIndex, oIndex, e.target.value)
                            }
                            margin="normal"
                          />
                          <Tooltip title="Delete Option">
                            <IconButton
                              onClick={() => removeOption(qIndex, oIndex)}
                              disabled={question.options.length <= 1}
                              sx={{ marginLeft: "10px" }}
                            >
                              <CloseRoundedIcon />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      ))}
                      <Grid item xs={12}>
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
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Correct Option"
                          type="number"
                          variant="outlined"
                          fullWidth
                          value={question.correctOption}
                          onChange={(e) =>
                            handleQuestionChange(
                              qIndex,
                              "correctOption",
                              parseInt(e.target.value) || 1
                            )
                          }
                          margin="normal"
                          InputProps={{ inputProps: { min: 1 } }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Mark"
                          type="number"
                          variant="outlined"
                          fullWidth
                          value={question.mark}
                          onChange={(e) =>
                            handleQuestionChange(
                              qIndex,
                              "mark",
                              parseInt(e.target.value) || 1
                            )
                          }
                          margin="normal"
                          InputProps={{ inputProps: { min: 1 } }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={addQuestion}
                startIcon={<Add />}
              >
                Add Question
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Create Quiz
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <RoomPassKeyCopyModal
          roomPass={questionPaper.roomPass}
          onClose={handleCloseModal}
        />
      </Modal>
    </center>
  );
};

export default Quiz_QP_Create;
