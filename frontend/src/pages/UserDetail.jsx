import { useParams } from "react-router";
import PostCard from "../components/feed/PostCard";
import { useState, useEffect } from "react";
import apiFetch from "../../api/api";
import profile from "../assets/profile.svg";
import { useContext } from "react";
import { PostFormContext } from "../App";

export default function UserDetail() {
  const userid = useParams().userId;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [replies, setReplies] = useState(null);
  useEffect(() => {
    async function fetchUserDetails() {
      const request = await apiFetch(`users/${userid}`, "GET");
      if (request && !request.error) {
        setUser(request.user);
        setPosts(request.posts);
        setReplies(request.replies);
      }
    }
    fetchUserDetails();
  }, []);
  return (
    <main>
      {user && (
        <div>
          <img src="" alt="Banner" />
          <div>
            <img src={user?.profile_img_url || profile} alt={user?.username} />
            <button type="button">Follow</button>
            <button type="button">Message</button>
            <button type="button">...</button>
          </div>
          <div>
            <h3>{user?.username}</h3>
            <h5>@{user?.username}</h5>
            <div>
              <p>{user._count.followed_by} followers</p>
              <p>{user._count.following} following</p>
              <p>{user._count.posts} posts</p>
            </div>
            <p>User bio</p>
          </div>
          <div>
            <button type="button">Posts</button>
            <button type="button">Replies</button>
            <button type="button">Media</button>
            <button type="button">Videos</button>
          </div>
        </div>
      )}
      <div>
        <div>Pinned Posts</div>
        <div>Post Feed</div>
      </div>
    </main>
  );
}
