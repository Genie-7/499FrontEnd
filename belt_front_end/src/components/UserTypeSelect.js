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
        <div className="container container-default w-25">
            <h2>Select Your User Type</h2>
            <div className="row justify-content-center">
                <div className="col-sm">
                    <button className="btn btn-primary w-100" onClick={() => handleSelectUserType('createDoctor')}>Doctor</button>
                </div>
                <div className="col-sm">
                    <button className="btn btn-primary w-100" onClick={() => handleSelectUserType('createStudent')}>Student</button>
                </div> 
            </div>          
        </div>
    );
};

export default UserTypeSelect;