import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CreateStudent = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        gender: '',
        graduation_year: 0,
        educational_institution_id: 0,
        medical_discipline: '',
        prefers_research: false,
        user_id: 0
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRadio = (e) => {
        formData.prefers_research = !formData.prefers_research;
    }

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
            formData.graduation_year = parseInt(formData.graduation_year);
            formData.educational_institution_id = parseInt(formData.educational_institution_id);
            formData.user_id = parseInt(localStorage.getItem("userId"));
            const body = JSON.stringify(formData);
            console.log(body);
            const response = await axios.post('http://localhost:8000/api/student/create', body, config);
            console.log(response.data); // Handle response, e.g., storing the user token
            //Get id from response to store in localstorage as doctorId

            navigate('/studentDashboard'); // Redirect to another route on success
        } catch (error) {
            console.error(error.response.data); // Handle error
        }
    };

    return (
        <div>
            <h2>Create Student</h2>
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
                    name="graduation_year"
                    value={formData.graduation_year}
                    onChange={handleChange}
                    placeholder="Graduation year"
                    required
                />
                <input
                    type="text"
                    name="educational_institution_id"
                    value={formData.educational_institution_id}
                    onChange={handleChange}
                    placeholder="School ID"
                    required
                />
                <input
                    type="text"
                    name="medical_discipline"
                    value={formData.medical_discipline}
                    onChange={handleChange}
                    placeholder="Medical discipline"
                    required
                />
                <p>
                    Do you prefer research positions?
                </p>
                <input
                    type="radio"
                    name="prefers_research"
                    value=""
                    onChange={handleRadio}
                />
                <button type="submit">Create Student</button>
            </form>
        </div>
    );
};

export default CreateStudent;