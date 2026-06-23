import profileIcon from "../../assets/profile.svg";

export default function ParentPreview({ parent }) {
  return (
    <div className="replyPreview">
      <img src={parent.profile_img_url || profileIcon} alt={parent.username} />
      <div className="previewBody">
        <h5>{parent.author.username}</h5>
        <p>{parent.content}</p>
      </div>
    </div>
  );
}
