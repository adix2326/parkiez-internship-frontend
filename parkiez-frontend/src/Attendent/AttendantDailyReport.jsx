import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authHeader from "../services/auth-header";
import 'tailwindcss/tailwind.css';

const AttendantDailyReport = () => {
  const [fourWheelers, setFourWheelers] = useState(0);
  const [twoWheelers, setTwoWheelers] = useState(0);
  const [fourWheelersTillNow, setFourWheelersTillNow] = useState(0);
  const [twoWheelersTillNow, setTwoWheelersTillNow] = useState(0);
  const [fourWheelersRevenue, setFourWheelersRevenue] = useState(0);
  const [twoWheelersRevenue, setTwoWheelersRevenue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user);
        if (!user) {
          navigate('/'); 
        } else {
          const response = await axios.get(
            'http://localhost:8081/api/attendant/currentlyParkedVehicles',
            {
              params: { phoneNo: user.username },
              headers: authHeader(),
            }
          );
          const { data } = response;
          setFourWheelers(data['4w_currently']);
          setTwoWheelers(data['2w_currently']);
          setFourWheelersRevenue(data['4w_revenue']);
          setTwoWheelersRevenue(data['2w_revenue']);
          setFourWheelersTillNow(data['4w_tillNow']);
          setTwoWheelersTillNow(data['2w_tillNow']);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchVehicleData();
  }, [navigate]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen h-max rounded-lg">
      <h2 className="text-2xl mb-6 font-bold text-gray-700">Attendant Report</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700">Cars Currently Parked</h3>
          <p className="text-4xl font-bold text-green-600">{fourWheelers}</p>
          <p className="text-xl text-gray-500 mt-4 font-semibold">Total Cars: <span className='text-2xl'>{fourWheelersTillNow}</span></p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700">2-Wheelers Currently Parked</h3>
          <p className="text-4xl font-bold text-green-600">{twoWheelers}</p>
          <p className="text-xl text-gray-500 mt-4 font-semibold">Total 2-Wheelers: <span className='text-2xl'>{twoWheelersTillNow}</span></p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700">Total Revenue by Cars Till Now</h3>
          <p className="text-4xl font-bold text-green-600">₹{fourWheelersRevenue}</p> 
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700">Total Revenue by 2-Wheelers Till Now</h3>
          <p className="text-4xl font-bold text-green-600">₹{twoWheelersRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default AttendantDailyReport;
