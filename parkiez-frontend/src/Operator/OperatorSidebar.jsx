import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import InsertChartOutlinedRoundedIcon from '@mui/icons-material/InsertChartOutlinedRounded';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/operatorlogin');
  };

  return (
    <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out bg-green-500 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:relative sm:translate-x-0 sm:w-64`}>
      <button onClick={toggleSidebar} className="absolute top-4 right-4 sm:hidden text-white font-bold border-2 border-white p-1 rounded-full w-9">
        ✕
      </button>
      <ul className="absolute top-20 grid grid-col p-5 text-green-500 gap-5 text-2xl font-semibold w-full">
        <Link to="/operatordashboard/daily-report" onClick={toggleSidebar}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl">
            Daily Report
            <MenuBookOutlinedIcon fontSize='large'/>
          </li>
        </Link>
        <Link to="/operatordashboard/analytics" onClick={toggleSidebar}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl">
            Analytics
            <InsertChartOutlinedRoundedIcon fontSize='large'/> 
          </li>
        </Link>
        <Link to="/operatordashboard/attendants" onClick={toggleSidebar}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl">
            Attendants
            <GroupsOutlinedIcon fontSize='large'/>
          </li>
        </Link>
        <Link to="/operatordashboard/profile" onClick={toggleSidebar}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl">
            Profile
            <AccountCircleOutlinedIcon fontSize='large'/>
          </li>
        </Link>
        <Link to="/operatordashboard/settings" onClick={toggleSidebar}>
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

export default Sidebar;
