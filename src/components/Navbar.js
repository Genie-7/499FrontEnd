import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthProvider'; // Adjust the import path as necessary
/*Combine both student and doctor one dashboard link in nav then based off user type send to appropriate dashboard*/
const Navbar = () => {
  //if student or doctor id return diff navs
    const { userType, logout } = useAuth(); // Destructure userType and logout from the context
    
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">BELT RMS</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {userType === 'doctor' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/doctorDashboard">Doctor Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/doctor/position/create">Create Position</Link>
                  </li>
                </>
              )}
              {userType === 'student' && (
                <>          
                  <li className="nav-item">
                    <Link className="nav-link" to="/studentDashboard">Student Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/submitGrade">Add Grade</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/student/matches">Matches</Link>
                  </li>
                </>
              )}
              {!userType && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              )}
              {userType && (
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={logout}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
};

export default Navbar;