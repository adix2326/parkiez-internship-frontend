import React, { useState } from "react";
import TextInput from "./textinput"; 
import ParkiezLogo from '../assets/parkiez_logo.png';
import authService from "../services/authservice";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await authService.login(username, password);
      console.log(response.data);
      // Save the JWT token or handle the response as needed
      // Navigate to another page or show a success message
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="sm:bg-green-400 w-full h-screen flex justify-center items-center">
      <div className="bg-white p-10 w-full h-screen sm:h-max sm:w-96 rounded-3xl shadow-2xl mt-10 sm:mt-0">
        <img src={ParkiezLogo} alt="parkiez-logo" className='mx-auto mb-5' />
        <form className="flex flex-col gap-5" onSubmit={handleSignIn}>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <TextInput
            type="text"
            label="Username"
            placeholder="Enter your username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInput
            type="password"
            label="Password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
