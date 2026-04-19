import { TOTAL_ACTIVITIES } from "../../constants";
import LorenzoThinking from "../../../assets/LorenzoThinkingHalf.png";
import xpStart from "../../../assets/xpStart.png";
import "./QuestHeader.css";
// TODO: update xp and progress bar with actual data from backend
export function QuestHeader({ title, indexActualActivity, onExit }) {
  const progress = (indexActualActivity / TOTAL_ACTIVITIES) * 100;

  return (
    <div className="quest-header-container">
      <img src={LorenzoThinking} className="lorenzo-thinking-img" />
      <div className="quest-header-top">
        <div className="quest-header-content">
          <h1 className="quest-header-title">{title}</h1>

          <div className="right-section">
            <div className="experience-container">
              <img src={xpStart} className="experiencia-start-image" />
              <p className="experience-points">120 XP</p>
            </div>

            <button className="exit-button" onClick={onExit}>
              X
            </button>
          </div>
        </div>
      </div>

      <div className="quest-header-bottom">
        <div className="quest-progress-text">
          {indexActualActivity} / {TOTAL_ACTIVITIES} Completed
        </div>

        <div className="quest-progress-bar">
          <div
            className="quest-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
