import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CreateDoctor = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        gender: '',
        medical_institution_id: 0,
        medical_discipline: '',
        user_id: 0
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Assume the token is stored in localStorage
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                }
            };
            // Adjust the URL as necessary for your API endpoint
            formData.medical_institution_id = parseInt(formData.medical_institution_id)
            formData.user_id = parseInt(localStorage.getItem("userId"));
            const body = JSON.stringify(formData);
            console.log(body);
            const response = await axios.post('http://localhost:8000/api/doctor/create', body, config);
            console.log(response.data); // Handle response, e.g., storing the user token
            //Get auth token
            navigate('/doctorDashboard'); // Redirect to another route on success
        } catch (error) {
            console.error(error.response.data); // Handle error
        }
    };

    return (
        <div>
            <h2>Create Doctor</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    placeholder="Date of Birth (YYYY-MM-DD"
                    required
                />
                <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    placeholder="gender"
                    required
                />
                <input
                    type="number"
                    name="medical_institution_id"
                    value={formData.medical_institution_id}
                    onChange={handleChange}
                    placeholder="Medical Institution Id"
                    required
                />
                <input
                    type="text"
                    name="medical_discipline"
                    value={formData.medical_discipline}
                    onChange={handleChange}
                    placeholder="medical_discipline"
                    required
                />
                <button type="submit">Create Doctor</button>
            </form>
        </div>
    );
};

export default CreateDoctor;