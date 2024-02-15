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
                const response = await axios.get('http://comp-4990-actual-api-env.eba-pfzutxd5.us-east-2.elasticbeanstalk.com/api/student/matches', config);
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

    // Styles
    const titleStyle = {
        textAlign: 'center',
        marginTop: '20px',
        marginBottom: '40px',
    };

    const matchesContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const matchItemStyle = {
        textAlign: 'left',
        margin: '10px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        width: '80%',
        maxWidth: '600px',
        textDecoration: 'none', // Remove underline from links
    };

    if (isLoading) return <div style={matchesContainerStyle}>Loading matches...</div>;
    if (error) return <div style={matchesContainerStyle}>{error}</div>;

    return (
        <div style={matchesContainerStyle}>
            <h2 style={titleStyle}>Matching Positions</h2>
            {matches.length > 0 ? (
                matches.map(match => (
                    <Link to={`/position/${match.id}`} key={match.id} state={{ position: match }} style={matchItemStyle}>
                        <h3>{match.name}</h3>
                        <p><strong>Description:</strong> {match.description}</p>
                        <p><strong>Medical Discipline:</strong> {match.medical_discipline}</p>
                        <p><strong>Grade Average Requirement:</strong> {match.grade_avg_requirement}</p>
                        <p><strong>Letter of Recommendation Required:</strong> {match.letter_of_reccomendation_req ? 'Yes' : 'No'}</p>
                        <p><strong>Research Focused:</strong> {match.research_focused ? 'Yes' : 'No'}</p>
                        <p><strong>Prefers New Grads:</strong> {match.prefers_new_grads ? 'Yes' : 'No'}</p>
                    </Link>
                ))
            ) : (
                <p>No matches found.</p>
            )}
        </div>
    );
};

export default Matches;
