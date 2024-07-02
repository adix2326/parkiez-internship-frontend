import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Assuming '/' is the route for OperatorLogin
  };

  return (
    <div className="w-full z-10 bg-slate-100 shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="block text-2xl sm:hidden"> ☰ </button>
      </div>
      <h1 className="text-2xl text-green-500 font-bold mx-auto">Dashboard</h1>
      <div className="space-x-4 hidden lg:flex">
        <Link to="/dashboard/profile" className="text-gray-800 hover:text-gray-900">Profile</Link>
        <Link to="/dashboard/settings" className="text-gray-800 hover:text-gray-900">Settings</Link>
        <button onClick={handleLogout} className="text-gray-800 hover:text-gray-900">Logout</button>
      </div>
    </div>
  );
};

export default Header;
