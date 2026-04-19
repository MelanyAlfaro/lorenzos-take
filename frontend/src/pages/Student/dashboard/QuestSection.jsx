import "./QuestSection.css";
import { quests } from "../../../data/quests";
import completedIcon from "../../../assets/completedIcon.png";
import { useNavigate } from "react-router-dom";

export function QuestSection() {
  const navigate = useNavigate();
  return (
    <div className="quest-section">
      <h2 className="available-quest-text">Available Quest</h2>
      <div className="quest-grid">
        {quests.map((quest) => {
          return (
            <div className="quest-card" key={quest.id}>
              <h2 className="quest-title">{quest.title}</h2>

              <div className="sub-header">
                {quest.completed ? (
                  <>
                    <img src={completedIcon} className="completed-icon" />
                    <p className="completed-label">Completed</p>
                  </>
                ) : (
                  <p className="quest-xp">50 XP</p>
                )}
              </div>

              <button
                className={
                  quest.completed ? "completed-button" : "start-button"
                }
                onClick={() => navigate(`/student/quest/${quest.id}`)}
              >
                {quest.completed ? "Review Quest" : "Start Quest"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
