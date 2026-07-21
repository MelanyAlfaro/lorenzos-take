import { createContext, useContext, useState } from "react";

// The context that will be available throughout the app
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialize from localStorage so the user stays logged in on refresh
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") ?? null;
  });

  // Called after a successful login or registration
  function login(authResponse) {
    localStorage.setItem("token", authResponse.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: authResponse.name,
        email: authResponse.email,
        role: authResponse.role,
        expiresAt: authResponse.expiresAt,
      }),
    );
    setToken(authResponse.token);
    setUser({
      name: authResponse.name,
      email: authResponse.email,
      role: authResponse.role,
      expiresAt: authResponse.expiresAt,
    });
  }

  // Called when the user logs out
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook so any component can access auth easily
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
