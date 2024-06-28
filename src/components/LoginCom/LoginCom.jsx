"use client";
import { fetcher } from "@/fetcher/fetcher";
import React, { useState } from "react";
import { mutate } from "swr";

export default function LoginCom() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitButton = async () => {
    const response = await fetcher("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: "", username: username, password: password }),
    });

    console.log(response.token)
    mutate("http://localhost:3001/users");
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        placeholder="Имя"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        value={password}
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submitButton}>Ok</button>
    </div>
  );
}
