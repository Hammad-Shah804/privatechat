const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(express.static(__dirname));

io.on("connection", (socket) => {

  console.log("User Connected");

  socket.on("message", (msg) => {

    socket.broadcast.emit("message", msg);

  });

});

server.listen(3000, () => {

  console.log("Server Running");

});
