import { useParams } from "react-router";
import PostCard from "../components/feed/PostCard";
import { useState, useEffect } from "react";
import apiFetch from "../../api/api";
import profile from "../assets/profile.svg";
import "./PostDetail.css";
import { useContext } from "react";
import { PostFormContext } from "../App";

export default function PostDetail() {
  const { togglePostForm, updateParent } = useContext(PostFormContext);
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
      <div
        className="replyMiniForm"
        onClick={() => {
          updateParent(post);
          togglePostForm();
        }}
      >
        <img src={profile} alt="profilePicture" className="iconSmall" />
        <span>Write your reply</span>
      </div>
      <ul className="replyList">
        {post &&
          post.replies &&
          post.replies.length > 0 &&
          post.replies.map((e) => {
            return (
              <li key={e.id}>
                <PostCard post={e} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
