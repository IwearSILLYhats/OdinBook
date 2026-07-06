import { createContext, useEffect, useState } from "react";
import "./App.css";
import LeftNavigation from "./components/LeftNavigation";
import RightNavigation from "./components/RightNavigation";
import apiFetch from "../api/api";
import { Outlet } from "react-router";
import PostForm from "./components/postForm/PostForm.jsx";

export const UserContext = createContext(null);
export const PostFormContext = createContext(null);

export default function App() {
  const [profile, setProfile] = useState(null);
  const [postForm, setPostForm] = useState(false);
  const [parent, setParent] = useState(null);
  useEffect(() => {
    async function fetchDashboard() {
      const request = await apiFetch("dashboard", "GET");
      if (request) {
        setProfile(request.user);
      }
    }
    fetchDashboard();
  }, []);
  return (
    <div id="app">
      <UserContext value={profile}>
        <PostFormContext
          value={{
            parent,
            postForm,
            updateParent: function (e) {
              setParent(e);
            },
            togglePostForm: function () {
              setPostForm(!postForm);
            },
          }}
        >
          {!profile && <p>Loading...</p>}
          {profile && (
            <>
              <LeftNavigation />
              <Outlet />
              <RightNavigation />
              {postForm && <PostForm />}
            </>
          )}
        </PostFormContext>
      </UserContext>
    </div>
  );
}
