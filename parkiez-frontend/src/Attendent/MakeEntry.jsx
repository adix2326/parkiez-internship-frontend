import React, { useState } from "react";
import TextInput from "../components/textinput";
import CustomBtn from "../components/CustomBtn";
import { addBooking } from "../services/addBookingService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MakeEntry = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [bookingData, setbookingData] = useState({
    parkingId:'',
    paymentType: "",
    inTime:null,
    outTime:null,
    vehicleNo: "",
    vehicleType: "",
    phoneNo: "",
    transactionId: null,
    attendantPhoneNo: currentUser.username,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setbookingData({ ...bookingData, [name]: value });
    // validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      // bookingData.attendantPhoneNo = 
      await addBooking(bookingData);
      console.log("Made entry, done");      
      navigate('/attendantdashboard');
      toast.success("Booking Done !!")
    } catch (error) {
      console.log("in error of MakeEntry", error);
      toast.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 rounded-lg p-5">
      <h2 className="text-2xl font-bold mb-6">Vehicle Entry</h2>
      <form
        className="bg-white p-5 rounded-lg flex flex-col gap-5 shadow-md"
        onSubmit={handleSubmit}
      >
        <TextInput
          label="Vehicle Number"
          type="text"
          name="vehicleNo"
          value={bookingData.vehicleNo}
          onChange={handleChange}
          required
        />
        <div className="flex flex-col">
          <label className="mb-2 ml-1 font-semibold">Vehicle Type</label>
          <select
            name="vehicleType"
            value={bookingData.vehicleType}
            onChange={handleChange}
            className="p-2 pl-4 border rounded-lg bg-slate-50 shadow-sm"
            required
          >
            <option value="" disabled>
              Select Vehicle Type
            </option>
            <option value="2wheeler">2-Wheeler</option>
            <option value="4wheeler">4-Wheeler</option>
          </select>
        </div>
        <TextInput
          label="Phone Number"
          type="text"
          name="phoneNo"
          value={bookingData.phoneNo}
          onChange={handleChange}
          required
        />
        <div className="flex flex-col">
          <label className="mb-2 ml-1 font-semibold">Payment Method</label>
          <select
            name="paymentType"
            value={bookingData.paymentType}
            onChange={handleChange}
            className="p-2 pl-4 border rounded-lg bg-slate-50 shadow-sm"
            required
          >
            <option value="" disabled>
              Select Payment Method
            </option>
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </select>
        </div>
        <CustomBtn text={"Add Entry"} type="button" textcolor="white" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default MakeEntry;
