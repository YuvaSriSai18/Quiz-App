import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import React from "react";

export default function QuestionCard({
  question,
  questionNumber,
  handleResponseChange,
}) {
  const handleOptionChange = (event) => {
    handleResponseChange(questionNumber - 1, event.target.value);
  };

  return (
    <Box
      sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "10px" }}
    >
      <Box
        sx={{
          border: "2px solid #b8b4b4",
          padding: "10px",
          borderRadius: "12px",
        }}
      >
        <Box
          sx={{
            border: "2px solid #b8b4b4",
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
            border: "2px solid #b8b4b4",
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
      </Box>
    </Box>
  );
}
