import { useEffect, useState } from "react";
export function InferenceSection({
  quest,
  setWizardButtonMode,
  validateAnswer,
  setValidateAnswer,
  setResult,
  setResultMessage,
}) {
  // TODO: make option or something else to be able to watch the reading, or go back?
  const [selectedOption, setSelectedOption] = useState(null);

  useState(false);

  const inference = quest.inference;
  useEffect(() => {
    setWizardButtonMode("disabled");
  }, [setWizardButtonMode]);

  useEffect(() => {
    if (validateAnswer) {
      console.log("Validating answer...");
      if (selectedOption === undefined)
        return console.log("Answer hasnt been selected");

      console.log(selectedOption);
      console.log(inference.correctAnswerIndex);
      if (selectedOption === inference.correctAnswerIndex) {
        console.log("CORRECT ANSWER");
        setResult("correct");
        setWizardButtonMode("next");
        setResultMessage(null);
      } else {
        console.log("WRONG ANSWER");
        console.log(inference.options[inference.correctAnswerIndex]);
        setWizardButtonMode("next");
        setResult("wrong");
        setResultMessage(
          `The correct answer is:  ${inference.options[inference.correctAnswerIndex].text}`,
        );
      }
    }
    setValidateAnswer(false);
  }, [validateAnswer]);

  function handleOnChange(event) {
    console.log("Selected option:", event.target.value);
    setResult(null);
    setSelectedOption(Number(event.target.id));
    setWizardButtonMode("check");
  }

  if (!inference) {
    return <div>Loading...</div>;
  }

  return (
    <div className="multiple-choice-section">
      <h1>Inference Game</h1>
      <p className="multiple-choice">
        Based on the text, what does the text suggest?
      </p>
      <div className="options-container">
        {inference.options.map((option, index) => {
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
