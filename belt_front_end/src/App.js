import React from 'react';
import './App.css';
import './bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './services/AuthProvider';
import LoginPage from './components/LoginPage';
import Matches from './components/Matches';
import Register from './components/Register';
import UserTypeSelect from './components/UserTypeSelect';
import CreateDoctor from './components/CreateDoctor';
import DoctorDashboard from './components/DoctorDashboard';
import EditPosting from './components/EditPosting';
import ApplicationList from './components/ApplicationList';
import ApplicationView from './components/ApplicationView';
import CreateStudent from './components/CreateStudent';
import StudentDashboard from './components/StudentDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import DoctorRoute from './components/DoctorRoute';
import StudentRoute from './components/StudentRoute';
import Navbar from './components/Navbar'; // Ensure this is correctly imported
import CreateResidencyPositionForm from './components/CreateResidency';
import PositionDetail from './components/PositionDetail'; // The new component you will create
import SubmitGradeForm from './components/SubmitGradeForm';
import AllApplications from './components/AllApplications';


// Other imports

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="w-100 h-100 jumbotron d-flex align-items-center" id="content">
          <Navbar />

          <Routes>
            <Route path="/" element={<div>Index</div>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/studentDashboard" element={<ProtectedRoute><StudentRoute><StudentDashboard /></StudentRoute></ProtectedRoute>} />
            <Route path="/doctorDashboard" element={<ProtectedRoute><DoctorRoute><DoctorDashboard /></DoctorRoute></ProtectedRoute>} />
            <Route path="/doctor/posting/edit" element={<ProtectedRoute><DoctorRoute><EditPosting /></DoctorRoute></ProtectedRoute>} />
            <Route path="/doctor/posting/applications" element={<ProtectedRoute><DoctorRoute><ApplicationList /></DoctorRoute></ProtectedRoute>} />
            <Route path="/doctor/posting/applications/view" element={<ProtectedRoute><DoctorRoute><ApplicationView /></DoctorRoute></ProtectedRoute>} />
            <Route path="/userTypeSelect" element={<ProtectedRoute><UserTypeSelect /></ProtectedRoute>} />
            <Route path="/createStudent" element={<ProtectedRoute><CreateStudent /></ProtectedRoute>} />
            <Route path="/createDoctor" element={<ProtectedRoute><CreateDoctor /></ProtectedRoute>} />
            <Route path="/student/applications/all" element={<ProtectedRoute><StudentRoute><AllApplications /></StudentRoute></ProtectedRoute>} />
            <Route path="/student/matches" element={<ProtectedRoute><StudentRoute><Matches /></StudentRoute></ProtectedRoute>} />
            <Route path="/position/:id" element={<ProtectedRoute><StudentRoute><PositionDetail /></StudentRoute></ProtectedRoute>} />
            <Route path="/doctor/position/create" element={<ProtectedRoute><DoctorRoute><CreateResidencyPositionForm /></DoctorRoute></ProtectedRoute>} />
            <Route path="/submitGrade" element={<ProtectedRoute><StudentRoute><SubmitGradeForm /></StudentRoute></ProtectedRoute>} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
