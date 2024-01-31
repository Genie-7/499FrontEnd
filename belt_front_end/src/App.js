import React from 'react';
import LoginPage from './components/LoginPage';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Matches from './components/Matches';
import Register from './components/Register'; // Adjust path as necessary
import UserTypeSelect from './components/UserTypeSelect';
import CreateDoctor from './components/CreateDoctor';
import DoctorDashboard from './components/DoctorDashboard';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/matches" element={<Matches />} />
          <Route path="*" element={<div>Page not found</div>} />   
          <Route path="/" element={<div>Index</div>} /> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/userTypeSelect" element={<UserTypeSelect />} />    
          <Route path="/createDoctor" element={<CreateDoctor />} />
          <Route path="/doctorDashboard" element={<DoctorDashboard />} />   
        </Routes>
      </div>
    </Router>
  );
  /* return (
    <div className="App">
      <LoginPage />
    </div>
  ); */
}

export default App;
