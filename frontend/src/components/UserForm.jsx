import { useState } from "react";
import { apiFetch, uploadRequest } from "../../api/api";

export default function UserForm({ user, toggle }) {
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const [pfp, setPfp] = useState(null);
  const [banner, setBanner] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();
    const body = {};
    let arr = [];
    if (username) body.username = username;
    if (bio) body.bio = bio;
    if (pfp) {
      body.profile_img_url = true;
      arr.push("avatar");
    }
    if (banner) {
      body.banner = banner.name;
      arr.push("banner");
    }
    try {
      const initialRequest = await apiFetch("/upload/banner");
    } catch (error) {
      console.log(error);
      return;
    }
  }
  return (
    <div id="userFormBackdrop">
      <form action="" method="post" id="userForm">
        <div id="userFormUi" className="flexRow">
          <button type="button" onClick={() => toggle()}>
            Cancel
          </button>
          <h5>Edit Profile</h5>
          <button type="button">Save</button>
        </div>
        <input
          type="file"
          name="banner"
          id=""
          onChange={(e) => setBanner(e.value)}
        />
        <input
          type="file"
          name="profileImg"
          id=""
          onChange={(e) => setPfp(e.value)}
        />
        <label htmlFor="username">Display name</label>
        <input
          type="text"
          name="username"
          id=""
          placeholder="e.g. John Doe"
          onChange={(e) => setUsername(e.value)}
        />
        <label htmlFor="bio" onChange={(e) => setBio(e.value)}>
          Description
        </label>
        <textarea
          name="bio"
          id=""
          placeholder="Tell us a bit about yourself"
        ></textarea>
      </form>
    </div>
  );
}
