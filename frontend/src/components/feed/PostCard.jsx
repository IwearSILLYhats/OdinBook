export default function PostCard({ post }) {
  return (
    <div className="postCard">
      <div className="postHeader">
        <p>Profile Picture</p>
        <p>Username</p>
        <p>Verified Checkmark</p>
        <p>Post Age</p>
      </div>
      <div className="postBody">
        <p>Post Content</p>
        <p>Attached Image</p>
      </div>
      <div className="postFooter">
        <button type="button">Replies</button>
        <button type="button">Repost</button>
        <button type="button">Like</button>
        <button type="button">Save</button>
        <button type="button">Share</button>
        <button type="button">Options</button>
      </div>
    </div>
  );
}
