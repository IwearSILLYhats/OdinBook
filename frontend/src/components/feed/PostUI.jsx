import profile from "../../assets/profile.svg";
import timeDiff from "../../util/timeDiff";
import replies from "../../assets/reply.svg";
import repost from "../../assets/repost.svg";
import like from "../../assets/heart.svg";
import saved from "../../assets/saved.svg";
import share from "../../assets/share.svg";
import { useContext, useEffect, useState } from "react";
import { PostFormContext } from "../../App";
import apiFetch from "../../../api/api";

export default function PostUI({ post }) {
  const [liked, setLiked] = useState(post.likes.length > 0 ? true : false);
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
        {post._count.replies > 0 && <p>{post._count.replies}</p>}
      </button>
      <button type="button">
        <img src={repost} alt="repost" className="iconSmall" />
      </button>
      <button
        type="button"
        className={liked ? "liked" : ""}
        onClick={async () => {
          const request = await apiFetch(`posts/like/${post.id}`, "PATCH");
          setLiked(!liked);
        }}
      >
        <img src={like} alt="like" className="iconSmall" />
        {post._count.likes > 0 && <p>{post._count.likes}</p>}
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
