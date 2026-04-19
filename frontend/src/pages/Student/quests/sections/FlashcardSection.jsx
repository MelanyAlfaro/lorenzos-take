import { forwardRef, useImperativeHandle } from "react";

export const FlashcardSection = forwardRef(
  function FlashcardSection(props, ref) {
    useImperativeHandle(ref, () => ({
      validateAnswer: () => {},
      handleNext: () => {},
    }));
    return (
      <div>
        <h1>Flashcard Section</h1>
      </div>
    );
  },
);
