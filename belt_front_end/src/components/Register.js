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
            const response = await axios.post('http://comp-4990-actual-api-env.eba-pfzutxd5.us-east-2.elasticbeanstalk.com/api/register', body, config);
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
        <div className="container container-default w-25">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="form-group">
                <input
                        type="password"
                        className="form-control"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
        </div>
    );
};

export default Register;