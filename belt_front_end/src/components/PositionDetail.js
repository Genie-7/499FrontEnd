import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PositionDetail = () => {
    const location = useLocation();
    const position = location.state.position;
    const navigate = useNavigate();

    const [applicationMessage, setApplicationMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleApply = async (e) => {
        e.preventDefault();
        const studentId = localStorage.getItem('studentId');

        try {
            await axios.post('http://comp-4990-actual-api-env.eba-pfzutxd5.us-east-2.elasticbeanstalk.com/api/student/apply', {
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
            setTimeout(() => navigate('/student/matches'), 3000);
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred while applying for the position.');
        }
    };

    // Function to format dates
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    // Styles
    const titleStyle = {
        textAlign: 'center',
        margin: '20px 0',
    };

    const detailStyle = {
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        borderRadius: '10px',
    };

    return (
        <div style={{ padding: '20px' }}>
            {position ? (
                <div style={detailStyle}>
                    <h2 style={titleStyle}>{position.name}</h2>
                    <p><strong>Status:</strong> {position.status}</p>
                    <p><strong>Description:</strong> {position.description}</p>
                    <p><strong>Medical Discipline:</strong> {position.medical_discipline}</p>
                    <p><strong>Doctor Id:</strong> {position.doctor_id}</p>
                    <p><strong>Medical Institution Id:</strong> {position.medical_institution_id}</p>
                    <p><strong>Grade Average Requirement:</strong> {position.grade_avg_requirement}</p>
                    <p><strong>Letter of Recommendation Required:</strong> {position.letter_of_reccomendation_req ? 'Yes' : 'No'}</p>
                    <p><strong>Research Focused:</strong> {position.research_focused ? 'Yes' : 'No'}</p>
                    <p><strong>Prefers New Grads:</strong> {position.prefers_new_grads ? 'Yes' : 'No'}</p>
                    <p><strong>Created At:</strong> {formatDate(position.created_at)}</p>
                    <p><strong>Updated At:</strong> {formatDate(position.updated_at)}</p>
                    {success && <div style={{ color: 'green', textAlign: 'center' }}>{success}</div>}
                    {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
                    <form onSubmit={handleApply}>
                        <div style={{ marginTop: '20px' }}>
                            <label htmlFor="applicationMessage"><strong>Application Message:</strong></label>
                            <textarea
                                id="applicationMessage"
                                style={{ display: 'block', width: '100%', padding: '10px', marginTop: '10px' }}
                                value={applicationMessage}
                                onChange={(e) => setApplicationMessage(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" style={{ marginTop: '10px', display: 'block', width: '100%' }}>Apply to Position</button>
                    </form>
                </div>
            ) : (
                <p>Position not found.</p>
            )}
        </div>
    );
};

export default PositionDetail;