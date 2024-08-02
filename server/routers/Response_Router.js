const express = require("express");
const router = express.Router();
const Responses = require("../models/Responses");

// Post a response
router.post("/submit", async (req, res) => {
  const { QuizId, StudentRoll, StudentEmail, answers, StudentName } = req.body;

  try {
    // Validate request data
    if (!QuizId || !StudentRoll || !StudentEmail || !Array.isArray(answers)) {
      return res.status(400).json({ msg: "Invalid request data" });
    }

    // Find the quiz responses entry by QuizId
    let quizResponses = await Responses.findOne({ quizId: QuizId });

    if (!quizResponses) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    // Find or create the student's response
    let studentResponse = quizResponses.responses.find(
      (response) =>
        response.studentRoll === StudentRoll &&
        response.studentMail === StudentEmail
    );

    if (!studentResponse) {
      studentResponse = {
        studentMail: StudentEmail,
        studentName: StudentName || "",
        studentRoll: StudentRoll,
        answersGivenByUser: [...answers],
        createdAt: Date.now(),
      };
      quizResponses.responses.push(studentResponse);
    }

    // Update or add new answers
    answers.forEach((answer) => {
      const existingAnswerIndex = studentResponse.answersGivenByUser.findIndex(
        (ans) => ans.questionNumber === answer.questionNumber
      );

      if (existingAnswerIndex > -1) {
        studentResponse.answersGivenByUser[existingAnswerIndex] = {
          questionNumber: answer.questionNumber,
          givenAnswer: Number(answer.givenAnswer), // Ensure givenAnswer is a number
        };
      } else {
        studentResponse.answersGivenByUser.push({
          questionNumber: answer.questionNumber,
          givenAnswer: Number(answer.givenAnswer), // Ensure givenAnswer is a number
        });
      }
    });

    await quizResponses.save();
    res.json(quizResponses);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send("Server error");
  }
});

module.exports = router;
