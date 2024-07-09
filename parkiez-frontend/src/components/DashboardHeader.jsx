import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ParkiezLogo from '../assets/parkiez_logo.png';
import authService from '../services/auth.service';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/")
  };

  return (
    <div className="w-full z-10 bg-white shadow-sm py-4 px-14 flex flex-row justify-between items-center">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="block text-2xl sm:hidden"> ☰ </button>
        <img className='hidden sm:block' src={ParkiezLogo} alt="parkiez-logo" width={50} />
      </div>
      <h1 className="text-2xl text-green-500 font-bold">Dashboard</h1>
      <Link to="/dashboard/profile" className="text-gray-800 hover:text-gray-900">
        <span className='text-green-500 scale-150'>
          <AccountCircleOutlinedIcon fontSize='large'/>
        </span>
      </Link>
    </div>
  );
};

export default Header;
