import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from './TextInput';
import ParkiezLogo from '../assets/parkiez_logo.png';
import CustomBtn from './CustomBtn';

const OperatorLogin = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSendOtp = () => {
    // Simulate sending OTP (in real implementation, call your API to send OTP)
    if (phoneNumber === '9921388893' && password === 'password') {
      alert('OTP sent to your phone number.');
      setIsOtpSent(true);
    } else {
      alert('Invalid phone number or password.');
    }
  };

  const handleVerifyOtp = () => {
    // Simulate verifying OTP (in real implementation, call your API to verify OTP)
    if (otp === '123456') {
      setOtpVerified(true);
      alert('OTP verified successfully.');
    } else {
      alert('Invalid OTP.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication logic
    if (otpVerified) {
      navigate('/dashboard');
    } else {
      alert('Please verify OTP first.');
    }
  };

  return (
    <div className='bg-green-300 w-full h-screen flex justify-center items-center'>
      <div className='bg-white p-5 w-full max-w-md rounded-3xl shadow-2xl'>
        <img src={ParkiezLogo} alt="parkiez-logo" className='mx-auto' />
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
          <TextInput 
            type="number" 
            label="Phone Number" 
            placeholder="9921388893" 
            required 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
          />
          <TextInput 
            type="password" 
            label="Password" 
            placeholder="xxxxxx" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {!isOtpSent && (
            <CustomBtn 
              text="Send OTP" 
              type="button" 
              textcolor="white" 
              onClick={handleSendOtp} 
            />
          )}
          {isOtpSent && (
            <>
              <TextInput 
                type="number" 
                label="OTP" 
                placeholder="xxxxxx" 
                required 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
              />
              <CustomBtn 
                text="Verify OTP" 
                type="button" 
                textcolor="white" 
                onClick={handleVerifyOtp} 
              />
            </>
          )}
          <CustomBtn 
            text="Login" 
            type="submit" 
            textcolor="white" 
          />
        </form>
      </div>
    </div>
  );
};

export default OperatorLogin;
