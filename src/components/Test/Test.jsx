"use client";
import React, { useEffect, useState } from "react";
import test from "./test.module.scss";
import axios from "axios";
import { fetcher } from "@/fetcher/fetcher";
import useSWR, { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";

export default function Test() {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR("http://localhost:3001/todos", fetcher);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [changeText, setChangeText] = useState("");
  const [indexOpen, setIndexOpen] = useState(false);

  const addData = async () => {
    await fetcher("http://localhost:3001/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: `${data.length + 1}`, title: text }),
    });
    mutate("http://localhost:3001/todos");
    setText("");
  };

  const deleteData = async (index) => {
    await fetcher(`http://localhost:3001/todos/${index}`, {
      method: "DELETE",
    });
    mutate("http://localhost:3001/todos");
  };

  const updateData = async (index) => {
    await fetcher(`http://localhost:3001/todos/${index}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: changeText }),
    });
    mutate("http://localhost:3001/todos");
    setOpen(false)
  };

  const openData = (index, title) => {
    setIndexOpen(index);
    setChangeText(title);
    setOpen(true)
  };

  const TestCard = (props, index) => {
    const { id, title } = props;
    return (
      <div key={index} className={test.container}>
        {index === indexOpen && open ? (
          <input
            type="text"
            value={changeText}
            onChange={(e) => setChangeText(e.target.value)}
          />
        ) : (
          <p onClick={() => openData(index, title)}>{title}</p>
        )}
        <button onClick={() => updateData(id)}>Update</button>
        <button onClick={() => deleteData(id)}>Delete</button>
      </div>
    );
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Test app</h1>
      <div className={test.add__container}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
        />
        <button onClick={addData}>Add</button>
      </div>
      <div className={test.article}>
        <div className={test.cards}>
          <div className={test.cards__container}>
            {data?.map((props, index) => TestCard(props, index))}
          </div>
        </div>
      </div>
    </div>
  );
}
