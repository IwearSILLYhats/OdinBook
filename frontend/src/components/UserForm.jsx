export default function UserForm({ user, toggle }) {
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
        <input type="file" name="banner" id="" />
        <input type="file" name="profileImg" id="" />
        <label htmlFor="username">Display name</label>
        <input type="text" name="username" id="" placeholder="e.g. John Doe" />
        <label htmlFor="bio">Description</label>
        <textarea
          name="bio"
          id=""
          placeholder="Tell us a bit about yourself"
        ></textarea>
      </form>
    </div>
  );
}
