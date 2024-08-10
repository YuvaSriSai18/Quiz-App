const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN_URI,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

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

server.listen(8080, () => {
  console.log(`Server is running on port 8080 in socket`);
});

// Export the `io` instance
module.exports = { io };
