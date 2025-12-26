import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Import data terpusat
import { services, maintenanceServices } from '../data/siteData';

// Helper untuk format Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

export default function Services() {
    const [activeFilter, setActiveFilter] = useState('All Services');

    // Membagi layanan berdasarkan kategori dari siteData
    const nailServices = services.filter(s => s.category === 'Nails');
    const lashServices = services.filter(s => s.category === 'Eyelash');

    return (
        <div className="bg-background-light min-h-screen font-display">
            <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 flex flex-col gap-8">
                
                {/* Hero Section */}
                <div className="w-full rounded-xl overflow-hidden shadow-sm">
                    <div 
                        className="relative flex min-h-[400px] md:min-h-[480px] flex-col gap-6 bg-cover bg-center items-center justify-center p-6 md:p-10 text-center"
                        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1200')` }}
                    >
                        <div className="max-w-2xl text-white">
                            <h1 className="text-4xl md:text-6xl font-black leading-tight drop-shadow-sm mb-4">Curated Beauty Services</h1>
                            <p className="text-gray-100 text-lg font-medium max-w-lg mx-auto">Elevate your look with our expert nail artistry and premium lash extensions.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mt-2">
                            <Link to="/booking" className="bg-primary text-white h-12 px-8 rounded-full font-bold flex items-center justify-center shadow-lg shadow-primary/40 hover:scale-105 transition-transform">
                                Book Appointment
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Filter Chips - Sticky */}
                <div className="sticky top-[72px] z-40 bg-background-light/95 backdrop-blur-sm py-4 flex gap-3 overflow-x-auto hide-scrollbar">
                    {['All Services', 'Nail Artistry', 'Eyelash', 'Add-ons'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`h-10 px-6 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
                                activeFilter === filter ? 'bg-primary text-white shadow-md' : 'bg-white border border-gray-200 text-text-main'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 flex flex-col gap-10">
                        
                        {/* Category: Nails */}
                        {(activeFilter === 'All Services' || activeFilter === 'Nail Artistry') && (
                            <section className="flex flex-col gap-4 text-left">
                                <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                    <span className="material-symbols-outlined text-primary">brush</span>
                                    <h2 className="text-2xl font-bold">Nail Artistry</h2>
                                </div>
                                {nailServices.map(service => (
                                    <ServiceItem 
                                        key={service.id} 
                                        title={service.name} 
                                        price={formatRupiah(service.price)} 
                                        duration={service.time} 
                                        desc={service.desc} 
                                        img={service.image} 
                                    />
                                ))}
                            </section>
                        )}

                        {/* Category: Lashes */}
                        {(activeFilter === 'All Services' || activeFilter === 'Eyelash') && (
                            <section className="flex flex-col gap-4 mt-10 text-left">
                                <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                    <span className="material-symbols-outlined text-primary">visibility</span>
                                    <h2 className="text-2xl font-bold">Eyelash Extensions</h2>
                                </div>
                                {lashServices.map(service => (
                                    <ServiceItem 
                                        key={service.id} 
                                        title={service.name} 
                                        price={formatRupiah(service.price)} 
                                        duration={service.time} 
                                        desc={service.desc} 
                                        img={service.image} 
                                    />
                                ))}
                            </section>
                        )}

                        {/* Category: Add-ons */}
                        {(activeFilter === 'All Services' || activeFilter === 'Add-ons') && (
                            <section className="flex flex-col gap-4 mt-10" id="addons">
                                <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                                        <span className="material-symbols-outlined">auto_fix</span>
                                    </div>
                                    <h2 className="text-text-main text-2xl font-bold">Maintenance & Add-ons</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {maintenanceServices.map((item) => (
                                        <AddOnCard 
                                            key={item.id} 
                                            title={item.title} 
                                            info={item.info} 
                                            price={formatRupiah(item.price)} 
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar Area */}
                    <aside className="lg:col-span-4 flex flex-col gap-6">
                        <div className="sticky top-28 space-y-6 text-left">
                            <div className="bg-primary text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                                <h3 className="text-2xl font-black mb-2">First Time?</h3>
                                <p className="text-white/90 mb-4">Get 20% off your first visit. Use code <span className="font-bold bg-white/20 px-2 py-1 rounded">LUXE20</span></p>
                                <button className="w-full py-3 bg-white text-primary font-bold rounded-xl">Claim Offer</button>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                                <h4 className="font-bold text-lg">Opening Hours</h4>
                                <ul className="text-sm space-y-2 text-gray-600">
                                    <li className="flex justify-between"><span>Mon - Fri</span> <b>5:00 PM - 12:00 AM</b></li>
                                    <li className="flex justify-between"><span>Sat - Sun</span> <b>8:00 AM - 12:00 AM</b></li>
                                    <li className="flex justify-between text-red-500"><span>Holiday</span> <b>Check IG</b></li>
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

// Komponen Kecil untuk List Item
function ServiceItem({ title, price, duration, desc, img }) {
    return (
        <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-4 rounded-2xl hover:border-primary/20 border border-transparent transition-all shadow-sm">
            <div className="size-20 sm:size-24 rounded-xl bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${img})` }}></div>
            <div className="flex-1">
                <div className="flex justify-between mb-1">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{title}</h3>
                    <span className="text-primary font-bold text-lg">{price}</span>
                </div>
                <p className="text-gray-500 text-sm">{duration} - {desc}</p>
            </div>
            <Link to="/booking" className="hidden sm:flex size-10 items-center justify-center rounded-full bg-background-light text-primary hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined">calendar_add_on</span>
            </Link>
        </div>
    );
}

// Komponen Kecil untuk Add-ons
function AddOnCard({ title, info, price }) {
    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-transparent hover:border-primary/20 hover:shadow-md transition-all group">
            <div className="text-left">
                <h4 className="font-bold text-text-main group-hover:text-primary transition-colors">{title}</h4>
                <p className="text-xs text-gray-500">{info}</p>
            </div>
            <div className="flex items-center gap-3">
                <span className="font-bold text-primary">{price}</span>
                <button className="size-8 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
            </div>
        </div>
    );
}