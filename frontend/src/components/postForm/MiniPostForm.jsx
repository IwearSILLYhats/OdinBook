import profileIcon from "../../assets/profile.svg";
import imageIcon from "../../assets/image.svg";
import "./MiniPostForm.css";
import { PostFormContext } from "../../App";
import { useContext } from "react";

export default function MiniPostForm() {
  const formContext = useContext(PostFormContext);
  return (
    <div className="miniForm" onClick={() => formContext.togglePostForm()}>
      <img src={profileIcon} alt="ProfileImg" />
      <span>What's up?</span>
      <img src={imageIcon} alt="Picture Icon" />
    </div>
  );
}
