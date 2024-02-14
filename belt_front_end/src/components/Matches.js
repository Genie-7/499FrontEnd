import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                setMatches(response.data.data.matches); // Adjust based on the actual response structure
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
            {matches.length > 0 ? (
                <div className="matches-list">
                    {matches.map(match => (
                            <Link
                            to={`/position/${match.id}`} 
                            key={match.id} 
                            state={{ position: match }}
                            className="match-item"
                            >
                            <h3>{match.name}</h3>                            
                            <p><strong>Description:</strong> {match.description}</p>
                            <p><strong>Medical Discipline:</strong> {match.medical_discipline}</p>
                            <p><strong>Grade Average Requirement:</strong> {match.grade_avg_requirement}</p>
                            <p><strong>Letter of Recommendation Required:</strong> {match.letter_of_reccomendation_req ? 'Yes' : 'No'}</p>
                            <p><strong>Research Focused:</strong> {match.research_focused ? 'Yes' : 'No'}</p>
                            <p><strong>Prefers New Grads:</strong> {match.prefers_new_grads ? 'Yes' : 'No'}</p>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No matches found.</p>
            )}
        </div>
    );
};

export default Matches;