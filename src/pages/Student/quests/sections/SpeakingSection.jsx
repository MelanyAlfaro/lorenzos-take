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

    const id = event.dataTransfer.getData("idDragged");
    const from = event.dataTransfer.getData("originDragged");

    if (!id) return;

    // 1. Obtener el item
    const sourceArray =
      from === "scrambled-words-container" ? scrambledWords : formedSentence;

    const wordDragged = sourceArray.find((element) => element.id === id);
    if (!wordDragged) return;

    // 2. Remover de origen (COPIA LOCAL)
    let newScrambled = [...scrambledWords];
    let newFormed = [...formedSentence];

    if (from === "scrambled-words-container") {
      newScrambled = newScrambled.filter((word) => word.id !== id);
    } else {
      newFormed = newFormed.filter((word) => word.id !== id);
    }

    // 3. Insertar en destino
    if (to === "scrambled-words-container") {
      newScrambled.push(wordDragged);
    } else {
      if (dragOverWordId && dragOverWordId !== id) {
        const index = newFormed.findIndex((w) => w.id === dragOverWordId);

        if (index !== -1) {
          newFormed.splice(index, 0, wordDragged);
        } else {
          newFormed.push(wordDragged);
        }
      } else {
        newFormed.push(wordDragged);
      }
    }

    // 4. Actualizar estados UNA sola vez
    setScrambledWords(newScrambled);
    setFormedSentence(newFormed);

    // limpiar UI
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
