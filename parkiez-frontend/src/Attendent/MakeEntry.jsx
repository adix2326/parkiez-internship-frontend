import React, { useState } from 'react';
import TextInput from '../components/textinput';
import CustomBtn from '../components/CustomBtn';

const MakeEntry = () => {
  const [bookingData, setbookingData] = useState({
    paymentType: '',
    vehicleNo: '',
    vehicleType: '',
    phoneNo: '',
  });

  const handleChange = (e) => {
    setbookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    try {
      await addBooking(bookingData);
      // console.log(`Parking data : ${parkingData}`);
      toast.success("Booking Done!!");
      navigate("/attendantdashboard");
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 rounded-lg p-5">
      <h2 className="text-2xl font-bold mb-6">Vehicle Entry</h2>
      <form className="bg-white p-5 rounded-lg flex flex-col gap-5 shadow-md" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="Parking ID"
            type="text"
            name="parkingId"
            value={bookingData.parkingId}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Payment Type"
            type="text"
            name="paymentType"
            value={bookingData.paymentType}
            onChange={handleChange}
            required
          />
        </div>
        <TextInput
          label="In Time"
          type="datetime-local"
          name="inTime"
          value={bookingData.inTime}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Out Time"
          type="datetime-local"
          name="outTime"
          value={bookingData.outTime}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Vehicle Number"
          type="text"
          name="vehicleNo"
          value={bookingData.vehicleNo}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Phone Number"
          type="text"
          name="phoneNo"
          value={bookingData.phoneNo}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Transaction ID"
          type="text"
          name="transactionId"
          value={bookingData.transactionId}
          onChange={handleChange}
        />
        <TextInput
          label="Attendant Phone Number"
          type="text"
          name="attendantPhoneNo"
          value={bookingData.attendantPhoneNo}
          onChange={handleChange}
        />
        <CustomBtn text="Add Entry" type="submit" textcolor="white" />
      </form>
    </div>
  );
};

export default MakeEntry;
