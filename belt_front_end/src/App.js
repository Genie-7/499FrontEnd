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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  ); */
}

export default App;