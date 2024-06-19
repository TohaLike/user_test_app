import React, { forwardRef } from "react";
import test from "./test.module.scss";

const PostItem = forwardRef((prop, ref) => {
  // console.log(ref)
  return (
    <div className={test.container} ref={ref}>
      <p>{prop.info.id}</p>
      <p>{prop.info.title}</p>
    </div>
  );
});

export default PostItem;
