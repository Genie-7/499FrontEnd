import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Matches from './components/Matches';
import Register from './components/Register';
import UserTypeSelect from './components/UserTypeSelect';
import CreateDoctor from './components/CreateDoctor';
import DoctorDashboard from './components/DoctorDashboard';
import CreateStudent from './components/CreateStudent';
import StudentDashboard from './components/StudentDashboard';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar'; // Ensure this is correctly imported
import CreateResidencyPositionForm from './components/CreateResidency';

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<div>Index</div>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/studentDashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
          <Route path="/doctorDashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
          <Route path="/userTypeSelect" element={<ProtectedRoute><UserTypeSelect /></ProtectedRoute>} />
          <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
          <Route path="/createStudent" element={<ProtectedRoute><CreateStudent /></ProtectedRoute>} />
          <Route path="/createDoctor" element={<ProtectedRoute><CreateDoctor /></ProtectedRoute>} />
          <Route path="/student/matches" element={<ProtectedRoute><Matches /></ProtectedRoute>} />
          <Route path="/doctor/position/create" element={<ProtectedRoute><CreateResidencyPositionForm /></ProtectedRoute>} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
