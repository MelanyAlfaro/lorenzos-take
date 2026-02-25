import "./QuestSection.css";
import { quests } from "../../data/quests";
import completedIcon from "../../assets/completedIcon.png";

export function QuestSection() {
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
              >
                {quest.completed ? "50 XP" : "Start Quest"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
