import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserContextProvider ({ children }) {
    const [profile, setProfile] = useState(null);

    const updateProfile = (newProfile) => {
        setProfile(newProfile);
    };

    return (
        <UserContext.Provider value={{ profile, updateProfile }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
}