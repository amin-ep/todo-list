import Note from "./Note";
import Loader from "../UI/Loader";
import classes from "./TodoForm.module.css";

function TodoForm({
  onSubmit,
  register,
  note,
  submitValue,
  disabled,
  isPending,
}) {
  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <div className={classes.controls}>
        <input
          type="text"
          {...register("title", {
            minLength: 3,
            maxLength: 25,
            required: true,
          })}
          className={classes.input}
        />
        <button disabled={disabled} type="submit" className={classes.submit}>
          {isPending ? <Loader /> : submitValue}
        </button>
      </div>
      <div className={classes["note-wrapper"]}>
        <Note>{note}</Note>
      </div>
    </form>
  );
}

export default TodoForm;
