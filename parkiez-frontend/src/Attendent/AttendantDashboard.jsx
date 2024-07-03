// src/Attendent/AttendantDashboard.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/DashboardHeader'; // Assume you have a common Header component
import AttendantSidebar from './AttendantSidebar';

const AttendantDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col relative">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <AttendantSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendantDashboard;
