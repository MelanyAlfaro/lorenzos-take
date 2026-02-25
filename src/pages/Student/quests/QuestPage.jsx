import { useState } from "react";
import { useParams } from "react-router-dom";
import { quests } from "../../../data/quests";

export function QuestPage() {
  const [indexActivity, setIndexActivity] = useState(0);

  const { id } = useParams();
  const quest = quests.find((quest) => quest.id === id);

  return (
    <div>
      <h1>Quest Page </h1>
      <h1>{quest.id}</h1>
    </div>
  );
}
