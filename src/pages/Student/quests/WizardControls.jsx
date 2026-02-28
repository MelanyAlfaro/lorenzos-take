export function WizardControls({
  onNext,
  onFinish,
  isLastStep,
  wizardButtonMode,

  setValidateAnswer,
}) {
  if (isLastStep) {
    return (
      <button className="finish-wizard-button" onClick={onFinish}>
        Finish Quest
      </button>
    );
  }

  if (wizardButtonMode === "disabled") {
    return <button className="next-wizzard-button-disabled">Next</button>;
  } else if (wizardButtonMode === "check") {
    return (
      <button
        className="check-wizard-button"
        onClick={() => setValidateAnswer(true)}
      >
        Check Answer
      </button>
    );
  }

  return (
    <div className="wizard-controls">
      <button className="next-button" onClick={isLastStep ? onFinish : onNext}>
        {isLastStep ? "Finish Quest" : "Next"}
      </button>
    </div>
  );
}
