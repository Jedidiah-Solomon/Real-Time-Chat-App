const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const userListContainer = document.getElementById("user-list");

let name = prompt("What is your name?");
if (!name || name.trim() === "") {
  name = "Anonymous";
}

appendMessage("You joined");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});
socket.on("update-user-list", (users) => {
  updateUserList(users);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

function updateUserList(users) {
  userListContainer.innerHTML = "";

  users.forEach((user) => {
    const userElement = document.createElement("div");
    const timeNow = new Date();

    const formattedTime = timeNow.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });

    userElement.innerText = `${user} joined at ${formattedTime}`;
    userListContainer.append(userElement);
  });
}
