# Socket.io

1. Provides bi-directional communication between server and client.

### Socket.IO is composed of two parts

1. A server that integrates with (or mounts on) the Node.JS HTTP Server (the socket.io package)
2. A client library that loads on the browser side (the socket.io-client package)

```
Client A           Server                 Client B
   |                  |                       |
   | -- new-user -->  |                       |
   |                  | -- user-connected --> |
   |                  |                       |
   | -- send-chat --> |                       |
   |                  | -- chat-message -->   |
   |                  |                       |
   |                  | <- user-disconnected -|
   |                  |                       |
```

### 🔹 How it All Works Together

User Joins:

The client emits a new-user event.
The server stores the user and broadcasts a user-connected event to others.
User Sends a Message:

The client emits a send-chat-message event.
The server broadcasts the message with a chat-message event to all other users.
User Disconnects:

When a user leaves, the server emits a user-disconnected event to notify others.

The <script defer src="http://localhost:3000/socket.io/socket.io.js"></script> tag in the HTML file is used to load the Socket.IO client library from the server running on http://localhost:3000.

### Why it's needed:

This script is crucial because it allows your front-end (the client) to communicate with your Socket.IO server. Without it, your client-side JavaScript won't be able to establish a connection to the server or send/receive real-time events (such as chat messages or user connections).
So this script enables the client-side communication with the server-side Socket.IO functionality.

If your server is hosted on a domain like jvn.com (instead of running locally on localhost:3000), you need to adjust the script source to point to the correct URL where your server is serving the Socket.IO client script.

For example, if your Socket.IO server is hosted at https://jvn.com, you would change the script tag to:

<script defer src="https://jvn.com/socket.io/socket.io.js"></script>
