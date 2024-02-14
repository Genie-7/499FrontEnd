import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SubmitGradeForm = () => {
    const [formData, setFormData] = useState({
        student_id: localStorage.getItem('studentId'),
        course_code: '',
        grade: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('authToken');
        try {
            await axios.post('http://localhost:8000/api/student/grade/create', formData, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                }
            });
            // Redirect or display success message
            navigate('/studentDashboard'); // Adjust as necessary
        } catch (error) {
            setError(error.response.data.message || 'An error occurred while submitting the grade.');
        }
    };

    return (
        <div>
            <h2>Submit Grade</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Course Code:</label>
                    <input type="text" name="course_code" value={formData.course_code} onChange={handleChange} required />
                </div>
                <div>
                    <label>Grade:</label>
                    <input type="text" name="grade" value={formData.grade} onChange={handleChange} required />
                </div>
                <button type="submit">Submit Grade</button>
            </form>
        </div>
    );
};

export default SubmitGradeForm;
