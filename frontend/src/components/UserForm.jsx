import { useState, useContext } from "react";
import { apiFetch, uploadRequest } from "../../api/api";
import { UserContext } from "../App";

export default function UserForm({ user, toggle }) {
  const { profile, updateProfile } = useContext(UserContext);
  const [bio, setBio] = useState("");
  const [pfp, setPfp] = useState(null);
  const [banner, setBanner] = useState(null);
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const body = {};
      let arr = [];
      if (bio) body.bio = bio;
      if (pfp) {
        body.avatar = true;
        arr.push({ type: "avatars", file: pfp });
      }
      if (banner) {
        body.banner = true;
        arr.push({ type: "banners", file: banner });
      }
      if (arr.length > 0) {
        let errors = [];
        const handleImages = await Promise.all(
          arr.map((e) => uploadRequest(e.type, e.file)),
        );
      }
      const patchProfile = await apiFetch("users", "PATCH", body);
      if (patchProfile.error) throw new Error(patchProfile.error);
      updateProfile(patchProfile.success);
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
          <button type="button" onClick={(e) => handleSubmit(e)}>
            Save
          </button>
        </div>
        <input
          type="file"
          name="banner"
          id=""
          onChange={(e) => {
            if (e.target.files && e.target.files[0])
              setBanner(e.target.files[0]);
          }}
        />
        <input
          type="file"
          name="profileImg"
          id=""
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) setPfp(e.target.files[0]);
          }}
        />
        <label htmlFor="bio" onChange={(e) => setBio(e.value)}>
          Description
        </label>
        <textarea
          name="bio"
          id=""
          placeholder="Tell us a bit about yourself"
          onChange={(e) => {
            setBio(e.target.value);
          }}
          value={bio}
          maxLength={300}
          rows={5}
        ></textarea>
      </form>
    </div>
  );
}
