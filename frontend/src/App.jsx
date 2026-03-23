import { createContext, useEffect, useState } from "react";
import "./App.css";
import LeftNavigation from "./components/LeftNavigation";
import RightNavigation from "./components/RightNavigation";
import apiFetch from "../api/api";
import { Outlet } from "react-router";
import PostForm from "./components/postForm/PostForm.jsx";

export const UserContext = createContext(null);

export default function App() {
  const [profile, setProfile] = useState(null);
  const [content, setContent] = useState(null);
  const [postForm, setPostForm] = useState(false);
  useEffect(() => {
    async function fetchDashboard() {
      const request = await apiFetch("dashboard", "GET");
      if (request && request.user) {
        setProfile(request.user);
      }
      if (request && request.posts) {
        setContent(request.posts);
      }
    }
    fetchDashboard();
  }, []);
  return (
    <UserContext value={profile}>
      {!profile && <p>Loading...</p>}
      {profile && (
        <div id="app">
          <LeftNavigation />
          <Outlet />
          <RightNavigation />
          {postForm && <PostForm />}
        </div>
      )}
    </UserContext>
  );
}
