import { createBrowserRouter } from "react-router-dom";
import Register from "../features/authentication/pages/Register.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello world</h1>,
  },

  {
    path: "/register",
    element: <Register />
  },
]);

export default routes;
