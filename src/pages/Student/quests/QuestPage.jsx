import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { quests } from "../../../data/quests";
import { QuestIntro } from "./QuestIntro";
import { activities } from "./activities";

export function QuestPage() {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

  // At the beggining show a welcome page
  const [showIntro, setShowIntro] = useState(true);

  const CurrentComponent = activities[currentActivityIndex].component;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000); // Show the intro for 5 seconds
    return () => clearTimeout(timer);
  }, []);

  const { id } = useParams();
  const quest = quests.find((quest) => quest.id === id);

  if (showIntro) {
    return <QuestIntro />;
  }
  return (
    <div>
      <h1>Quest Page </h1>
      <h1>{quest.id}</h1>
      <CurrentComponent />
    </div>
  );
}
