import { useContext } from "react";
import TodoList from "../../components/TodoList";
import UnauthWelcome from "../../components/UnauthWelcome";
import AuthContext from "../../context/AuthContext";

function Home() {
  const { isLoggedIn } = useContext(AuthContext);
  return <div>{isLoggedIn ? <TodoList /> : <UnauthWelcome />}</div>;
}

export default Home;
