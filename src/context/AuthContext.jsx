/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLoading: false,
  onSignUp: () => {},
  onLogin: () => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoadig] = useState(false);

  const signupHandler = async (body) => {
    setIsLoadig(true);
    try {
      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
      setIsLoadig(false);
    } finally {
      setIsLoadig(false);
    }
  };

  const loginHandler = async (body) => {
    try {
      setIsLoadig(true);
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        sessionStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
      setIsLoadig(false);
    } finally {
      setIsLoadig(false);
    }
  };

  useEffect(() => {
    const storedInfoInStorage = sessionStorage.getItem("isLoggedIn");

    if (storedInfoInStorage === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLoading: isLoading,
        onSignUp: signupHandler,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
