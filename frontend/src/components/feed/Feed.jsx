import logo from "../../assets/favicon.ico";
import MiniPostForm from "../postForm/MiniPostForm";
import PostForm from "../postForm/PostForm";

export default function Feed() {
  return (
    <main>
      <header>
        <img src={logo} alt="Blabber" />
      </header>
      <MiniPostForm />
      <PostForm />
      <div className="postFeed">Post list</div>
    </main>
  );
}
