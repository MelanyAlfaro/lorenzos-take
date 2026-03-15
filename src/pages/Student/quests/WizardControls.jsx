export function WizardControls({
  onNext,
  onFinish,
  isLastStep,
  wizardButtonMode,
  onCheckAnswer,
  onTryAgain,
}) {
  if (isLastStep) {
    return (
      <button className="finish-wizard-button" onClick={onFinish}>
        Finish Quest
      </button>
    );
  }

  if (wizardButtonMode === "disabled") {
    //TODO : REMOVE
    return (
      <button className="next-wizzard-button-disabled" onClick={onNext}>
        Next
      </button>
    );
  } else if (wizardButtonMode === "check") {
    return (
      <button className="check-wizard-button" onClick={onCheckAnswer}>
        Check Answer
      </button>
    );
  } else if (wizardButtonMode === "next") {
    return (
      <button className="next-wizard-button" onClick={onNext}>
        Next
      </button>
    );
  } else if (wizardButtonMode === "Try again") {
    return (
      <button className="try-again-wizard-button" onClick={onTryAgain}>
        Try again
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
