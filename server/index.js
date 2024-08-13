const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./controllers/authentication/authentication");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN_URI,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: process.env.ORIGIN_URI,
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(express.json());

// Mongoose Connect
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo DB connected"))
  .catch((err) => {
    console.log(`Error Occurred : ${err}`);
  });

// Setup Session
app.use(
  session({
    secret: "75692834uiwhfjdbgiasdjn9384iuyr92348fherisgh458",
    resave: false,
    saveUninitialized: true,
  })
);

// Setup Passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send(`Hello to server !! 😊`);
});

// Initialize Google Login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.ORIGIN_URI}/dashboard`,
    failureRedirect: `${process.env.ORIGIN_URI}/failure`,
  })
);

app.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({ authenticated: true, user: req.user });
  } else {
    res.status(401).json({ authenticated: false, message: "Not Authorized" });
  }
});

app.get("/logout", (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.ORIGIN_URI);
  });
});

// Socket.IO implementation
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (roomNumber) => {
    socket.join(roomNumber);
    console.log(`User ${socket.id} joined room ${roomNumber}`);
  });

  socket.on("leave_room", (roomNumber) => {
    socket.leave(roomNumber);
    console.log(`User ${socket.id} left room ${roomNumber}`);
  });

  socket.on("send_message", (data) => {
    console.log(
      `Message from ${socket.id} in room ${data.room}: ${data.message}`
    );
    socket.to(data.room).emit("received_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

// Quiz Router
const QuizRouter = require("./routers/Quiz");
app.use("/quiz", QuizRouter);

// Response Router
const responseRouter = require("./routers/Response_Router")(io);
app.use("/response", responseRouter);

// LeaderBoard Router
const LeaderBoardRouter = require("./routers/LeaderBoard");
app.use("/leaderboard", LeaderBoardRouter);

// Join Room Router
const JoinRoomRouter = require("./routers/JoinRoom");
app.use("/room", JoinRoomRouter);

const userRouter = require("./routers/Auth");
app.use("/profiledata", userRouter);

// Start the server with Socket.IO
server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
