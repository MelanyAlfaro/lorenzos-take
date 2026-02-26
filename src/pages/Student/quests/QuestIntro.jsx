export function QuestIntro({ title, onSkipIntro }) {
  return (
    <div className="quest-welcoming">
      <button className="cancel"></button>
      <p className="welcome-text">Welcome to the quest</p>
      <p className="quest-title">{title}</p>
      <p>Are you ready for the challenge? Let's start</p>
      <button onClick={onSkipIntro}>Skip</button>
    </div>
  );
}
