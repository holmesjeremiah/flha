// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create an AuthContext
const AuthContext = createContext();

// Export a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider to wrap your app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkToken = async () => {

    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/check-token/${process.env.REACT_APP_NAME}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`${process.env.REACT_APP_API_URL}/check-token/${process.env.REACT_APP_NAME}`);
      console.log(response.body);

      
      if (response.status === 200) {
        const data = await response.json();
        if (data.msg === 'Token has expired') {
          setIsLoggedIn(false);
          return;
        }

        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    } 
  };
  // Check if the user is logged in on component mount
  useEffect(() => {
    
    checkToken();
  }, []);

  // Login function
  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const getCurrentUser = () => {
    return 'user';
    }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};