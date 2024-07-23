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
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

const Quiz_QP_Create = () => {
  const userData = useSelector((state) => state.auth.userData); // Assuming user data is in the 'auth.userData' field
  const [questionPaper, setQuestionPaper] = useState({
    QuizId: uuidv4(),
    CreatorMail: userData?.email || "abc@gmail.com", // Optional chaining for safety
    title: "",
    noOfQuestions: 1,
    questions: [
      {
        question: "",
        options: [""],
        correctOption: 0,
        mark: 1,
      },
    ],
    openTime: "",
    duration: "",
    visibility: "openToAll", // Default value
  });

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
      noOfQuestions: prevState.noOfQuestions + 1,
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

  const removeQuestion = (index) => {
    const newQuestions = questionPaper.questions.filter((_, i) => i !== index);
    setQuestionPaper((prevState) => ({
      ...prevState,
      noOfQuestions: prevState.noOfQuestions - 1,
      questions: newQuestions,
    }));
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
      window.location.href = "/";
    } catch (err) {
      window.alert("Error in creating Quiz");
      console.error(err);
    }
  };

  const handleSubmit = () => {
    console.log(questionPaper);
    createQuiz();
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
              />
            </Grid>
            <Grid item xs={12}>
              <Box>
                <FormControl
                  component="fieldset"
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    flexDirection: { md: "row", xs: "column" },
                    textAlign: { xs: "left" },
                    color: "#000",
                    columnGap: "10px",
                  }}
                >
                  <FormLabel>
                    <Typography variant="h6" mr={2} pt={0.5}>
                      Type of Quiz
                    </Typography>
                  </FormLabel>
                  <RadioGroup
                    aria-label="visibility"
                    name="visibility"
                    value={questionPaper.visibility}
                    onChange={(e) => handleChange("visibility", e.target.value)}
                    row
                  >
                    <FormControlLabel
                      value="byJoiningRoom"
                      control={<Radio />}
                      label="By joining Room"
                    />
                    <FormControlLabel
                      value="openToAll"
                      control={<Radio />}
                      label="Open to All"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
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
                              parseInt(e.target.value) || 0 // Ensure the value is a number
                            )
                          }
                          margin="normal"
                          InputProps={{ inputProps: { min: 0 } }}
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
                              parseInt(e.target.value) || 1 // Ensure the value is a number
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
    </center>
  );
};

export default Quiz_QP_Create;
