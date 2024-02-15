import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateDoctor = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        gender: '',
        medical_institution_id: '',
        medical_discipline: '',
        user_id: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/json'
                }
            };
            formData.medical_institution_id = parseInt(formData.medical_institution_id);
            formData.user_id = parseInt(localStorage.getItem("userId"));
            const body = JSON.stringify(formData);
            await axios.post('http://comp-4990-actual-api-env.eba-pfzutxd5.us-east-2.elasticbeanstalk.com/api/doctor/create', body, config);
            navigate('/doctorDashboard');
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create Doctor Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
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
                <div className="mb-3">
                    <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <select className="form-select" name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        name="medical_institution_id"
                        value={formData.medical_institution_id}
                        onChange={handleChange}
                        placeholder="Medical Institution ID"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="medical_discipline"
                        value={formData.medical_discipline}
                        onChange={handleChange}
                        placeholder="Medical Discipline"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Create Profile</button>
            </form>
        </div>
    );
};

export default CreateDoctor;
