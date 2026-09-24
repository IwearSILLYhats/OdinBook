import { useEffect } from "react";
import "./App.css";
import LeftNavigation from "./components/LeftNavigation";
import RightNavigation from "./components/RightNavigation";
import { apiFetch } from "../api/api";
import { Outlet } from "react-router";
import PostForm from "./components/postForm/PostForm.jsx";
import { useUserContext  } from "./contexts/UserContext.js";
import { usePostFormContext } from "./contexts/PostFormContext.js";

export default function App() {
  const {profile, setProfile} = useUserContext();
  const {postForm} = usePostFormContext();
  useEffect(() => {
    async function fetchDashboard() {
      const request = await apiFetch("dashboard", "GET");
      if (request) {
        setProfile(request.user);
      }
    }
    fetchDashboard();
  }, [setProfile]);
  return (
    <div id="app">
          {!profile && <p>Loading...</p>}
          {profile && (
            <>
              <LeftNavigation />
              <Outlet />
              <RightNavigation />
              {postForm && <PostForm />}
            </>
          )}
    </div>
  );
}
