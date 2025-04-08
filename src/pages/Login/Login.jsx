// import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext";
import AuthErrorSection from "../../UI/AuthErrorSection";
import AuthFormControl from "../../UI/AuthFormControl";
import classes from "./Login.module.css";

function Login() {
  const { onLogin, isLoggingIn } = useContext(AuthContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    onLogin(data);
  };

  return (
    <div>
      <div className={classes["heading-wrapper"]}>
        <h2 className={classes.heading}>Login</h2>
      </div>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <AuthFormControl
          id="username"
          label="Username"
          name="username"
          register={register}
          type="text"
          registerOptions={{
            required: {
              value: true,
              message: "Please set a username",
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
            {isLoggingIn ? "Logging In ..." : "Login"}
          </button>
          <p className={classes.copyright}>&copy; 2023</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
