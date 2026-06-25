import profile from "../../assets/profile.svg";
import timeDiff from "../../util/timeDiff";
import replies from "../../assets/reply.svg";
import repost from "../../assets/repost.svg";
import like from "../../assets/heart.svg";
import saved from "../../assets/saved.svg";
import share from "../../assets/share.svg";
import { useContext } from "react";
import { PostFormContext } from "../../App";

export default function PostUI({ post }) {
  const { togglePostForm, updateParent } = useContext(PostFormContext);
  return (
    <div className="postUI">
      <button
        type="button"
        onClick={() => {
          updateParent(post);
          togglePostForm();
        }}
      >
        <img src={replies} alt="replies" className="iconSmall" />
        <p>{post._count.replies > 0 ? post._count.replies : ""}</p>
      </button>
      <button type="button">
        <img src={repost} alt="repost" className="iconSmall" />
      </button>
      <button type="button">
        <img src={like} alt="like" className="iconSmall" />
      </button>
      <button type="button">
        <img src={saved} alt="saved" className="iconSmall" />
      </button>
      <button type="button">
        <img src={share} alt="share" className="iconSmall" />
      </button>
      <button type="button">...</button>
    </div>
  );
}
