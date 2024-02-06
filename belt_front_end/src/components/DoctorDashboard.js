import React from 'react';
/* import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate */

const DoctorDashboard = () => {
    return(
        <div className="w-75 h-100 container container-default">
            <h1>Dashboard</h1>
            <button className="btn btn-success btn-trim">New Posting</button>
            <div className="posting-container overflow-auto">

            </div>
        </div>   
    )
}

export default DoctorDashboard
