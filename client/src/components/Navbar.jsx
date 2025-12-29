import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State untuk buka tutup menu

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-48 h-auto object-contain" />
        </Link>

        {/* Tombol Hamburger (Hanya muncul di HP) */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-text-light">
          <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
        </button>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
          <Link to="/services" className="text-sm font-medium hover:text-primary">Services</Link>
          <Link to="/gallery" className="text-sm font-medium hover:text-primary">Gallery</Link>
          <Link to="/booking" className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/20">Book Now</Link>
        </nav>
      </div>

      {/* Menu Mobile (Hanya muncul saat isOpen true) */}
      {isOpen && (
        <nav className="md:hidden bg-white border-b border-neutral-100 p-5 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-sm font-medium">Home</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="text-sm font-medium">Services</Link>
          <Link to="/booking" onClick={() => setIsOpen(false)} className="text-primary font-bold">Book Now</Link>
        </nav>
      )}
    </header>
  );
}