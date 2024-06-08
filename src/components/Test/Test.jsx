"use client";
import React, { useEffect, useState } from "react";
import test from "./test.module.scss";
import axios from "axios";
import { getStaticProps } from "@/services/food-service";

export default function Test() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [food, setFood] = useState([]);
  const [isId, setId] = useState("");
  const [updateTest, setUpdateText] = useState("");
  const [isOpenUpdate, setOpenUpdate] = useState(false);

  const getFood = async () => {
    try {
      const food = await getStaticProps();
      setFood(food);
    } catch (err) {
      console.log(err);
    }
  };

  const addFood = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/store", {
        id: "",
        name: name,
        price: price,
        availability: false,
      });
      setName("");
      setPrice("");
      getFood();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post("http://localhost:3001/store/delete", {
        id,
      });
      getFood();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.post("http://localhost:3001/store/update", {
        id,
        name: updateTest,
      });
      getFood();
      setOpenUpdate(false)
      console.log(updateTest);
    } catch (err) {
      console.log(err);
    }
  };

  const openUpdate = (id, name) => {
    setOpenUpdate(true);
    setUpdateText(name);
    setId(id);
  };

  const renderFood = (prop) => {
    const { _id, name, price } = prop;
    // setName(name);

    return (
      <div key={name} className={test.card}>
        {_id === isId && isOpenUpdate ? (
          <input
            type="text"
            value={updateTest}
            onChange={(e) => setUpdateText(e.target.value)}
          />
        ) : (
          <h1
            className={test.card__title}
            onClick={() => openUpdate(_id, name)}
          >
            {name}
          </h1>
        )}

        <span className={test.card__price}>{price}</span>

        <button onClick={() => handleDelete(_id)}>Delete</button>
        <button onClick={() => handleUpdate(_id)}>Updated</button>
      </div>
    );
  };

  useEffect(() => {
    getFood();
  }, []);

  return (
    <div className={test.container}>
      <h1>Test app</h1>
      <div>
        <p>Введи текст</p>

        <form onSubmit={addFood}>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </div>
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
