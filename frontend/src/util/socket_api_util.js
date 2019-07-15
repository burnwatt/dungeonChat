import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000");

// function onReceived(callback) {
//   socket.on("received", () => callback())
// }

function joinNewRoom(room) {
  socket.emit("room", room);
};

function newMessage() {
  socket.emit("newMessage");
}


export {
  newMessage,
  joinNewRoom
}