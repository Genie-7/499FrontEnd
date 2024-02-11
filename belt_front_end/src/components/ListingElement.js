import React from 'react';
import { useNavigate } from 'react-router-dom';

const ListingElement = (props) => {
    const navigate = useNavigate();

    const onAction = (toApplicationList) => {
        if (toApplicationList) {
            navigate('doctor/posting/applications?id=' + props.application_id);
        } else {
            navigate('doctor/posting/edit?id=' + props.application_id);
        }
    };

    return(
        <li className="list-group-item">
            <div className="row">
                <div className="col-sm w-75" onClick={() => onAction(true)}>
                    {props.name}
                </div>
                <div className="col-sm">
                    <button className = "btn btn-primary w-100" onClick={() => onAction(false)}>Edit</button>
                </div>
            </div>
        </li>
    )
}

export default ListingElement