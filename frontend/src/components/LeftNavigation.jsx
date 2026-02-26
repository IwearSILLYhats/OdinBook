import { Link, useNavigate } from "react-router";
import home from "../assets/home.svg";
import notifications from "../assets/notifications.svg";
import chats from "../assets/chats.svg";
import saved from "../assets/saved.svg";
import profile from "../assets/profile.svg";
import settings from "../assets/settings.svg";
import newPost from "../assets/newPost.svg";
import apiFetch from "../../api/api";

export default function LeftNavigation() {
  const navigate = useNavigate();
  const navigationItems = [
    {
      text: "Home",
      link: "/",
      icon: home,
    },
    {
      text: "Notifications",
      link: "/notifications",
      icon: notifications,
    },
    {
      text: "Chats",
      link: "/chats",
      icon: chats,
    },
    {
      text: "Saved",
      link: "/saved",
      icon: saved,
    },
    {
      text: "Profile",
      link: "/profile",
      icon: profile,
    },
    {
      text: "Settings",
      link: "/settings",
      icon: settings,
    },
  ];
  async function logout() {
    const request = await apiFetch("logout", "GET");
    console.log(request, "Logging out");
    navigate("/auth/login");
  }

  return (
    <div className="leftNavigation">
      <nav>
        <div>
          <img src={profile} alt="profilePicture" />
          <button onClick={() => logout()}>Logout</button>
        </div>
        <ul className="iconList">
          {navigationItems.map((item) => {
            return (
              <li key={item.text}>
                <Link to={item.link}>
                  <img src={item.icon} alt={item.text} />
                  <h4 className="iconText">{item.text}</h4>
                </Link>
              </li>
            );
          })}
        </ul>
        <button>
          <img src={newPost} alt="newPost" />
          <p>New Post</p>
        </button>
      </nav>
      <button>To top</button>
    </div>
  );
}
