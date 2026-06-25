import { useOutletContext } from "react-router";
import logo from "../../assets/favicon.ico";
import MiniPostForm from "../postForm/MiniPostForm";
import PostCard from "./PostCard";
import "./Feed.css";
import { useState, useEffect } from "react";
import apiFetch from "../../../api/api";
import { useContext } from "react";
import { PostFormContext } from "../../App";

export default function Feed() {
  const { togglePostForm, updateParent } = useContext(PostFormContext);
  const [content, setContent] = useState(null);
  useEffect(() => {
    async function fetchPosts() {
      const request = await apiFetch("posts", "GET");
      if (request) {
        setContent(request.posts);
      }
    }
    fetchPosts();
  }, []);
  return (
    <main>
      <header>
        <img src={logo} alt="Blabber" />
      </header>
      <MiniPostForm />
      <ul className="postFeed">
        {content &&
          content.map((e) => {
            return <PostCard post={e} key={e.id} />;
          })}
      </ul>
    </main>
  );
}
