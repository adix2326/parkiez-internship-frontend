import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import OperatorLogin from './components/operatorlogin';
import AttendantLogin from './components/attendantlogin';
import DailyReport from './components/DailyReport';
import Analytics from './components/Analytics';
import Attendants from './components/Attendants';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/operatorlogin" element={<OperatorLogin />}/>
        <Route path="/attendantlogin" element={<AttendantLogin />}/>
        <Route path="daily-report" element={<DailyReport />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="attendants" element={<Attendants />} />
      </Routes>
    </Router>
  );
}

export default App;
