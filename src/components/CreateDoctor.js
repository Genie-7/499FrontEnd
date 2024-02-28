import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthProvider';

const CreateDoctor = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        gender: '',
        medical_institution_id: '',
        medical_discipline: '',
        user_id: ''
    });
    const [medicalInstitutions, setMedicalInstitutions] = useState([]);

    const {postRegister} = useAuth();

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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/json'
                }
            };
            formData.medical_institution_id = parseInt(formData.medical_institution_id);
            formData.user_id = parseInt(localStorage.getItem("userId"));
            const body = JSON.stringify(formData);
            const response = await axios.post('http://comp-4990-actual-api-env.eba-pfzutxd5.us-east-2.elasticbeanstalk.com/api/doctor/create', body, config);
            localStorage.setItem('doctorId', response.data.data.doctor.id);
            postRegister();
            navigate('/doctorDashboard');
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <div className="container container-default w-25">
            <h2 className="mb-4">Create Doctor Profile</h2>
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
                <input
                        type={formData.dob ? "date" : "text"}
                        className="form-control"
                        name="dob"
                        value={formData.dob ? formData.dob : "Date of Birth"}
                        onFocus={(e) => {
                            if (e.target.type !== "date") {
                                e.target.type = "date";
                                e.target.value = '';
                            }
                        }}
                        onBlur={(e) => {
                            if (e.target.value === '') {
                                e.target.type = "text";
                                e.target.value = "Date of Birth";
                            }
                        }}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <select className="form-select" name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label>Medical Institution:</label>
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
                <button type="submit" className="btn btn-primary w-100">Create Profile</button>
            </form>
        </div>
    );
};

export default CreateDoctor;

