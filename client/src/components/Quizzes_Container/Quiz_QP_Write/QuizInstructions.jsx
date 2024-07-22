import React from "react";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
export default function QuizInstructions() {
  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        border: "1px solid #eeeeee",
        borderRadius: "12px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Online Quiz Instructions
      </Typography>
      <Typography variant="body1" paragraph>
        1. <strong>Stay on the Quiz Page:</strong> Do not navigate away from the
        quiz page. Leaving the quiz page may result in automatic submission or
        disqualification.
      </Typography>
      <Typography variant="body1" paragraph>
        2. <strong>Time Management:</strong> The quiz is timed. You have a total
        of <strong>30 minutes</strong> to complete all the questions. Keep an
        eye on the timer.
      </Typography>
      <Typography variant="body1" paragraph>
        3. <strong>Answer Submission:</strong> Ensure that you select an answer
        for each question. Unanswered questions will not be marked.
      </Typography>
      <Typography variant="body1" paragraph>
        4. <strong>Single Attempt:</strong> You are allowed only one attempt for
        this quiz. Make sure to review your answers before submitting.
      </Typography>
      <Typography variant="body1" paragraph>
        5. <strong>No Back Navigation:</strong> Avoid using the browser's back
        button. This can disrupt the quiz session and may result in loss of
        data.
      </Typography>
      <Typography variant="body1" paragraph>
        6. <strong>Stable Internet Connection:</strong> Ensure you have a stable
        internet connection throughout the quiz to avoid disconnections.
      </Typography>
      <Typography variant="body1" paragraph>
        7. <strong>No External Help:</strong> Do not use any external help such
        as books, notes, or internet searches. This quiz is to be completed
        independently.
      </Typography>
      <Typography variant="body1" paragraph>
        8. <strong>Environment:</strong> Find a quiet place to take the quiz
        without distractions.
      </Typography>
      <Typography variant="body1" paragraph>
        9. <strong>Technical Issues:</strong> If you encounter any technical
        issues, contact the support team immediately at [support@example.com] or
        call [support phone number].
      </Typography>
      <Typography variant="body1" paragraph>
        10. <strong>Submit on Time:</strong> Make sure to submit your answers
        before the time runs out. Late submissions will not be accepted.
      </Typography>

      <Box display={"flex"} justifyContent={"space-between"}>
        <NavLink onClick={window.history.back()}>
          <Button variant="contained">Back</Button>
        </NavLink>
        <NavLink>
          <Button variant="contained">Next</Button>
        </NavLink>
      </Box>
    </Box>
  );
}
