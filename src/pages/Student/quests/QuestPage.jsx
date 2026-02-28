import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { quests } from "../../../data/quests";
import { QuestIntro } from "./QuestIntro";
import { activities } from "./sections/activities";
import { WizardControls } from "./WizardControls";
import { useNavigate } from "react-router-dom";
import { ExitConfirmationDialog } from "./ExitConfirmationDialog";
import { QuestHeader } from "./QuestHeader";
import { CheckAnswer } from "./CheckAnswer";
import "./QuestPage.css";
export function QuestPage() {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  // At the beggining show a welcome page
  const [showIntro, setShowIntro] = useState(true);

  // States related to checking the answer and showing feedback
  const [wizardButtonMode, setWizardButtonMode] = useState("next");
  const [validateAnswer, setValidateAnswer] = useState(false);
  // null, correct, wrong
  const [result, setResult] = useState(null);
  const [resultMessage, setResultMessage] = useState(null);

  const CurrentComponent = activities[currentActivityIndex].component;

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000); // Show the intro for 5 seconds
    return () => clearTimeout(timer);
  }, []);

  const { id } = useParams();
  const quest = quests.find((quest) => quest.id === id);

  function onSkipIntro() {
    setShowIntro(false);
  }

  if (showIntro) {
    return <QuestIntro onSkipIntro={onSkipIntro} />;
  }

  function handleNext() {
    if (currentActivityIndex < activities.length - 1) {
      setCurrentActivityIndex(currentActivityIndex + 1);
    }
    setWizardButtonMode("disabled");
    setResult(null);
  }

  function handleExit() {
    setShowExitConfirmation(true);
  }

  function handleFinish() {
    // TODO: add logic to save the quest results, give XP, etc.
    navigate("/student");
  }
  return (
    <div>
      <QuestHeader
        title={quest.title}
        indexActualActivity={currentActivityIndex}
        onExit={handleExit}
      />
      <div className="quest-content-wrapper">
        <CurrentComponent
          quest={quest}
          setWizardButtonMode={setWizardButtonMode}
          validateAnswer={validateAnswer}
          setValidateAnswer={setValidateAnswer}
          setResult={setResult}
          setResultMessage={setResultMessage}
        />
      </div>

      <div className="bottom-container">
        {result && (
          <CheckAnswer
            result={result}
            resultMessage={resultMessage}
            className="check-answer-container"
          />
        )}
        <WizardControls
          className="wizard-button-container"
          onNext={handleNext}
          onFinish={handleFinish}
          isLastStep={currentActivityIndex === activities.length - 1}
          wizardButtonMode={wizardButtonMode}
          setValidateAnswer={setValidateAnswer}
        />
      </div>

      {showExitConfirmation && (
        <ExitConfirmationDialog
          onExit={() => {
            navigate("/student");
          }}
          onCancel={() => setShowExitConfirmation(false)}
        />
      )}
    </div>
  );
}
