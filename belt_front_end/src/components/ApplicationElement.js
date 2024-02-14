import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationElement = (props) => {
    const navigate = useNavigate();

    const onAction = () => {
        navigate('../doctor/posting/applications/view?id=' + props.application_id + "&posting_id=" + props.posting_id);
    };

    return(
        <li className="list-group-item">
            <div className="row">
                <div className="col" onClick={() => onAction()}>
                    {props.name}
                </div>
                <div className={"col text-white text-center " + (props.status === "OPEN" ? "bg-primary" : props.status === "ACCEPTED" ? "bg-success" : "bg-danger")} onClick={() => onAction()}>
                    {props.status}
                </div>
            </div>
        </li>
    )
}

export default ApplicationElement;