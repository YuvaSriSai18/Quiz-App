const mongoose = require("mongoose");
const { Schema } = mongoose;

const LeaderBoardSchema = new Schema(
  {
    email: { type: String, required: true },
    rollNo: { type: String, required: true },
    name: { type: String, required: true },
    successRate: { type: Number, default: 0 },
    attemptedQuizzes: [
      {
        QuizId: { type: String, required: true },
        quizTitle: { type: String, required: true },
        optedOptions: [
          {
            questionNumber: { type: Number, required: true }, // without indexed, starts from 1
            givenAnswer: { type: Number }, // with indexed, starts from 0
          },
        ],
        pointsEarned: { type: Number, default: 0 },
        QuizMaximumScore: { type: Number },
      },
    ],
    points: { type: Number, default: 0 },
    MaximumScoreForQuizzes: { type: Number },
    totalQuizzesAttempted: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LeaderBoard", LeaderBoardSchema);
