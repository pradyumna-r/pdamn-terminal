const http = require("http");
const express = require("express");
const ptyProcess = require("./app/controllers/ptyTerminal");
// console.log(ptyProcess);
const cors = require("cors");
const app = express();
const WebSocket = require("ws");
const server = http.createServer(app);
app.use(cors());
const wss = new WebSocket.Server({ server });

wss.on("connection", function (ws) {
  ptyProcess.onData((data) => {
    console.log(data);
    ws.send(data);
  });
  ws.on("message", (data) => {
    // console.log(data)
    // ptyProcess.write(data + "\r");
    ptyProcess.write(data);
  });
  console.log("new connection");
});
server.listen(8080, function () {
  console.log("Server running");
});
