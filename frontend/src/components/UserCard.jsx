import { useEffect, useState } from "react";
import { Link } from "react-router";
import profile from "../assets/profile.svg";
import useDebounce from "../util/useDebounce";
import { apiFetch } from "../../api/api";
import { formatAvatar } from "../util/imgUrlFormatter";

export default function UserCard({ user }) {
  const [following, setFollowing] = useState(null);
  const debouncedStatus = useDebounce(following, 2000);
  useEffect(() => {
    async function requestFollow() {
      //Only requests if change has been made to 'following' and debounces if final value after debounce timer is different than original.
      if (debouncedStatus !== null) {
        await apiFetch(`users/follow/${user.id}`, "POST");
  
      }
    }
    requestFollow();
  }, [debouncedStatus, user.id]);
  return (
    <li className="userCard">
      <div className="userHeader">
        <Link to={`/app/users/${user.id}`} className="postLink">
          <div className="userInfo">
            <img
              src={user.avatar ? formatAvatar(user.id) : profile}
              alt={user.username}
              className="icon imgSmall"
            />
            <p>{user.username}</p>
          </div>
        </Link>
        <button
          type="button"
          className={following ? "following" : ""}
          onClick={() => {
            setFollowing(following ? false : true);
          }}
        >
          {following ? "Following" : "Follow"}
        </button>
      </div>
      <Link to={`/app/users/${user.id}`} className="postLink">
        <p>
          {user.bio && user.bio.length > 50
            ? user.bio.slice(0, 50) + "..."
            : user.bio}
        </p>
      </Link>
    </li>
  );
}
