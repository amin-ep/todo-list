/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import classes from "./Container.module.css";

// eslint-disable-next-line no-unused-vars
export default function Container(props) {
  return (
    <div className={`${classes.container} ${props.className}`}>
      {props.children}
    </div>
  );
}
