import React, { useState, useEffect } from 'react';
import { services, professionals, workingHours } from '../data/siteData';

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

export default function Booking() {
  const [activeTab, setActiveTab] = useState('Nails');
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedPro, setSelectedPro] = useState(professionals[0]);
  const [selectedTime, setSelectedTime] = useState("");

  // STATE BARU: Untuk melacak bulan & tahun yang sedang dilihat di kalender
  const [viewDate, setViewDate] = useState(new Date());
  // STATE BARU: Untuk melacak tanggal lengkap yang dipilih (Objek Date)
  const [selectedFullDate, setSelectedFullDate] = useState(new Date());

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset jam hari ini untuk perbandingan tanggal saja

  const monthName = viewDate.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Logika Weekend/Weekday Dinamis berdasarkan tanggal yang dipilih
  const isWeekend = selectedFullDate.getDay() === 0 || selectedFullDate.getDay() === 6;
  const currentSlots = isWeekend ? workingHours.weekends : workingHours.weekdays;

  // Reset jam otomatis jika berganti hari/jadwal
  useEffect(() => {
    if (!currentSlots.includes(selectedTime)) setSelectedTime(currentSlots[0]);
  }, [selectedFullDate, currentSlots]);

  // Fungsi navigasi bulan
  const changeMonth = (offset) => {
    setViewDate(new Date(currentYear, currentMonth + offset, 1));
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    if (newDate >= today) { // Hanya izinkan jika tanggal hari ini atau masa depan
      setSelectedFullDate(newDate);
    }
  };

  const handleConfirm = () => {
    const formattedDate = selectedFullDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const msg = `Halo kaak lidya, saya mau booking:%0A- Layanan: ${selectedService.name}%0A- Staf: ${selectedPro.name}%0A- Tanggal: ${formattedDate}%0A- Waktu: ${selectedTime}`;
    window.open(`https://wa.me/6282169203928?text=${msg}`, '_blank');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12 text-left">
      {/* Step Badges */}
      <div className="mb-10 flex flex-wrap gap-3">
        <StepBadge step="1. Service" active />
        <StepBadge step="2. Professional" active />
        <StepBadge step="3. Schedule" active />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-12">
          
          {/* STEP 1: SERVICES (Tetap menggunakan siteData) */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold">1. Select Service</h2>
              <div className="flex gap-2 bg-white p-1 rounded-full border border-gray-100">
                {['Nails', 'Eyelash'].map(cat => (
                  <button key={cat} onClick={() => setActiveTab(cat)} className={`px-6 py-1.5 rounded-full text-sm font-bold transition-all ${activeTab === cat ? 'bg-primary text-white shadow-md' : 'text-[#896172]'}`}>{cat}</button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {services.filter(s => s.category === activeTab).map(s => (
                <div key={s.id} onClick={() => setSelectedService(s)} className={`flex gap-4 p-4 rounded-xl cursor-pointer border-2 transition-all ${selectedService.id === s.id ? 'border-primary bg-white shadow-sm' : 'border-transparent bg-white/50 hover:border-primary/20'}`}>
                  <div className="size-20 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${s.image})` }}></div>
                  <div className="flex-1 text-left">
                    <div className="flex justify-between font-bold"><h3>{s.name}</h3><span>{formatRupiah(s.price)}</span></div>
                    <p className="text-[#896172] text-xs mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* STEP 2: PROFESSIONAL (Tetap menggunakan siteData) */}
          <section>
            <h2 className="text-2xl font-bold mb-6">2. Choose Professional</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {professionals.map((pro) => (
                <div key={pro.id} onClick={() => setSelectedPro(pro)} className="flex flex-col items-center gap-3 cursor-pointer min-w-[100px]">
                  <div className={`size-20 rounded-full flex items-center justify-center border-2 transition-all overflow-hidden ${selectedPro.id === pro.id ? 'border-primary ring-2 ring-primary/20' : 'border-transparent bg-white'}`}>
                    {pro.icon ? <div className="bg-primary/5 w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-primary text-3xl">groups</span></div> : <img src={pro.image} alt={pro.name} className="w-full h-full object-cover" />}
                  </div>
                  <span className={`text-sm font-bold ${selectedPro.id === pro.id ? 'text-primary' : 'text-[#896172]'}`}>{pro.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* STEP 3: DATE & TIME (Pembaruan Logika Kalender) */}
          <section>
            <h2 className="text-2xl font-bold mb-6">3. Select Date & Time</h2>
            <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              {/* Kalender dengan Navigasi */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">{monthName} {currentYear}</h3>
                  <div className="flex gap-2">
                    <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
                    <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {daysArray.map(day => {
                    const thisDate = new Date(currentYear, currentMonth, day);
                    const isPast = thisDate < today;
                    const isSelected = selectedFullDate.toDateString() === thisDate.toDateString();

                    return (
                      <button 
                        key={day} 
                        disabled={isPast}
                        onClick={() => handleDateClick(day)} 
                        className={`p-2 text-sm rounded-full transition-all ${
                          isSelected ? 'bg-primary text-white font-bold' : 
                          isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-primary/10'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="w-px bg-gray-100 hidden md:block"></div>

              {/* Slot Jam Dinamis */}
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-6 text-left">Available Slots</h3>
                <div className="grid grid-cols-2 gap-3">
                  {currentSlots.map(time => (
                    <button key={time} onClick={() => setSelectedTime(time)} className={`py-3 rounded-xl text-xs font-bold border-2 transition-all ${selectedTime === time ? 'bg-primary border-primary text-white' : 'bg-gray-50 border-transparent hover:border-primary/30'}`}>{time}</button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* SUMMARY SIDEBAR */}
        <aside className="lg:col-span-4 relative">
          <div className="sticky top-24 bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold mb-6 pb-4 border-b border-dashed">Booking Summary</h3>
            <div className="space-y-5 mb-8">
              <SummaryItem icon="spa" label={selectedService.name} sublabel={selectedService.time} price={formatRupiah(selectedService.price)} />
              <SummaryItem icon="person" label={selectedPro.name} sublabel="Staf Pilihan" />
              <SummaryItem icon="event" label={selectedFullDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} sublabel={selectedTime} />
            </div>
            <div className="pt-4 border-t mb-8">
              <div className="flex justify-between items-center"><span className="font-bold text-lg">Total</span><span className="font-black text-2xl text-primary">{formatRupiah(selectedService.price)}</span></div>
            </div>
            <button onClick={handleConfirm} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-full shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2">Confirm via WhatsApp <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
          </div>
        </aside>
      </div>
    </main>
  );
}

// Sub-komponen tetap sama...
function StepBadge({ step, active }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${active ? 'bg-white border-primary/20 shadow-sm' : 'opacity-40'}`}>
      <span className="material-symbols-outlined text-primary text-[18px]">{active ? 'check_circle' : 'radio_button_unchecked'}</span>
      <span className="text-xs font-bold text-[#896172]">{step}</span>
    </div>
  );
}

function SummaryItem({ icon, label, sublabel, price }) {
  return (
    <div className="flex justify-between items-start text-left gap-3">
      <div className="flex gap-3">
        <span className="material-symbols-outlined text-primary text-[20px]">{icon}</span>
        <div><p className="font-bold text-sm leading-tight">{label}</p><p className="text-[10px] text-[#896172] mt-1">{sublabel}</p></div>
      </div>
      {price && <span className="font-bold text-xs shrink-0">{price}</span>}
    </div>
  );
}