"use client";
import React, { useEffect, useState } from "react";
import test from "./test.module.scss";
import axios from "axios";
import { getStaticProps } from "@/services/food-service";
import { fetcher } from "@/fetcher/fetcher";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const getKey = (pageIndex, previousPageData) => {
  return `https://jsonplaceholder.typicode.com/todos?_page=${
    pageIndex + 1
  }&_limit=4`;
};

export default function Test() {
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

  if (!data) return "loading";

  console.log(data);

  const renderTest = (prop, index) => {
    const { userId, id, title, completed } = prop;
    return (
      <div key={index} className={test.container}>
        <p>{userId}</p>
        <p>{id}</p>
        <p>{title}</p>
        <p>{completed}</p>
      </div>
    );
  };
  const todos = data.flat();

  const testBtn = () => {
    setSize(size + 1);
  };

  return (
    <div>
      <button onClick={testBtn}>fsa</button>
      <h1>Test app</h1>
      <div className={test.article}>
        <div className={test.cards}>
          <div className={test.cards__container}>
            {todos?.map((props, index) => renderTest(props, index))}
          </div>
        </div>
      </div>
    </div>
  );
}
