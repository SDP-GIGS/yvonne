import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    );

    const [user, setUser] = useState(() =>
        localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access) : null
    );

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.status === 200) {
                setAuthTokens(data);
                const decodedUser = jwtDecode(data.access);
                setUser(decodedUser);
                localStorage.setItem('authTokens', JSON.stringify(data));

                // Navigate based on role
                const role = decodedUser.role || 'STUDENT';
                if (role === 'ADMIN') navigate('/admin-dashboard');
                else if (role === 'STUDENT') navigate('/student-dashboard');
                else if (role === 'WORK_SUPERVISOR') navigate('/workplace-dashboard');
                else if (role === 'ACADEMIC_SUPERVISOR') navigate('/academic-dashboard');
                else navigate('/dashboard');
            } else {
                alert('Invalid credentials!');
            }
        } catch (error) {
            console.error("Login error:", error);
            alert('Something went wrong during login.');
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    };

    const contextData = {
        user,
        authTokens,
        setAuthTokens,
        setUser,
        loginUser,
        logoutUser,
        loading
    };

    useEffect(() => {
        setLoading(false);
    }, [authTokens]);

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
