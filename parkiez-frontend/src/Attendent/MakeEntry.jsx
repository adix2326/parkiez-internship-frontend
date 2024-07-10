// src/Attendent/MakeEntry.jsx
import React, { useState } from 'react';
import TextInput from '../components/textinput';
import CustomBtn from '../components/CustomBtn';

const MakeEntry = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    vehicleRegNo: '',
    vehicleType: '',
    paymentType: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-lg mx-4 my-8 p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Vehicle Entry</h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
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
            label="Payment Method"
            type="text"
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            required
          />
          <div className="flex justify-center">
            <CustomBtn text="Add Entry" type="submit" textcolor="white" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeEntry;
