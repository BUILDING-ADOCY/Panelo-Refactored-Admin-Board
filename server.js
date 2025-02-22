// server.js
const express = require("express");
const http = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

let io;

function getIoInstance() {
  if (!io) {
    throw new Error("Socket.io instance not initialized!");
  }
  return io;
}
global.getIoInstance = getIoInstance; // Attach the getter to global

app.prepare().then(() => {
  const expressApp = express();
  const server = http.createServer(expressApp);

  // Initialize Socket.IO
  io = new Server(server, {
    cors: {
      origin: "*", // In production, set your allowed domains here
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  // Let Next.js handle all other routes
  expressApp.all("*", (req, res) => handle(req, res));

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});