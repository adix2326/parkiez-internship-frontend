import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ParkiezLogo from '../assets/parkiez_logo.png';
import authService from '../services/auth.service';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Header = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userFromStorage = authService.getCurrentUserFromStorage();
      if (!userFromStorage) {
        navigate("/");
        return;
      }
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        navigate("/");
      } else {
        setCurrentUser(currentUser);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full z-10 bg-white shadow-sm py-4 px-14 flex flex-row justify-between items-center">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="block text-2xl sm:hidden"> ☰ </button>
        <img className='hidden sm:block' src={ParkiezLogo} alt="parkiez-logo" width={50} />
      </div>
      <h1 className="text-2xl text-green-500 font-bold">Dashboard</h1>
      <div className="relative">
        <button onClick={toggleDropdown} className="text-gray-800 hover:text-gray-900">
          <span className='text-green-500 w-12 h-12 border-2 border-green-500 rounded-full flex justify-center items-center gap-2 hover:scale-125 hover:text-green-300 hover:border-green-300 duration-300'>
            <AccountCircleRoundedIcon fontSize='large'/>
          </span>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg">
            <Link to="/dashboard/profile" className="flex gap-2 px-4 py-2 font-semibold text-green-500 hover:bg-gray-100">
              <AccountCircleOutlinedIcon/>
              Profile
            </Link>
            <Link to="/dashboard/change-password" className="flex gap-2 font-semibold px-4 py-2 text-green-500 hover:bg-gray-100">
              <ChangeCircleOutlinedIcon/>
              Change Password
            </Link>
            <button onClick={handleLogout} className="flex gap-2 font-semibold w-full text-left px-4 py-2 text-green-500 hover:bg-gray-100">
              <LogoutOutlinedIcon/>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
