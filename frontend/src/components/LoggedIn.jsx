import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

export default function LoggedIn() {
  const { auth } = useAuthContext();

  return (
    <>
    {auth === "loading" && <p>Loading...</p>}
    {auth && <Outlet />}
    {!auth && <Navigate to={"/auth/login"} replace />}
    </>
  )
  
}
