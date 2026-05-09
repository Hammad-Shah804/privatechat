const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin:"*"
  }
});

/* Pages */

app.get("/admin",(req,res)=>{
  res.sendFile(__dirname + "/admin.html");
});

app.get("/user",(req,res)=>{
  res.sendFile(__dirname + "/user.html");
});

/* Socket */

io.on("connection",(socket)=>{

  console.log("User Connected");

  /* Admin Join */

  socket.on("admin-join",()=>{

    socket.join("admin-room");

    console.log("Admin Joined");

  });

  /* User Join */

  socket.on("user-join",()=>{

    socket.join("user-room");

    console.log("User Joined");

  });

  /* Admin Message */

  socket.on("admin-message",(msg)=>{

    io.to("user-room").emit("receive-message",{
      sender:"Admin",
      text:msg
    });

  });

  /* User Message */

  socket.on("user-message",(msg)=>{

    io.to("admin-room").emit("receive-message",{
      sender:"User",
      text:msg
    });

  });

});

/* Server */

server.listen(8080,"0.0.0.0",()=>{

  console.log("Server Running On 8080");

});
