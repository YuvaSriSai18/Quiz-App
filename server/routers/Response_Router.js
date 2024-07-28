const express = require("express");
const router = express.Router();
const Responses = require("../models/Responses");

// Post a response
router.post("/submit", async (req, res) => {
  const { QuizId, StudentRoll, answers } = req.body;

  try {
    // Find the quiz responses entry by QuizId
    let quizResponses = await Responses.findOne({ quizId: QuizId });

    if (!quizResponses) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    // Check if the student's response already exists
    let studentResponse = quizResponses.responses.find(
      (response) => response.studentRoll === StudentRoll
    );

    if (studentResponse) {
      // Send alert message if response already exists
      return res.status(400).json({ msg: "Quiz Response already submitted" });
    }

    // Create a new student response
    quizResponses.responses.push({
      studentRoll: StudentRoll,
      answersGivenByUser: answers,
      createdAt: Date.now(),
    });

    // Save the updated responses
    await quizResponses.save();

    res.json(quizResponses);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send("Server error");
  }
});

module.exports = router;
