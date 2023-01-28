import http from "http";
// import WebSocket from "ws";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));
const handleListen = () => console.log(`Listening on http://localhost:3000`);
const server = http.createServer(app);
const io = SocketIO(server);

io.on("connection", (socket) => {
  socket.onAny((event) => console.log(`Socket Event : ${event}`)); // 미들웨어
  socket.on("enter_room", (roomName, done) => {
    console.log(socket.rooms);
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome");
  });

  socket.on("disconnecting", () => {
    console.log(socket.rooms);
    socket.rooms.forEach((room) => socket.to(room).emit("bye"));
  });
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", msg);
    done();
  });
});

// const wss = new WebSocket.Server({ server });
// function onSocketClose() {
//   console.log("Disconnected from the Browser ❌");
// }
// const sockets = [];

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anonymous";
//   console.log("Connected to Browser ✅");
//   socket.on("close", onSocketClose);
//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname}: ${message.payload}`)
//         );
//       case "nickname":
//         socket["nickname"] = message.payload;
//     }
//   });
// });

server.listen(3000, handleListen);
