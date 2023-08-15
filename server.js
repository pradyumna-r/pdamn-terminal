const http = require("http");
require("dotenv").config();
const express = require("express");
const ptyProcess = require("./app/controllers/ptyTerminal");
// console.log(ptyProcess);
const cors = require("cors");
const app = express();
const WebSocket = require("ws");
const server = http.createServer(app);
const port = process.env.PORT || 30001;
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
server.listen(port, function () {
  console.log("Server running on port", port);
});
