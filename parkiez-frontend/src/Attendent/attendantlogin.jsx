import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/textinput';
import ParkiezLogo from '../assets/parkiez_logo.png';
import CustomBtn from '../components/CustomBtn';

const AttendantLogin = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState(''); // You Amay remove this if not used
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSendOtp = () => {
    // Simulate sending OTP (in real implementation, call your API to send OTP)
    if (phoneNumber === '9921892310') { // Replace with your actual check for valid phone number
      alert('OTP sent to your phone number.');
      setIsOtpSent(true);
    } else {
      alert('Invalid phone number or password.'); // Handle invalid phone number or password
    }
  };

  const handleVerifyOtp = () => {
    // Simulate verifying OTP (in real implementation, call your API to verify OTP)
    if (otp === '123456') { // Replace with your actual OTP verification logic
      setOtpVerified(true);
      alert('OTP verified successfully.');
      navigate('/attendantdashboard'); // Navigate to Attendant Dashboard upon successful verification
    } else {
      alert('Invalid OTP.'); // Handle invalid OTP
    }    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication logic
    if (otpVerified) {
      navigate('/attendantdashboard'); // Navigate to Attendant Dashboard if OTP is already verified
    } else if (isOtpSent) {
      handleVerifyOtp(); // Verify OTP if OTP is already sent
    } else {
      handleSendOtp(); // Send OTP if OTP is not sent yet
    }
  };

  return (
    <div className='sm:bg-green-400 w-full h-screen flex justify-center items-center'>
      <div className='bg-white p-10 w-full h-screen sm:h-max sm:w-96 rounded-3xl shadow-2xl mt-10 sm:mt-0'>
        <img src={ParkiezLogo} alt="parkiez-logo" className='mx-auto mb-5' />
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
          <TextInput 
            type="number" 
            label="Phone Number" 
            placeholder="9921892310" 
            required 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
          />
          {isOtpSent && (
            <TextInput 
              type="number" 
              label="OTP" 
              placeholder="xxxxxx" 
              required 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
            />
          )}
          <CustomBtn 
            text={otpVerified ? "Login" : isOtpSent ? "Verify OTP" : "Send OTP"} 
            type="submit" 
            textcolor="white" 
          />
        </form>
      </div>
    </div>
  );
};

export default AttendantLogin;
