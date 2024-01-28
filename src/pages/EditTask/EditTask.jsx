/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Container from "../../components/UI/Container";
import classes from "./EditTask.module.css";
import { Link, useParams } from "react-router-dom";
import { MdSaveAs } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditTask() {
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCurrentTodo = async () => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/todolists/${params.id}`
      );
      const todoData = await response.json();
      setTitle(todoData.data.attributes.title);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCurrentTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTask = async () => {
    try {
      const data = {
        data: {
          title: title,
        },
      };
      const response = await fetch(
        `http://localhost:1337/api/todolists/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    updateTask();
    navigate("/");
  };

  return (
    <Container className={classes.container}>
      <header className={classes.header}>
        <Link to="/" className={classes["back-to-home-link"]}>
          <span className={classes["link-arrow"]}>←</span>Back To Home Page
        </Link>
        <h2 className={classes.heading}>Edit Task</h2>
      </header>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <input
            type="text"
            placeholder="Title"
            autoFocus={true}
            value={title}
            onChange={titleChangeHandler}
          />
          <button type="submit" className={classes.button}>
            Save
            <i>
              <MdSaveAs />
            </i>
          </button>
        </div>
      </form>
    </Container>
  );
}
