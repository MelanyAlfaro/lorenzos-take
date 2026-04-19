import LorenzoWelcome from "../../../assets/lorenzoWaving.png";

import "./WelcomeCard.css";
export function WelcomeCard() {
  // TODO: Replace with actual data from backend
  const completedQuests = 6;
  const totalQuests = 7;
  const progressPercentage = (completedQuests / totalQuests) * 100;

  return (
    <div className="welcome-card-container">
      <div className="background-layer"></div>
      <img className="mascot-layer" src={LorenzoWelcome}></img>

      <div className="content-layer">
        <div className="welcome-message">
          <h1>Welcome back, Lorenzo!</h1>
          <p>Ready for your next, challenge?</p>
        </div>
        <div className="progress-container">
          <p>
            {completedQuests}/{totalQuests} Quest Completed
          </p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
