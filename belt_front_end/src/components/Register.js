import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
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
                    'Content-Type': 'application/json'
                }
            };
            // Adjust the URL as necessary for your API endpoint
            const body = JSON.stringify(formData);
            const response = await axios.post('http://localhost:8000/api/register', body, config);
            console.log(response.data); // Handle response, e.g., storing the user token
            //Get auth token
            // Extract the token from the response and store it in local storage
            const response_obj = response.data.data;
            const token = response_obj.token;
            const id = response_obj.user.id;
            
            localStorage.setItem('authToken', token); // Save the token
            localStorage.setItem('userId', id);
            navigate('/userTypeSelect'); // Redirect to another route on success
        } catch (error) {
            console.error(error.response.data); // Handle error
        }
    };

    return (
        <div>
            <h2>Register</h2>
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
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;