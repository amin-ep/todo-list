import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
// Pages
import Home from "./pages/Home/Home";
import RootLayout from "./layout/RootLayout";
import Login from "./pages/form/Login";
import Signup from "./pages/form/Signup";
import CreateTask from "./pages/CreateTask/CreateTask";
import EditTask from "./pages/EditTask/EditTask";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/create" element={<CreateTask />} />
      <Route path="edit/:id" element={<EditTask />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
