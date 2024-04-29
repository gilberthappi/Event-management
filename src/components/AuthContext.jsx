// AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [userId, setUserId] = useState(""); // Add state for user ID

  // Function to login
  const login = (token, userId) => { // Modify the login function to accept user ID
    setUserToken(token);
    setUserId(userId); // Set user ID
    setIsLoggedIn(true);
    localStorage.setItem("userToken", token); // Store the token in local storage
    localStorage.setItem("userId", userId); // Store the user ID in local storage
  };

  // Function to logout
  const logout = () => {
    setUserToken("");
    setUserId(""); // Clear user ID
    setIsLoggedIn(false);
    localStorage.removeItem("userToken"); // Remove token from local storage
    localStorage.removeItem("userId"); // Remove user ID from local storage
  };

  // Check if user is logged in when component mounts
  useEffect(() => {
    const token = localStorage.getItem("userToken"); // Retrieve token from local storage
    const storedUserId = localStorage.getItem("userId"); // Retrieve user ID from local storage
    if (token && storedUserId) {
      login(token, storedUserId); // Log in with stored token and user ID
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userToken, userId }}> {/* Provide user ID in the context value */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
