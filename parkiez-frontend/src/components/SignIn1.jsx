import { useState } from "react";
import TextInput from "../components/textinput"; 
import ParkiezLogo from '../assets/parkiez_logo.png';
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const SignIn1 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await authService.login(username, password);
      let role = response.roles[0];
      if (role === 'ROLE_ADMIN') {
        navigate('/admindashboard');  
      } else {
        setError("Invalid Role");
      }
    } catch (error) {
      setError("Invalid Credentials");
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

export default SignIn1;
