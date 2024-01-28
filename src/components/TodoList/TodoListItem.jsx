/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useState } from "react";
import classes from "./TodoListItem.module.css";
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
export default function TodoListItem(props) {
  const [todos, setTodos] = useState(props.items);

  useEffect(() => {
    setTodos(props.items);
  }, [props.items]);

  const deleteTodo = useCallback(async (id) => {
    try {
      const BASE_URL = "http://localhost:1337";
      const response = await fetch(`${BASE_URL}/api/todolists/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting todo item.");
      } else {
        setTodos((prevState) => prevState.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const checkInputChangeHandler = useCallback(
    async (id) => {
      try {
        const data = todos.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        );
        const selectedData = {
          data: data.find((item) => item.id === id),
        };
        const response = await fetch(
          `http://localhost:1337/api/todolists/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedData),
          }
        );
        const responseData = await response.json();
        console.log(responseData);
      } catch (err) {
        console.error(err);
      }
    },
    [todos]
  );
  return (
    <>
      {todos.map((item) => (
        <li className={classes["list-item"]} key={item.id}>
          <div className={classes["list-item-text"]}>
            <p>{item.title}</p>
          </div>
          <div className={classes["list-item-actions"]}>
            <input
              type="checkbox"
              name="checkbox"
              defaultChecked={item.completed}
              onChange={() => checkInputChangeHandler(item.id)}
            />
            <Link to={`edit/${item.id}`} className={classes["edit-link"]}>
              <i>
                <MdOutlineModeEdit />
              </i>
            </Link>
            <button
              className={classes.button}
              onClick={() => deleteTodo(item.id)}
            >
              <MdDeleteForever />
            </button>
          </div>
        </li>
      ))}
    </>
  );
}
