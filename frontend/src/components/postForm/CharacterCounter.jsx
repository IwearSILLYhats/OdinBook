import "./CharacterCounter.css";
export default function CharacterCounter({ number, maximum }) {
  return (
    <div
      className="outerCircle"
      style={{
        "--p": `${Math.floor((number / maximum) * 100)}%`,
      }}
    >
      <div className="innerCircle">
        <p className="counter">{maximum - number}</p>
      </div>
    </div>
  );
}
