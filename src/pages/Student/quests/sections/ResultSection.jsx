import { forwardRef, useImperativeHandle } from "react";

export const ResultSection = forwardRef(function ResultSection(props, ref) {
  useImperativeHandle(ref, () => ({
    validateAnswer: () => {},
    handleNext: () => {},
  }));
  return (
    <div>
      <h1>Result Section</h1>
    </div>
  );
});
