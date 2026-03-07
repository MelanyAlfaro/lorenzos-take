import { ReadingSection } from "./ReadingSection";
import { MultipleChoiceSection } from "./MultipleChoiceSection";
import { DragDropSection } from "./DragDropSection";
import { SpeakingSection } from "./SpeakingSection";
import { FlashcardSection } from "./FlashcardSection";
import { ResultSection } from "./ResultSection";
import { InferenceSection } from "./InferenceSection";
export const activities = [
  { id: "reading", component: ReadingSection },
  { id: "multiple-choice", component: MultipleChoiceSection },
  { id: "drag-drop", component: DragDropSection },
  { is: "inference ", component: InferenceSection },
  { id: "speaking", component: SpeakingSection },
  { id: "flashcards", component: FlashcardSection },
  { id: "results", component: ResultSection },
];
