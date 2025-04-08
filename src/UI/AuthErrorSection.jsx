import classes from "./AuthErrorSection.module.css";
import { RiErrorWarningFill } from "react-icons/ri";
function AuthErrorSection({ errors }) {
  console.log(Object.entries(errors).map((el) => el[1]));
  return (
    <div className={classes["error-wrapper"]}>
      {Object.entries(errors)
        .map((el) => el[1])
        .map((err, index) => (
          <div className={classes.err} key={index}>
            <span className={classes.circle}>
              <RiErrorWarningFill />
            </span>
            <p className={classes.message}>{err.message}</p>
          </div>
        ))}
    </div>
  );
}

export default AuthErrorSection;
