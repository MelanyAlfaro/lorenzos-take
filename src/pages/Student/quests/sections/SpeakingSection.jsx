import { useState, useEffect } from "react";
import { shuffleArray } from "../../../util";
import { CheckAnswer } from "../CheckAnswer";
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

  // To know over which word of the formed sentence we are dragging, to insert before it
  const [dragOverWordId, setDragOverWordId] = useState(null);

  const [showCongratulations, setShowCongratulations] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (currentSentenceIndex < speakingSection.length) {
      setScrambledWords(
        shuffleArray(speakingSection[currentSentenceIndex].words),
      );
    }
  }, [currentSentenceIndex, speakingSection]);

  function verifyAnswer() {
    console.log("verify answer");
    if (scrambledWords.length === 0) {
      console.log("All words placed, you can verify the answer");
      let getFormedSentence = formedSentence[0].word + " ";
      for (let i = 1; i < formedSentence.length; i++) {
        getFormedSentence += formedSentence[i].word;

        if (i !== formedSentence.length - 1) {
          getFormedSentence += " ";
        }
      }

      console.log("formed sentence", getFormedSentence);
      console.log(
        speakingSection[currentSentenceIndex].correctSentence ===
          getFormedSentence,
      );
      if (
        speakingSection[currentSentenceIndex].correctSentence ===
        getFormedSentence
      ) {
        console.log("Correct answer");
        setShowCongratulations(true);

        let timer;

        if (!timer) {
          timer = setInterval(() => {
            setShowCongratulations(false);
          }, 5000);
        } else {
          clearInterval(timer);
        }

        if (currentSentenceIndex < speakingSection.length - 1) {
          setCurrentSentenceIndex(currentSentenceIndex + 1);
          setFormedSentence([]);
        } else {
          console.log("All sentences completed, know goes the speaking part");
        }
      } else {
        console.log("Wrong answer, try again");
      }
    } else {
      console.log("There are word in the scrambled ");
    }
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

    // First we know to know if the word ir from the scrambled container or from the formed sentence, to know from where we are dragging
    const sourceArray =
      from === "scrambled-words-container" ? scrambledWords : formedSentence;

    // Once with the source array, we can find the word that is being dragged, to move it to the new container
    const wordDragged = sourceArray.find((element) => element.id === id);
    if (!wordDragged) return;

    // Get a copy of the arrays to modify them, we will update the states at the end with the new arrays, to avoid multiple updates and re-renders, and problems with the async of the states
    let newScrambled = [...scrambledWords];
    let newFormed = [...formedSentence];

    // Whatever the source we remove the word from it
    if (from === "scrambled-words-container") {
      newScrambled = newScrambled.filter((word) => word.id !== id);
    } else {
      newFormed = newFormed.filter((word) => word.id !== id);
    }

    // If the destination is the scrambled container just addead to the end
    if (to === "scrambled-words-container") {
      newScrambled.push(wordDragged);
    } else {
      // If the destination is the formed sentence and we are dragging over a word, we insert before that word, if not we add to the end
      if (dragOverWordId && dragOverWordId !== id) {
        // We find the index of the word that we are dragging over, to insert before it
        const index = newFormed.findIndex((w) => w.id === dragOverWordId);

        // If I find the index
        if (index !== -1) {
          // Insert the word dragged in the position index without remove any element
          newFormed.splice(index, 0, wordDragged);
        } else {
          // If we don't find the index also ass to the end
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
      {showCongratulations && (
        <CheckAnswer className="result-container" result={"correct"} />
      )}
      <div className="content-container">
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
    </div>
  );
}
