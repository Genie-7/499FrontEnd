import React, {useEffect, useState} from 'react';
//import { useNavigate } from 'react-router-dom';
import ApplicationElement from './ApplicationElement';
import axios from 'axios';

const ApplicationList = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const posting_id = queryParameters.get("id");

    const [displayedApplications, updateDisplayedApplications] = useState([]);

    useEffect(() => {
        const LoadApplications = async () => {
            try {
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
    
                const applicationResponse = await axios.get('http://localhost:8000/api/doctor/position/applications', config);
                const data = applicationResponse.data;

                if (data.status === "Request was successful") {
                    const tmp = [];
                    const applications = data.data.applications;

                    for (let i = 0; i < applications.length; i++) {
                        let exists = false;

                        for (let j = 0; j < displayedApplications.length; j++) {
                            if (applications[i].id === displayedApplications[j].id) {
                                exists = true;
                                break;
                            }
                        }

                        if (!exists) {
                            let student_name = "";

                            const config2 = {
                                headers: {
                                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                                    'Accept': 'application/vnd.api+json',
                                    'Content-Type': 'application/vnd.api+json'
                                },

                                params: {
                                    "id": applications[i].student_id
                                }
                            }

                            const studentResponse = await axios.get('http://localhost:8000/api/student/', config2);
                            const studentData = studentResponse.data;

                            if (studentData.status === "Request was successful") {
                                const student = studentData.data.student;
                                student_name = student.name;
                            }

                            if (student_name !== "") {
                                tmp.push({
                                    student: student_name,
                                    id: applications[i].id,
                                    status: applications[i].status
                                });
                            }
                        }
                    }

                    if (tmp.length > 0) {
                        updateDisplayedApplications(tmp);
                    }
                } else {
                    // Do error handling
                }
            } catch (error) {

            }
        }

        LoadApplications();
    });

    return(
        <div className="w-75 h-100 container container-default">
            <h1>Applications</h1>
            <ul className="list-group bg-light overflow-auto">
                {displayedApplications.map((application, i) => (
                    <ApplicationElement name={application.student} application_id={application.id} posting_id={posting_id} status={application.status} key={i}/>
                ))}
            </ul>
        </div>
    );
}

export default ApplicationList;