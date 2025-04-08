import { useContext } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext";
import AuthErrorSection from "../../UI/AuthErrorSection";
import AuthFormControl from "../../UI/AuthFormControl";
import classes from "./Signup.module.css";

function Signup() {
  const { onSignUp, isSigningUp } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onSignUp(data);
  };

  return (
    <div>
      <div className={classes["heading-wrapper"]}>
        <h2 className={classes.heading}>Sign up</h2>
      </div>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <AuthFormControl
          id="name"
          name="name"
          register={register}
          type="text"
          label="Name"
          registerOptions={{
            required: {
              value: true,
              message: "*Please tell us your name",
            },
            minLength: {
              value: 2,
              message: "Name should be at least 2 characters",
            },
            maxLength: {
              value: 16,
              message: "Name should be 16 or less characters",
            },
          }}
        />
        <AuthFormControl
          id="username"
          label="Username"
          name="username"
          register={register}
          type="text"
          registerOptions={{
            required: {
              value: true,
              message: "*Please set a username",
            },
            minLength: {
              value: 4,
              message: "Username should be at least 4 characters",
            },
            maxLength: {
              value: 16,
              message: "Username should be 16 or less characters",
            },
            validate: (val) => {
              if (/\s/g.test(val)) {
                return "Username cannot contain white space";
              }
              return true;
            },
          }}
        />
        <AuthFormControl
          id="password"
          label="Password"
          name="password"
          register={register}
          type="password"
          registerOptions={{
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters",
            },
            maxLength: {
              message: "Password should be 14 or less characters",
            },
          }}
        />
        <AuthErrorSection errors={errors} />
        <div className={classes.actions}>
          <button type="submit">
            {isSigningUp ? "Signing Up ..." : "Signup"}
          </button>
          <p className={classes.copyright}>&copy; 2023</p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
