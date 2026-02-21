import { useState } from "react";
import { useNavigate, NavLink } from "react-router";
import apiFetch from "../../api/api";

export default function Signup() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [validation, SetValidation] = useState(null);
  const navigate = useNavigate();

  function signupSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    const body = {
      email,
      username,
      password,
      confirm,
    };
    console.log(body);
    const request = apiFetch("signup", "POST", body);
  }

  return (
    <div className="signupWrapper">
      <form action="" method="post" onSubmit={(e) => signupSubmit(e)}>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
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
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirm">Confirm Password</label>
        <input
          type="password"
          name="confirm"
          id="confirm"
          placeholder="confirm password"
          required
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button type="submit" disabled={submitted}>
          Submit
        </button>
      </form>
      <button disabled="disabled">Sign in with Google</button>
      <p>
        Already have an account?{" "}
        <NavLink to={"/auth/login"}>Log in here</NavLink>
      </p>
      <p>
        Just want to check out the site?{" "}
        <NavLink to={"/guest"}>Log in as a guest</NavLink>
      </p>
    </div>
  );
}
