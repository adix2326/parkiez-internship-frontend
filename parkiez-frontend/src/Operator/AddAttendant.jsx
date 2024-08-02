import React, { useState, useEffect } from 'react';
import TextInput from "../components/textinput";
import CustomBtn from "../components/CustomBtn";
import { addAttendant } from '../services/addAttendantService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddAttendant = () => {

  const navigate = useNavigate();

  const [attendantData, setattendantData] = useState({
    phoneNo: '',
    parkingId: '',
    name: '',
    password:''
  });

  // const [parkingAreas, setParkingAreas] = useState([]);

  // useEffect(() => {
  //   // Fetch parking areas from your API or data source
  //   const fetchParkingAreas = async () => {
  //     try {
  //       const response = await fetch('/api/parking-areas'); // Replace with your API endpoint
  //       const data = await response.json();
  //       setParkingAreas(data);
  //     } catch (error) {
  //       console.error('Error fetching parking areas:', error);
  //     }
  //   };

  //   fetchParkingAreas();
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setattendantData({ ...attendantData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAttendant(attendantData);
      // console.log(attendantData);
      toast.success("Attendant Added Successfully");
      navigate("/operatordashboard");
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add Attendant</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-5">
        <TextInput
          type="text"
          label="Name"
          placeholder="Enter attendant name"
          required
          value={attendantData.name}
          name="name"
          onChange={handleChange}
        />
        <TextInput
          type="text"
          label="Phone Number"
          placeholder="Enter attendant phone number"
          required
          value={attendantData.phoneNo}
          name="phoneNo"
          onChange={handleChange}
        />
        <TextInput
          type="text"
          label="Parking Id"
          placeholder="Enter Parking Id"
          required
          value={attendantData.parkingId}
          name="parkingId"
          onChange={handleChange}
        />
        <TextInput
          type="password"
          label="Password"
          placeholder="Enter Password"
          required
          value={attendantData.password}
          name="password"
          onChange={handleChange}
        />
        {/* <div className="mb-4">
          <label className="block mb-2 font-semibold">Parking Area</label>
          <select
            name="parkingArea"
            value={attendantData.parkingId}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="">Select Parking Area</option>
            {parkingAreas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.title} (ID: {area.id})
              </option>
            ))}
          </select>
        </div> */}
        {/* <div className="mb-4">
          <label className="block mb-2 font-semibold">Status</label>
          <select
            name="status"
            value={attendantData.status}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div> */}
        <CustomBtn
          text="Add Attendant"
          type="submit"
          textcolor="white"
        />
      </form>
    </div>
  );
};

export default AddAttendant;
