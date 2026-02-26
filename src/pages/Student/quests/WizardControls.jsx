export function WizardControls({ onNext, onFinish, isLastStep }) {
  return (
    <div className="wizard-controls">
      <button className="next-button" onClick={isLastStep ? onFinish : onNext}>
        {isLastStep ? "Finish Quest" : "Next"}
      </button>
    </div>
  );
}
