const express = require("express");
const http = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

let io;

// Getter to access the socket instance anywhere in the app
function getIoInstance() {
  if (!io) {
    throw new Error("Socket.io instance not initialized!");
  }
  return io;
}
global.getIoInstance = getIoInstance;

app.prepare().then(() => {
  const expressApp = express();
  const server = http.createServer(expressApp);

  // Initialize Socket.IO
  io = new Server(server, {
    cors: {
      origin: "*", // ✅ In prod, restrict this
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡ Socket connected:", socket.id);

    const inquiries = [
      "Exam Schedule Availability",
      "Fee Payment Deadline",
      "Holiday List",
      "Internship Openings",
      "Result Declaration",
    ];

    const peakHours = [
      "7:00 - 10:00 PM",
      "11:00 AM - 1:00 PM",
      "3:00 - 5:00 PM",
      "9:00 - 11:00 AM",
    ];

    // Simulate dashboard data every 5 seconds
    const intervalId = setInterval(() => {
      const simulatedData = {
        totalQueries: Math.floor(Math.random() * 20000),
        avgResponseTime: (Math.random() * 2 + 0.5).toFixed(2),
        activeUsers: Math.floor(Math.random() * 10000),
        resolutions: Math.floor(Math.random() * 11) * 10 + 50, // 50% - 150%
        frequentInquiry: inquiries[Math.floor(Math.random() * inquiries.length)],
        dailyPeak: peakHours[Math.floor(Math.random() * peakHours.length)],
      };

      socket.emit("dashboardUpdate", simulatedData);
    }, 5000);

    socket.on("disconnect", () => {
      console.log("💨 Socket disconnected:", socket.id);
      clearInterval(intervalId);
    });
  });

  // Let Next.js handle all other routes
  expressApp.all("*", (req, res) => handle(req, res));

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
