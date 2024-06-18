import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-green-200 p-4 flex justify-between items-center relative">
      <div>
        <button onClick={toggleSidebar} className="block lg:hidden text-2xl">
          ☰
        </button>
      </div>
      <h1 className="text-2xl">Dashboard</h1>
      <div className="space-x-4">
        <button className="px-4 py-2 bg-gray-300 rounded">Your Profile</button>
        <button className="px-4 py-2 bg-gray-300 rounded">Account Settings</button>
        <button className="px-4 py-2 bg-gray-300 rounded">Sign Out</button>
      </div>
      {/* Sidebar */}
      {sidebarOpen && (
        <div ref={sidebarRef} className="lg:w-64 absolute top-0 right-0 h-full bg-green-200 transition-transform duration-300 ease-in-out transform translate-x-0">
          <ul className="h-full flex flex-col items-center justify-center">
            <li className="mb-4">
              <Link to="/dashboard/daily-report" className="text-green-700 hover:text-green-900" onClick={() => setSidebarOpen(false)}>Daily Report</Link>
            </li>
            <li className="mb-4">
              <Link to="/dashboard/analytics" className="text-green-700 hover:text-green-900" onClick={() => setSidebarOpen(false)}>Analytics</Link>
            </li>
            <li className="mb-4">
              <Link to="/dashboard/attendants" className="text-green-700 hover:text-green-900" onClick={() => setSidebarOpen(false)}>Attendants</Link>
            </li>
          </ul>
        </div>
      )}
      {/* End Sidebar */}
    </div>
  );
};

export default Header;
