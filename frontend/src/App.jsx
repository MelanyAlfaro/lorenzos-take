import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { StudentDashboard } from "./pages/Student/dashboard/StudentDashboard";
import { QuestPage } from "./pages/Student/quests/QuestPage";
import { LoginPage } from "./pages/Auth/login/LoginPage";
import { RegisterStudentPage } from "./pages/Auth/register/RegisterStudentPage";
import { RegisterProfessorPage } from "./pages/Auth/register/RegisterProfessorPage";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterStudentPage />} />
      <Route path="professor/register" element={<RegisterProfessorPage />} />
      <Route path="student" element={<StudentDashboard />} />
      <Route path="student/quest/:id" element={<QuestPage />} />
    </Routes>
  );
}

export default App;
