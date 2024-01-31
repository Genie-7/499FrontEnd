import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000', {
        email,
        password,
      });

      // Handle successful login, e.g., set authentication token in local storage
      console.log('Login successful', response.data);
    } catch (error) {
      // Handle login error
      console.error('Login failed', error.response.data);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;

