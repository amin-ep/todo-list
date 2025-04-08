import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY, errorMessage } from "../utils/constants";
import { useMutation } from "@tanstack/react-query";
import { login, signup } from "../services/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  isLoggedIn: false,
  isLoggingIn: false,
  isSigningUp: false,
  onSignUp: () => {},
  onLogin: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authToken = Cookies.get(AUTH_TOKEN_KEY);

  const navigate = useNavigate();

  function handleAuthenticationSuccess(data) {
    if (data.status === "fail") {
      toast.error(data.message || errorMessage);
    }

    if (data.status === "success") {
      toast.success(`Welcome ${data.data.name}`);
      Cookies.set(AUTH_TOKEN_KEY, data.token, {
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      });
      setIsLoggedIn(true);
      navigate("/");
    }
  }

  const { isPending: isLoggingIn, mutate: onLogin } = useMutation({
    mutationFn: login,
    mutationKey: ["currentUser"],
    onSuccess(data) {
      handleAuthenticationSuccess(data);
    },
  });

  const { isPending: isSigningUp, mutate: onSignUp } = useMutation({
    mutationFn: signup,
    mutationKey: ["currentUser"],
    onSuccess(data) {
      handleAuthenticationSuccess(data);
    },
  });

  useEffect(() => {
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, [authToken]);

  const logout = () => {
    setIsLoggedIn(false);
    Cookies.remove(AUTH_TOKEN_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isLoggingIn,
        onSignUp,
        onLogin,
        isSigningUp,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
