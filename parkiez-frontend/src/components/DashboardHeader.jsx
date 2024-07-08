import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ParkiezLogo from '../assets/parkiez_logo.png'
import authService from '../services/auth.service';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/")
  };

  return (
    <div className="w-full z-10 bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="block text-2xl sm:hidden"> ☰ </button>
      </div>
      <img className='hidden sm:block' src={ParkiezLogo} alt="parkiez-logo" width={50} />
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
