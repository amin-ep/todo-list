import classes from "./Subtitle.module.css";

function Subtitle({ children }) {
  return <p className={classes.subtitle}>{children}</p>;
}

export default Subtitle;
