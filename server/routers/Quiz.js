const express = require("express");
const router = express.Router();
const QuizPaper = require("../models/QuestionPaper");
const Responses = require("../models/Responses");

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

// Get a single quiz by QuizId
router.get("/:QuizId", async (req, res) => {
  try {
    const quiz = await QuizPaper.findOne({ QuizId: req.params.QuizId });
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
  const { QuizId, CreatorMail, title, questions, roomPass, openTime } =
    req.body;

  try {
    const formattedQuestions = questions.map((question) => ({
      ...question,
      correctOption: question.correctOption - 1, // Convert to zero-based index
    }));

    let quiz = new QuizPaper({
      QuizId,
      CreatorMail,
      title,
      noOfQuestions: questions.length,
      questions: formattedQuestions,
      roomPass,
      openTime,
    });

    const correctAnswers = formattedQuestions.map((question, index) => ({
      questionNumber: index + 1,
      correctOptionIndex: question.correctOption,
    }));

    let responses = new Responses({
      quizId: QuizId,
      correctAnswers,
    });

    await quiz.save();
    await responses.save();

    res.json({ quiz, responses });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send("Server error");
  }
});

// Update a quiz by QuizId
router.put("/:QuizId", async (req, res) => {
  try {
    const { title, questions, duration } = req.body;

    const quiz = await QuizPaper.findOne({ QuizId: req.params.QuizId });
    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    quiz.title = title || quiz.title;
    if (questions) {
      const formattedQuestions = questions.map((question) => ({
        ...question,
        correctOption: question.correctOption - 1, // Convert to zero-based index
      }));

      quiz.questions = formattedQuestions;
      quiz.noOfQuestions = formattedQuestions.length;

      const correctAnswers = formattedQuestions.map((question, index) => ({
        questionNumber: index + 1,
        correctOptionIndex: question.correctOption,
      }));

      await Responses.findOneAndUpdate(
        { quizId: req.params.QuizId },
        { correctAnswers }
      );
    }
    quiz.duration = duration || quiz.duration;

    const updatedQuiz = await quiz.save();
    res.json(updatedQuiz);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send("Server error");
  }
});

// Delete a quiz by QuizId
router.delete("/:QuizId", async (req, res) => {
  try {
    const quiz = await QuizPaper.findOne({ QuizId: req.params.QuizId });
    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    await quiz.deleteOne();
    await Responses.deleteOne({ quizId: req.params.QuizId });

    res.json({ msg: "Quiz removed" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

module.exports = router;
