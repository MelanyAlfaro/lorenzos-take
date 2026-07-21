import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { StudentDashboard } from "./pages/Student/dashboard/StudentDashboard";
import { QuestPage } from "./pages/Student/quests/QuestPage";
import { LoginPage } from "./pages/Auth/login/LoginPage";
import { RegisterStudentPage } from "./pages/Auth/register/RegisterStudentPage";
import { RegisterProfessorPage } from "./pages/Auth/register/RegisterProfessorPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterStudentPage />} />
      <Route path="professor/register" element={<RegisterProfessorPage />} />

      {/* Protected student routes */}
      <Route
        path="student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="student/quest/:id"
        element={
          <ProtectedRoute role="student">
            <QuestPage />
          </ProtectedRoute>
        }
      />

      {/* Protected professor routes  */}
      <Route
        path="professor"
        element={
          <ProtectedRoute role="professor">
            <div>Professor Dashboard — coming soon</div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
