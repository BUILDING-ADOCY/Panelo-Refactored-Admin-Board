"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function SocketTestPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [serverMsg, setServerMsg] = useState("");

  useEffect(() => {
    // Connect to the server on the same port (http://localhost:3000)
    const newSocket = io("http://localhost:3000", {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to server:", newSocket.id);
    });

    // Listen for "pong_client" event
    newSocket.on("pong_client", (data) => {
      console.log("Received from server:", data);
      setServerMsg(data.msg);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  function pingServer() {
    if (socket) {
      socket.emit("ping_server", { msg: "Hello from client!" });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Socket.IO Test</h1>
        <p className="text-gray-600 mb-6">
          Click the button below to send a "ping" event to the server and see the response.
        </p>

        <button
          onClick={pingServer}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Ping Server
        </button>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">Server says:</h2>
          <p className="mt-2 text-gray-800">
            {serverMsg || "No message received yet."}
          </p>
        </div>
      </div>
    </div>
  );
}