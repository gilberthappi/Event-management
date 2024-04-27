// AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState("");

  // Function to login
  const login = (token) => {
    setUserToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("userToken", token); // Store the token in local storage
  };

  // Function to logout
  const logout = () => {
    setUserToken("");
    setIsLoggedIn(false);
    localStorage.removeItem("userToken"); // Remove token from local storage
  };

  // Check if user is logged in when component mounts
  useEffect(() => {
    const token = localStorage.getItem("userToken"); // Retrieve token from local storage
    if (token) {
      login(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
