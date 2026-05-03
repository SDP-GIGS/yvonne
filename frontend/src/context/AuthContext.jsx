import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { authAPI } from "../api/apiService";

const AuthContext = createContext();

// Role → dashboard route mapping (roles are UPPERCASE in the JWT)
const ROLE_ROUTES = {
  STUDENT: "/student",
  ADMIN: "/admin",
  WORK_SUPERVISOR: "/workplace",
  ACADEMIC_SUPERVISOR: "/academic",
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() => {
    const raw = localStorage.getItem("authTokens");
    return raw ? JSON.parse(raw) : null;
  });
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("authTokens");
    return raw ? jwtDecode(JSON.parse(raw).access) : null;
  });

  const loginUser = async (email, password) => {
    try {
      const { data } = await authAPI.login({ email, password });
      const decoded = jwtDecode(data.access);
      setAuthTokens(data);
      setUser(decoded);
      localStorage.setItem("authTokens", JSON.stringify(data));
      // Navigate to correct portal based on role in JWT
      const route = ROLE_ROUTES[decoded.role] || "/";
      navigate(route);
      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        "Login failed. Check your credentials.";
      return { success: false, message };
    }
  };

  const logoutUser = async () => {
    if (authTokens?.refresh) {
      try {
        await authAPI.logout(authTokens.refresh);
      } catch (_) {
        // Blacklist call failed - still clear local state
      }
    }
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  const registerUser = async (userData) => {
    try {
      const { data } = await authAPI.register(userData);
      return { success: true, data };
    } catch (err) {
      const errors = err.response?.data || { detail: "Registration failed." };
      return { success: false, errors };
    }
  };

  // Auto-refresh token before expiry
  useEffect(() => {
    if (!authTokens) return;
    const decoded = jwtDecode(authTokens.access);
    const msUntilExpiry = decoded.exp * 1000 - Date.now() - 60_000;
    if (msUntilExpiry <= 0) {
      logoutUser();
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const { data } = await authAPI.login({ refresh: authTokens.refresh });
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      } catch {
        logoutUser();
      }
    }, msUntilExpiry);
    return () => clearTimeout(timer);
  }, [authTokens]);

  return (
    <AuthContext.Provider
      value={{ user, authTokens, loginUser, logoutUser, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
