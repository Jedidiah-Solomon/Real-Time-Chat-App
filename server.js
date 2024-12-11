const dotenv = require("dotenv").config();
const {
  addUserToFirestore,
  addMessageToFirestore,
  deleteUserFromFirestore,
} = require("./utils/helper");
const io = require("socket.io")(3000);

const users = {};

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  // When a new user joins
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    console.log(`User connected: ${name} (ID: ${socket.id})`);
    socket.broadcast.emit("user-connected", name);

    // Save user to Firestore
    addUserToFirestore(name);

    io.emit("update-user-list", Object.values(users));
  });

  // When a user sends a chat message
  socket.on("send-chat-message", (message) => {
    console.log(
      `Message from ${users[socket.id]} (ID: ${socket.id}): ${message}`
    );

    // Save message to Firestore
    addMessageToFirestore(users[socket.id], message);

    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    if (users[socket.id]) {
      console.log(`User disconnected: ${users[socket.id]} (ID: ${socket.id})`);
      socket.broadcast.emit("user-disconnected", users[socket.id]);

      // Delete user from Firestore
      deleteUserFromFirestore(users[socket.id]);

      delete users[socket.id];
      io.emit("update-user-list", Object.values(users));
    } else {
      console.log(`Unknown user disconnected (ID: ${socket.id})`);
    }
  });
});
