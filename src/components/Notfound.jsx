import { Link } from "react-router-dom";
import Heading from "../UI/Heading";
import Note from "../UI/Note";
import Subtitle from "../UI/Subtitle";
import classes from "./Notfound.module.css";

function Notfound() {
  return (
    <div className={classes.container}>
      <Heading>Oops!</Heading>
      <div className={classes["error-code"]}>
        <span>4</span>
        <img
          className={classes.emoji}
          src="/confused-emoji.svg"
          alt="confused"
        />
        <span>4</span>
      </div>
      <Subtitle>Sorry Page not found!</Subtitle>

      <Link className={classes["back-link"]} to="/">
        Back Home
      </Link>
      <Note>But hey, at least you found this cool error message :)) </Note>
    </div>
  );
}

export default Notfound;
