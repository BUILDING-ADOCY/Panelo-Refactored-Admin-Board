// src/app/api/socket.ts
import { Server as HttpServer } from "http";
import { Server } from "socket.io";

let io: Server | null = null;

export function initSocket(server: HttpServer) {
  if (!io) {
    io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    console.log("WebSocket Server Initialized");

    io.on("connection", (socket) => {
      console.log("⚡ A user connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }
  return io;
}

export function getSocketInstance() {
  if (!io) {
    throw new Error("Socket.io has not been initialized!");
  }
  return io;
}