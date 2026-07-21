import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LogoutButton.css";

export function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <button className="logout-button" onClick={handleLogout}>
      Log Out
    </button>
  );
}
