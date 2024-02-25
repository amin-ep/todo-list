/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { AUTH_TOKEN } from "../constant/constant";
import Cookies from "js-cookie";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLoading: false,
  onSignUp: () => {},
  onLogin: () => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const authToken = Cookies.get(AUTH_TOKEN);

  const signupHandler = async (body) => {
    setIsLoading(true);
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
      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        Cookies.set(AUTH_TOKEN, data.jwt, { expires: 7 });
        const getToken = Cookies.get(AUTH_TOKEN);
        if (getToken) {
          setIsLoggedIn(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginHandler = async (body) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        Cookies.set(AUTH_TOKEN, data.jwt, { expires: 7 });
        console.log(data.jwt);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, [authToken]);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    Cookies.remove(AUTH_TOKEN);
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
