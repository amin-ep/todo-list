// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import classes from "./RootLayout.module.css";
import AuthContext from "../context/AuthContext";
export default function RootLayout() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <header className={classes.header}>
        <Link to="/" className={classes.logo}>
          Todo List
        </Link>
        {!authCtx.isLoggedIn ? (
          <div className={classes["auth-links"]}>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        ) : (
          <div className={classes.logout}>
            <button onClick={() => authCtx.onLogout()}>Logout</button>
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
