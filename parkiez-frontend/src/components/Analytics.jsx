import React, { useState } from 'react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar,
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

const Analytics = () => {
  const [selectedAttendant, setSelectedAttendant] = useState(initialData[0]);

  const handleSelectChange = (event) => {
    const selected = initialData.find(attendant => attendant.name === event.target.value);
    setSelectedAttendant(selected);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Analytics</h2>
      <div className="mb-4">
        <label htmlFor="attendant-select" className="block mb-2">Select Attendant:</label>
        <select
          id="attendant-select"
          value={selectedAttendant.name}
          onChange={handleSelectChange}
          className="p-2 border border-gray-300 rounded w-full"
        >
          {initialData.map(attendant => (
            <option key={attendant.name} value={attendant.name}>
              {attendant.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl mb-2">Occupied vs Unoccupied Parking</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={[
                { name: 'Occupied', value: selectedAttendant.occupied },
                { name: 'Unoccupied', value: selectedAttendant.unoccupied },
              ]}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div>
          <h3 className="text-xl mb-2">Daily Bookings</h3>
          <LineChart width={500} height={300} data={dailyData}>
            <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
        <div>
          <h3 className="text-xl mb-2">Monthly Bookings</h3>
          <BarChart width={500} height={300} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookings" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
