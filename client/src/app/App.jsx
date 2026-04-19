import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./App.route.jsx";
import { useSelector } from "react-redux";

const App = () => {
  // Fix: The reducer is named "auth" in App.store.js, so state is state.auth
  const user = useSelector((state) => state.auth.user);
  
  useEffect(() => {
    console.log("user", user);
  }, []);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
