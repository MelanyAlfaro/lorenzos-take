import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  // No token — redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Wrong role — redirect to login
  if (role && user.role !== role) return <Navigate to="/login" replace />;

  return children;
}
