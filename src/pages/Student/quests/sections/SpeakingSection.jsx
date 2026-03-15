import { useState, useEffect } from "react";
import { shuffleArray } from "../../../util";

import "./SpeakingSection.css";

export function SpeakingSection({ quest }) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  const speakingSection = quest.speaking;

  const [currentWordsArray, setCurrentWordsArray] = useState(() =>
    shuffleArray(speakingSection[currentSentenceIndex].words),
  );

  // Variable use to save the item that is moving, saves id, and from where it's been dragged
  const [draggingWord, setDraggingWord] = useState(null);
  // Saves the name of the are over with are dragging
  const [dragOverZone, setDragOverZone] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentWordsArray(
      shuffleArray(speakingSection[currentSentenceIndex].words),
    );
  }, [currentSentenceIndex, speakingSection]);

  function verifyAnswer() {
    setCurrentSentenceIndex((prev) => prev + 1);
  }
  return (
    <div>
      <h1>Speaking Section</h1>
      <div className="scrambled-words-container">
        {currentWordsArray.map((word) => {
          return (
            <div className="scrambled-word" key={word} draggable>
              {word}
            </div>
          );
        })}
      </div>

      <div className="form-sentence-container"></div>
      <button className="verify-answer" onClick={verifyAnswer}>
        {" "}
        Verify Answer
      </button>
    </div>
  );
}
