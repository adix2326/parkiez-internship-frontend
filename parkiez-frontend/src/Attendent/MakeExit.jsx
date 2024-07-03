import React, { useState } from 'react';
import TextInput from '../components/textinput';
import CustomBtn from '../components/CustomBtn';

const MakeExit = () => {
  const [formData, setFormData] = useState({
    vehicleRegNo: '',
    parkingSlot: '',
    amountPaid: '',
    outTime: '',
    paymentStatus: '',
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
      <div className="bg-white p-10 rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-5">Vehicle Exit</h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <TextInput
            label="Vehicle Registration Number"
            type="text"
            name="vehicleRegNo"
            value={formData.vehicleRegNo}
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
            label="Amount Paid"
            type="number"
            name="amountPaid"
            value={formData.amountPaid}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Out Time"
            type="text"
            name="outTime"
            value={formData.outTime}
            onChange={handleChange}
            required
          />
          <div className='flex flex-col'>
            <label className='mb-2 ml-1 font-semibold'>Payment Status</label>
            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className='p-2 pl-4 border rounded-lg bg-slate-50 shadow-sm'
              required
            >
              <option value="" disabled>Select Payment Status</option>
              <option value="Paid">Paid</option>
              <option value="Not Paid">Not Paid</option>
            </select>
          </div>
          <CustomBtn text="Add Exit" type="submit" textcolor="white" />
        </form>
      </div>
    </div>
  );
};

export default MakeExit;
