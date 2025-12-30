import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // 1. Cek apakah ada token di localStorage
  const token = localStorage.getItem('token');

  // 2. Logika Satpam:
  // Kalau token ADA -> Silakan masuk (Outlet akan merender halaman tujuan)
  // Kalau token GAK ADA -> Tendang balik ke Login
  return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;