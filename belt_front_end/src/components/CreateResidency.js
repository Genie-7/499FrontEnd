import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateResidencyPositionForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        medical_discipline: '',
        grade_avg_requirement: '',
        doctor_id: localStorage.getItem('doctorId'),
        letter_of_reccomendation_req: false,
        research_focused: false,
        prefers_new_grads: false,
        medical_institution_id: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await axios.post('http://localhost:8000/api/doctor/position/create', formData, config);
            console.log('Residency Position Created:', response.data);
            navigate('/doctorDashboard');
        } catch (error) {
            console.error('Error creating residency position:', error.response.data);
            setError(error.response && error.response.data.message ? error.response.data.message : 'An error occurred while creating the position.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create Residency Position</h2>
            {error && <p className="text-danger">{error}</p>}
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
                    <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
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
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        name="grade_avg_requirement"
                        value={formData.grade_avg_requirement}
                        onChange={handleChange}
                        placeholder="Grade Average Requirement"
                        required
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="letter_of_reccomendation_req"
                        checked={formData.letter_of_reccomendation_req}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Letter of Recommendation Required</label>
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="research_focused"
                        checked={formData.research_focused}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Research Focused</label>
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="prefers_new_grads"
                        checked={formData.prefers_new_grads}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Prefers New Grads</label>
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
                <button type="submit" className="btn btn-primary w-100">Create Residency</button>
            </form>
        </div>
    );
};

export default CreateResidencyPositionForm;
