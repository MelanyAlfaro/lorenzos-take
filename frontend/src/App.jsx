import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import { StudentDashboard } from "./pages/Student/dashboard/StudentDashboard";
import { QuestPage } from "./pages/Student/quests/QuestPage";

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <>
            <h1>HomePage</h1>
            <Link to="/student">
              <button>Student Page</button>
            </Link>
          </>
        }
      />
      <Route path="student" element={<StudentDashboard />} />
      <Route path="student/quest/:id" element={<QuestPage />} />
    </Routes>
  );
}

export default App;
