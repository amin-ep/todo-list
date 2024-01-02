// eslint-disable-next-line no-unused-vars
import React, { useState, useContext, useRef } from "react";
import classes from "./Authentication.module.css";
import Container from "../../components/UI/Container";

function Login() {
  return (
    <Container className={classes.container}>
      <div className={classes["heading-wrapper"]}>
        <h2 className={classes.heading}>Login</h2>
      </div>
      <form>
        <div className={classes.controls}>
          <input type="text" id="username" autoComplete="false" required />
          <label htmlFor="username" className={classes.label}>
            Username
          </label>
        </div>
        <hr />
        <div className={classes.controls}>
          <input type="password" id="password" autoComplete="false" required />
          <label htmlFor="password" className={classes.label}>
            Password
          </label>
        </div>
        <div className={classes.actions}>
          <button type="submit">Login In</button>
          <p className={classes.copyright}>&copy; 2023</p>
        </div>
      </form>
    </Container>
  );
}

export default Login;
