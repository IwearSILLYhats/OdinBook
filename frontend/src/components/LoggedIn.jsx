import { Navigate, Outlet } from "react-router";

export default function LoggedIn() {
  const isLoggedIn = document.cookie !== "";

  return isLoggedIn ? <Outlet /> : <Navigate to={"/auth/login"} replace />;
}
