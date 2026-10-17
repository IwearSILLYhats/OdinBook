import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

export default function LoggedOut() {
  const { auth } = useAuthContext();

  return !auth ? <Outlet /> : <Navigate to={"/"} replace />;
}
