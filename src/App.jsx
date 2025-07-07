import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Login from './components/Auth/Login';
import Header from './components/Layout/Header';
import CustomerDashboard from './components/Customer/CustomerDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import SalesManagerDashboard from './components/SalesManager/SalesManagerDashboard';
import PlantHeadDashboard from './components/PlantHead/PlantHeadDashboard';
import Salesman from './components/Salesman/Salesman';
import PlaceNewOrder from './components/Salesman/PlaceNewOrder';

const AppRoutes = () => {
  const { isAuthenticated, userRole } = useApp();

  // if (!isAuthenticated) {
  //   return <Login />;
  // }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sales_man" element={<Salesman />} />
        <Route path="/place_order" element={<PlaceNewOrder />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/sales_manager" element={<SalesManagerDashboard />} />
        <Route path="/plant_head" element={<PlantHeadDashboard />} />
        {/* Redirect unknown routes to a default or role-based page */}
        <Route path="*" element={<Navigate to={`/${userRole}`} replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;
