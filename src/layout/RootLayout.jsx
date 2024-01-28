// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import classes from "./RootLayout.module.css";
export default function RootLayout() {
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <header className={classes.header}>
        <Link to="/" className={classes.logo}>
          Todo List
        </Link>
        <div className={classes["auth-links"]}>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          {/* {isLoggedIn && <button className={classes.logout}>Logout</button>} */}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
