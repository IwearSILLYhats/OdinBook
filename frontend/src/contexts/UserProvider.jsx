import {UserContext} from "./UserContext.js";
import { useState } from "react";
export function UserContextProvider ({ children }) {
    const [profile, setProfile] = useState(null);
    return (
        <UserContext.Provider value={{ profile, setProfile}}>
            {children}
        </UserContext.Provider>
    );
}