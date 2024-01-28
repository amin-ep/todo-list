// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from "react";
import classes from "./TodoList.module.css";
import TodoListItem from "./TodoListItem";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

export default function TodoList() {
  const [todosItem, setTodosItem] = useState([]);
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
    </ul>
  );
}
