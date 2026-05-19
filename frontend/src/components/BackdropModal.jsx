export default function BackdropModal({ options }) {
  const { buttons, header, subheader } = options;
  /* options object structure: {
    header: String,
    subheader: String,
    buttons: [{
    buttonColor: String,
    buttonText: String,
    buttonFunction: Function,
      }]
  } */
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
