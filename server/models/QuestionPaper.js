const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctOption: { type: Number, required: true },
  mark: { type: Number, default: 1 },
});

const QuestionPaperSchema = new Schema(
  {
    QuizId: { type: String, required: true },
    CreatorMail: { type: String, required: true },
    title: { type: String, required: true },
    noOfQuestions: { type: Number },
    questions: { type: [QuestionSchema], required: true },
    duration: { type: Number, required: true },
    roomPass: { type: Number, required: true },
    openTime: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quizzes", QuestionPaperSchema);
