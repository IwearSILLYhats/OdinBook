import { useState } from "react";
import { useNavigate, NavLink } from "react-router";
import apiFetch from "../../api/api";

export default function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [validation, SetValidation] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  async function loginSubmit(event) {
    event.preventDefault();
    // setSubmitted(true);
    const body = { username, password };
    const request = await apiFetch("login/local", "POST", body);
    if (request.error === null) {
      navigate("/");
    }
    console.log(request);
  }
  async function googleLogin() {
    window.location.href = "http://localhost:3000/login/google";
  }

  async function guestLogin() {
    const request = await apiFetch("login/guest", "GET", null);
    if (request.error === null) {
      navigate("/");
    }
  }

  return (
    <div className="loginWrapper">
      <form action="" method="post" onSubmit={(e) => loginSubmit(e)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={submitted}>
          Login
        </button>
      </form>
      <button disabled={submitted} onClick={() => googleLogin()}>
        Login with Google
      </button>
      <p>
        Don't have an account?{" "}
        <NavLink to={"/auth/signup"}>Sign up here</NavLink>
      </p>
      <p>Just want to check out the site?</p>
      <button onClick={() => guestLogin()}>Login as a guest</button>
    </div>
  );
}
