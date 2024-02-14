import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentRoute = ({ children }) => {
    const navigate = useNavigate();

    const getUserInfo = async () => {
        const profileResponse = await axios.get('http://localhost:8000/api/getProfile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Assume the token is stored in localStorage
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            }
        });

        if (profileResponse.data.status === "Request was successful") {
            if ('doctor' in profileResponse.data.data) {
                navigate("/doctorDashboard");
            }
        }
    }

    getUserInfo();
    
    // If there is an auth token, proceed to the requested page
    return children;
};

export default StudentRoute;