const express = require("express");
const router = express.Router();
const Quiz = require("../models/QuestionPaper"); // Adjust the path as needed

// Endpoint to check room number
router.get("/:roomNumber", async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const quiz = await Quiz.findOne({ roomPass: roomNumber });
    if (quiz) {
      res.status(200).json({ exists: true, quiz });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
