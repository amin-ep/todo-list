// eslint-disable-next-line no-unused-vars
import React, { useState, useContext, useRef } from "react";
import classes from "./Login.module.css";
import Container from "../../components/UI/Container";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const body = {
      identifier: email,
      password: password,
    };

    authCtx.onLogin(body);
    navigate("/");
  };
  return (
    <Container className={classes.container}>
      <div className={classes["heading-wrapper"]}>
        <h2 className={classes.heading}>Login</h2>
      </div>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.controls}>
          <input
            type="email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
            autoComplete="false"
            required
          />
          <label htmlFor="email" className={classes.label}>
            Email
          </label>
        </div>
        <div className={classes.controls}>
          <input
            type="password"
            id="password"
            value={password}
            onChange={passwordChangeHandler}
            autoComplete="false"
            required
          />
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
