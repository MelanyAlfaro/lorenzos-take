import { useState } from "react";
import { useParams } from "react-router-dom";
import "../../data/quests";
export function QuestPage() {
  const [indexActivity, setIndexActivity] = useState(0);

  const { id } = useParams();
  return (
    <div>
      <h1>Quest Page </h1>
      <h1></h1>
    </div>
  );
}
