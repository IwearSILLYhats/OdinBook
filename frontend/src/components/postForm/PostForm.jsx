import { useState } from "react";
import "./PostForm.css";
import profileIcon from "../../assets/profile.svg";
import image from "../../assets/image.svg";
import gif from "../../assets/gif.svg";
import emoji from "../../assets/emoji.svg";
import CharacterCounter from "./CharacterCounter";
import { useContext, useEffect } from "react";
import { PostFormContext } from "../../App";
import apiFetch from "../../../api/api";
import DraftModal from "./DraftModal";
import BackdropModal from "../BackdropModal";

export default function PostForm() {
  const formContext = useContext(PostFormContext);
  const [content, setContent] = useState("");
  const [count, setCount] = useState(0);
  const [postid, setPostid] = useState(null);
  const [drafts, setDrafts] = useState([]);
  const [modal, setModal] = useState(false);
  const [changes, setChanges] = useState(false);
  useEffect(() => {
    // placeholder for fetching drafts when form is rendered
    async function fetchDrafts() {
      const request = await apiFetch("posts/drafts", "GET");
      if (request.drafts.length > 0) setDrafts(request.drafts);
    }
    fetchDrafts();
  }, []);
  function cancelForm() {
    formContext.togglePostForm();
  }
  async function submitForm(e) {
    //Submits a post
    e.preventDefault();
    if (postid !== null) {
      const request = await apiFetch("posts/drafts", "PATCH", {
        content: content,
        id: postid,
        published: true,
      });
      console.log(request);
    } else {
      const request = await apiFetch("posts", "POST", {
        content: content,
      });
      console.log(request);
    }
  }
  function populateDraft(id, text) {
    setContent(text);
    setPostid(id);
    setChanges(false);
    setModal(false);
  }
  function modalData(type) {
    const data = {
      header: "Save Changes?",
      subheader: "You have unsaved changes, would you like to save?",
      buttons: [
        {
          buttonColor: "blue",
          buttonFunction: async () => {
            if (postid) {
              const draft = { id: postid, content: content };
              const request = await apiFetch("posts/drafts", "PATCH", draft);
              if (!request.error) {
                setDrafts([
                  request.draft,
                  ...drafts.filter((p) => p.id !== postid),
                ]);
                setChanges(false);
                type === "confirmDraft" ? setModal("drafts") : cancelForm();
              }
            } else {
              const request = await apiFetch("posts/drafts", "POST", {
                content: content,
              });
              if (request.error === null) {
                setDrafts([request.draft, ...drafts]);
                setChanges(false);
                type === "confirmDraft" ? setModal("drafts") : cancelForm();
              }
            }
          },
          buttonText: "Save Changes",
        },
        {
          buttonColor: "darkred",
          buttonFunction: () => {
            setContent("");
            setPostid(null);
            type === "confirmDraft" ? setModal("drafts") : cancelForm();
          },
          buttonText: "Discard",
        },
        {
          buttonColor: "grey",
          buttonFunction: () => {
            setModal(false);
          },
          buttonText: "Keep Editing",
        },
      ],
    };
    return data;
  }
  return (
    <div className="postFormModal">
      {modal === "drafts" && (
        <DraftModal
          drafts={drafts}
          back={setModal}
          populate={populateDraft}
          close={cancelForm}
        />
      )}
      {(modal === "confirmCancel" || modal === "confirmDraft") && (
        <BackdropModal options={modalData(modal)} />
      )}
      <form action="" method="post" className="postForm">
        <div className="postFormHeader">
          <button
            onClick={(e) => {
              if (changes && content.length > 0) {
                setModal("confirmCancel");
              } else {
                cancelForm();
              }
            }}
            type="button"
          >
            Cancel
          </button>
          <div>
            <button
              type="button"
              onClick={() => {
                if (changes && content.length > 0) {
                  setModal("confirmDraft");
                } else {
                  setModal("drafts");
                }
              }}
            >
              Drafts
            </button>
            <button onClick={(e) => submitForm(e)}>Post</button>
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
              if (changes === false) {
                setChanges(true);
              }
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
