import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            }
        };

        const fetchMatches = async () => {
            try {
                // Updated to use the correct endpoint and removed the studentId query parameter
                const response = await axios.get('http://localhost:8000/api/student/matches', config);
                // Assuming the response structure matches what your backend sends
                console.log("API response:", response.data); // Log the response to inspect its structure
                setMatches(response.data.matches); // Adjust based on the actual response structure
                setIsLoading(false);
            } catch (err) {
                console.error("Failed to fetch matches:", err);
                setError("Failed to fetch matches");
                setIsLoading(false);
            }
        };

        fetchMatches();
    }, []);

    if (isLoading) return <div>Loading matches...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Matching Positions</h2>
            {matches && matches.length > 0 ? (
                <ul>
                    {matches.map(match => (
                        <li key={match.residency_position_id}> {/* Adjust key and data as necessary */}
                            Score: {match.match_score}
                            {/* Adjust according to your data structure */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No matches found.</p>
            )}
        </div>
    );
};

export default Matches;