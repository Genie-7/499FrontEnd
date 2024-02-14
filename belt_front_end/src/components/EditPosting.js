import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPosting = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const posting_id = queryParameters.get("id");

    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        description: '',
        medical_discipline: '',
        grade_avg_requirement: 0.0,
        letter_of_reccomendation_req: false,
        research_focused: false,
        prefers_new_grads: false
    });
    const [recommendation, setRecommendation] = useState(false);
    const [research, setResearch] = useState(false);
    const [newGrads, setNewGrads] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const LoadInformation = async () => {
            try {
                const config1 = {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Accept': 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json'
                    }
                }
    
                const doctorResponse = await axios.get('http://localhost:8000/api/getProfile', config1);
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
    
                const applicationResponse = await axios.get('http://localhost:8000/api/doctor/positions/all', config2);
                const data = applicationResponse.data;

                if (data.status === "Request was successful") {
                    const positions = data.data.positions;
                    let position = null;
                    
                    for (let i = 0; i < positions.length; i++) {
                        if (parseInt(positions[i].id) === parseInt(posting_id)) {
                            position = positions[i];
                            break;
                        }
                    }

                    if (position != null) {
                        setFormData({
                            id: position.id,
                            name: position.name,
                            description: position.description,
                            medical_discipline: position.medical_discipline,
                            grade_avg_requirement: position.grade_avg_requirement,
                            letter_of_reccomendation_req: Boolean(position.letter_of_reccomendation_req),
                            research_focused: Boolean(position.research_focused),
                            prefers_new_grads: Boolean(position.prefers_new_grads)
                        });
                        setRecommendation(Boolean(position.letter_of_reccomendation_req));
                        setResearch(Boolean(position.research_focused));
                        setNewGrads(Boolean(position.prefers_new_grads));
                    } else {
                        // do more error handling
                    }
                }
            } catch (error) {
                // do error handling
            }
        }

        LoadInformation();
    }, [])

    const handleChange = (e) => {
        if (e.target.name === "letter_of_reccomendation_req") {
            setRecommendation(e.target.checked);
        } else if (e.target.name === "research_focused") {
            setResearch(e.target.checked);
        } else if (e.target.name === "prefers_new_grads") {
            setNewGrads(e.target.checked);
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            }
        }

        const newFormData = {
            id: formData.id,
            name: formData.name,
            description: formData.description,
            medical_discipline: formData.medical_discipline,
            grade_avg_requirement: formData.grade_avg_requirement,
            letter_of_reccomendation_req: recommendation ? 1 : 0,
            research_focused: research ? 1 : 0,
            prefers_new_grads: newGrads ? 1 : 0
        }

        console.log(newFormData);

        const body = JSON.stringify(newFormData);
        const response = await axios.patch('http://localhost:8000/api/doctor/position/update', body, config);
        console.log(response.data);
    }

    const handleClose = async () => {
        if (window.confirm("Are you sure you want to close this posting?")) {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                },

                params: {
                    "id": posting_id
                }
            }

            const response = await axios.post('http://localhost:8000/api/doctor/position/close', null, config);

            if (response.data.status === "Request was successful") {
                navigate("../../doctorDashboard");
            }
        }
    }

    return (
        <div className="container container-default w-75">
            <h1>Edit Posting</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="medical_discipline"
                        value={formData.medical_discipline}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        className="form-control"
                        name="grade_avg_requirement"
                        value={formData.grade_avg_requirement}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group ml-4">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="letter_of_reccomendation_req"
                        id="recommendation_req"
                        value=""
                        checked={recommendation}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="recommendation_req">Requires a letter of recommendation</label>
                </div>
                <div className="form-group ml-4">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="research_focused"
                        id="research_focused"
                        value=""
                        checked={research}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="research_focused">Research focused posting</label>
                </div>
                <div className="form-group ml-4">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="prefers_new_grads"
                        id="prefers_new_grads"
                        value=""
                        checked={newGrads}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="prefers_new_grads">Prefer new graduates</label>
                </div>
                <button type="button" className="btn btn-primary w-50" onClick={handleSubmit}>Update</button>
                <button type="button" className="btn btn-danger w-50" onClick={handleClose}>Close Posting</button>
            </form>
        </div>
    );
}

export default EditPosting;