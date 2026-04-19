import "./SpeakingSectionOptions.css";

export function SpeakingSectionOptions({ quest, onOptionClick }) {
  // Define color classes (add these to your CSS file)
  const colorClasses = [
    "speaking-option-pink",
    "speaking-option-blue",
    "speaking-option-yellow",
    "speaking-option-green",
  ];

  return (
    <div className="speaking-options-container">
      <div className="pick-option-instruction">
        Pick an option to say the sentence out loud:
      </div>
      {quest.speaking.map((itemSpeaking, index) => {
        const colorClass = colorClasses[index % colorClasses.length];
        return (
          <button
            key={itemSpeaking.answer.id}
            className={`speaking-option-button ${colorClass}`}
            onClick={() => {
              onOptionClick(itemSpeaking.answer.sentence);
            }}
          >
            {itemSpeaking.answer.sentence}
          </button>
        );
      })}
    </div>
  );
}
