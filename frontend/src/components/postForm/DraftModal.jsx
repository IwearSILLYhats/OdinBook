import { useState } from "react";
import BackdropModal from "../BackdropModal";
import apiFetch from "../../../api/api";

export default function DraftModal({ back, close, drafts, populate }) {
  const [confirmationModal, setConfirmationModal] = useState(false);
  function clickHandler(draftId, draftText, event) {
    if (event.target.classList.contains("discardButton")) {
      // Opens confirmation modal populated with selected draft
      setConfirmationModal(draftId);
    } else {
      populate(draftId, draftText);
      back(false);
    }
  }
  const modalData = {
    header: "Discard draft?",
    subheader: "This draft will be permanently deleted.",
    buttons: [
      {
        buttonColor: "darkred",
        buttonFunction: async () => {
          const request = await apiFetch("posts", "DELETE", {
            id: confirmationModal,
          });
          if (!request.error) {
            close();
          }
        },
        buttonText: "Discard",
      },
      {
        buttonColor: "grey",
        buttonFunction: () => {
          setConfirmationModal(false);
        },
        buttonText: "Cancel",
      },
    ],
  };
  return (
    <div className="draftModalBackdrop">
      {confirmationModal && <BackdropModal options={modalData} />}
      <div className="draftModal">
        <div className="draftModalHeader">
          <button type="button" onClick={() => back(false)}>
            Back
          </button>
          <h3>Drafts</h3>
        </div>
        <ul className="draftModalList">
          {drafts &&
            drafts.length > 0 &&
            drafts.map((draft) => {
              return (
                <li
                  className="draftCard"
                  key={draft.id}
                  onClick={(e) => {
                    clickHandler(draft.id, draft.content, e);
                  }}
                >
                  <div className="draftCardHeader">
                    <p>Time since created</p>
                    <button type="button" className="discardButton">
                      ...
                    </button>
                  </div>
                  <div className="draftCardBody">
                    <h5>{draft.content}</h5>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
