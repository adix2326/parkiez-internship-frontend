import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar, ResponsiveContainer
} from 'recharts';

const initialData = [
  { name: 'John Doe', bookings: 34, occupied: 20, unoccupied: 14 },
  { name: 'Jane Smith', bookings: 29, occupied: 18, unoccupied: 11 },
  { name: 'Bob Johnson', bookings: 12, occupied: 6, unoccupied: 6 },
  { name: 'Alice Brown', bookings: 45, occupied: 30, unoccupied: 15 },
  { name: 'Charlie Green', bookings: 8, occupied: 3, unoccupied: 5 },
];

const dailyData = [
  { name: "Mon", bookings: 30 },
  { name: "Tue", bookings: 45 },
  { name: "Wed", bookings: 60 },
  { name: "Thu", bookings: 50 },
  { name: "Fri", bookings: 40 },
  { name: "Sat", bookings: 30 },
  { name: "Sun", bookings: 20 },
];

const monthlyData = [
  { month: 'Jan', bookings: 300 },
  { month: 'Feb', bookings: 400 },
  { month: 'Mar', bookings: 500 },
  { month: 'Apr', bookings: 600 },
  { month: 'May', bookings: 700 },
  { month: 'Jun', bookings: 800 },
  { month: 'Jul', bookings: 900 },
  { month: 'Aug', bookings: 1000 },
  { month: 'Sep', bookings: 1100 },
  { month: 'Oct', bookings: 1200 },
  { month: 'Nov', bookings: 1300 },
  { month: 'Dec', bookings: 1400 },
];

const COLORS = ['#0088FE', '#00C49F'];

const aggregateData = (data) => {
  const totalOccupied = data.reduce((acc, item) => acc + item.occupied, 0);
  const totalUnoccupied = data.reduce((acc, item) => acc + item.unoccupied, 0);
  return { totalOccupied, totalUnoccupied };
};

const Analytics = () => {
  const [selectedAttendant, setSelectedAttendant] = useState(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 500, height: 300 });
  const [pieRadius, setPieRadius] = useState(100);
  const { totalOccupied, totalUnoccupied } = aggregateData(initialData);

  const handleSelectChange = (event) => {
    const selected = event.target.value === 'All' ? null : initialData.find(attendant => attendant.name === event.target.value);
    setSelectedAttendant(selected);
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const width = isMobile ? window.innerWidth - 50 : 500;
      const height = isMobile ? 200 : 300;
      const radius = isMobile ? 70 : 100;
      setChartDimensions({ width, height });
      setPieRadius(radius);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pieData = selectedAttendant ? [
    { name: 'Occupied', value: selectedAttendant.occupied },
    { name: 'Unoccupied', value: selectedAttendant.unoccupied },
  ] : [
    { name: 'Occupied', value: totalOccupied },
    { name: 'Unoccupied', value: totalUnoccupied },
  ];

  const lineData = selectedAttendant ? dailyData.map(day => ({ ...day, bookings: selectedAttendant.bookings })) : dailyData;
  const barData = selectedAttendant ? monthlyData.map(month => ({ ...month, bookings: selectedAttendant.bookings })) : monthlyData;

  return (
    <div className="p-6 bg-gray-100 font-sans rounded-lg">
      <h2 className="text-2xl mb-4 font-bold">Analytics</h2>
      <div className="mb-4 flex gap-4 w-full shadow-md rounded-xl p-4 bg-white">
        <label htmlFor="attendant-select" className="block min-w-max my-auto font-semibold">Select Attendant:</label>
        <select
          id="attendant-select"
          value={selectedAttendant ? selectedAttendant.name : 'All'}
          onChange={handleSelectChange}
          className="p-2 border border-gray-300 rounded w-full"
        >
          <option value="All">All</option>
          {initialData.map(attendant => (
            <option key={attendant.name} value={attendant.name}>
              {attendant.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-5 rounded-xl shadow-md bg-white">
          <h3 className="text-xl font-semibold text-center">Occupied vs Unoccupied Parking</h3>
          <ResponsiveContainer width="100%" height={chartDimensions.height}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={pieRadius}
                fill="#8884d8"
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex gap-5 justify-center">
            <p><span className="inline-block w-4 h-4 mr-2" style={{ backgroundColor: COLORS[0] }}></span>Occupied</p>
            <p><span className="inline-block w-4 h-4 mr-2" style={{ backgroundColor: COLORS[1] }}></span>Unoccupied</p>
          </div>
        </div>
        <div className="border p-5 rounded-xl shadow-md bg-white">
          <h3 className="text-xl font-semibold text-center">Daily Bookings</h3>
          <ResponsiveContainer width="100%" height={chartDimensions.height}>
            <LineChart data={lineData}>
              <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="border p-5 rounded-xl shadow-md md:col-span-2 bg-white">
          <h3 className="text-xl font-semibold text-center">Monthly Bookings</h3>
          <ResponsiveContainer width="100%" height={chartDimensions.height}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
