import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import InsertChartOutlinedRoundedIcon from '@mui/icons-material/InsertChartOutlinedRounded';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

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
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl hover:scale-95 hover:bg-green-300 hover:text-white duration-300">
            Daily Report
            <MenuBookOutlinedIcon fontSize='large'/>
          </li>
        </Link>
        <Link to="/operatordashboard/analytics" onClick={toggleSidebar}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl hover:scale-95 hover:bg-green-300 hover:text-white duration-300">
            Analytics
            <InsertChartOutlinedRoundedIcon fontSize='large'/>
          </li>
        </Link>
        <Link to="/operatordashboard/attendants" onClick={toggleSidebar}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl hover:scale-95 hover:bg-green-300 hover:text-white duration-300">
            Attendants
            <GroupsOutlinedIcon fontSize='large'/>
          </li>
        </Link>
        <Link to="/operatordashboard/add-attendant" onClick={toggleSidebar}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl hover:scale-95 hover:bg-green-300 hover:text-white duration-300">
            Add Attendent
            <PersonAddOutlinedIcon fontSize='large'/>
          </li>
        </Link>
        <Link to="/operatordashboard/add-parking" onClick={toggleSidebar}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl hover:scale-95 hover:bg-green-300 hover:text-white duration-300">
            Add Parking
            <AddOutlinedIcon fontSize='large'/>
          </li>
        </Link>        
      </ul>
    </div>
  );
};

export default Sidebar;
