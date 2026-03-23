import profileIcon from "../../assets/profile.svg";
import imageIcon from "../../assets/image.svg";
import "./MiniPostForm.css";

export default function MiniPostForm() {
  return (
    <div className="miniForm">
      <img src={profileIcon} alt="ProfileImg" />
      <span>What's up?</span>
      <img src={imageIcon} alt="Picture Icon" />
    </div>
  );
}
