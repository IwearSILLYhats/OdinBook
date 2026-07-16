import { useParams } from "react-router";
import PostCard from "../components/feed/PostCard";
import { useState, useEffect } from "react";
import { apiFetch } from "../../api/api";
import profile from "../assets/profile.svg";
import { useContext } from "react";
import { UserContext } from "../App";
import UserForm from "../components/UserForm";
import "./UserDetail.css";

export default function UserDetail() {
  const userid = useParams().userId;
  const myProfile = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [replies, setReplies] = useState(null);
  const [selected, setSelected] = useState("posts");
  const [editProfile, setEditProfile] = useState(false);
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
  }, [userid]);
  return (
    <main className="userDetail" key={userid}>
      {editProfile && <UserForm user={user} toggle={setEditProfile} />}
      {user && (
        <div className="userProfile">
          <div className="banner">
            <img
              src={user.profile_img_url || "#"}
              alt="Banner"
              className="bannerImg"
            />
          </div>
          <div className="userHeader">
            <img
              src={user?.profile_img_url || profile}
              alt={user?.username}
              className="iconLarge"
            />
            <div>
              {userid === myProfile.id ? (
                <button
                  type="button"
                  onClick={() => setEditProfile(!editProfile)}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button type="button">Follow</button>
                  <button type="button" disabled>
                    Message
                  </button>
                </>
              )}
              <button type="button" disabled>
                ...
              </button>
            </div>
          </div>
          <div>
            <h3>{user?.username}</h3>
            <div className="userStats">
              <p>{user._count.followed_by} followers</p>
              <p>{user._count.following} following</p>
              <p>{user._count.posts} posts</p>
            </div>
            <p>{user.bio || "User bio"}</p>
          </div>
          <div>
            <button type="button" onClick={() => setSelected("posts")}>
              Posts
            </button>
            <button type="button" onClick={() => setSelected("replies")}>
              Replies
            </button>
            <button type="button">Media</button>
            <button type="button">Videos</button>
          </div>
        </div>
      )}
      <div className="userPosts">
        <div>Pinned Posts</div>
        <ul>
          {posts &&
            selected === "posts" &&
            posts.map((e) => {
              return (
                <li key={e.id}>
                  <PostCard post={e} />
                </li>
              );
            })}
          {replies &&
            selected === "replies" &&
            replies.map((e) => {
              return (
                <li key={e.id}>
                  <PostCard post={e} />
                </li>
              );
            })}
        </ul>
      </div>
    </main>
  );
}
