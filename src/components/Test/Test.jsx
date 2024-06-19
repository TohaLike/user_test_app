"use client";
import React, { createRef, useEffect, useRef, useState } from "react";
import test from "./test.module.scss";
import axios from "axios";
import PostItem from "./PostItem";

export default function Test() {
  const [posts, setPosts] = useState({ data: [], page: 1 });
  const portion = 10;
  const totalPages = Math.ceil(100 / portion);
  const lastItem = createRef();
  const observerLoader = useRef();
  
  console.log(posts.page)

  const getNewPosts = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _limit: portion,
          _page: posts.page,
        },
      })
      .then(({ data }) => {
        setPosts({
          data: [...posts.data, ...data],
          page: posts.page + 1,
        });
      });
  };
  

  const actionInSight = (entries) => {
    if (entries[0].isIntersecting && posts.page <= totalPages) {
      getNewPosts();
    }
  };

  useEffect(() => {
    if (observerLoader.current) observerLoader.current.disconnect();

    {
      /*
      IntersectionObserver - позволяет указать функцию,
      которая будет вызвана всякий раз для элемента (target) 
      при пересечении его с областью видимости документа 
      (по умолчанию) или заданным элементом (root).
      */
    }
    observerLoader.current = new IntersectionObserver(actionInSight);

    if (lastItem.current) observerLoader.current.observe(lastItem.current);
  }, [lastItem]);

  useEffect(() => {
    getNewPosts();
  }, []);


  return (
    <div>
      <h1>Test app</h1>
      <div className={test.article}>
        <div className={test.cards}>
          <div className={test.cards__container}>
            {posts.data.map((item, index) => {
              if (index + 1 === posts.data.length) {
                console.log(index + 1 === posts.data.length)
                return <PostItem key={item.id} info={item} ref={lastItem} />;
              }
              return <PostItem key={item.id} info={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
