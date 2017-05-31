// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


// new code start
let documentContents = '';
function broadcast() {
  for(let client of wss.clients) {
    console.log(documentContents);
    client.send(documentContents);
  }
}
//new code end

// new code start
function handleMessage(message) {
  console.log('Got a new message!');
  console.log(message);
  documentContents = message;
  broadcast(); // doesn't need doc because doc var is global
}
//new code end

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('New Connection!');

  console.log(`There are ${wss.clients.size} clients connected!`) // new line of code
  ws.on('message', (message) => {
    console.log('Received message from client:', message);
    ws.send(message);
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
