import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

export default function LoggedOut() {
  const { auth } = useAuthContext();

  return (
      <>
      {auth === "loading" && <p>Loading...</p>}
      {auth && <Navigate to={"/"} replace />}
      {!auth && <Outlet />}
      </>
)
}
