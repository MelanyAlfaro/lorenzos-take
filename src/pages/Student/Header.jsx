import xpStart from "./images/xpStart.png";
import ProfileDefault from "../../assets/profileDefault.png";
import LorenzoWaving from "../../assets/lorenzoWavingHalf.png";

import "./Header.css";
export function Header() {
  return (
    <div className="header-container">
      <div className="left-section">
        <img src={LorenzoWaving} className="header-mascot" />

        <h1 className="logo">Lorenzo's Take</h1>
      </div>

      <div className="header-right">
        <div className="experience-container">
          <img src={xpStart} className="experiencia-start-image"></img>
          <p className="experience-points">120 XP</p>
        </div>
        <div className="profile-container">
          <img src={ProfileDefault} className="profile-image"></img>
          <p className="profile-name">Lorenzo</p>
        </div>
      </div>
    </div>
  );
}
