export default function BackdropModal({ buttons, header, subheader }) {
  return (
    <div className="modalBackdrop">
      <div className="modalCard">
        {header && <h3>{header}</h3>}
        {subheader && <p>{subheader}</p>}
        <ul>
          {buttons &&
            buttons.map((btn) => {
              return (
                <li>
                  <button
                    type="button"
                    style={{ backgroundColor: btn.buttonColor }}
                    onClick={() => btn.buttonFunction()}
                  >
                    {btn.buttonText}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
