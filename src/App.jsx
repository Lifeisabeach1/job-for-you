import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './PersonligtBrev';
import Summary from './Summary';
import './index.css';
import Navbar from './Navbar';
import Cvt from './Cvt';
import CvSummary from './CvSummary';


function App() {
  return (
    <Router>
      <div className="App"> 
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/cv" element={<Cvt />} /> 
            <Route path="/" element={<Home />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/cvsummary" element={<CvSummary />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;