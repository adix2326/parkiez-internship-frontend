import React, { useState } from 'react';
import TextInput from '../components/textinput';
import CustomBtn from '../components/CustomBtn';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MakeExit = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicleRegNo: '',
    parkingSlot: '',
    amountPaid: '',
    outTime: '',
    paymentStatus: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      // Optional: Validate inputs here
      if (parseFloat(formData.amountPaid) <= 0) {
        throw new Error('Amount paid must be greater than 0');
      }

      console.log(formData);
      // Replace with your API call to add exit data
      // await makeExitService(formData);

      toast.success('Exit added successfully!');
      navigate('/dashboard'); // Adjust this route as necessary
    } catch (error) {
      toast.error(error.message || 'An error occurred while processing your request.');
    } finally {
      setLoading(false); // Set loading back to false
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Vehicle Exit</h2>
      <form className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-5" onSubmit={handleSubmit}>
        <TextInput
          label="Vehicle Registration Number"
          type="text"
          name="vehicleRegNo"
          value={formData.vehicleRegNo}
          onChange={handleChange}
          placeholder="Enter vehicle registration number"
          required
        />
        <TextInput
          label="Parking Slot Number"
          type="text"
          name="parkingSlot"
          value={formData.parkingSlot}
          onChange={handleChange}
          placeholder="Enter parking slot number"
          required
        />
        <TextInput
          label="Amount Paid"
          type="number"
          name="amountPaid"
          value={formData.amountPaid}
          onChange={handleChange}
          placeholder="Enter amount paid"
          required
        />
        <TextInput
          label="Out Time"
          type="text"
          name="outTime"
          value={formData.outTime}
          onChange={handleChange}
          placeholder="Enter out time (e.g. 12:30 PM)"
          required
        />
        <div className="flex flex-col">
          <label className="mb-2 ml-1 font-semibold">Payment Status</label>
          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            className="p-2 pl-4 border rounded-lg bg-slate-50 shadow-sm"
            required
          >
            <option value="" disabled>Select Payment Status</option>
            <option value="Paid">Paid</option>
            <option value="Not Paid">Not Paid</option>
          </select>
        </div>
        <CustomBtn
          text={loading ? "Adding..." : "Add Exit"}
          type="submit"
          textcolor="white"
          disabled={loading} // Disable button while loading
        />
      </form>
    </div>
  );
};

export default MakeExit;