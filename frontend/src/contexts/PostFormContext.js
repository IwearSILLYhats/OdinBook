import {createContext, useContext} from "react";

export const PostFormContext = createContext(null);

export function usePostFormContext() {
    const context = useContext(PostFormContext);
    if (!context) {
        throw new Error("usePostFormContext must be used within a PostFormContextProvider");
    }
    return context;
}