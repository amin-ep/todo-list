import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import Nav from "./Nav";

function Header() {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>
        Todo List
      </Link>
      <Nav />
    </header>
  );
}

export default Header;
