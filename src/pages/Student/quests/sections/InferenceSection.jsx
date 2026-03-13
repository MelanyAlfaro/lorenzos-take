// InferenceSection.jsx
import { forwardRef } from "react";
import { ChoiceSection } from "./ChoiceSection";

export const InferenceSection = forwardRef((props, ref) => (
  <ChoiceSection
    {...props}
    ref={ref}
    component={props.quest.inference}
    title="Inference Game"
    question="Based on the text, what does the text suggest?"
  />
));
