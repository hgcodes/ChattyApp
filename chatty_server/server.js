const express = require("express");
const SocketServer = require("ws").Server;
const uuidV1 = require("node-uuid");

const PORT = 3001;

const server = express()
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
// Broadcasts messages to all users and the try/catch prevents the server from crashing
wss.broadcast = function broadcast(data) {
  const packet = JSON.stringify(data);
  wss.clients.forEach(function each(client) {
    try {
      client.send(packet);
    }
    catch(err) { console.error("Client left."); }
  });
};
// Parses messages to add unique ID to each message and broadcasts message depending on its type
function handleMessage(data) {
  data = JSON.parse(data);
  data.id = uuidV1()
  if (data.type === "postNotification") {
    data.type = "incomingNotification"
  } else if (data.type === "postMessage") {
    data.type = "incomingMessage"
  } else {
    data.type = "Invalid";
  }
  wss.broadcast(data);
}
// Updates number of online users based on open WebSocket connections (wss.clients.size)
function updateOnlineCount() {
  wss.broadcast({
    id: uuidV1(),
    type: "onlineUsers",
    onlineUsers: wss.clients.size
  });
}
// Updates number of online users when WebSocket connection is opened or closed
function handleConnection(client) {
  updateOnlineCount();
  client.on("message", handleMessage);
  client.on("close", () => {
    console.log("Client disconnected");
    updateOnlineCount();
  });
}

wss.on("connection", handleConnection);
