import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateResidencyPositionForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        medical_discipline: '',
        grade_avg_requirement: '',
        doctor_id: localStorage.getItem('doctorId'),
        letter_of_reccomendation_req: false,
        research_focused: false,
        prefers_new_grads: false,
        medical_institution_id: '',
    });

    const [medicalInstitutions, setMedicalInstitutions] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMedicalInstitutions = async () => {
            try {
                const response = await axios.get('http://comp-4990-actual-api-env.eba-pfzutxd5.us-east-2.elasticbeanstalk.com/api/medical_institutions', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Accept': 'application/vnd.api+json',
                        'Content-Type': 'application/json'
                    },
                });
                setMedicalInstitutions(response.data.data.institutions);
            } catch (error) {
                console.error('Failed to fetch medical institutions:', error);
            }
        };
        fetchMedicalInstitutions();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/json',
            },
        };

        try {
            formData.medical_institution_id = parseInt(formData.medical_institution_id);
            const body = JSON.stringify(formData);
            await axios.post('http://comp-4990-actual-api-env.eba-pfzutxd5.us-east-2.elasticbeanstalk.com/api/doctor/position/create', body, config);
            navigate('/doctorDashboard');
        } catch (error) {
            console.error('Error creating residency position:', error.response.data);
            setError(error.response && error.response.data.message ? error.response.data.message : 'An error occurred while creating the position.');
        }
    };

    return (
        <div className="container container-default w-25">            
            <h2 className="mb-4">Create Residency Position</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="medical_discipline"
                        value={formData.medical_discipline}
                        onChange={handleChange}
                        placeholder="Medical Discipline"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        name="grade_avg_requirement"
                        value={formData.grade_avg_requirement}
                        onChange={handleChange}
                        placeholder="Grade Average Requirement"
                        required
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="letter_of_reccomendation_req"
                        checked={formData.letter_of_reccomendation_req}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Letter of Recommendation Required</label>
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="research_focused"
                        checked={formData.research_focused}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Research Focused</label>
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="prefers_new_grads"
                        checked={formData.prefers_new_grads}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Prefers New Grads</label>
                </div>
                <div className="mb-3">
                    <select
                        className="form-select"
                        name="medical_institution_id"
                        value={formData.medical_institution_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Medical Institution</option>
                        {medicalInstitutions.map((institution) => (
                            <option key={institution.id} value={institution.id}>
                                {institution.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Create Residency</button>
            </form>
        </div>
    );
};

export default CreateResidencyPositionForm;
