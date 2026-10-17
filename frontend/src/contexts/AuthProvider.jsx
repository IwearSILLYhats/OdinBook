import {AuthContext} from "./AuthContext";
import {useState, useEffect} from "react";
import { apiFetch } from "../../api/api";

export function AuthProvider({children}) {
    const [auth, setAuth] = useState("loading");
      useEffect(() => {
    async function checkSession() {
      const request = await apiFetch("auth/session", "GET");
      if (request.status === 200) {
        setAuth(true);
      } else {
        setAuth(false);
      }
  }
  checkSession();
}, [auth]);
    function authenticate(status) {
        if(status === 401) {
            setAuth(false);
        } else {
            setAuth(true);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                authenticate,
                setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}