// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from "react";
import classes from "./TodoList.module.css";
import TodoListItem from "./TodoListItem";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

export default function TodoList() {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTodos = useCallback(async () => {
    setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // },2000);
    try {
      const response = await fetch(
        "http://127.0.0.1:8090/api/collections/todo/records"
      );
      const data = await response.json();
      const transformedTodos = data.items.map((todosData) => {
        return {
          id: todosData.id,
          title: todosData.title,
          completed: todosData.completed,
        };
      });
      setTask(transformedTodos);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <ul className={classes.list}>
      <div>{loading ? <p>Loading...</p> : <TodoListItem items={task} />}</div>
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
