import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);  // Initialize as null (loading state)

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoggedIn(false);  // No token, user is not logged in
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/check-token/${process.env.REACT_APP_NAME}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsLoggedIn(true);  // Token is valid
        } else {
          setIsLoggedIn(false); // Invalid token
        }
      } catch (error) {
        setIsLoggedIn(false);   // Error in fetching or token invalid
      }
    };

    checkToken();  // Run the token check once when the component mounts
  }, []);

  // Handle loading state while the token is being checked
  if (isLoggedIn === null) {
    return <div>Loading...</div>;  // You can customize this loading indicator
  }

  // Redirect to login if not logged in, otherwise render the protected content
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;