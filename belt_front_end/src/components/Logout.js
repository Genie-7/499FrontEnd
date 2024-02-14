import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Assuming you're using Bearer token authentication
      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      };

      // Call your API to invalidate the token / logout
      await axios.post('http://localhost:8000/api/logout', {}, config);

      // Clear the token from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId'); 
      localStorage.removeItem('doctorId'); 
      localStorage.removeItem('studentId'); 

      // Redirect user to the login page or home page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
      // Handle error, maybe notify the user
    }
  };

  return (
    <div className="w-25 container container-default">
      <button type="submit" className="btn btn-primary w-100" onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Logout;