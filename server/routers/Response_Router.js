const express = require("express");
const router = express.Router();
const Responses = require("../models/Responses");
const LeaderBoard = require("../models/LeaderBoard");
const QuizPaper = require("../models/QuestionPaper");

// Post a response
router.post("/submit", async (req, res) => {
  const { QuizId, StudentRoll, StudentEmail, answers, StudentName } = req.body;

  try {
    // Validate request data
    if (!QuizId || !StudentRoll || !StudentEmail || !Array.isArray(answers)) {
      return res.status(400).json({ msg: "Invalid request data" });
    }

    // Find or create the quiz responses entry by QuizId
    let quizResponses = await Responses.findOne({ quizId: QuizId });
    if (!quizResponses) {
      quizResponses = new Responses({ quizId: QuizId, responses: [] });
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
    } else {
      // Update or add new answers
      answers.forEach((answer) => {
        const existingAnswerIndex =
          studentResponse.answersGivenByUser.findIndex(
            (ans) => ans.questionNumber === answer.questionNumber
          );
        if (existingAnswerIndex > -1) {
          studentResponse.answersGivenByUser[existingAnswerIndex] = {
            questionNumber: answer.questionNumber,
            givenAnswer: Number(answer.givenAnswer),
          };
        } else {
          studentResponse.answersGivenByUser.push({
            questionNumber: answer.questionNumber,
            givenAnswer: Number(answer.givenAnswer),
          });
        }
      });
    }

    // Fetch the quiz details
    const quiz = await QuizPaper.findOne({ QuizId });
    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    // Initialize variables to calculate points and max score
    let totalPoints = 0;
    let maxScore = 0;
    const optedOptions = [];

    // Check each answer
    answers.forEach((answer) => {
      const questionNumberZeroBased = answer.questionNumber - 1;
      const question = quiz.questions[questionNumberZeroBased];
      if (question) {
        maxScore += question.mark;
        const isCorrect = question.correctOption === answer.givenAnswer;
        if (isCorrect) {
          totalPoints += question.mark;
        }
        optedOptions.push({
          questionNumber: answer.questionNumber,
          givenAnswer: answer.givenAnswer,
        });
      }
    });

    // Update the student's response with calculated points
    studentResponse.pointsEarned = totalPoints;
    await quizResponses.save();

    // Find or create the student's LeaderBoard entry
    let leaderBoardEntry = await LeaderBoard.findOne({ email: StudentEmail });
    if (!leaderBoardEntry) {
      leaderBoardEntry = new LeaderBoard({
        email: StudentEmail,
        rollNo: StudentRoll,
        name: StudentName || "",
        points: 0,
        MaximumScoreForQuizzes: 0,
        attemptedQuizzes: [],
      });
    }

    // Update LeaderBoard entry with quiz data
    let quizEntry = leaderBoardEntry.attemptedQuizzes.find(
      (q) => q.QuizId === QuizId
    );
    if (quizEntry) {
      optedOptions.forEach((newOption) => {
        const existingOption = quizEntry.optedOptions.find(
          (o) => o.questionNumber === newOption.questionNumber
        );
        if (existingOption) {
          existingOption.givenAnswer = newOption.givenAnswer;
        } else {
          quizEntry.optedOptions.push(newOption);
        }
      });
      quizEntry.pointsEarned = totalPoints;
      quizEntry.QuizMaximumScore = maxScore;
    } else {
      leaderBoardEntry.attemptedQuizzes.push({
        QuizId,
        quizTitle: quiz.title,
        optedOptions,
        pointsEarned: totalPoints,
        QuizMaximumScore: maxScore,
      });
    }

    // Update overall points and maximum score
    leaderBoardEntry.points = leaderBoardEntry.attemptedQuizzes.reduce(
      (acc, quiz) => acc + quiz.pointsEarned,
      0
    );
    leaderBoardEntry.MaximumScoreForQuizzes =
      leaderBoardEntry.attemptedQuizzes.reduce(
        (acc, quiz) => acc + quiz.QuizMaximumScore,
        0
      );
    leaderBoardEntry.totalQuizzesAttempted =
      leaderBoardEntry.attemptedQuizzes.length;

    // Calculate success rate
    leaderBoardEntry.successRate = (
      (leaderBoardEntry.points / leaderBoardEntry.MaximumScoreForQuizzes) *
      100
    ).toFixed(2);

    await leaderBoardEntry.save();

    res.json({ quizResponses, leaderBoardEntry });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send("Server error");
  }
});

module.exports = router;
