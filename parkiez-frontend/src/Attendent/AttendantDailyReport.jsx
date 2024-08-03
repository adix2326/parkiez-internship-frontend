import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import 'tailwindcss/tailwind.css';

const AttendantDailyReport = () => {

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-lg">
      <h2 className="text-2xl mb-6 font-bold text-gray-700">Attendant Daily Report</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700">Cars Currently Parked</h3>
          <p className="text-4xl font-bold text-green-600">{40}</p>
          <p className="text-sm text-gray-500">Total Cars Today: {60}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700">2-Wheelers Currently Parked</h3>
          <p className="text-4xl font-bold text-green-600">{40}</p>
          <p className="text-sm text-gray-500">Total 2-Wheelers Today: {60}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700">Total Revenue by Cars Today</h3>
          <p className="text-4xl font-bold text-green-600">₹{5000}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700">Total Revenue by 2-Wheelers Today</h3>
          <p className="text-4xl font-bold text-green-600">₹{5000}</p>
        </div>
      </div>
    </div>
  );
};

export default AttendantDailyReport;
