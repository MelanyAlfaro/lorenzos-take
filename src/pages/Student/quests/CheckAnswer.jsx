import LorenzoSad from "../../../assets/LorenzoSadHalf.png";
import "./CheckAnswer.css";
import LorenzoHappy from "../../../assets/LorenzoHappyHalf.png";
export function CheckAnswer({ result, resultMessage }) {
  const getRandomMessage = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const POSITIVE_MESSAGES = [
    "Spot on! 🎯",
    "You're a star! ⭐",
    "Perfect! ✨",
    "Amazing job! 🌈",
  ];
  const NEGATIVE_MESSAGES = [
    "Not quite! 💪",
    "So close! ",
    "Almost! 🔍",
    "Oops! Let's learn from that one. 🌱",
  ];
  return (
    <div className={`result-container-${result}`}>
      {result === "correct" ? (
        <img src={LorenzoHappy} className="mascot" />
      ) : (
        <img src={LorenzoSad} className="mascot" />
      )}
      <div className="result-content">
        {result === "correct"
          ? getRandomMessage(POSITIVE_MESSAGES)
          : getRandomMessage(NEGATIVE_MESSAGES)}
        {resultMessage && <p>{resultMessage}</p>}
      </div>
    </div>
  );
}
