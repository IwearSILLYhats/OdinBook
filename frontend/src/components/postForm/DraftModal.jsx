export default function DraftModal({ back, drafts, populate }) {
  function clickHandler(draftId, draftText, event) {
    if (event.target.classList.contains("discardButton")) {
      // TODO: add functionality to delete/discard a draft
    } else {
      populate(draftId, draftText);
      back(false);
    }
  }
  return (
    <div className="draftModalBackdrop">
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
