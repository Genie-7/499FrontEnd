import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userType, setUserType] = useState(null); // Add userType to manage different user roles

  const login = async (email, password, navigate) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const { token, user } = response.data.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', user.id);
      setAuthToken(token);

      // Directly determine user type after login
      // Note: You might want to adjust this based on how you manage user roles
      const profileResponse = await axios.get('http://localhost:8000/api/getProfile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        }
      });

      if (profileResponse.data.data.doctor) {
        localStorage.setItem('doctorId', profileResponse.data.data.doctor.id);
        setUserType('doctor');
        navigate('/doctorDashboard');
      } else if (profileResponse.data.data.student) {
        localStorage.setItem('studentId', profileResponse.data.data.student.id);
        setUserType('student');
        navigate('/studentDashboard');
      } else {
      }
    } catch (error) {
      console.error(error.response?.data || 'Login failed');
      // Handle error, possibly update state to show an error message
    }
  };

  const logout = async ( navigate ) => {
    try {
      // Make an API call to logout
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
    } catch (error) {
      console.error('Logout failed', error);
      // Optionally handle the error, e.g., show a notification
    }

    // Clear local session data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('doctorId');
    localStorage.removeItem('studentId');
    setAuthToken(null);
    setUserType(null);
    navigate('/login')
    };

  return (
    <AuthContext.Provider value={{ authToken, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
