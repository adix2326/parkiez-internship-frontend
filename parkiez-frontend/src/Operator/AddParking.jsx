import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/textinput";
import CustomBtn from "../components/CustomBtn";

const AddParkingArea = () => {
  const [formData, setFormData] = useState({
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

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      // Placeholder for the logic to add a parking area
      // Replace with your actual API call logic
      const response = await fetch('/api/add-parking-area', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add parking area');
      }

      console.log(formData);
      setSuccess("Parking area added successfully");
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to add parking area: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-6">Add New Parking Area</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-5">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <TextInput
          type="text"
          label="Title"
          placeholder="Enter parking area title"
          required
          value={formData.title}
          name="title"
          onChange={handleChange}
        />
        <div className="flex gap-10">
          <div className="mb-4 w-1/4">
            <label className="block mb-2 font-semibold">Costing Type</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="fixed"
                name="costingType"
                value="fixed"
                checked={formData.costingType === 'fixed'}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="fixed" className="mr-4">Fixed</label>
              <input
                type="radio"
                id="hourly"
                name="costingType"
                value="hourly"
                checked={formData.costingType === 'hourly'}
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
              value={formData.description}
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
            value={formData.cost2wheeler}
            name="cost2wheeler"
            onChange={handleChange}
          />
          <TextInput
            type="number"
            label="Cost for 4 Wheeler"
            placeholder="Enter cost for 4 wheeler"
            required
            value={formData.cost4wheeler}
            name="cost4wheeler"
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-10">
          <TextInput
            type="number"
            label="Latitude"
            placeholder="Enter latitude"
            required
            value={formData.latitude}
            name="latitude"
            onChange={handleChange}
          />
          <TextInput
            type="number"
            label="Longitude"
            placeholder="Enter longitude"
            required
            value={formData.longitude}
            name="longitude"
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
            value={formData.capacity2wheeler}
            name="capacity2wheeler"
            onChange={handleChange}
          />
          <TextInput
            type="number"
            label="Capacity for 4 Wheeler"
            placeholder="Enter capacity for 4 wheeler"
            required
            value={formData.capacity4wheeler}
            name="capacity4wheeler"
            onChange={handleChange}
          />
        </div>
        <TextInput
          type="text"
          label="Address"
          placeholder="Enter address"
          required
          value={formData.address}
          name="address"
          onChange={handleChange}
        />
        <TextInput
          type="text"
          label="Pin Code"
          placeholder="Enter pin code"
          required
          value={formData.pinCode}
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
