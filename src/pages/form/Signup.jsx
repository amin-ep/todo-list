// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import classes from "./Signup.module.css";
import Container from "../../components/UI/Container";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const resetInputs = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const formSubmitHadler = (e) => {
    e.preventDefault();
    // signup();
    const body = {
      username: username,
      email: email,
      password: password,
    };
    authCtx.onSignUp(body);
    resetInputs();
    navigate("/");
  };
  return (
    <Container className={classes.container}>
      <div className={classes["heading-wrapper"]}>
        <h2 className={classes.heading}>Sign up</h2>
      </div>
      <form onSubmit={formSubmitHadler}>
        <div className={classes.controls}>
          <input
            type="text"
            id="username"
            value={username}
            onChange={usernameChangeHandler}
            autoComplete="off"
            required
          />
          <label htmlFor="username" className={classes.label}>
            Username
          </label>
        </div>
        <div className={classes.controls}>
          <input
            type="email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
            autoComplete="off"
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
            autoComplete="off"
            required
          />
          <label htmlFor="password" className={classes.label}>
            Password
          </label>
        </div>
        <div className={classes.actions}>
          <button>{authCtx.onLoading ? "Loading..." : "Sign Up"}</button>
          <p className={classes.copyright}>&copy; 2023</p>
        </div>
      </form>
    </Container>
  );
}

export default Signup;
