import React, { useState } from 'react';
import TextInput from '../components/textinput';
import CustomBtn from '../components/CustomBtn';
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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on change
  };

  const validateFields = () => {
    const newErrors = {};
    
    // Vehicle Registration Number validation (e.g., MH12AB1234)
    const vehicleRegNoPattern = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
    if (!vehicleRegNoPattern.test(formData.vehicleRegNo)) {
      newErrors.vehicleRegNo = "Invalid Vehicle Registration Number. Format should be like 'MH12AB1234'.";
    }

    // Amount Paid validation (must be greater than 0)
    if (parseFloat(formData.amountPaid) <= 0) {
      newErrors.amountPaid = "Amount paid must be greater than 0.";
    }

    // Out Time validation (should not be empty)
    if (!formData.outTime.trim()) {
      newErrors.outTime = "Out Time is required.";
    }

    // Payment Status validation (should be selected)
    if (!formData.paymentStatus) {
      newErrors.paymentStatus = "Please select a payment status.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateFields()) {
      setLoading(false);
      return;
    }

    try {
      // Replace with your API call to add exit data
      // await makeExitService(formData);

      console.log(formData);
      navigate('/dashboard'); // Adjust this route as necessary
    } catch (error) {
      setErrors({ submit: error.message || 'An error occurred while processing your request.' });
    } finally {
      setLoading(false);
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
          className={`${errors.vehicleRegNo ? 'border-red-500' : ''}`}
        />
        {errors.vehicleRegNo && <p className="text-red-500 mt-1 text-sm">{errors.vehicleRegNo}</p>}

        <TextInput
          label="Amount Paid"
          type="number"
          name="amountPaid"
          value={formData.amountPaid}
          onChange={handleChange}
          placeholder="Enter amount paid"
          required
          className={`${errors.amountPaid ? 'border-red-500' : ''}`}
        />
        {errors.amountPaid && <p className="text-red-500 mt-1 text-sm">{errors.amountPaid}</p>}

        <TextInput
          label="Out Time"
          type="text"
          name="outTime"
          value={formData.outTime}
          onChange={handleChange}
          placeholder="Enter out time (e.g. 12:30 PM)"
          required
          className={`${errors.outTime ? 'border-red-500' : ''}`}
        />
        {errors.outTime && <p className="text-red-500 mt-1 text-sm">{errors.outTime}</p>}

        <div className="flex flex-col">
          <label className="mb-2 ml-1 font-semibold">Payment Status</label>
          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            className={`p-2 pl-4 border rounded-lg bg-slate-50 shadow-sm ${errors.paymentStatus ? 'border-red-500' : ''}`}
            required
          >
            <option value="" disabled>Select Payment Status</option>
            <option value="Paid">Paid</option>
            <option value="Not Paid">Not Paid</option>
          </select>
          {errors.paymentStatus && <p className="text-red-500 mt-1 text-sm">{errors.paymentStatus}</p>}
        </div>

        {errors.submit && <p className="text-red-500 mt-3 text-sm">{errors.submit}</p>}
        
        <CustomBtn
          text={loading ? "Adding..." : "Exit"}
          type="submit"
          textcolor="white"
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default MakeExit;
