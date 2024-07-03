// src/Attendent/MakeEntry.jsx
import React, { useState } from 'react';
import TextInput from '../components/textinput';
import CustomBtn from '../components/CustomBtn';

const MakeEntry = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    vehicleRegNo: '',
    vehicleType: '',
    parkingSlot: '',
    paymentType: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-5">Vehicle Entry</h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <TextInput
            label="Owner's Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Mobile Number"
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Vehicle Registration Number"
            type="text"
            name="vehicleRegNo"
            value={formData.vehicleRegNo}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Vehicle Type"
            type="text"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Parking Slot Number"
            type="text"
            name="parkingSlot"
            value={formData.parkingSlot}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Payment Method"
            type="text"
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            required
          />
          <CustomBtn text="Add Entry" type="submit" textcolor="white" />
        </form>
      </div>
    </div>
  );
};

export default MakeEntry;
