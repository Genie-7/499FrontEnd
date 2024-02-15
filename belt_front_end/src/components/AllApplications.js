import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllApplications = () => {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            setIsLoading(true);
            try {
                // Assuming you store your authToken in localStorage
                const authToken = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:8000/api/student/applications/all', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Accept': 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json'
                    }
                });
                setApplications(response.data.data.applications); // Adjust according to your actual API response structure
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch applications');
                setIsLoading(false);
            }
        };

        fetchApplications();
    }, []);

    if (isLoading) return <div>Loading applications...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-4">
            <h2>My Applications</h2>
            {applications.length > 0 ? (
                <ul className="list-group">
                    {applications.map(application => (
                        <li key={application.id} className="list-group-item">
                            <div className="row">
                                <div className="col-md-3">
                                    <strong>Title:</strong> {application.residency_position.name}
                                </div>
                                <div className="col-md-2">
                                    <strong>Status:</strong> {application.residency_position.status}
                                </div>
                                <div className="col-md-3">
                                    <strong>Description:</strong> {application.residency_position.description}
                                </div>
                                <div className="col-md-2">
                                    <strong>Doctor ID:</strong> {application.residency_position.doctor_id}
                                </div>
                                <div className="col-md-2">
                                    <strong>Medical Institution ID:</strong> {application.residency_position.medical_institution_id}
                                </div>
                            </div>
                            <div className="mt-2">
                                <strong>Message:</strong> {application.message}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted">No applications found.</p>
            )}
        </div>
    );
};

export default AllApplications;