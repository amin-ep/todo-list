import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../../services/todoApi";
import Heading from "../../UI/Heading";
import Highlight from "../../UI/Highlight";
import TodoForm from "../../UI/TodoForm";
import classes from "./Create.module.css";

function Create() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["myTodos"],
    mutationFn: createTodo,
    onSuccess(result) {
      if (result.status === "success") {
        queryClient.invalidateQueries(["myTodos"]);
        navigate("/");
      }
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Heading>
          Add a <Highlight>Task</Highlight>
        </Heading>
      </div>

      <TodoForm
        note="Don't let that brilliant idea escape—add it now!"
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        submitValue="add"
        disabled={!isValid}
        isPending={isPending}
      />
    </div>
  );
}

export default Create;
