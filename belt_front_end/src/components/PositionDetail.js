import React, { useState } from 'react'; // Fixed import
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PositionDetail = () => {
    const location = useLocation();
    const position = location.state.position;
    const navigate = useNavigate();

    const [applicationMessage, setApplicationMessage] = useState(''); // Now correctly importing useState
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleApply = async (e) => {
        e.preventDefault();
        const studentId = localStorage.getItem('studentId');

        try {
            await axios.post('http://localhost:8000/api/student/apply', {
                student_id: studentId,
                residency_position_id: position.id,
                message: applicationMessage,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                },
            });
            setSuccess('Application submitted successfully.');
            setTimeout(() => {
                navigate('/student/matches');
            }, 3000);
        } catch (error) {
            setError(error.response && error.response.data.message ? error.response.data.message : 'An error occurred while applying for the position.');
        }
    };

    // Function to format dates
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div>
            {position ? (
                <div>
                    <h2>{position.name}</h2>
                    <p>Status: {position.status}</p>
                    <p>Description: {position.description}</p>
                    <p>Medical Discipline: {position.medical_discipline}</p>
                    <p>Doctor Id: {position.doctor_id}</p>
                    <p>Medical Institution Id: {position.medical_institution_id}</p>
                    <p>Grade Average Requirement: {position.grade_avg_requirement}</p>
                    <p>Letter of Recommendation Required: {position.letter_of_reccomendation_req ? 'Yes' : 'No'}</p>
                    <p>Research Focused:{position.research_focused ? 'Yes' : 'No'}</p>
                    <p>Prefers New Grads: {position.prefers_new_grads ? 'Yes' : 'No'}</p>
                    <p>Created At: {formatDate(position.created_at)}</p>
                    <p>Updated At: {formatDate(position.updated_at)}</p>
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleApply}>
                        <label htmlFor="applicationMessage">Application Message:</label>
                        <textarea
                            id="applicationMessage"
                            value={applicationMessage}
                            onChange={(e) => setApplicationMessage(e.target.value)}
                            required
                        ></textarea>
                        <button type="submit">Apply to Position</button>
                    </form>
                </div>
            ) : (
                <p>Position not found.</p>
            )}
        </div>
    );
};

export default PositionDetail;