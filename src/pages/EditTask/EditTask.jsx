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
  const getCurrentTodo = async() => {
    try {
      const response = await fetch(`http://127.0.0.1:8090/api/collections/todo/records/${params.id}`);
      const data = await response.json();
      const currentTodo = data.title;
      console.log(currentTodo);
      setTitle(currentTodo)
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCurrentTodo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const updateTask = async () => {
    try {
      const data = {
        title: title,
      };
      const response = await axios.patch(
        `http://127.0.0.1:8090/api/collections/todo/records/${params.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data, "response");
    } catch (err) {
      console.log(err);
    }
  };

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    updateTask();
    navigate('/')
  }

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
