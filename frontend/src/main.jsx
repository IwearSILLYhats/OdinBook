import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import NotFound from "./pages/NotFound.jsx";
import LoggedIn from "./components/LoggedIn.jsx";
import LoggedOut from "./components/LoggedOut.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoggedIn />,
    children: [
      {
        path: "dashboard",
        element: <App />,
      },
    ],
  },
  {
    path: "auth",
    element: <LoggedOut />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
