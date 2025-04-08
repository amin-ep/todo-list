import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { deleteTodoById, updateTodoById } from "../services/todoApi";
import classes from "./TodoListItem.module.css";

export default function TodoListItem({ items }) {
  const queryClient = useQueryClient();

  const invalidateData = (status) => {
    if (status === "success") {
      queryClient.invalidateQueries({
        queryKey: ["myTodos"],
      });
    }
  };
  const { mutate: completeTodo } = useMutation({
    mutationFn: ({ id, payload }) => updateTodoById(id, payload),
    mutationKey: ["myTodos"],
    onSuccess(result) {
      invalidateData(result.status);
    },
  });

  const { mutate: deleteTodo } = useMutation({
    mutationFn: (id) => deleteTodoById(id),
    mutationKey: ["myTodos"],
    onSuccess(result) {
      invalidateData(result.status);
    },
  });

  return (
    <>
      {items.map((item) => (
        <li key={item._id} className={classes.item}>
          <div
            className={classes["item-left"]}
            style={{
              borderLeft: `2px solid ${
                item.completed
                  ? "var(--color-green-400)"
                  : "var(--color-yellow-500)"
              }`,
            }}
          >
            <input
              type="checkbox"
              defaultChecked={item.completed}
              onChange={async (e) => {
                completeTodo({
                  id: item._id,
                  payload: { completed: e.target.checked },
                });
              }}
              className={classes.checkbox}
            />
            <span
              className={`${classes.title} ${
                item.completed ? classes.completed : ""
              }`}
            >
              {item.title}
            </span>
          </div>
          <div className={classes["item-right"]}>
            <Link
              className={`${classes.action} ${classes.edit}`}
              to={`edit/${item._id}`}
            >
              <MdOutlineModeEdit className={classes.icon} />
            </Link>
            <button
              className={`${classes.action} ${classes.delete}`}
              onClick={() => {
                deleteTodo(item._id);
                queryClient.invalidateQueries({
                  queryKey: ["myTodos"],
                });
              }}
            >
              <MdDeleteForever className={classes.icon} />
            </button>
          </div>
        </li>
      ))}
    </>
  );
}
