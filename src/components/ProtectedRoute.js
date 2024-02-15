import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const authToken = localStorage.getItem('authToken');
    
    if (!authToken) {
        // If there is no auth token in local storage, redirect to the login page
        return <Navigate to="/login" />;
    }
    
    // If there is an auth token, proceed to the requested page
    return children;
};

export default ProtectedRoute;