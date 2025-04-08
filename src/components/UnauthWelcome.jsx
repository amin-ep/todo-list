import Heading from "../UI/Heading";
import Highlight from "../UI/Highlight";
import Note from "../UI/Note";
import Subtitle from "../UI/Subtitle";
import classes from "./UnauthWelcome.module.css";

function UnauthWelcome() {
  return (
    <div className={classes.container}>
      <Heading>
        Welcome to <Highlight>Todo List</Highlight>
      </Heading>
      <Subtitle>
        Boost your productivity with a beautiful and simple to-do list app. Plan
        your day, set priorities, and stay focused with ease.
      </Subtitle>
      <Note>
        Login or signup to get started. Your journey to an organized life begins
        here!
      </Note>
    </div>
  );
}

export default UnauthWelcome;
