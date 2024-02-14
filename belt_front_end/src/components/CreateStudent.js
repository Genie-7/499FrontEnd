import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CreateStudent = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        gender: '',
        graduation_year: 0,
        educational_institution_id: 0,
        medical_discipline: '',
        prefers_research: false,
        user_id: 0
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRadio = (value) => (event) => {
        setFormData({
            ...formData,
            prefers_research: value ? "1" : "0", 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Assume the token is stored in localStorage
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                }
            };
            // Adjust the URL as necessary for your API endpoint
            formData.graduation_year = parseInt(formData.graduation_year);
            formData.educational_institution_id = parseInt(formData.educational_institution_id);
            formData.user_id = parseInt(localStorage.getItem("userId"));
            const body = JSON.stringify(formData);
            console.log(body);
            const response = await axios.post('http://localhost:8000/api/student/create', body, config);
            console.log(response.data); // Handle response, e.g., storing the user token
            //Get id from response to store in localstorage as doctorId

            navigate('/studentDashboard'); // Redirect to another route on success
        } catch (error) {
            console.error(error.response.data); // Handle error
        }
    };

    return (
        <div className="container container-default w-25">
            <h2>Create Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
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
                <div className="form-group">
                    <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        placeholder="Date of Birth"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        placeholder="gender"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        className="form-control"
                        name="graduation_year"
                        value={formData.graduation_year}
                        onChange={handleChange}
                        placeholder="Graduation year"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="educational_institution_id"
                        value={formData.educational_institution_id}
                        onChange={handleChange}
                        placeholder="School ID"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="medical_discipline"
                        value={formData.medical_discipline}
                        onChange={handleChange}
                        placeholder="Medical discipline"
                        required
                    />
                </div>
                <fieldset className="form-group">
                    <p>
                        Do you prefer research positions?
                    </p>
                    <div className="row justify-content-center">
                        <div className="col-sm-10">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="prefers_research"
                                value="yes"
                                id="prefers_research_yes"
                                onChange={handleRadio(true)}
                            />
                            <label className="form-check-label" for="prefers_research_yes">Yes</label>
                        </div>
                        <div className="col-sm-10">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="prefers_research"
                                value="no"
                                id="prefers_research_no"
                                onChange={handleRadio(false)}
                                checked
                            />
                            <label className="form-check-label" for="prefers_research_no">No</label>
                        </div>
                    </div>
                </fieldset>
                
                <button type="submit" className="btn btn-primary w-100">Create Student</button>
            </form>
        </div>
    );
};

export default CreateStudent;