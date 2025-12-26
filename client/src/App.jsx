import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminGallery from './pages/AdminGallery';
import Gallery from './pages/Gallery';
import WhatsAppFloat from './components/WhatsAppFloat';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background-light font-display">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
        </Routes>
      <WhatsAppFloat />

      </div>
    </Router>
  );
}

export default App;