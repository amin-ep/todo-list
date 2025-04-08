import { useContext } from "react";
import { FaUserPlus } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import classes from "./Nav.module.css";
import { BsClipboardPlus } from "react-icons/bs";
import { GrHomeRounded } from "react-icons/gr";

function Nav() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav
      className={classes.nav}
      style={{
        gridTemplateColumns: `repeat(${!isLoggedIn ? 2 : 3}, 3.25rem)`,
      }}
    >
      {isLoggedIn ? (
        <>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${classes["nav-item"]} ${classes.home} ${
                isActive ? classes.active : ""
              }`
            }
          >
            <GrHomeRounded className={classes.icon} />
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `${classes["nav-item"]} ${classes.create} ${
                isActive ? classes.active : ""
              }`
            }
          >
            <BsClipboardPlus className={classes.icon} />
          </NavLink>

          <button
            className={`${classes["nav-item"]} ${classes.logout}`}
            onClick={logout}
          >
            <FiLogOut className={classes.icon} />
          </button>
        </>
      ) : (
        <>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `${classes["nav-item"]} ${classes.signup} ${
                isActive ? classes.active : ""
              }`
            }
          >
            <FaUserPlus className={classes.icon} />
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${classes["nav-item"]} ${classes.login} ${
                isActive ? classes.active : ""
              }`
            }
          >
            <FiLogIn className={classes.icon} />
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default Nav;
