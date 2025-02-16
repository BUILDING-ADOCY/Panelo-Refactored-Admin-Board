// server.js
const express = require("express");
const http = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const server = http.createServer(expressApp);

  // Attach Socket.IO to our HTTP server
  const io = new Server(server, {
    cors: {
      origin: "*", // In dev, allow all. In production, specify your domain(s).
    },
  });

  // Listen for new connections
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Example custom event
    socket.on("ping_server", (data) => {
      console.log("Received from client:", data);
      // Reply back to the client
      socket.emit("pong_client", { msg: "Hello from server!" });
    });

    // Handle disconnections
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  // Let Next.js handle all other routes (including /api/...)
  expressApp.all("*", (req, res) => {
    return handle(req, res);
  });

  // Start the server
  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});