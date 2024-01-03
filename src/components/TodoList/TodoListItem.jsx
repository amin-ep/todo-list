/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useCallback, useState } from "react";
import classes from "./TodoListItem.module.css";
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import Empty from "./Empty";

export default function TodoListItem(props) {
  const [todos, setTodos] = useState(props.items);

  const deleteTodo = useCallback(async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8090/api/collections/todo/records/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error deleting todo item.");
      } else {
        setTodos((prevState) => prevState.filter((item) => item.id !== id));
      }
      const data = await response.json();
      const todo = data.items.filter((item) => item.id !== id);
      console.log(todo, "todo");
    } catch (error) {
      console.error(error);
    }
  }, []);

  const checkInputChangeHandler = async (id) => {
    try {
      const data = todos.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      const response = await axios.patch(
        `http://127.0.0.1:8090/api/collections/todo/records/${id}`,
        data.find((item) => item.id === id),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
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
          {console.log(item.completed)}
        </li>
      ))}
      {!props.items.length > 0 && <Empty />}
    </>
  );
}
