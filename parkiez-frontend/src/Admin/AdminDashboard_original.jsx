import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import Header from "../components/DashboardHeader";
import AddOperator from "./AddOperator";
import authService from "../services/auth.service";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddOperator, setShowAddOperator] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userFromStorage = authService.getCurrentUserFromStorage();
      if (!userFromStorage) {
        setRedirect("/");
        return;
      }
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        setRedirect("/");
      } else {
        setCurrentUser(currentUser);
      }
    };
    fetchUser();
  }, []);

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
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          onAddOperatorClick={handleAddOperatorClick}
        />
        <div className="flex-1 flex flex-col p-5">
          {showAddOperator && <AddOperator />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
