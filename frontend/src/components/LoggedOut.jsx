import { Navigate, Outlet } from "react-router";

export default function LoggedOut() {
  const isLoggedOut = document.cookie === "";

  return isLoggedOut ? <Outlet /> : <Navigate to={"/"} replace />;
}
