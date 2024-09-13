import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import authHeader from "../services/auth-header";
import Header from '../components/DashboardHeader';


const Parkings = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
    const fetchUser = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate("/");
        } 
        else {
            try {
                const response = await axios.get(
                'http://localhost:8081/api/operator/getParkings',
                { 
                    params: { phoneNo: user.username }, 
                    headers: authHeader() 
                }
                );    
                setData(response.data);   
                // console.log("Data : ", data);
                   
            } catch (error) {
                console.error('Error fetching name:', error);
            }
        }
    };
    fetchUser();
    }, [navigate]);

    const handleParkingClick = async (parkingId) => {
        localStorage.setItem("parking", parkingId);
        navigate("/operatordashboard");
    };

  return (
    <>
    
    <div className='h-max w-screen'>
        <Header/>
        <h5 className="bg-green-600 p-5 text-2xl text-white font-bold mb-3" >Select Parking</h5>
        {data.map((parking, index) => (
            <div key={index} className='parking-div cursor-pointer p-5 m-2 shadow-md inline-block rounded-md' onClick={() => handleParkingClick(parking.parkingId)}>
                <h1 className="text-2xl text-green-600 font-semibold">{parking.title}</h1>
            </div>
        ))}
    </div>
    
    
    </>
  )
}

export default Parkings