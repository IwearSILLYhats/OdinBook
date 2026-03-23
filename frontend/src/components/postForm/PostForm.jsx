import { useState } from "react";
import "./PostForm.css";
import profileIcon from "../../assets/profile.svg";
import image from "../../assets/image.svg";
import gif from "../../assets/gif.svg";
import emoji from "../../assets/emoji.svg";
import CharacterCounter from "./CharacterCounter";

export default function PostForm() {
  const [content, setContent] = useState(null);
  const [count, setCount] = useState(300);
  function cancelForm() {}
  function postForm() {}
  function openDrafts() {}
  return (
    <div className="postFormModal">
      <form action="" method="post" className="postForm">
        <div className="postFormHeader">
          <button>Cancel</button>
          <div>
            <button>Drafts</button>
            <button>Post</button>
          </div>
        </div>
        <div className="postFormBody">
          <img src={profileIcon} alt="" className="iconLarge" />
          <textarea
            name=""
            id=""
            onChange={(e) => {
              setContent(e.target.value);
              setCount(e.target.value.length);
            }}
            value={content}
            maxLength={300}
            rows={5}
            placeholder="What's up?"
          ></textarea>
        </div>
        <div className="postFormFooter">
          <div>
            <button>
              <img src={image} alt="" className="iconSmall" />
            </button>
            <button>
              <img src={gif} alt="" className="iconSmall" />
            </button>
            <button>
              <img src={emoji} alt="" className="iconSmall" />
            </button>
          </div>
          <div>
            <CharacterCounter number={count} maximum={300} />
          </div>
        </div>
      </form>
    </div>
  );
}
