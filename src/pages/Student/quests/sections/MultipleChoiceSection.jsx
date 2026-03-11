import { useEffect, useState } from "react";
export function MultipleChoiceSection({
  quest,
  setWizardButtonMode,
  validateAnswer,
  setValidateAnswer,
  setResult,
  setResultMessage,
  usedAttempts,
  setUsedAttempts,
}) {
  // TODO: make option or something else to be able to watch the reading, or go back?
  const [selectedOption, setSelectedOption] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useState(false);

  const multipleChoice = quest.multipleChoice;
  useEffect(() => {
    setWizardButtonMode("disabled");
  }, [setWizardButtonMode]);

  // Handler for answer validation
  function handleValidateAnswer() {
    console.log("Validating answer...");
    if (selectedOption === undefined) {
      console.log("Answer hasnt been selected");
      setValidateAnswer(false);
      return;
    }
    console.log(selectedOption);
    console.log(multipleChoice.correctAnswerIndex);
    if (selectedOption === multipleChoice.correctAnswerIndex) {
      console.log("CORRECT ANSWER");
      setDisabled(true);
      setResult("correct");
      setWizardButtonMode("next");
      setResultMessage(null);
    } else {
      console.log("WRONG ANSWER");
      console.log(multipleChoice.options[multipleChoice.correctAnswerIndex]);
      setResult("wrong");
      setUsedAttempts((previousValue) => {
        const newValue = previousValue + 1;
        if (newValue < 2) {
          setResultMessage("Try again! You can do it! 💪");
          console.log("Used attempts:", newValue);
        } else {
          setResultMessage(
            `The correct answer is:  ${multipleChoice.options[multipleChoice.correctAnswerIndex].text}`,
          );
          setWizardButtonMode("next");
        }
        return newValue;
      });
    }
    setValidateAnswer(false);
  }

  // Trigger validation when validateAnswer is true
  useEffect(() => {
    if (validateAnswer) {
      handleValidateAnswer();
    }
  }, [validateAnswer]);

  function handleOnChange(event) {
    console.log("Selected option:", event.target.value);
    setResult(null);
    setSelectedOption(Number(event.target.id));
    setWizardButtonMode("check");
  }

  if (!multipleChoice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="multiple-choice-section">
      <h1>Multiple Choice</h1>
      <p className="multiple-choice">What is the main idea of the text?</p>
      <div className="options-container">
        {multipleChoice.options.map((option, index) => {
          return (
            <div className="option" key={option.id}>
              <input
                type="radio"
                id={index}
                name="multiple-choice"
                value={option.text}
                className="default-radio-input"
                onChange={handleOnChange}
                disabled={disabled}
              />
              <span className="personalized-input"></span>
              {option.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
