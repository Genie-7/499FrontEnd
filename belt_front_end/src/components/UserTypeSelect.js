import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserTypeSelect = () => {
    const navigate = useNavigate();

    const handleSelectUserType = (userType) => {
        // Navigate to a different route based on the selected user type
        // For example, to '/register-doctor' or '/register-student'
        navigate(`/${userType}`);
    };

    return (
        <div>
            <h2>Select Your User Type</h2>
            <button onClick={() => handleSelectUserType('createDoctor')}>Doctor</button>
            <br></br>
            <button onClick={() => handleSelectUserType('createStudent')}>Student</button>
        </div>
    );
};

export default UserTypeSelect;