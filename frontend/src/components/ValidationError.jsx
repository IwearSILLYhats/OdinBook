export default function ValidationError({ message }) {
  return (
    <div className="validationError">
      <p>{message}</p>
    </div>
  );
}
