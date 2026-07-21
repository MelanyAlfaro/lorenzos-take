import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { validateEmail, validatePassword } from "../validation";
import { API_URL } from "../../../api/config";
import "./LoginPage.css";

export function LoginPage() {
  const [activeTab, setActiveTab] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  function validate() {
    const newErrors = {};
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;
    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleLogin(e) {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const endpoint =
        activeTab === "student"
          ? `${API_URL}/api/auth/login/student`
          : `${API_URL}/api/auth/login/professor`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setServerError("Invalid email or password. Please try again.");
        return;
      }

      const data = await response.json();
      login(data);

      if (data.role === "student") navigate("/student");
      if (data.role === "professor") navigate("/professor");
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-logo">Lorenzo's Take</h1>
        <p className="auth-subtitle">Welcome back! Ready to keep learning?</p>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === "student" ? "active" : ""}`}
            onClick={() => setActiveTab("student")}
          >
            Student
          </button>
          <button
            className={`auth-tab ${activeTab === "professor" ? "active" : ""}`}
            onClick={() => setActiveTab("professor")}
          >
            Professor
          </button>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="auth-error">{errors.email}</p>}
          </div>

          <div className="auth-field">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="auth-error">{errors.password}</p>}
          </div>

          {serverError && <p className="auth-error">{serverError}</p>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {activeTab === "student" && (
          <p className="auth-link">
            Don't have an account?{" "}
            <Link to="/register">Sign up with an invitation code</Link>
          </p>
        )}

        {activeTab === "professor" && (
          <p className="auth-link">
            Don't have an account?{" "}
            <Link to="/professor/register">Create professor account</Link>
          </p>
        )}
      </div>
    </div>
  );
}
