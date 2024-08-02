const mongoose = require("mongoose");
const { Schema } = mongoose;

const LeaderBoardSchema = new Schema({
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
          givenAnswer: { type: Number },  // with indexed, starts from 0
        },
      ],
      pointsEarned: { type: Number, default: 0 },
    },
  ],
  points: { type: Number, default: 0 },
  totalQuizzesAttempted: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("LeaderBoard", LeaderBoardSchema);