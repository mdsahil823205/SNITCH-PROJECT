import { createBrowserRouter } from "react-router-dom";
import Register from "../features/authentication/pages/Register.jsx";
import Login from "../features/authentication/pages/Login.jsx";
import CreateProduct from "../features/products/pages/CreateProduct.jsx";
import Dashboard from "../features/products/pages/Dashboard.jsx";

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
  },
  {
    path: "/seller/create-product",
    element: <CreateProduct />
  },
  {
    path: "seller/dashboard",
    element: <Dashboard />
  }
]);

export default routes;
