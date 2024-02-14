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
                },
            });
            navigate('/studentDashboard'); // Adjust as necessary
        } catch (error) {
            setError(error.response.data.message || 'An error occurred while submitting the grade.');
        }
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%', // Added
        textAlign: 'center', // Added
    };

    const formStyle = {
        padding: '2rem',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '100%',
        margin: 'auto', // Added
    };

    return (
        <div style={containerStyle}>
            <div style={formStyle}>
                <h2 className="text-center mb-4">Submit Grade</h2>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="course_code" className="form-label">Course Code:</label>
                        <input type="text" className="form-control" id="course_code" name="course_code" value={formData.course_code} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="grade" className="form-label">Grade:</label>
                        <input type="text" className="form-control" id="grade" name="grade" value={formData.grade} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit Grade</button>
                </form>
            </div>
        </div>
    );
};

export default SubmitGradeForm;
