import React from 'react';
import './App.css';
import './bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Matches from './components/Matches';
import Register from './components/Register';
import UserTypeSelect from './components/UserTypeSelect';
import CreateDoctor from './components/CreateDoctor';
import DoctorDashboard from './components/DoctorDashboard';
import EditPosting from './components/EditPosting';
import ApplicationList from './components/ApplicationList';
import CreateStudent from './components/CreateStudent';
import StudentDashboard from './components/StudentDashboard';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar'; // Ensure this is correctly imported
import CreateResidencyPositionForm from './components/CreateResidency';
import PositionDetail from './components/PositionDetail'; // The new component you will create
import SubmitGradeForm from './components/SubmitGradeForm';

// Other imports

function App() {
  return (
    <Router>
      <div className="w-100 h-100 jumbotron d-flex align-items-center" id="content">
        <Navbar />

        <Routes>
          <Route path="/" element={<div>Index</div>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/studentDashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
          <Route path="/doctorDashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
          <Route path="/doctor/posting/edit" element={<ProtectedRoute><EditPosting /></ProtectedRoute>} />
          <Route path="/doctor/posting/applications" element={<ProtectedRoute><ApplicationList /></ProtectedRoute>} />
          <Route path="/userTypeSelect" element={<ProtectedRoute><UserTypeSelect /></ProtectedRoute>} />
          <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
          <Route path="/createStudent" element={<ProtectedRoute><CreateStudent /></ProtectedRoute>} />
          <Route path="/createDoctor" element={<ProtectedRoute><CreateDoctor /></ProtectedRoute>} />
          <Route path="/student/matches" element={<ProtectedRoute><Matches /></ProtectedRoute>} />
          <Route path="/position/:id" element={<ProtectedRoute><PositionDetail /></ProtectedRoute>} />
          <Route path="/doctor/position/create" element={<ProtectedRoute><CreateResidencyPositionForm /></ProtectedRoute>} />
          <Route path="/submitGrade" element={<ProtectedRoute><SubmitGradeForm /></ProtectedRoute>} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
