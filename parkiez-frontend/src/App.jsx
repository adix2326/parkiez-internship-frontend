import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/LandingPage';
import Dashboard from './components/OperatorDashboard';
import OperatorLogin from './components/operatorlogin';
import AttendantLogin from './components/attendantlogin';
import DailyReport from './components/OperatorDailyReport';
import Analytics from './components/OperatorAnalytics';
import Attendants from './components/Attendants';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/operatorlogin" element={<OperatorLogin/>}/>
        <Route path="/attendantlogin" element={<AttendantLogin/>}/>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Navigate to="daily-report" />} />
          <Route path="daily-report" element={<DailyReport />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="attendants" element={<Attendants />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
