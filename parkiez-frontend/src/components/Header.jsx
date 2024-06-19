import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Assuming '/' is the route for OperatorLogin
  };

  return (
    <div className="bg-green-200 p-4 flex justify-between items-center relative">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="block text-2xl lg:hidden">
          ☰
        </button>
      </div>
      <h1 className="text-2xl">Dashboard</h1>
      <div className="space-x-4 hidden lg:flex">
        <Link to="/dashboard/profile" className="text-gray-800 hover:text-gray-900">Profile</Link>
        <Link to="/dashboard/settings" className="text-gray-800 hover:text-gray-900">Settings</Link>
        <button onClick={handleLogout} className="text-gray-800 hover:text-gray-900">Logout</button>
      </div>
    </div>
  );
};

export default Header;
