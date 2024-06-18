import React from 'react';

const Header = () => {
  return (
    <div className="bg-green-200 p-4 flex justify-between items-center">
      <h1 className="text-2xl">Dashboard</h1>
      <div className="space-x-4">
        <button className="px-4 py-2 bg-gray-300 rounded">Your Profile</button>
        <button className="px-4 py-2 bg-gray-300 rounded">Account Settings</button>
        <button className="px-4 py-2 bg-gray-300 rounded">Sign Out</button>
      </div>
    </div>
  );
};

export default Header;
