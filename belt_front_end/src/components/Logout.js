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
      localStorage.removeItem('userId'); // If you're storing the userId, remove it as well

      // Redirect user to the login page or home page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
      // Handle error, maybe notify the user
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;