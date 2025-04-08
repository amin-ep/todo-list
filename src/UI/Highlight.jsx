import classes from "./Highlight.module.css";

function Highlight({ children }) {
  return <span className={classes.highlight}>{children}</span>;
}

export default Highlight;
