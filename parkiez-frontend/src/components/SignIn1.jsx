import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TextInput from '../components/textinput';
import ParkiezLogo from '../assets/parkiez_logo.png';
import HeroImage from '../assets/hero_image.jpg'; // Assuming this is the same image used in Home
import authService from '../services/auth.service';

const SignIn1 = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await authService.login(username, password);
      let role = response.roles[0];
      if (role === 'ROLE_ADMIN') {
        toast.success('Login successful!');
        navigate('/admindashboard');
      } else if (role === 'ROLE_OPERATOR') {
        toast.success('Login successful!');
        navigate('/operatordashboard');
      } else {
        setError('Invalid Role');
        toast.error('Invalid Role');
      }
    } catch (error) {
      setError('Invalid Credentials');
      toast.error('Invalid Credentials');
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="hidden md:flex md:w-1/2 bg-green-600 text-white relative">
        <img src={HeroImage} alt="Parking" className="absolute inset-0 object-cover w-full h-full opacity-70" />
        <div className="container mx-auto flex flex-col justify-center items-center py-20 relative">
          <h1 className="text-5xl font-bold mb-5 ml-4 text-White-600">Welcome to Parkiez</h1>
          <p className="text-lg mb-10 ml-4 max-w-lg text-center text-White-600">Your ultimate solution for hassle-free parking management.</p>
          {/* <div className="flex space-x-5">
            <Link to="/signin" className="action-button bg-green-600 hover:bg-green-700">
              Sign In
            </Link>
            <Link to="/operatorlogin" className="action-button bg-green-600 hover:bg-green-700">
              Operator Login
            </Link>
            <Link to="/attendantlogin" className="action-button bg-green-600 hover:bg-green-700">
              Attendant Login
            </Link>
          </div> */}
        </div>
      </div>
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <div className="bg-white p-10 w-full max-w-md rounded-3xl shadow-2xl">
          <img src={ParkiezLogo} alt="parkiez-logo" className="mx-auto mb-5 h-16" />
          <form className="flex flex-col gap-5" onSubmit={handleSignIn}>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <TextInput
              type="text"
              label="Username"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-input"
            />
            <TextInput
              type="password"
              label="Password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-input"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </form>
          {/* <div className="mt-5 text-center">
            <p className="text-gray-600 text-sm">New to Parkiez? <Link to="/signup" className="text-green-600 hover:text-green-800">Sign Up</Link></p>
            <p className="text-gray-600 text-sm mt-2">Forgot your password? <Link to="/forgotpassword" className="text-green-600 hover:text-green-800">Reset here</Link></p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignIn1;
