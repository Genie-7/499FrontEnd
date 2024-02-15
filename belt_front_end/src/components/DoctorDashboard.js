import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ListingElement from './ListingElement'
import axios from 'axios';

const DoctorDashboard = () => {
    const [displayedPositions, updateDisplayedPositions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const LoadPositions = async () => {
            try {
                const config1 = {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Accept': 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json'
                    }
                }
    
                const doctorResponse = await axios.get('http://comp-4990-actual-api-env.eba-pfzutxd5.us-east-2.elasticbeanstalk.com/api/getProfile', config1);
                const myDoctor = doctorResponse.data.data.doctor;
    
                const config2 = {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Accept': 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json'
                    },
    
                    params: {
                        "id": myDoctor.id
                    }
                }
    
                const applicationResponse = await axios.get('http://comp-4990-actual-api-env.eba-pfzutxd5.us-east-2.elasticbeanstalk.com/api/doctor/positions/all', config2);
                const data = applicationResponse.data;
    
                if (data.status === "Request was successful") {
                    const tmp = [];
                    const positions = data.data.positions;
    
                    for (let i = 0; i < positions.length; i++) {
                        let exists = false;
    
                        for (let j = 0; j < displayedPositions.length; j++) {
                            if (displayedPositions[j].id === positions[i].id) {
                                exists = true;
                                break;
                            }
                        }
    
                        if (!exists && positions[i].status === "OPEN") {
                            tmp.push({
                                "id": positions[i].id,
                                "name": positions[i].name,
                                "discipline": positions[i].medical_discipline,
                                "status": positions[i].status
                            });
                        }
                    }
    
                    if (tmp.length > 0) {
                        updateDisplayedPositions(tmp);
                    }
                }
            } catch(error) {
    
            }
        }
        
        LoadPositions();
    });

    const newPosting = () => {
        navigate("../doctor/position/create");
    }

    return(
        <div className="w-75 h-100 container container-default">
            <h1>Dashboard</h1>
            <button className="btn btn-success btn-trim mb-4" onClick={newPosting}>New Posting</button>
            <ul className="list-group bg-light overflow-auto">
                {displayedPositions.map((position, i) => (
                    <ListingElement name={position.name} application_id={position.id} key={i}/>
                ))}
            </ul>
        </div>
    )
}

export default DoctorDashboard
