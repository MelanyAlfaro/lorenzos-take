export function ExitConfirmationDialog({ onExit, onCancel }) {
  return (
    <div>
      <h1>Are you sure you want to exit?</h1>
      <button onClick={onExit}>Exit</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
