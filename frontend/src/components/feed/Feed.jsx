import { useOutletContext } from "react-router";
import logo from "../../assets/favicon.ico";
import MiniPostForm from "../postForm/MiniPostForm";
import PostCard from "./PostCard";
import "./Feed.css";

export default function Feed() {
  const content = useOutletContext();
  return (
    <main>
      <header>
        <img src={logo} alt="Blabber" />
      </header>
      <MiniPostForm />
      <ul className="postFeed">
        {content &&
          content.map((e) => {
            return <PostCard post={e} key={e.id} />;
          })}
      </ul>
    </main>
  );
}
