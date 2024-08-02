const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResponsesSchema = new Schema({
  quizId: { type: String, required: true },
  correctAnswers: [
    {
      questionNumber: { type: Number, required: true },
      correctOptionIndex: { type: Number, required: true },
    },
  ],
  responses: [
    {
      studentMail: { type: String },
      studentName: { type: String },
      studentRoll: { type: String, required: true },
      answersGivenByUser: [
        {
          questionNumber: { type: Number, required: true },
          givenAnswer: { type: Number, required: true },
        },
      ],
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Responses", ResponsesSchema);
