import React from "react";
import { Link } from "react-router-dom";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

const Sidebar = ({ sidebarOpen, toggleSidebar, onAddOperatorClick }) => {

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
      </ul>
    </div>
  );
};

export default Sidebar;
