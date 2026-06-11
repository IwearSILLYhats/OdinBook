import PostCard from "../components/feed/PostCard";

export default function PostDetail() {
  return (
    <div className="postDetail">
      <div className="postHeader">
        <button type="button">Left Arrow</button>
        <h3>Post</h3>
        <button type="button">Filters</button>
      </div>
      <PostCard post={"test"} variant={"detail"} />
      <div className="replyMiniForm">
        <img src="" alt="profilePicture" className="iconSmall" />
        <span>Write your reply</span>
      </div>
      <ul className="replyList"></ul>
    </div>
  );
}
