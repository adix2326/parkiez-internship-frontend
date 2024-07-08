import React, { useState, useEffect } from 'react';

const AddAttendant = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    parkingArea: '',
    status: 'Active',
  });

  const [parkingAreas, setParkingAreas] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to add attendant
    console.log(formData);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4 font-bold">Add Attendant</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
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
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Add Attendant
        </button>
      </form>
    </div>
  );
};

export default AddAttendant;
