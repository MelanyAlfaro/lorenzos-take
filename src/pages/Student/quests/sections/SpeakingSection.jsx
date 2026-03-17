import { useState, useEffect } from "react";
import { shuffleArray } from "../../../util";

import "./SpeakingSection.css";

export function SpeakingSection({ quest }) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  const speakingSection = quest.speaking;

  // Variable use to save the item that is moving, saves id, and from where it's been dragged
  const [draggingWord, setDraggingWord] = useState(null);
  // Saves the name of the are over with are dragging
  const [dragOverZone, setDragOverZone] = useState(null);

  const [scrambledWords, setScrambledWords] = useState(() =>
    shuffleArray(speakingSection[currentSentenceIndex].words),
  );

  const [formedSentence, setFormedSentence] = useState([]);

  const [dragOverWordId, setDragOverWordId] = useState(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScrambledWords(
      shuffleArray(speakingSection[currentSentenceIndex].words),
    );
  }, [currentSentenceIndex, speakingSection]);

  function verifyAnswer() {
    setCurrentSentenceIndex((prev) => prev + 1);
  }

  function handleOnDragOver(event, zone) {
    event.preventDefault();
    setDragOverZone(zone);
  }

  function handleDragStart(event, itemID, from) {
    console.log("drag start", itemID, from);
    // TODO: Check if I really new this, it is for the visual part
    setDraggingWord({ id: itemID, from });
    event.dataTransfer.setData("idDragged", itemID);
    event.dataTransfer.setData("originDragged", from);
    event.dataTransfer.effectAllowed = "move";
  }

  function handleOnDrop(event, to) {
    event.preventDefault();
    console.log("drop", to);

    if (!draggingWord) return;

    const id = event.dataTransfer.getData("idDragged");
    const from = event.dataTransfer.getData("originDragged");

    // If when dragging the user placed in the same place, dont do anything
    // If when dragging the user placed in the same place, dont do anything
    if (from === to && !dragOverWordId) {
      setDraggingWord(null);
      setDragOverZone(null);
      return;
    }

    // Get the item that is being dragged
    const wordDragged =
      from === "scrambled-words-container"
        ? scrambledWords.find((element) => element.id === id)
        : formedSentence.find((element) => element.id === id);

    // TODO: check if there is a better way to this
    if (!wordDragged) {
      console.warn(`Item ${id} not found in ${from}`);
      return;
    }

    // Take the dropped element from where it was before
    if (from === "scrambled-words-container") {
      setScrambledWords((prevWords) =>
        prevWords.filter((word) => word.id !== id),
      );
    }

    // At item to where it was drop
    if (to === "scrambled-words-container") {
      setScrambledWords((prevWords) => [...prevWords, wordDragged]);
    } else {
      const formedSentenceWithoutDragged = formedSentence.filter(
        (word) => word.id !== id,
      );

      if (dragOverWordId && dragOverWordId !== id) {
        const insertIndex = formedSentenceWithoutDragged.findIndex(
          (element) => element.id === dragOverWordId,
        );

        if (insertIndex !== -1) {
          const reorderedSentence = [...formedSentenceWithoutDragged];
          reorderedSentence.splice(insertIndex, 0, wordDragged);
          return setFormedSentence(reorderedSentence);
        }
      }

      setFormedSentence((prevWords) => [...prevWords, wordDragged]);
    }

    setDraggingWord(null);
    setDragOverZone(null);
    setDragOverWordId(null);
  }
  return (
    <div>
      <h1>Speaking Section</h1>
      <div
        className="scrambled-words-container"
        onDragOver={(event) =>
          handleOnDragOver(event, "scrambled-words-container")
        }
        onDrop={(event) => handleOnDrop(event, "scrambled-words-container")}
        onDragLeave={() => setDragOverZone(null)}
      >
        {scrambledWords.length > 0
          ? scrambledWords.map((element) => {
              return (
                <div
                  className="scrambled-word"
                  key={element.id}
                  draggable
                  onDragStart={(event) =>
                    handleDragStart(
                      event,
                      element.id,
                      "scrambled-words-container",
                    )
                  }
                  onDragEnd={() => {
                    setDraggingWord(null);
                    setDragOverZone(null);
                    setDragOverWordId(null);
                  }}
                >
                  {element.word}
                </div>
              );
            })
          : "All words placed!"}
      </div>

      <div
        className="form-sentence-container"
        onDragOver={(event) =>
          handleOnDragOver(event, "form-sentence-container")
        }
        onDrop={(event) => handleOnDrop(event, "form-sentence-container")}
        onDragLeave={() => setDragOverZone(null)}
      >
        {formedSentence.length > 0
          ? formedSentence.map((element) => {
              return (
                <div
                  className="element-formed-sentence"
                  key={element.id}
                  draggable
                  onDragStart={(event) =>
                    handleDragStart(
                      event,
                      element.id,
                      "form-sentence-container",
                    )
                  }
                  onDragEnd={() => {
                    setDraggingWord(null);
                    setDragOverZone(null);
                    setDragOverWordId(null);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragOverWordId(element.id);
                  }}
                >
                  {element.word}
                </div>
              );
            })
          : "Form the sentence here"}
      </div>
      <button className="verify-answer" onClick={verifyAnswer}>
        {" "}
        Verify Answer
      </button>
    </div>
  );
}
