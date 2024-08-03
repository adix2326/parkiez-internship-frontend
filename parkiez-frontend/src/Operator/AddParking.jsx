import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/textinput";
import CustomBtn from "../components/CustomBtn";
import { toast } from "react-toastify";
import {addParking} from '../services/addParkingService';

const AddParkingArea = () => {
  const [parkingData, setParkingData] = useState({
    parkingId: "",
    opId: "",
    title: "",
    costingType: "fixed",
    description: "",
    cost2wheeler: "",
    cost4wheeler: "",
    latitude: "",
    longitude: "",
    availability: true,
    capacity2wheeler: "",
    capacity4wheeler: "",
    address: "",
    pinCode: ""
  });

  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) {
        navigate("/");
        return;
      }else {
        setCurrentUser(currentUser);
      }
    };
    fetchUser();
  }, []);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setParkingData({
      ...parkingData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      parkingData.opId = currentUser.id;
      await addParking(parkingData);
      // console.log(`Parking data : ${parkingData}`);
      toast.success("Parking Added Successfully");
      navigate("/operatordashboard");
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add New Parking</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-5">
        <div className="flex gap-10">
          <div className="mb-4 w-1/2">
            <TextInput
              type="text"
              label="Title"
              placeholder="Enter parking area title"
              required
              value={parkingData.title}
              name="title"
              onChange={handleChange}
            />  
          </div>
          <div className="mb-4 w-1/2">
            <TextInput
              type="text"
              label="Parking ID"
              placeholder="Enter Parking ID"
              required
              value={parkingData.parkingId}
              name="parkingId"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="mb-4 w-1/4">
            <label className="block mb-2 font-semibold">Costing Type</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="fixed"
                name="costingType"
                value="fixed"
                checked={parkingData.costingType === 'fixed'}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="fixed" className="mr-4">Fixed</label>
              <input
                type="radio"
                id="hourly"
                name="costingType"
                value="hourly"
                checked={parkingData.costingType === 'hourly'}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="hourly">Hourly</label>
            </div>
          </div>
          <div className="mb-4 w-2/4">
            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              name="description"
              value={parkingData.description}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
              required
            ></textarea>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10">
        <TextInput
          type="number"
          label="Cost for 2 Wheeler"
          placeholder="Enter cost for 2 wheeler"
          required
          value={parkingData.cost2wheeler}
          name="cost2wheeler"
          min="0"
          onChange={handleChange}
        />
        <TextInput
          type="number"
          label="Cost for 4 Wheeler"
          placeholder="Enter cost for 4 wheeler"
          required
          value={parkingData.cost4wheeler}
          name="cost4wheeler"
          min="0"
          onChange={handleChange}
        />
      </div>
        <div className="grid grid-cols-2 gap-10">
        <TextInput
          type="text"
          label="Latitude"
          placeholder="Enter latitude (e.g., 37.7749)"
          required
          value={parkingData.latitude}
          name="latitude"
          pattern="^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$"
          onChange={handleChange}
        />
        <TextInput
          type="text"
          label="Longitude"
          placeholder="Enter longitude (e.g., -122.4194)"
          required
          value={parkingData.longitude}
          name="longitude"
          pattern="^-?(180(\.0+)?|(1[0-7]\d|\d{1,2})(\.\d+)?)$"
          onChange={handleChange}
        />
      </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="availability"
            checked={true}
            className="p-2 border border-gray-300 rounded"
            hidden
          />
        </div>
        <div className="grid grid-cols-2 gap-10">
        <TextInput
          type="number"
          label="Capacity for 2 Wheeler"
          placeholder="Enter capacity for 2 wheeler"
          required
          value={parkingData.capacity2wheeler}
          name="capacity2wheeler"
          min="0"
          onChange={handleChange}
        />
        <TextInput
          type="number"
          label="Capacity for 4 Wheeler"
          placeholder="Enter capacity for 4 wheeler"
          required
          value={parkingData.capacity4wheeler}
          name="capacity4wheeler"
          min="0"
          onChange={handleChange}
        />
      </div>

        <TextInput
          type="text"
          label="Address"
          placeholder="Enter address"
          required
          value={parkingData.address}
          name="address"
          onChange={handleChange}
        />
        <TextInput
          type="text"
          label="Pin Code"
          placeholder="Enter pin code"
          required
          value={parkingData.pinCode}
          name="pinCode"
          onChange={handleChange}
        />
        <CustomBtn
          text="Add Parking Area"
          type="submit"
          textcolor="white"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default AddParkingArea;
