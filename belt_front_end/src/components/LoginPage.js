import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Function to handle profile retrieval and navigation
  const handleProfileAndNavigation = async () => {
    try {
      const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Assume the token is stored in localStorage
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json'
        }
      };
      // Assuming the token is set in the headers by axios globally or in this component
      console.log(localStorage.getItem('authToken'));
      const profileResponse = await axios.get('http://localhost:8000/api/getProfile', config);
      console.log(profileResponse.data)
      if (profileResponse.data.data.doctor) {
        navigate('/doctorDashboard');
      } else if (profileResponse.data.data.student) {
        navigate('/studentDashboard');
      } else {
        navigate('/userTypeSelect');
      }
    } catch (error) {
      console.error('Failed to retrieve profile', error);
      navigate('/userTypeSelect'); // Fallback if the profile check fails
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const response_obj = response.data.data;
      const token = response_obj.token;
      const id = response_obj.user.id;

      localStorage.setItem('authToken', token); // Save the token
      localStorage.setItem('userId', id);

      console.log('Login successful', response.data);

      // After successful login, check the user's profile to determine redirection
      handleProfileAndNavigation();
    } catch (error) {
      console.error(error.response.data); // Handle error
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;