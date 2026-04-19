import { createBrowserRouter } from "react-router-dom";
import Register from "../features/authentication/pages/Register.jsx";
import Login from "../features/authentication/pages/Login.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello world</h1>,
  },

  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export default routes;
