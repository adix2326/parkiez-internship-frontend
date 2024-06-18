import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-green-200 w-64 h-screen p-4">
      <div className="text-center text-xl font-bold mb-6">
        PARKIEZ
      </div>
      <ul>
        <li className="mb-4">
          <Link to="/dashboard/daily-report" className="text-green-700 hover:text-green-900">Daily Report</Link>
        </li>
        <li className="mb-4">
          <Link to="/dashboard/analytics" className="text-green-700 hover:text-green-900">Analytics</Link>
        </li>
        <li className="mb-4">
          <Link to="/dashboard/attendants" className="text-green-700 hover:text-green-900">Attendants</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
