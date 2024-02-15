import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const ApplicationView = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const application_id = queryParameters.get("id");
    const posting_id = queryParameters.get("posting_id");

    const [posting, setPosting] = useState({
        id: application_id,
        student_name: '',
        student_grades: [],
        message: '',
        status: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const LoadApplication = async () => {
            try {
                const applicationResponse = await axios.get('http://localhost:8000/api/doctor/position/applications', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Accept': 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json'
                    },

                    params: {
                        "id": posting_id
                    }
                });

                const data = applicationResponse.data;

                if (data.status === "Request was successful") {
                    const applications = data.data.applications;
                    let application = null;

                    for (let i = 0; i < applications.length; i++) {
                        if (applications[i].id === parseInt(application_id)) {
                            application = applications[i];
                            break;
                        }
                    }

                    if (application != null) {
                        const studentResponse = await axios.get('http://localhost:8000/api/student/', {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                                'Accept': 'application/vnd.api+json',
                                'Content-Type': 'application/vnd.api+json'
                            },
        
                            params: {
                                "id": application.student_id
                            }
                        });

                        const studentData = studentResponse.data;

                        if (studentData.status === "Request was successful") {
                            const student = studentData.data.student;

                            const gradesResponse = await axios.get('http://localhost:8000/api/student/grades', {
                                headers: {
                                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                                    'Accept': 'application/vnd.api+json',
                                    'Content-Type': 'application/vnd.api+json'
                                },
            
                                params: {
                                    "id": application.student_id
                                }
                            });

                            const gradesData = gradesResponse.data;

                            if (gradesData.status === "Request was successful") {
                                const grades = gradesData.data.grades;
                                let tmp = [];

                                for (let i = 0; i < grades.length; i++) {
                                    tmp.push({
                                        course_code: grades[i].course_code,
                                        grade: grades[i].grade
                                    });
                                }

                                setPosting({
                                    student_name: student.name,
                                    student_grades: tmp,
                                    message: application.message,
                                    status: application.status
                                });
                            } else {
                                // do error handling
                            }
                        } else {
                            // do more error handling
                        }
                    } else {
                        // do error handling
                    }
                }
            } catch (error) {
                // do error handling
            }
        }

        LoadApplication();
    }, []);

    const handleAction = async (accept) => {
        let apiUrl = 'http://localhost:8000/api/doctor/application/' + (accept ? "accept" : "reject");

        const response = await axios.post(apiUrl, null, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            },

            params: {
                "id": application_id
            }
        });

        const data = response.data;

        if (data.status === "Request was successful") {
            navigate('../doctor/posting/applications?id=' + posting_id);
        }
    };

    return(
        <div className="container container-default w-75">
            <h1>Review Application</h1>
            <div className="form-group">
                <label htmlFor="student_name">Student Name</label>
                <input className="form-control" type="text" value={posting.student_name} id="student_name" disabled/>
            </div>
            <div className={"form-control text-white text-center " + (posting.status === "OPEN" ? "bg-primary" : posting.status === "ACCEPTED" ? "bg-success" : "bg-danger")}>
                {posting.status}
            </div>
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" type="text" value={posting.message} id="message" disabled/>
            </div>
            <label htmlFor="grades">Grades</label>
            <ul className="list-group bg-light overflow-auto mb-4" id="grades">
                {posting.student_grades.map((grade, i) => (
                    <li className="list-group-item" key={i}>{grade.course_code}: {grade.grade}</li>
                ))}
            </ul>

            {/* Set up accepting and rejecting open applications */}
            <button className="btn btn-success w-50" onClick={() => {handleAction(true)}} disabled={posting.status === "OPEN" ? false : true}>Accept</button>
            <button className="btn btn-danger w-50" onClick={() => {handleAction(false)}} disabled={posting.status === "OPEN" ? false : true}>Reject</button>
        </div>
    );
}

export default ApplicationView;