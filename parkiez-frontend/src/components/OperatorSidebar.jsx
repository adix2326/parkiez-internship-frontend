import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ParkiezLogo from '../assets/parkiez_logo.png'; // Adjust the path according to your folder structure

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Assuming '/' is the route for OperatorLogin
  };

  return (
    <div className={`bg-green-200 fixed inset-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64`}>
      <button onClick={toggleSidebar} className="absolute top-4 right-4 text-2xl lg:hidden">
        ✕
      </button>
      <div className="flex justify-center items-center mb-6 mt-16 lg:mt-0">
        <img src={ParkiezLogo} alt="Parkiez Logo" className="h-10 w-10" />
      </div>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard/daily-report" className="text-green-700 hover:text-green-900" onClick={toggleSidebar}>Daily Report</Link>
        </li>
        <li>
          <Link to="/dashboard/analytics" className="text-green-700 hover:text-green-900" onClick={toggleSidebar}>Analytics</Link>
        </li>
        <li>
          <Link to="/dashboard/attendants" className="text-green-700 hover:text-green-900" onClick={toggleSidebar}>Attendants</Link>
        </li>
        <li>
          <Link to="/dashboard/profile" className="text-green-700 hover:text-green-900" onClick={toggleSidebar}>Profile</Link>
        </li>
        <li>
          <Link to="/dashboard/settings" className="text-green-700 hover:text-green-900" onClick={toggleSidebar}>Settings</Link>
        </li>
        <li>
          <button className="text-green-700 hover:text-green-900" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
