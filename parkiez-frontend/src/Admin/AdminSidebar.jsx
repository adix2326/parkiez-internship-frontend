import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import InsertChartOutlinedRoundedIcon from "@mui/icons-material/InsertChartOutlinedRounded";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

const Sidebar = ({ sidebarOpen, toggleSidebar, onAddOperatorClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.service.logout();
    navigate("/");
  };

  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out bg-green-500 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } sm:relative sm:translate-x-0 sm:w-64`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 sm:hidden text-white font-bold border-2 border-white p-1 rounded-full w-9"
      >
        ✕
      </button>
      <ul className="absolute top-10 grid grid-col p-5 text-green-500 gap-5 text-2xl font-semibold w-full">
        <Link to="/admindashboard/daily-report" onClick={toggleSidebar}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl hover:scale-95 hover:bg-green-300 hover:text-white duration-300">
            Daily Report
            <MenuBookOutlinedIcon fontSize="large" />
          </li>
        </Link>
        <Link to="/admindashboard/analytics" onClick={toggleSidebar}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl hover:scale-95 hover:bg-green-300 hover:text-white duration-300">
            Analytics
            <InsertChartOutlinedRoundedIcon fontSize="large" />
          </li>
        </Link>
        <Link to="/admindashboard/attendants" onClick={toggleSidebar}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl hover:scale-95 hover:bg-green-300 hover:text-white duration-300">
            Attendants
            <GroupsOutlinedIcon fontSize="large" />
          </li>
        </Link>
        <Link
          to="#"
          onClick={() => {
            toggleSidebar();
            onAddOperatorClick();
          }}
        >
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl hover:scale-95 hover:bg-green-300 hover:text-white duration-300">
            Add Operator
            <PersonAddOutlinedIcon fontSize="large" />
          </li>
        </Link>
        <Link to="/admindashboard/profile" onClick={toggleSidebar}>
          <li className="bg-white p-3 flex justify-center items-center gap-4 rounded-xl hover:scale-95 hover:bg-green-300 hover:text-white duration-300">
            Profile
            <AccountCircleOutlinedIcon fontSize="large" />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
