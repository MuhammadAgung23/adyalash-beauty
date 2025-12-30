import React, { useState, useEffect } from 'react';

// --- DATA STATIS ---
const professionals = [
  { id: 1, name: 'Lidya', role: 'Senior Artist', icon: true },
  { id: 2, name: 'Sinta', role: 'Junior Artist', icon: true },
  { id: 3, name: 'Budi', role: 'Nail Tech', icon: true },
];

// --- HELPER FORMAT RUPIAH ---
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

export default function Booking() {
  // State Data Database
  const [dbServices, setDbServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // State UI
  const [activeTab, setActiveTab] = useState('Nails');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPro, setSelectedPro] = useState(professionals[0]);
  
  // STATE BARU: Date & Time String
  const [bookingDate, setBookingDate] = useState(""); // Format YYYY-MM-DD
  const [bookingTime, setBookingTime] = useState(""); 

  // --- 1. FETCH DATA DARI BACKEND ---
  useEffect(() => {
    fetch('http://localhost:5001/api/services')
      .then(res => res.json())
      .then(data => {
        setDbServices(data);
        if (data.length > 0) setSelectedService(data[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal load services:", err);
        setLoading(false);
      });
  }, []);

  // Helper: Dapat tanggal hari ini format YYYY-MM-DD untuk validasi "min"
  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleConfirm = () => {
    if (!selectedService) return alert("Pilih layanan dulu kak!");
    if (!bookingDate) return alert("Tanggal booking harus diisi kak!");
    if (!bookingTime) return alert("Jam booking harus diisi kak!");
    
    // Format Tanggal biar cantik (Contoh: 30 Desember 2025)
    const dateObj = new Date(bookingDate);
    const formattedDate = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const msg = `Halo kaak Adyalash Beauty, saya mau booking:%0A` +
                `- Layanan: *${selectedService.name}* (${formatRupiah(selectedService.price)})%0A` +
                `- Staf: ${selectedPro.name}%0A` +
                `- Tanggal: ${formattedDate}%0A` +
                `- Waktu: ${bookingTime}`;
    
    window.open(`https://wa.me/6282169203928?text=${msg}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  const filteredServices = dbServices.filter(s => s.category === activeTab);

  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12 text-left font-display">
      {/* Step Badges */}
      <div className="mb-10 flex flex-wrap gap-3">
        <StepBadge step="1. Service" active={true} />
        <StepBadge step="2. Professional" active={!!selectedService} />
        <StepBadge step="3. Schedule" active={!!selectedService} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-12">
          
          {/* STEP 1: SERVICES */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold">1. Select Service</h2>
              <div className="flex gap-2 bg-white p-1 rounded-full border border-gray-100">
                {['Nails', 'Eyelash'].map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveTab(cat)} 
                    className={`px-6 py-1.5 rounded-full text-sm font-bold transition-all ${activeTab === cat ? 'bg-primary text-white shadow-md' : 'text-[#896172]'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredServices.length > 0 ? (
                filteredServices.map(s => (
                  <div 
                    key={s._id} 
                    onClick={() => setSelectedService(s)} 
                    className={`flex gap-4 p-4 rounded-xl cursor-pointer border-2 transition-all ${selectedService?._id === s._id ? 'border-primary bg-white shadow-sm ring-1 ring-primary/20' : 'border-transparent bg-white/50 hover:border-primary/20'}`}
                  >
                    <div 
                      className="size-20 rounded-lg bg-cover bg-center shrink-0 border border-gray-100" 
                      style={{ backgroundImage: `url(${s.image || 'https://via.placeholder.com/150'})` }}
                    ></div>
                    <div className="flex-1 text-left">
                      <div className="flex justify-between font-bold text-gray-800">
                        <h3>{s.name}</h3>
                        <span className="text-primary">{formatRupiah(s.price)}</span>
                      </div>
                      <p className="text-[#896172] text-xs mt-1 line-clamp-2">{s.description}</p>
                      <p className="text-[10px] text-gray-400 mt-2 font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">schedule</span> {s.time}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic p-4 bg-gray-50 rounded-xl text-center">Belum ada layanan di kategori ini.</p>
              )}
            </div>
          </section>

          {/* STEP 2: PROFESSIONAL */}
          <section className={!selectedService ? 'opacity-50 pointer-events-none grayscale transition-all' : ''}>
            <h2 className="text-2xl font-bold mb-6">2. Choose Professional</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {professionals.map((pro) => (
                <div key={pro.id} onClick={() => setSelectedPro(pro)} className="flex flex-col items-center gap-3 cursor-pointer min-w-[100px] group">
                  <div className={`size-20 rounded-full flex items-center justify-center border-2 transition-all overflow-hidden ${selectedPro.id === pro.id ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-transparent bg-white group-hover:border-primary/30'}`}>
                    <div className="flex items-center justify-center">
                      <span className={`material-symbols-outlined text-4xl ${selectedPro.id === pro.id ? 'text-primary' : 'text-gray-300'}`}>face_3</span>
                    </div>
                  </div>
                  <span className={`text-sm font-bold ${selectedPro.id === pro.id ? 'text-primary' : 'text-[#896172]'}`}>{pro.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* STEP 3: DATE & TIME (INPUT MANUAL SIMPLE) */}
          <section className={!selectedService ? 'opacity-50 pointer-events-none grayscale transition-all' : ''}>
            <h2 className="text-2xl font-bold mb-6">3. Select Date & Time</h2>
            <div className="flex flex-col md:flex-row gap-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              
              {/* INPUT TANGGAL */}
              <div className="flex-1">
                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Pilih Tanggal</label>
                <div className="relative">
                   <input 
                      type="date" 
                      min={getTodayString()} // Disable tanggal lampau
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full h-14 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-lg text-gray-800 cursor-pointer"
                    />
                </div>
              </div>

              {/* INPUT JAM */}
              <div className="flex-1">
                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Pilih Jam</label>
                <div className="relative">
                  <input 
                    type="time" 
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full h-14 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-lg text-gray-800 text-center cursor-pointer"
                  />
                  <div className="mt-2 text-xs text-gray-400 flex items-center gap-1 justify-center">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> Buka jam 09:00 - 21:00
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>

        {/* SUMMARY SIDEBAR */}
        <aside className="lg:col-span-4 relative">
          <div className="sticky top-28 bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold mb-6 pb-4 border-b border-dashed border-gray-200">Booking Summary</h3>
            
            {selectedService ? (
              <>
                <div className="space-y-5 mb-8">
                  <SummaryItem 
                    icon="spa" 
                    label={selectedService.name} 
                    sublabel={selectedService.time} 
                    price={formatRupiah(selectedService.price)} 
                  />
                  <SummaryItem 
                    icon="person" 
                    label={selectedPro.name} 
                    sublabel="Staf Pilihan" 
                  />
                  <SummaryItem 
                    icon="event" 
                    label={bookingDate ? new Date(bookingDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' }) : 'Belum pilih tanggal'} 
                    sublabel={bookingTime || 'Belum set jam'} 
                  />
                </div>
                <div className="pt-4 border-t border-gray-100 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-700">Total</span>
                    <span className="font-black text-2xl text-primary">{formatRupiah(selectedService.price)}</span>
                  </div>
                </div>
                <button 
                  onClick={handleConfirm} 
                  className="w-full bg-primary hover:bg-pink-600 text-white font-bold py-4 rounded-full shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 group"
                >
                  Confirm via WhatsApp 
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </>
            ) : (
              <div className="text-center py-10 text-gray-400">
                <span className="material-symbols-outlined text-4xl mb-2">touch_app</span>
                <p className="text-sm">Silakan pilih layanan di sebelah kiri dulu ya.</p>
              </div>
            )}
            
          </div>
        </aside>
      </div>
    </main>
  );
}

// Sub-komponen (tetap)
function StepBadge({ step, active }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${active ? 'bg-white border-primary/20 shadow-sm text-primary' : 'bg-transparent border-transparent opacity-40 grayscale'}`}>
      <span className="material-symbols-outlined text-[18px]">{active ? 'check_circle' : 'radio_button_unchecked'}</span>
      <span className="text-xs font-bold">{step}</span>
    </div>
  );
}

function SummaryItem({ icon, label, sublabel, price }) {
  return (
    <div className="flex justify-between items-start text-left gap-3 animate-in fade-in duration-300">
      <div className="flex gap-3">
        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-primary text-[18px]">{icon}</span>
        </div>
        <div>
          <p className="font-bold text-sm leading-tight text-gray-800">{label}</p>
          <p className="text-[11px] text-[#896172] mt-1 font-medium">{sublabel}</p>
        </div>
      </div>
      {price && <span className="font-bold text-xs shrink-0 text-gray-700">{price}</span>}
    </div>
  );
}