import {PostFormContext} from "./PostFormContext.js";
import { useState } from "react";

export function PostFormContextProvider({children}) {
    const [postForm, setPostForm] = useState(false);
    const [parent, setParent] = useState(null);
    
    const togglePostForm = () => {
        setPostForm(!postForm);
    };

    return (
        <PostFormContext.Provider
            value={{
                postForm,
                parent,
                togglePostForm,
                setParent,
            }}
        >
            {children}
        </PostFormContext.Provider>
    );
}