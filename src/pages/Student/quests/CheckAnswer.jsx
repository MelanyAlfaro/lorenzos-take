export function CheckAnswer({ result }) {
  return (
    <div className={`result-container-${result}`}>
      {result === "correct" ? "CORRECT" : "WRONG"}
    </div>
  );
}
