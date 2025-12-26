import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Logika MERN: Di sini nanti kamu akan fetch ke API Backend (Node/Express)
    console.log("Login Admin:", { email, password });
    
    // Simulasi Berhasil (Nanti diarahkan ke Dashboard)
    if(email === "admin@lidyalash.com" && password === "admin123") {
        alert("Login Berhasil!");
        // navigate('/admin/dashboard'); 
    } else {
        alert("Email atau Password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center px-5 font-display">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-primary/5 p-10 border border-gray-50">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center gap-3 mb-10 text-center">
          <div className="size-14 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-4xl">spa</span>
          </div>
          <div>
            <h1 className="text-2xl font-black text-text-main tracking-tight">Admin Portal</h1>
            <p className="text-sm text-[#896172] font-medium">Lidyalash Beauty Management</p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-main uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">mail</span>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="admin@lidyalash.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-main uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-12 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="rounded text-primary focus:ring-primary/20" id="remember" />
              <label htmlFor="remember" className="text-xs font-medium text-[#896172] cursor-pointer group-hover:text-primary">Remember me</label>
            </div>
            <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot?</a>
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] mt-4"
          >
            Sign In to Dashboard
          </button>
        </form>

        <p className="text-center text-[10px] text-gray-400 mt-10 uppercase tracking-[0.2em] font-medium">
          Secure System &bull; Lidyalash Tech 2025
        </p>
      </div>
    </div>
  );
}