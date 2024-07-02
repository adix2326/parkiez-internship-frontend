import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import 'tailwindcss/tailwind.css';

const DailyReport = () => {
  const [selectedAttendantId, setSelectedAttendantId] = useState(null);

  const data = useMemo(
    () => [
      { id: 1, name: 'John Doe', bookings: 34, status: 'Active', revenue: 3400, carsTodayRevenue: 1500, twoWheelersTodayRevenue: 1900, carsCurrentlyParked: 10, carsTotalParked: 30, twoWheelersCurrentlyParked: 15, twoWheelersTotalParked: 35 },
      { id: 2, name: 'Jane Smith', bookings: 29, status: 'Active', revenue: 2900, carsTodayRevenue: 1200, twoWheelersTodayRevenue: 1700, carsCurrentlyParked: 8, carsTotalParked: 25, twoWheelersCurrentlyParked: 10, twoWheelersTotalParked: 30 },
      { id: 3, name: 'Bob Johnson', bookings: 12, status: 'Inactive', revenue: 1200, carsTodayRevenue: 700, twoWheelersTodayRevenue: 500, carsCurrentlyParked: 5, carsTotalParked: 15, twoWheelersCurrentlyParked: 8, twoWheelersTotalParked: 20 },
      { id: 4, name: 'Alice Brown', bookings: 45, status: 'Active', revenue: 4500, carsTodayRevenue: 2200, twoWheelersTodayRevenue: 1800, carsCurrentlyParked: 12, carsTotalParked: 40, twoWheelersCurrentlyParked: 18, twoWheelersTotalParked: 50 },
      { id: 5, name: 'Charlie Green', bookings: 8, status: 'Inactive', revenue: 800, carsTodayRevenue: 400, twoWheelersTodayRevenue: 400, carsCurrentlyParked: 7, carsTotalParked: 20, twoWheelersCurrentlyParked: 10, twoWheelersTotalParked: 25 },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Attendant Name',
        accessor: 'name',
      },
      {
        Header: 'Bookings Made',
        accessor: 'bookings',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Revenue (₹)',
        accessor: 'revenue',
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const handleAttendantSelect = (event) => {
    const attendantId = parseInt(event.target.value);
    setSelectedAttendantId(attendantId);
  };

  let totalCarsCurrentlyParked = data.reduce((total, attendant) => total + attendant.carsCurrentlyParked, 0);
  let totalCarsToday = data.reduce((total, attendant) => total + attendant.carsTotalParked, 0);
  let totalTwoWheelersCurrentlyParked = data.reduce((total, attendant) => total + attendant.twoWheelersCurrentlyParked, 0);
  let totalTwoWheelersToday = data.reduce((total, attendant) => total + attendant.twoWheelersTotalParked, 0);
  let totalCarsTodayRevenue = data.reduce((total, attendant) => total + attendant.carsTodayRevenue, 0);
  let totalTwoWheelersTodayRevenue = data.reduce((total, attendant) => total + attendant.twoWheelersTodayRevenue, 0);

  let selectedAttendant = data.find(attendant => attendant.id === selectedAttendantId);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl mb-6 font-bold text-gray-700">Operator Daily Report</h2>

      {/* Total cards for all attendants */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700">Cars Currently Parked</h3>
          <p className="text-4xl font-bold text-green-600">{totalCarsCurrentlyParked}</p>
          <p className="text-sm text-gray-500">Total Cars Today: {totalCarsToday}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700">2-Wheelers Currently Parked</h3>
          <p className="text-4xl font-bold text-green-600">{totalTwoWheelersCurrentlyParked}</p>
          <p className="text-sm text-gray-500">Total 2-Wheelers Today: {totalTwoWheelersToday}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700">Total Revenue by Cars Today</h3>
          <p className="text-4xl font-bold text-green-600">₹{totalCarsTodayRevenue}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700">Total Revenue by 2-Wheelers Today</h3>
          <p className="text-4xl font-bold text-green-600">₹{totalTwoWheelersTodayRevenue}</p>
        </div>
      </div>

      {/* Attendant Selection Dropdown */}
      <div className="mb-4">
        <label htmlFor="attendantSelect" className="block text-sm font-medium text-gray-700 mb-2">Select Attendant:</label>
        <select
          id="attendantSelect"
          name="attendant"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          onChange={handleAttendantSelect}
        >
          <option value="">All Attendants</option>
          {data.map((attendant) => (
            <option key={attendant.id} value={attendant.id}>{attendant.name}</option>
          ))}
        </select>
      </div>

      {/* Display Selected Attendant's Parking Data */}
      {selectedAttendant && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Cars Currently Parked</h3>
            <p className="text-4xl font-bold text-green-600">{selectedAttendant.carsCurrentlyParked}</p>
            <p className="text-sm text-gray-500">Total Cars Today: {selectedAttendant.carsTotalParked}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">2-Wheelers Currently Parked</h3>
            <p className="text-4xl font-bold text-green-600">{selectedAttendant.twoWheelersCurrentlyParked}</p>
            <p className="text-sm text-gray-500">Total 2-Wheelers Today: {selectedAttendant.twoWheelersTotalParked}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Total Revenue by Cars Today</h3>
            <p className="text-4xl font-bold text-green-600">₹{selectedAttendant.carsTodayRevenue}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Total Revenue by 2-Wheelers Today</h3>
            <p className="text-4xl font-bold text-green-600">₹{selectedAttendant.twoWheelersTodayRevenue}</p>
          </div>
        </div>
      )}

      {/* Table of Attendants */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl mb-4 font-bold text-gray-700">Table of Attendants</h2>
        <table {...getTableProps()} className="min-w-full bg-white">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-green-600 text-white">
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="p-4 border-b border-green-600 text-left"
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-b border-green-200 hover:bg-gray-100">
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="p-4">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyReport;
