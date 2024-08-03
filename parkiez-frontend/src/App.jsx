import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/LandingPage';
import SignIn from './components/SignIn1';
/* Operator */
import OperatorDashboard from './Operator/OperatorDashboard';
import OperatorDailyReport from './Operator/OperatorDailyReport';
import Analytics from './Operator/OperatorAnalytics';
import Attendants from './Operator/Attendants';
import AddAttendant from './Operator/AddAttendant'
import AddParking from './Operator/AddParking'
/* Attendant */
import AttendantDashboard from './Attendent/AttendantDashboard';
import AttendantDailyReport from './Attendent/AttendantDailyReport';
import MakeEntry from './Attendent/MakeEntry';
import MakeExit from './Attendent/MakeExit';
/* Admin  */
import AdminDashboard from './Admin/AdminDashboard_original';

function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />

          <Route
            path="/attendantdashboard"
            element={
              <AttendantDashboard />
            }
          >
            <Route path="" element={<Navigate to="daily-report" />} />
            <Route path="daily-report" element={<AttendantDailyReport />} />
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
            <Route path="daily-report" element={<OperatorDailyReport />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="attendants" element={<Attendants />} />
            <Route path="add-attendant" element={<AddAttendant />} />
            <Route path="add-parking" element={<AddParking />} />
          </Route>

          <Route
            path="/admindashboard"
            element={
              <AdminDashboard />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
