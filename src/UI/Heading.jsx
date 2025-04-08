import classes from "./Heading.module.css";

function Heading({ children }) {
  return <h1 className={classes.heading}>{children}</h1>;
}

export default Heading;
