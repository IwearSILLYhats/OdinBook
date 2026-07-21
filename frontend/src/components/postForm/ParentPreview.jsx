import profileIcon from "../../assets/profile.svg";
import like from "../../assets/heart.svg";
import replies from "../../assets/reply.svg";
import PostUI from "../feed/PostUI";
import { formatAvatar } from "../../util/imgUrlFormatter";

export default function ParentPreview({ parent, variant }) {
  return (
    <div className="replyPreview">
      <img
        src={parent.avatar ? formatAvatar(parent.id) : profileIcon}
        alt={parent.username}
      />
      <div className="previewBody">
        <h5>{parent.author.username}</h5>
        <p>{parent.content}</p>
      </div>
      {variant === "detail" && (
        <div className="postCardDetail">
          {parent._count && (
            <span>
              <img src={replies} alt="replies" className="icon imgSmall" />
              <p>{parent._count.replies}</p>
            </span>
          )}
          {parent._count && (
            <span>
              <img src={like} alt="like" className="icon imgSmall" />
              <p>{parent._count.likes}</p>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
