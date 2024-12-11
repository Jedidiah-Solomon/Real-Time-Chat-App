const socket = io("http://localhost:3000");

const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

let username = prompt("Enter your name");
const room = roomName;

socket.emit("new-user", room, username);

socket.on("chat-message", (data) => {
  const messageElement = document.createElement("div");
  messageElement.textContent = `${data.name}: ${data.message}`;
  messageContainer.append(messageElement);
});

socket.on("user-connected", (name) => {
  const messageElement = document.createElement("div");
  messageElement.textContent = `${name} connected`;
  messageContainer.append(messageElement);
});

socket.on("user-disconnected", (name) => {
  const messageElement = document.createElement("div");
  messageElement.textContent = `${name} disconnected`;
  messageContainer.append(messageElement);
});

sendButton.addEventListener("click", (event) => {
  event.preventDefault();
  const message = messageInput.value;
  socket.emit("send-chat-message", room, message);
  messageInput.value = "";
});
