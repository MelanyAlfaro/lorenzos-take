import { forwardRef, useImperativeHandle } from "react";

export const ReadingSection = forwardRef(function ReadingSection(
  { quest },
  ref,
) {
  useImperativeHandle(ref, () => ({
    validateAnswer: () => {},
    handleNext: () => {},
  }));
  return (
    <div>
      <h1>Reading Section</h1>
      <p>{quest.reading.text}</p>
    </div>
  );
});
