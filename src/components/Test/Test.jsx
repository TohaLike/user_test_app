"use client";
import React, { useEffect, useState } from "react";
import test from "./test.module.scss";
import axios from "axios";

export default function Test() {
  const [food, setFood] = useState([]);

  const getFood = async () => {
    try {
      const response = await axios.get("http://localhost:3001/store");
      setFood(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderFood = (prop) => {
    const { name, price, availability } = prop;
    return (
      <div key={name} className={test.card}>
        <h1 className={test.card__title}>{name}</h1>
        <span className={test.card__price}>{price}</span>
      </div>
    );
  };

  useEffect(() => {
    getFood();
  }, []);

  return (
    <div className={test.container}>
      <h1>Test app</h1>

      <div className={test.article}> 
        <div className={test.cards}>
          <div className={test.cards__container}>
            {food?.map((props) => renderFood(props))}
          </div>
        </div>
      </div>
    </div>
  );
}
