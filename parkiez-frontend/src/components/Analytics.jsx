import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Mon', parking: 30 },
  { name: 'Tue', parking: 40 },
  { name: 'Wed', parking: 20 },
  { name: 'Thu', parking: 27 },
  { name: 'Fri', parking: 18 },
  { name: 'Sat', parking: 23 },
  { name: 'Sun', parking: 34 },
];

const Analytics = () => {
  return (
    <div>
      <h2 className="text-2xl mb-4">Analytics</h2>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="parking" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default Analytics;
