import classes from "./Note.module.css";

export default function Note({ children }) {
  return <p className={classes.note}>{children}</p>;
}
