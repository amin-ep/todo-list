import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { AuthContextProvider } from "../context/AuthContext";

import classes from "./RootLayout.module.css";

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <Header />
      <main>
        <div className={classes.container}>
          <Outlet />
        </div>
      </main>
    </AuthContextProvider>
  );
}
