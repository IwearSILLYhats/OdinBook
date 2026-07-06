import { useEffect, useState } from "react";
import apiFetch from "../../api/api";
import { Link } from "react-router";
import "./Explore.css";
import UserCard from "../components/UserCard";

export default function () {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    async function fetchUsers() {
      const request = await apiFetch("users/explore");
      if (request.users.length > 0) setUsers(request.users);
    }
    fetchUsers();
  }, []);
  return (
    <main className="explore">
      <div>
        <h2>Suggested Users</h2>
      </div>
      <ul className="userList">
        {!users && <p>No users found</p>}
        {users &&
          users.map((e) => {
            return <UserCard user={e} key={e.id} />;
          })}
      </ul>
    </main>
  );
}
