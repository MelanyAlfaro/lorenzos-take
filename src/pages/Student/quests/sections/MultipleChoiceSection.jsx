import { useEffect, useState } from "react";
export function MultipleChoiceSection({
  quest,
  setWizardButtonMode,
  validateAnswer,
  setValidateAnswer,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const multipleChoice = quest.multipleChoice;

  useEffect(() => {
    setWizardButtonMode("disabled");
    console.log("MultipleChoiceSection mounted, button disabled");
  }, [setWizardButtonMode]);

  useEffect(() => {
    if (validateAnswer) {
      console.log("Validating answer...");
      if (!selectedOption) return console.log("Answer hasnt been selected");

      console.log(selectedOption);
      console.log(multipleChoice.correctAnswerIndex);
      if (selectedOption === multipleChoice.correctAnswerIndex) {
        console.log("CORRECT ANSWER");
      } else {
        console.log("WRONG ANSWER");
      }
    }
    setValidateAnswer(false);
  }, [validateAnswer]);

  function handleOnChange(event) {
    console.log("Selected option:", event.target.value);
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
