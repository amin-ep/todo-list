import { useState } from "react";
import classes from "./AuthFormControl.module.css";

function AuthFormControl({ type, id, register, name, label, registerOptions }) {
  const [valueLength, setValueLength] = useState(0);

  return (
    <div className={classes.controls}>
      <input
        className={classes.input}
        type={type}
        id={id}
        autoComplete="off"
        {...register(name, {
          ...registerOptions,
          onChange(e) {
            setValueLength(e.target.value.length);
          },
        })}
      />
      <label
        htmlFor={id}
        className={`${classes.label} ${
          valueLength > 0 ? classes["label-transform"] : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default AuthFormControl;
