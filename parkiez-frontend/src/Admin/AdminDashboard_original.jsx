import React, { useState, useEffect } from "react";
import Sidebar from "./AdminSidebar";
import Header from "../components/DashboardHeader";
import TextInput from "../components/textinput";
import CustomBtn from "../components/CustomBtn";
import { addOperator } from "../services/operatorService";
import authService from "../services/auth.service";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddOperator, setShowAddOperator] = useState(false);
  const [operatorData, setOperatorData] = useState({
    operatorId: "",
    name: "",
    phone: "",
    password: "",
    parkingId: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userReady, setUserReady] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userFromStorage = authService.getCurrentUserFromStorage();
      if (!userFromStorage) {
        setRedirect("/operatorlogin");
        return;
      }
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        setRedirect("/operatorlogin");
      } else {
        setCurrentUser(currentUser);
        setUserReady(true);
      }
    };
    fetchUser();
  }, []);

  const handleOperatorChange = (e) => {
    const { name, value } = e.target;
    setOperatorData({ ...operatorData, [name]: value });
  };

  const handleOperatorSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await addOperator(operatorData);
      setSuccess("Operator added successfully");
    } catch (error) {
      setError("Failed to add operator: " + (error.response?.data || error.message));
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddOperatorClick = () => {
    setShowAddOperator(true);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="h-screen flex flex-col relative">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          onAddOperatorClick={handleAddOperatorClick}
        />
        <div className="flex-1 flex flex-col p-5">
          <h2 className="text-2xl font-bold mb-6">Welcome to the Admin Dashboard</h2>
          {userReady && (
            <div>
              <header className="jumbotron">
                <h3>
                  <strong>Profile: {currentUser.username}</strong>
                </h3>
              </header>
              <p>
                <strong>Id:</strong> {currentUser.id}
              </p>
              <strong>Authorities:</strong>
              <ul>
                {currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
              </ul>
              {/* <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Logout</button> */}
            </div>
          )}
          {showAddOperator && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Add Operator</h3>
              <form onSubmit={handleOperatorSubmit} className="bg-white p-6 rounded-lg shadow-md">
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-500">{success}</div>}
                <TextInput
                  type="text"
                  label="Operator ID"
                  placeholder="Enter operator ID"
                  required
                  value={operatorData.operatorId}
                  name="operatorId"
                  onChange={handleOperatorChange}
                />
                <TextInput
                  type="text"
                  label="Name"
                  placeholder="Enter operator name"
                  required
                  value={operatorData.name}
                  name="name"
                  onChange={handleOperatorChange}
                />
                <TextInput
                  type="text"
                  label="Phone Number"
                  placeholder="Enter operator phone number"
                  required
                  value={operatorData.phone}
                  name="phone"
                  onChange={handleOperatorChange}
                />
                <TextInput
                  type="password"
                  label="Password"
                  placeholder="Enter operator password"
                  required
                  value={operatorData.password}
                  name="password"
                  onChange={handleOperatorChange}
                />
                <TextInput
                  type="text"
                  label="Parking ID"
                  placeholder="Enter parking ID"
                  required
                  value={operatorData.parkingId}
                  name="parkingId"
                  onChange={handleOperatorChange}
                />
                <CustomBtn
                  text="Add Operator"
                  type="submit"
                  textcolor="white"
                  onClick={handleOperatorSubmit}
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
