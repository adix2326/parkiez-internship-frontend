import React, { useState, useEffect } from 'react';
import TextInput from "../components/textinput";
import CustomBtn from "../components/CustomBtn";

const AddAttendant = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    parkingArea: '',
    status: 'Active',
  });

  const [parkingAreas, setParkingAreas] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Fetch parking areas from your API or data source
    const fetchParkingAreas = async () => {
      try {
        const response = await fetch('/api/parking-areas'); // Replace with your API endpoint
        const data = await response.json();
        setParkingAreas(data);
      } catch (error) {
        console.error('Error fetching parking areas:', error);
      }
    };

    fetchParkingAreas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      // Placeholder for the logic to add an attendant
      // Replace with your actual API call logic
      const response = await fetch('/api/add-attendant', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add attendant');
      }

      console.log(formData);
      setSuccess("Attendant added successfully");
    } catch (error) {
      setError("Failed to add attendant: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-6">Add Attendant</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <TextInput
          type="text"
          label="Name"
          placeholder="Enter attendant name"
          required
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
        <TextInput
          type="text"
          label="Phone Number"
          placeholder="Enter attendant phone number"
          required
          value={formData.phoneNumber}
          name="phoneNumber"
          onChange={handleChange}
        />
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Parking Area</label>
          <select
            name="parkingArea"
            value={formData.parkingArea}
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
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <CustomBtn
          text="Add Attendant"
          type="submit"
          textcolor="white"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default AddAttendant;
