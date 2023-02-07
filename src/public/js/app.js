const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");

let myStream;
let muted = false;
let cameraOff = false;

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    console.log(myStream);
    myFace.srcObject = myStream;
  } catch (e) {
    console.log(e);
  }
}
getMedia();

function handleMuteClick() {
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "mute";
    muted = false;
  }
}

function handleCameraClick() {
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);

// const welcome = document.querySelector("#welcome");
// const room = document.querySelector("#room");
// const enterRoomForm = welcome.querySelector("#enterRoom");
// const nicknameForm = welcome.querySelector("#name");
// const h3 = room.querySelector("h3");

// room.hidden = true;

// let roomName;

// function addMessage(message) {
//   const ul = room.querySelector("ul");
//   const li = document.createElement("li");
//   li.innerText = message;
//   ul.appendChild(li);
// }

// function handleMessageSubmit(event) {
//   event.preventDefault();
//   const input = room.querySelector("#msg input");
//   const value = input.value;
//   socket.emit("new_message", input.value, roomName, () => {
//     addMessage(`You: ${value}`);
//   });
//   input.value = "";
// }

// function handleNicknameSubmit(event) {
//   event.preventDefault();
//   const input = welcome.querySelector("#name input");
//   const value = input.value;
//   socket.emit("nickname", input.value);
//   input.value = "";
// }

// function showRoom() {
//   welcome.hidden = true;
//   room.hidden = false;
//   h3.innerText = `Room ${roomName}`;
//   const msgForm = room.querySelector("#msg");
//   msgForm.addEventListener("submit", handleMessageSubmit);
// }

// function handleRoomSubmit(event) {
//   event.preventDefault();
//   const enterRoomInput = enterRoomForm.querySelector("input");
//   socket.emit("enter_room", enterRoomInput.value, showRoom);
//   roomName = enterRoomInput.value;
//   enterRoomInput.value = "";
// }

// nicknameForm.addEventListener("submit", handleNicknameSubmit);
// enterRoomForm.addEventListener("submit", handleRoomSubmit);

// socket.on("welcome", (user, newCount) => {
//   h3.innerText = `Room ${roomName} (${newCount})`;
//   addMessage(`${user} Joined!`);
// });

// socket.on("bye", (user, newCount) => {
//   h3.innerText = `Room ${roomName} (${newCount})`;
//   addMessage(`${user} left!`);
// });

// socket.on("new_message", (msg) => {
//   addMessage(msg);
// });

// socket.on("room_change", (rooms) => {
//   const roomList = welcome.querySelector("ul");
//   roomList.innerText = "";
//   rooms.forEach((room) => {
//     const li = document.createElement("li");
//     li.innerText = room;
//     roomList.append(li);
//   });
// });

// const messageList = document.querySelector("ul");
// const nickForm = document.querySelector("#nick");
// const messageForm = document.querySelector("#message");
// const socket = new WebSocket(`ws://${window.location.host}`);
// function makeMessage(type, payload) {
//   const msg = { type, payload };
//   return JSON.stringify(msg);
// }
// function handleOpen() {
//   console.log("Connected to Server ✅");
// }
// socket.addEventListener("open", handleOpen);
// socket.addEventListener("message", (message) => {
//   const li = document.createElement("li");
//   li.innerText = `you : ${message.data}`;
//   messageList.append(li);
// });
// socket.addEventListener("close", () => {
//   console.log("Disconnected from Server ❌");
// });
// function handleSubmit(event) {
//   event.preventDefault();
//   const input = messageForm.querySelector("input");
//   socket.send(makeMessage("new_message", input.value));
//   input.value = "";
// }
// function handleNickSubmit(event) {
//   event.preventDefault();
//   const input = nickForm.querySelector("input");
//   socket.send(makeMessage("nickname", input.value));
//   input.value = "";
// }

// messageForm.addEventListener("submit", handleSubmit);
// nickForm.addEventListener("submit", handleNickSubmit);
