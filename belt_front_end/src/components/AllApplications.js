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
        <div>
            <h2>My Applications</h2>
            {applications.length > 0 ? (
                <ul>
                    {applications.map(application => (
                        <li key={application.id}>
                            Position ID: {application.residency_position_id}, Message: {application.message}
                            {/* Display other application details as needed */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No applications found.</p>
            )}
        </div>
    );
};

export default AllApplications;