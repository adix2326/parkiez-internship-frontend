// src/Attendent/AttendantSidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import InsertChartOutlinedRoundedIcon from '@mui/icons-material/InsertChartOutlinedRounded';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const AttendantSidebar = ({ sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/attendantlogin');
  };

  return (
    <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out bg-green-500 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:relative sm:translate-x-0 sm:w-64`}>
      <button onClick={toggleSidebar} className="absolute top-4 right-4 sm:hidden text-white font-bold border-2 border-white p-1 rounded-full w-9">
        ✕
      </button>
      <ul className="absolute top-20 grid grid-col p-5 text-green-500 gap-5 text-2xl font-semibold w-full">
        <Link to="/attendantdashboard/make-entry" onClick={toggleSidebar}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl">
            Make Entry
            <MenuBookOutlinedIcon fontSize='large'/>
          </li>
        </Link>
        <Link to="/attendantdashboard/make-exit" onClick={toggleSidebar}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl">
            Make Exit
            <InsertChartOutlinedRoundedIcon fontSize='large'/>
          </li>
        </Link>
        <Link to="/attendantdashboard/edit-booking" onClick={toggleSidebar}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl">
            Edit Booking
            <GroupsOutlinedIcon fontSize='large'/>
          </li>
        </Link>
        <Link to="/attendantdashboard/profile" onClick={toggleSidebar}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl">
            Profile
            <AccountCircleOutlinedIcon fontSize='large'/>
          </li>
        </Link>
        <Link to="/attendantdashboard/settings" onClick={toggleSidebar}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl">
            Settings
            <SettingsOutlinedIcon fontSize='large'/>
          </li>
        </Link>
        <button className="" onClick={handleLogout}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl">
            Logout
            <LogoutOutlinedIcon fontSize='large'/>
          </li>
        </button>
      </ul>
    </div>
  );
};

export default AttendantSidebar;
