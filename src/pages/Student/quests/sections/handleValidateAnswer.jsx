export function handleValidateAnswer({
  selectedOption,
  component,
  usedAttempts,
  setUsedAttempts,
  setResult,
  setResultMessage,
  setWizardButtonMode,
  setDisabled,
}) {
  console.log("Validating answer...");
  const newAttempts = usedAttempts + 1;
  setUsedAttempts(newAttempts);
  if (selectedOption === undefined) return;
  setDisabled(true);
  if (selectedOption === component.correctAnswerIndex) {
    setResult("correct");
    setWizardButtonMode("next");
    setResultMessage(null);
  } else {
    setResult("wrong");
    if (newAttempts < 2) {
      setResultMessage("Try again! You can do it! 💪");
      setWizardButtonMode("Try again");
    } else {
      setResultMessage(
        `The correct answer is: ${component.options[component.correctAnswerIndex].text}`,
      );
      setWizardButtonMode("next");
    }
  }
}
