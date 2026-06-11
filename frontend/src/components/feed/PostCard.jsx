import profile from "../../assets/profile.svg";
import timeDiff from "../../util/timeDiff";
import PostUI from "./PostUI";

export default function PostCard({ post, variant }) {
  return (
    <div className="postCard">
      <div className="postHeader">
        <img
          src={post.author.profile_img_url || profile}
          alt={post.author.username}
          className="iconSmall"
        />
        <p>{post.author.username}</p>
        <p>{timeDiff(post.published_time)}</p>
      </div>
      <div className="postBody">
        <p>{post.content}</p>
        {post.has_image && <p>Attached Image</p>}
      </div>
      {variant === "detail" && (
        <div className="postDetail">
          <span>
            <h5>0</h5>
            <p>reposts</p>
          </span>
          <span>
            <h5>0</h5>
            <p>quotes</p>
          </span>
          <span>
            <h5>0</h5>
            <p>likes</p>
          </span>
          <span>
            <h5>0</h5>
            <p>saves</p>
          </span>
        </div>
      )}
      <PostUI />
    </div>
  );
}
