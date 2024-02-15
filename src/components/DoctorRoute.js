import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorRoute = ({ children }) => {
    const navigate = useNavigate();

    const getUserInfo = async () => {
        const profileResponse = await axios.get('http://comp-4990-actual-api-env.eba-pfzutxd5.us-east-2.elasticbeanstalk.com/api/getProfile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Assume the token is stored in localStorage
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            }
        });

        if (profileResponse.data.status === "Request was successful") {
            if ('student' in profileResponse.data.data) {
                navigate("/studentDashboard");
            }
        }
    }

    getUserInfo();
    
    // If there is an auth token, proceed to the requested page
    return children;
};

export default DoctorRoute;