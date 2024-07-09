import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/LandingPage';
import OperatorLogin from './Operator/operatorlogin';
import AttendantLogin from './Attendent/attendantlogin';
import SignIn from './components/SignIn1';
import authService from './services/auth.service';
/* Operator */
import OperatorDashboard from './Operator/OperatorDashboard';
import DailyReport from './Operator/OperatorDailyReport';
import Analytics from './Operator/OperatorAnalytics';
import Attendants from './Operator/Attendants';
import AddAttendant from './Operator/AddAttendant'
import AddParking from './Operator/AddParking'
/* Attendant */
import AttendantDashboard from './Attendent/AttendantDashboard';
import MakeEntry from './Attendent/MakeEntry';
import MakeExit from './Attendent/MakeExit';
/* Admin  */
import AdminDashboard from './Admin/AdminDashboard_original';

function App() {
  const currentUser = authService.getCurrentUserFromStorage();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/operatorlogin" element={<OperatorLogin />} />
        <Route path="/attendantlogin" element={<AttendantLogin />} />

        <Route
          path="/attendantdashboard"
          element={
            currentUser && currentUser.roles.includes('ROLE_ATTENDANT')
              ? <AttendantDashboard />
              : <Navigate to="/signin" />
          }
        >
          <Route path="make-entry" element={<MakeEntry />} />
          <Route path="make-exit" element={<MakeExit />} />
        </Route>

        <Route
          path="/operatordashboard"
          element={
            <OperatorDashboard />
          }
        >
          <Route path="" element={<Navigate to="daily-report" />} />
          <Route path="daily-report" element={<DailyReport />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="attendants" element={<Attendants />} />
          <Route path="add-attendant" element={<AddAttendant />} />
          <Route path="add-parking" element={<AddParking />} />
        </Route>

        <Route
          path="/admindashboard"
          element={
            currentUser && currentUser.roles.includes('ROLE_ADMIN')
              ? <AdminDashboard />
              : <Navigate to="/signin" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
