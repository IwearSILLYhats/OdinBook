import profileIcon from "../../assets/profile.svg";
import imageIcon from "../../assets/image.svg";
import "./MiniPostForm.css";
import { usePostFormContext } from "../../contexts/PostFormContext.js";

export default function MiniPostForm() {
  const formContext = usePostFormContext();
  return (
    <div className="miniForm" onClick={() => formContext.togglePostForm()}>
      <img src={profileIcon} alt="ProfileImg" className="icon imgSmall" />
      <span>What's up?</span>
      <img src={imageIcon} alt="Picture Icon" className="icon imgSmall" />
    </div>
  );
}
