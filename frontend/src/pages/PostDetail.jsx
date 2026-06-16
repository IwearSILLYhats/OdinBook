import { useParams } from "react-router";
import PostCard from "../components/feed/PostCard";
import { useState, useEffect } from "react";
import apiFetch from "../../api/api";
import profile from "../assets/profile.svg";

export default function PostDetail() {
  const postid = useParams().postId;
  const [post, setPost] = useState(null);
  useEffect(() => {
    async function fetchPostDetails() {
      const request = await apiFetch(`posts/${postid}`, "GET");
      if (request && !request.error) {
        setPost(request.post);
      }
    }
    fetchPostDetails();
  }, []);
  return (
    <div className="postDetail">
      <div className="postHeader">
        <button type="button">Left Arrow</button>
        <h3>Post</h3>
        <button type="button">Filters</button>
      </div>
      {post && <PostCard post={post} variant={"detail"} />}
      <div className="replyMiniForm">
        <img src={profile} alt="profilePicture" className="iconSmall" />
        <span>Write your reply</span>
      </div>
      <ul className="replyList">
        <li>Replies</li>
      </ul>
    </div>
  );
}
