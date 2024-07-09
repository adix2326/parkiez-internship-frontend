import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddParkingArea = () => {
  const [formData, setFormData] = useState({
    title: "",
    costingType: "",
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Navigate back to some relevant page after submission
    navigate("/dashboard");
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4 font-bold">Add New Parking Area</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Costing Type</label>
          <input
            type="text"
            name="costingType"
            value={formData.costingType}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Cost for 2 Wheeler</label>
          <input
            type="number"
            name="cost2wheeler"
            value={formData.cost2wheeler}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Cost for 4 Wheeler</label>
          <input
            type="number"
            name="cost4wheeler"
            value={formData.cost4wheeler}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Latitude</label>
          <input
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Longitude</label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="block mb-2 font-semibold mr-2">Availability</label>
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Capacity for 2 Wheeler</label>
          <input
            type="number"
            name="capacity2wheeler"
            value={formData.capacity2wheeler}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Capacity for 4 Wheeler</label>
          <input
            type="number"
            name="capacity4wheeler"
            value={formData.capacity4wheeler}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Pin Code</label>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Parking Area
        </button>
      </form>
    </div>
  );
};

export default AddParkingArea;
