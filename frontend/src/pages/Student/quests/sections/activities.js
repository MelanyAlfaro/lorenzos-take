import { ReadingSection } from "./ReadingSection";
import { MultipleChoiceSection } from "./MultipleChoiceSection";
import { DragDropSection } from "./DragDropSection";
import { SentenceConstructionSection } from "./SentenceConstructionSection";
import { FlashcardSection } from "./FlashcardSection";
import { ResultSection } from "./ResultSection";
import { InferenceSection } from "./InferenceSection";
import { SpeakingSection } from "./SpeakingSection";
import { SpeakingSectionInstructions } from "./SpeakingSectionInstructions";

export const activities = [
  // { id: "reading", component: ReadingSection },
  // { id: "multiple-choice", component: MultipleChoiceSection },
  // { id: "drag-drop", component: DragDropSection },
  // { id: "inference", component: InferenceSection },
  // { id: "construction", component: SentenceConstructionSection },
  { id: "speaking-instructions", component: SpeakingSectionInstructions },
  { id: "speaking", component: SpeakingSection },
  { id: "flashcards", component: FlashcardSection },
  { id: "results", component: ResultSection },
];
