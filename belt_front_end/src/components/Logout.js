// Logout.js
import React, { useEffect } from 'react';
import { useAuth } from '../services/AuthProvider'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    // Directly call the logout function which now includes the API call
    const performLogout = async (  ) => {
      await logout();
    };

    performLogout();
  }, [logout, navigate]);

  return <Navigate to="/login" />;
};

export default Logout;