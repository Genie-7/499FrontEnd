// src/components/Matches.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Matches = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                // Adjust the URL as necessary for your development environment
                const response = await axios.get('http://localhost:8000/api/student/matches', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Assume the token is stored in localStorage
                        'Accept': 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json'
                    }
                });
                setMatches(response.data.matches);
            } catch (error) {
                console.error('There was an error fetching the matches:', error);
            }
        };

        fetchMatches();
    }, []);

    return (
        <div>
            <h2>Matching Positions</h2>
            <ul>
                {matches.map((match, index) => (
                    <li key={index}>{match.name} - {match.description}</li> // Customize based on your actual match object structure
                ))}
            </ul>
        </div>
    );
};

export default Matches;