// MultipleChoiceSection.jsx
import { forwardRef } from "react";
import { ChoiceSection } from "./ChoiceSection";

export const MultipleChoiceSection = forwardRef((props, ref) => (
  <ChoiceSection
    {...props}
    ref={ref}
    component={props.quest.multipleChoice}
    title="Multiple Choice"
    question="What is the main idea of the text?"
  />
));
