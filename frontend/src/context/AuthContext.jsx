import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { authAPI } from "../api/apiService";

const AuthContext = createContext();

const ROLE_ROUTES = {
  STUDENT: "/student",
  ADMIN: "/admin",
  WORK_SUPERVISOR: "/workplace",
  ACADEMIC_SUPERVISOR: "/academic",
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [authTokens, setAuthTokens] = useState(() => {
    const raw = localStorage.getItem("authTokens");
    return raw ? JSON.parse(raw) : null;
  });

  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("authTokens");
    try {
      return raw ? jwtDecode(JSON.parse(raw).access) : null;
    } catch {
      return null;
    }
  });

  const loginUser = async (credentials) => {
    const { data } = await authAPI.login(credentials);
    setAuthTokens(data);
    const decoded = jwtDecode(data.access);
    setUser(decoded);
    localStorage.setItem("authTokens", JSON.stringify(data));
    navigate(ROLE_ROUTES[decoded.role] || "/");
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const registerUser = async (userData) => {
    await authAPI.register(userData);
    navigate("/login");
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!authTokens) return;
    let decoded;
    try {
      decoded = jwtDecode(authTokens.access);
    } catch {
      logoutUser();
      return;
    }

    const msUntilExpiry = decoded.exp * 1000 - Date.now() - 60_000;
    if (msUntilExpiry <= 0) {
      logoutUser();
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const { data } = await authAPI.refreshToken(authTokens.refresh);
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
      value={{ user, authTokens, loading, loginUser, logoutUser, registerUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;