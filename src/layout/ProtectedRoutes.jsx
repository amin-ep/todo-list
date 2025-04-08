import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { isLoggedIn } = useContext(AuthContext);

  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default ProtectedRoutes;
