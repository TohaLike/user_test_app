"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { fetcher } from "@/fetcher/fetcher";
import useSWR from "swr";

// const socket = io("http://localhost:3001");

export default function ChatCom() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState(0); // Состояние для хранения количества подключенных пользователей

  const [name, setName] = useState("");
  const [isRoom, setRoom] = useState("");

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const newSocket = io("http://localhost:3001", {
      transports: ["websocket", "polling"],
    });

    newSocket.on("connect", () => console.log("Connected to server"));
    newSocket.on("disconnect", () => console.log("Disconnected from server"));
    newSocket.on("error", (error) => console.error("Socket error:", error));

    newSocket.on("messages", (user) => {
      const { room, name, message } = user;
      setMessages((prevMessages) => [
        ...prevMessages,
        { name: `${name}:  `, message: message },
      ]);
    });

    setSocket(newSocket);

    newSocket.on("users", (users) => setConnectedUsers(users));

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && socket) {
      socket.emit("messages", `room${isRoom}`, name, message);
      setMessage("");
    }
  };

  const selectRoom = () => {
    socket.emit("join", `room${isRoom}`);
    setSelected(true);
  };

  return (
    <div>
      {selected ? (
        <div>
          <p>users: {connectedUsers}</p>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>
                {msg.name}
                {msg.message}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="room?"
            value={isRoom}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={selectRoom}>Ok</button>
        </div>
      )}
    </div>
  );
}
