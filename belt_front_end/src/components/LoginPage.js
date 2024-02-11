import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        console.log(profileResponse.data.data.doctor);
        const doctorId = profileResponse.data.data.doctor.id; // Adjust the path according to your actual response structure
        localStorage.setItem('doctorId', doctorId); // Save the doctor id to local storage
        navigate('/doctorDashboard');
      } else if (profileResponse.data.data.student) {
        console.log(profileResponse.data.data.student);
        const studentId = profileResponse.data.data.student.id; // Adjust the path according to your actual response structure
        localStorage.setItem('studentId', studentId); // Save the doctor id to local storage
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
    <div className="w-25 container container-default">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;