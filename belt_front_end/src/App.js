import React from 'react';
import LoginPage from './LoginPage';
import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Matches from './components/Matches';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/matches" element={<Matches />} />
          <Route path="*" element={<div>Page not found</div>} />   
          <Route path="/" element={<div>Index</div>} />     
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
