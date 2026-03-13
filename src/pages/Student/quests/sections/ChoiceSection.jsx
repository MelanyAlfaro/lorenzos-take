// ChoiceSection.jsx — componente base compartido
import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { handleValidateAnswer } from "./handleValidateAnswer";

export const ChoiceSection = forwardRef(function ChoiceSection(
  {
    component, // quest.multipleChoice || quest.inference
    title, // "Multiple Choice" || "Inference Game"
    question, // The specific question for the activity
    setWizardButtonMode,
    setResult,
    setResultMessage,
    usedAttempts,
    setUsedAttempts,
    disabled,
    setDisabled,
  },
  ref,
) {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setWizardButtonMode("disabled");
  }, [setWizardButtonMode]);

  useEffect(() => {
    setUsedAttempts(0);
    setResult(null);
    setResultMessage(null);
    setDisabled(false);
  }, []);

  useImperativeHandle(ref, () => ({
    validateAnswer: () =>
      handleValidateAnswer({
        selectedOption,
        component,
        usedAttempts,
        setUsedAttempts,
        setResult,
        setWizardButtonMode,
        setResultMessage,
        setDisabled,
        disabled,
      }),
  }));

  function handleOnChange(event) {
    setResult(null);
    setSelectedOption(Number(event.target.id));
    setWizardButtonMode("check");
  }

  if (!component) {
    return <div>Loading...</div>;
  }

  return (
    <div className="multiple-choice-section">
      <h1>{title}</h1>
      <div className="remaing-attempts-container">
        <p className="remaining-attempts">
          Remaining attempts: {2 - usedAttempts}
        </p>
      </div>
      <p className="multiple-choice">{question}</p>
      <div className="options-container">
        {component.options.map((option, index) => (
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
        ))}
      </div>
    </div>
  );
});
