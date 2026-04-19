import lorenzoThumbsUp from "../../../../assets/LorenzoThumbsUp.png";
import "./SpeakingSectionInstructions.css";
export function SpeakingSectionInstructions() {
  const congratulationsMessages = [
    "Great job! You're doing amazing!",
    "Fantastic work! Keep it up!",
    "You're on fire! Keep going!",
    "Awesome! You're making great progress!",
    "Well done! You're doing fantastic!",
  ];

  return (
    <div className="instructions-container">
      <div className="instruction-image">
        <img
          src={lorenzoThumbsUp}
          alt="Lorenzo Thumbs Up"
          className="lorenzoThumbsUp"
        />
      </div>

      <div className="intructions-text">
        <h3>
          {
            congratulationsMessages[
              Math.floor(Math.random() * congratulationsMessages.length)
            ]
          }
        </h3>
        <p>
          In this activity, you will practice your speaking skills by saying one
          of the sentences you formed .
        </p>
        <p>
          First choose one of the sentences you formed in the previous activity,
          and then click the button below to start the speaking activity. You
          will be prompted to say the sentence aloud, and your pronunciation
          will be sent to the teacher for evaluation.
        </p>
      </div>
    </div>
  );
}
