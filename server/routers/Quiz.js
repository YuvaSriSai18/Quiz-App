const express = require("express");
const router = express.Router();
const QuizPaper = require("../models/QuestionPaper");

// Get all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await QuizPaper.find();
    res.json(quizzes);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send("Server error");
  }
});

// Get a single quiz by ID
router.get("/:id", async (req, res) => {
  try {
    const quiz = await QuizPaper.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send("Server error");
  }
});

// Create a quiz
router.post("/create", async (req, res) => {
  const {
    QuizId,
    CreatorMail,
    title,
    noOfQuestions,
    questions,
    duration,
    visibility,
  } = req.body;

  try {
    let quiz = new QuizPaper({
      QuizId,
      CreatorMail,
      title,
      noOfQuestions,
      questions,
      duration,
      visibility,
    });

    await quiz.save();
    res.json(quiz);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send("Server error");
  }
});

// Update a quiz
router.put("/:id", async (req, res) => {
  try {
    const { CreatorMail, title, noOfQuestions, questions, durationOfQuiz } =
      req.body;

    const quiz = await QuizPaper.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    quiz.CreatorMail = CreatorMail || quiz.CreatorMail;
    quiz.title = title || quiz.title;
    quiz.noOfQuestions = noOfQuestions || quiz.noOfQuestions;
    quiz.questions = questions || quiz.questions;
    quiz.durationOfQuiz = durationOfQuiz || quiz.durationOfQuiz;

    const updatedQuiz = await quiz.save();
    res.json(updatedQuiz);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send("Server error");
  }
});

// Delete a quiz
router.delete("/:QuizId", async (req, res) => {
  try {
    // console.log(req.params.QuizId)
    const quiz = await QuizPaper.findOne({ QuizId: req.params.QuizId });
    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    await quiz.deleteOne();
    res.json({ msg: "Quiz removed" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

module.exports = router;
