import profileIcon from "../../assets/profile.svg";
import like from "../../assets/heart.svg";
import replies from "../../assets/reply.svg";
import PostUI from "../feed/PostUI";

export default function ParentPreview({ parent, variant }) {
  return (
    <div className="replyPreview">
      <img src={parent.avatar || profileIcon} alt={parent.username} />
      <div className="previewBody">
        <h5>{parent.author.username}</h5>
        <p>{parent.content}</p>
      </div>
      {variant === "detail" && (
        <div className="postCardDetail">
          {parent._count && (
            <span>
              <img src={replies} alt="replies" className="iconSmall" />
              <p>{parent._count.replies}</p>
            </span>
          )}
          {parent._count && (
            <span>
              <img src={like} alt="like" className="iconSmall" />
              <p>{parent._count.likes}</p>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
