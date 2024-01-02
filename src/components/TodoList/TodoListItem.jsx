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
  const [completed, setCompleted] = useState(false);

  const deleteTodo = useCallback(async (id) => {
    setTodos((prevState) => prevState.filter((item) => item.id !== id));
    try {
      const response = await fetch(
        `http://127.0.0.1:8090/api/collections/todo/records/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error deleting todo item.");
      }
      const data = await response.json();
      const todo = data.items.filter((item) => item.id !== id);
      console.log(todo, "todo");
    } catch (error) {
      console.error(error);
    }
  }, []);

  const completeTodo = async (id) => {
    const data = {
      id: id,
      completed: completed,
    };
    setCompleted(!completed);
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8090/api/collections/todo/records/${id}`,
        data,
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
              onClick={() => completeTodo(item.id)}
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
