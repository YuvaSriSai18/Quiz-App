const express = require("express");
const router = express.Router();

const LeaderBoard = require("../models/LeaderBoard");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const userData = await User.find();
    res.json(userData);
  } catch (error) {
    console.log(`Error in fetching user data via server`);
  }
});
router.get("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email: email }); // Changed to findOne for fetching a single document
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found in DB" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/post", async (req, res) => {
  const profile = req.body;
  try {
    const email = profile.email;
    const displayName = capitalizeFirstLetterOfEachWord(
      profile.name?.split(" | ")[0] || profile.name || "Unknown Name"
    );
    const rollNo = profile.name?.split(" | ")[1] || "";
    const photoUrl = profile.picture;
    const role = assignRole(email);
    const firstName = capitalizeFirstLetterOfEachWord(
      profile?.given_name || "Unknown"
    );
    const lastName = capitalizeFirstLetterOfEachWord(
      profile?.family_name?.split(" | ")[0] || "Unknown"
    );
    const rollArray = rollNo.split("");
    const batch = rollNo ? `20${rollArray[2] + rollArray[3]}` : "";

    const user = await User.findOneAndUpdate(
      { email },
      {
        email,
        displayName,
        photoUrl,
        rollNo,
        role,
        firstName,
        lastName,
        batch,
      },
      { new: true, upsert: true }
    );

    const leaderBoardUser = await LeaderBoard.findOne({ email });
    if (!leaderBoardUser && role === 'Student') {
      await LeaderBoard.create({
        email,
        rollNo,
        name: displayName,
        successRate: 0,
        attemptedQuizzes: [],
        points: 0,
        totalQuizzesAttempted: 0,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

const assignRole = (email) => {
  const domain = email.split("@")[1];
  if (domain !== "srmap.edu.in") {
    return "Unknown";
  }
  const localPart = email.split("@")[0];
  if (localPart.includes("_")) {
    return "Student";
  } else if (localPart.includes(".")) {
    return "Faculty";
  } else {
    return "Unknown";
  }
};

function capitalizeFirstLetterOfEachWord(str) {
  if (!str) return ""; // Handle undefined or null strings
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

module.exports = router;
