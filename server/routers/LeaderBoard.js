const express = require("express");
const router = express.Router();
const LeaderBoard = require("../models/LeaderBoard");

router.get("/:userId", async (req, res) => {
  const rollNo = req.params.userId;

  try {
    const leaderBoardUser = await LeaderBoard.findOne({ rollNo: rollNo });
    if (leaderBoardUser) {
      res.json(leaderBoardUser).status(200);
    } else {
      res.status(404).json({ message: "User not found in LeaderBoard" });
    }
  } catch (error) {
    console.log(`Error occurred in getting LeaderBoard user: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
