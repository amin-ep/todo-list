// eslint-disable-next-line no-unused-vars
import React, { useContext, useRef } from "react";
import classes from "./Signup.module.css";
import Container from "../../components/UI/Container";
function Signup() {
  return (
    <Container className={classes.container}>
      <div className={classes["heading-wrapper"]}>
        <h2 className={classes.heading}>Sign up</h2>
      </div>
      <form>
        <div className={classes.controls}>
          <input type="text" id="username" autoComplete="off" required />
          <label htmlFor="username" className={classes.label}>
            Username
          </label>
        </div>
        <hr />
        <div className={classes.controls}>
          <input type="password" id="password" autoComplete="off" required />
          <label htmlFor="password" className={classes.label}>
            Password
          </label>
        </div>
        <hr />
        {/* <div className={classes.controls}>
          <input
            type="password"
            id="confirm-password"
            autoComplete="off"
            required
          />
          <label htmlFor="confirm-password" className={classes.label}>
            Password Confirm
          </label>
        </div> */}
        <div className={classes.actions}>
          <button>Sign up</button>
          <p className={classes.copyright}>&copy; 2023</p>
        </div>
      </form>
    </Container>
  );
}

export default Signup;
