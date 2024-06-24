import React from 'react';
import { Link } from 'react-router-dom';
import ParkiezLogo from '../assets/parkiez_logo.png';
import HeroImage from '../assets/hero_image2.jpg';

const Home = () => {
  return (
    <div className="h-screen w-full bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center p-5">
          <img src={ParkiezLogo} alt="Parkiez Logo" className="h-16" />
          <nav className="hidden sm:block">
            <ul className="flex space-x-5">
              <li>
                <Link to="/operatorlogin" className="bg-green-600 text-white px-5 py-3 rounded-full font-semibold hover:bg-green-700 hover:shadow-md">
                  Operator Login
                </Link>
              </li>
              <li>
                <Link to="/attendantlogin" className="bg-green-600 text-white px-5 py-3 rounded-full font-semibold hover:bg-green-700 hover:shadow-md">
                  Attendent Login
                </Link>
              </li>
              {/* <li><Link to="/signup" className="text-green-600 hover:text-green-800">Sign Up</Link></li> */}
            </ul>
          </nav>
        </div>
      </header>

      <section className="relative bg-green-600 text-white">
        <img src={HeroImage} alt="Parking" className="absolute inset-0 object-cover w-full h-full opacity-70" />
        <div className="container mx-auto flex flex-col justify-center items-center py-20 relative">
          <h1 className="text-5xl font-bold mb-5 ml-4">Welcome to Parkiez</h1>
          <p className="text-lg mb-10 ml-4">Your ultimate solution for hassle-free parking management.</p>
          <div className="flex space-x-5">
            <Link to="/operatorlogin" className="bg-white text-green-600 px-5 py-3 rounded-full font-bold hover:bg-gray-100 hover:shadow-md">
              Operator Login
            </Link>
            <Link to="/attendantlogin" className="bg-white text-green-600 px-5 py-3 rounded-full font-bold hover:bg-gray-100 hover:shadow-md">
              Attendent Login
            </Link>
            {/* <Link to="/signup" className="bg-white text-green-600 px-5 py-3 rounded-full font-semibold hover:bg-gray-100">Sign Up</Link> */}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10 text-green-600">Why Choose Parkiez?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-6">
            <div className="bg-green-500 p-10 rounded-lg shadow-lg text-white">
              <h3 className="text-2xl font-bold mb-5 ">Easy Management</h3>
              <p>Manage your parking spaces effortlessly with our user-friendly dashboard.</p>
            </div>
            <div className="bg-green-500 p-10 rounded-lg shadow-lg text-white">
              <h3 className="text-2xl font-bold mb-5 ">Real-Time Analytics</h3>
              <p>Get insights and analytics in real-time to optimize your operations.</p>
            </div>
            <div className="bg-green-500 p-10 rounded-lg shadow-lg text-white">
              <h3 className="text-2xl font-bold mb-5 ">Secure and Reliable</h3>
              <p>Our platform ensures security and reliability for all your parking management needs.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-5">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Parkiez. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
