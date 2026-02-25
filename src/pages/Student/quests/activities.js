import { ReadingSection } from "./ReadingSection";
import { MultipleChoiceSection } from "./MultipleChoiceSection";
import { DragDropSection } from "./DragDropSection";
import { SpeakingSection } from "./SpeakingSection";
import { FlashcardSection } from "./FlashcardSection";

export const activities = [
  { id: "reading", component: ReadingSection },
  { id: "multiple-choice", component: MultipleChoiceSection },
  { id: "drag-drop", component: DragDropSection },
  { id: "speaking", component: SpeakingSection },
  { id: "flashcards", component: FlashcardSection },
];
