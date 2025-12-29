import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 text-left">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Adyalash Beauty Logo" className="w-48 h-auto object-contain" />
            {/* <h2 className="text-xl font-bold">Adyalash Beauty</h2> */}
          </div>
          <p className="text-sm text-neutral-500 leading-relaxed mb-6">
            Selamat datang di Adyalash Beauty, solusi kecantikan praktis bagi Anda wanita aktif di Kota Batam. Kami percaya bahwa setiap wanita berhak tampil percaya diri dan menawan tanpa harus mengorbankan waktu berharga mereka.
          </p>
          
          {/* Social Media Icons */}
          <div className="flex gap-4">
            <a 
              href="https://www.instagram.com/adyalash_beauty?igsh=MXNoZTU5Y281dDducQ==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-primary hover:text-white transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a 
              href="https://tiktok.com/@username_kamu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-black hover:text-white transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1 .05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold mb-4 text-neutral-800">Contact</h3>
          <ul className="text-sm text-neutral-500 space-y-4">
            <li className="flex gap-3 items-start">
              <span className="material-symbols-outlined text-primary text-xl">location_on</span> 
              <span>Tiban Mas, Batam</span>
            </li>
            <li className="flex gap-3 items-center">
              <span className="material-symbols-outlined text-primary text-xl">call</span> 
              <span>0821 6920 3928</span>
            </li>
            <li className="flex gap-3 items-center">
              <span className="material-symbols-outlined text-primary text-xl">mail</span> 
              <span className="break-all">lidyaameliia23@gmail.com</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl overflow-hidden h-44 bg-neutral-100 grayscale hover:grayscale-0 transition-all duration-500 border border-neutral-100 shadow-sm">
          {/* Placeholder untuk Map */}
          <div className="w-full h-full flex flex-col items-center justify-center bg-primary/5 text-primary gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-2xl">map</span>
            <span className="font-bold text-[10px] uppercase tracking-[0.2em]">Biar adeek yang ketempat kakak</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center text-[10px] text-neutral-400 pt-8 border-t border-neutral-100 uppercase tracking-widest">
          © 2025 Agung Dev. All rights reserved.
        </div>
      </div>
    </footer>
  );
}