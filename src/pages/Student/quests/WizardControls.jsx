export function WizardControls({ onExit, onNext, onFinish, isLastStep }) {
  return (
    <div className="wizard-controls">
      <button className="exit-button" onClick={onExit}>
        Exit
      </button>
      <button className="next-button" onClick={isLastStep ? onFinish : onNext}>
        {isLastStep ? "Finish Quest" : "Next"}
      </button>
    </div>
  );
}
