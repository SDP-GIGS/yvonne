import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; //Need to : npm install jwt-decode
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    //initializing state with tokens from local storage if they exist
    const [authTokens, setAuthTokens] = useState (() =>
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null
    );
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async(email, password) =>{
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        }); 
    };
};

export default AuthContext;

//still needs to be completed