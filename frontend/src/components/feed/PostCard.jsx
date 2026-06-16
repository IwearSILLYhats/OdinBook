import profile from "../../assets/profile.svg";
import timeDiff from "../../util/timeDiff";
import PostUI from "./PostUI";
import { Link } from "react-router";
import "./PostCard.css";

export default function PostCard({ post, variant }) {
  function handleClick() {
    //event delegation for multiple buttons on card
  }
  return (
    <div className="postCard">
      <Link to={`/app/users/${post.author.id}`} className="postLink">
        <div className="postHeader">
          <img
            src={post.author.profile_img_url || profile}
            alt={post.author.username}
            className="iconSmall"
          />
          <p className="postAuthor">{post.author.username}</p>
          <p>{timeDiff(post.published_time)}</p>
        </div>
      </Link>
      <Link to={`/app/posts/${post.id}`} className="postLink">
        <div className="postBody">
          <p>{post.content}</p>
          {post.has_image && <p>Attached Image</p>}
        </div>
        {variant === "detail" && (
          <div className="postDetail">
            {post._count && (
              <span>
                <h5>{post._count.replies}</h5>
                <p>replies</p>
              </span>
            )}
            {post._count && post._count.quotes && (
              <span>
                <h5>{post._count.quotes}</h5>
                <p>quotes</p>
              </span>
            )}
            {post._count && (
              <span>
                <h5>{post._count.likes}</h5>
                <p>likes</p>
              </span>
            )}
            {post._count && post._count.saves && (
              <span>
                <h5>{post._count.saves}</h5>
                <p>saves</p>
              </span>
            )}
          </div>
        )}
      </Link>
      <PostUI />
    </div>
  );
}
