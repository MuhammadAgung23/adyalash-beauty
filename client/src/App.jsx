import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import Komponen
import Navbar from './components/Navbar';
import WhatsAppFloat from './components/WhatsAppFloat';
import ProtectedRoute from './components/ProtectedRoute';

// Import Halaman Publik
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Gallery from './pages/Gallery';

// Import Halaman Admin
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminGallery from './pages/AdminGallery';

// --- BAGIAN 1: KOMPONEN KONTEN UTAMA ---
// Kita pisahkan ini supaya bisa pakai "useLocation" (Hanya bisa jalan di dalam Router)
function AppContent() {
  const location = useLocation();
  
  // Logika: Cek apakah link saat ini berawalan "/admin"
  // Jika iya (misal /admin/login atau /admin/dashboard), maka variabel ini jadi TRUE
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-background-light font-display">
      {/* Tampilkan Navbar HANYA jika BUKAN halaman admin */}
      {!isAdminPage && <Navbar />}

      <Routes>
        {/* --- HALAMAN PUBLIK --- */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/gallery" element={<Gallery />} />
        
        {/* --- HALAMAN ADMIN (Tanpa Navbar) --- */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* --- HALAMAN RAHASIA (Diproteksi Satpam) --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
        </Route>
      </Routes>
      
      {/* Tampilkan WA Float HANYA jika BUKAN halaman admin */}
      {!isAdminPage && <WhatsAppFloat />}
    </div>
  );
}

// --- BAGIAN 2: KOMPONEN UTAMA (APP) ---
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;