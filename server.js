const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

/* Pages */
app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/admin.html");
});

app.get("/user", (req, res) => {
  res.sendFile(__dirname + "/user.html");
});

/* Socket Logic */
io.on("connection", (socket) => {

  console.log("User connected");

  // Admin join
  socket.on("admin-join", () => {
    socket.join("admin-room");
  });

  // User join
  socket.on("user-join", () => {
    socket.join("user-room");
  });

  // Admin message → User
  socket.on("admin-message", (msg) => {
    io.to("user-room").emit("message", {
      sender: "Admin",
      text: msg
    });
  });

  // User message → Admin
  socket.on("user-message", (msg) => {
    io.to("admin-room").emit("message", {
      sender: "User",
      text: msg
    });
  });

});

server.listen(8080, "0.0.0.0", () => {
  console.log("Server running on port 8080");
});
