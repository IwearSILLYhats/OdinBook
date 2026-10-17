import {createContext, useContext} from "react";

export const AuthContext = createContext("loading");

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within a AuthContextProvider");
    }
    return context;
}