import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TeamInfo from './TeamInfo';
import JeremyTran from './JeremyTran';  // Import the JeremyTran component
import GeovanniValadez from './GeovanniValadez';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<TeamInfo />} />
                    <Route path="/jeremy-tran" element={<JeremyTran />} />
                    <Route path="/geovanni-valadez" element={<GeovanniValadez />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
