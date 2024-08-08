const express = require("express");
const router = express.Router();
const LeaderBoard = require("../models/LeaderBoard");

router.get("/", async (req, res) => {
  try {
    const leaderBoard_Users = await LeaderBoard.find().sort({ points: -1 });
    // Add ranking based on sorted points
    const rankedUsers = leaderBoard_Users.map((user, index) => ({
      ...user._doc,
      rank: index + 1, // Rank starts from 1
    }));

    res.json(rankedUsers);
  } catch (error) {
    console.log(`Error occurred in getting leaderBoard users ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:userId", async (req, res) => {
  const rollNo = req.params.userId;

  try {
    // Fetch all users and sort them by points
    const leaderBoard_Users = await LeaderBoard.find().sort({ points: -1 });

    // Find the rank of the specific user
    const rankedUsers = leaderBoard_Users.map((user, index) => ({
      ...user._doc,
      rank: index + 1, // Rank starts from 1
    }));

    // Find the specific user from the ranked list
    const leaderBoardUser = rankedUsers.find((user) => user.rollNo === rollNo);

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
