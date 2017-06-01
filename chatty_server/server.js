const express = require("express");
const SocketServer = require("ws").Server;
const uuidV1 = require("node-uuid");

const { postMessage, postNotification, usersOnline } = require('../messageTypes.js');

const PORT = 3001;

const server = express()
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  const packet = JSON.stringify(data);
  wss.clients.forEach(function each(client) {
    try {
      client.send(packet);
    }
    catch(err) { console.error("Client left."); }
  });
};

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

function updateOnlineCount() {
  wss.broadcast({
    id: uuidV1(),
    type: "onlineUsers",
    onlineUsers: wss.clients.size
  });
}

function handleConnection(client) {
  updateOnlineCount();
  client.on("message", handleMessage);
  client.on("close", () => {
    console.log("Client disconnected");
    updateOnlineCount();
  });
}

wss.on("connection", handleConnection);
