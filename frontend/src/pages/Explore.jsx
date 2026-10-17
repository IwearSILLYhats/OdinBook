import { useEffect, useState } from "react";
import { apiFetch } from "../../api/api";
import "./Explore.css";
import UserCard from "../components/UserCard";
import { useAuthContext } from "../contexts/AuthContext.js";

export default function Explore () {
  const { authenticate } = useAuthContext();
  const [users, setUsers] = useState(null);
  useEffect(() => {
    async function fetchUsers() {
      const request = await apiFetch("users/explore");
      authenticate(request.status);
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
