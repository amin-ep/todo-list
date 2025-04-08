import { useForm } from "react-hook-form";
import Heading from "../../UI/Heading";
import Highlight from "../../UI/Highlight";
import TodoForm from "../../UI/TodoForm";
import classes from "./Edit.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getTodoById, updateTodoById } from "../../services/todoApi";
import { useEffect, useState } from "react";

export default function Edit() {
  const [formIsValid, setFormIsValid] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { isValid, isValidating },
    reset,
    getValues,
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const { data, isFetched } = useQuery({
    queryKey: ["todo"],
    queryFn: () => getTodoById(id),
    staleTime: 1000 * 60 * 10,
  });

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ["todo"],
    mutationFn: (payload) => updateTodoById(id, payload),

    onSuccess(result) {
      if (result.status === "success") {
        queryClient.invalidateQueries({
          queryKey: ["myTodos"],
        });
        navigate("/");
      }
    },
  });

  useEffect(() => {
    reset({
      title: data?.data.title,
    });
  }, [data, reset]);

  useEffect(() => {
    if (isFetched) {
      setFormIsValid(getValues().title.trim() != data?.data.title && isValid);
    }
  }, [data?.data.title, getValues, isValid, isValidating, isFetched]);

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Heading>
          Edit Your <Highlight>Todo</Highlight>
        </Heading>
      </div>
      <TodoForm
        note="Don't worry, even Shakespeare edited his drafts!"
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        submitValue="Edit"
        disabled={!formIsValid}
        isPending={isPending}
      />
    </div>
  );
}
