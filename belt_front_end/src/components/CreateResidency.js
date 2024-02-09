import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

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
        medical_institution_id: '', // Assuming the doctor selects from existing institutions
    });
    const [error, setError] = useState(''); // State to manage error messages
    const [success, setSuccess] = useState(''); // State to manage success messages
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
            // Replace URL with your actual endpoint
            const response = await axios.post('http://localhost:8000/api/doctor/position/create', formData, config);
            console.log('Residency Position Created:', response.data);
            setSuccess('Residency position created successfully.'); // Set success message
            // Handle success (e.g., displaying a success message, redirecting, etc.)
            setTimeout(() => {
                navigate('/doctorDashboard'); // Redirect to the doctor dashboard after showing the success message
            }, 3000); // Delay for 3 seconds before redirecting
        } catch (error) {
            console.error('Error creating residency position:', error.response.data);
            // Handle error (e.g., displaying an error message)
            setError(error.response && error.response.data.message ? error.response.data.message : 'An error occurred while creating the position.');
        }
    };

    return (
        <div>
            <h2>Create Residency Position</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            {success && <p style={{ color: 'green' }}>{success}</p>} {/* Display success message */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
                </div>
                <div>
                    <label>Medical Discipline:</label>
                    <input type="text" name="medical_discipline" value={formData.medical_discipline} onChange={handleChange} required />
                </div>
                <div>
                    <label>Grade Average Requirement:</label>
                    <input type="number" name="grade_avg_requirement" value={formData.grade_avg_requirement} onChange={handleChange} required />
                </div>
                <div>
                    <label>
                        Letter of Recommendation Required?
                        <input type="checkbox" name="letter_of_reccomendation_req" checked={formData.letter_of_reccomendation_req} onChange={handleChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Research Focused?
                        <input type="checkbox" name="research_focused" checked={formData.research_focused} onChange={handleChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Prefers New Grads?
                        <input type="checkbox" name="prefers_new_grads" checked={formData.prefers_new_grads} onChange={handleChange} />
                    </label>
                </div>
                <div>
                    <label>Medical Institution ID:</label>
                    <input type="number" name="medical_institution_id" value={formData.medical_institution_id} onChange={handleChange} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateResidencyPositionForm;