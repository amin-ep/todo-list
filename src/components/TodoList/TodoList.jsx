/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback, useContext } from "react";
import classes from "./TodoList.module.css";
import TodoListItem from "./TodoListItem";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
export default function TodoList() {
  const [todosItem, setTodosItem] = useState([]);
  const authCtx = useContext(AuthContext);
  const getTodos = useCallback(async () => {
    try {
      const BASE_URL = "http://localhost:1337";
      const response = await fetch(`${BASE_URL}/api/todolists`);
      const todosData = await response.json();
      const transformedData = todosData.data.map((item) => {
        return {
          id: item.id,
          title: item.attributes.title,
          completed: item.attributes.completed,
        };
      });
      setTodosItem(transformedData);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);
  return (
    <ul className={classes.list}>
      {authCtx.isLoggedIn ? (
        <>
          <div>
            <TodoListItem items={todosItem} />
          </div>
          <div className={classes["link-wrapper"]}>
            <Link to="/create" className={classes.link}>
              New Task
              <i>
                <IoMdAddCircle />
              </i>
            </Link>
          </div>
        </>
      ) : (
        <div className={classes.message}>
          <h2 className={classes["message-header"]}>You Are Not Logged In!</h2>
          <h4 className={classes["message-text"]}>
            Click <Link to="/login">Here</Link> to Login or if you don't have an
            account click <Link to="/signup">Here</Link> to create an account
          </h4>
        </div>
      )}
    </ul>
  );
}
