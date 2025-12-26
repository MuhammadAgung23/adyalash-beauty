import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { services, transformationImages } from '../data/siteData';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All Work');
  const [sliderPos, setSliderPos] = useState(50); // State untuk Before/After slider

  const categories = ['All Work', 'Nail Art', 'Eyelash Extensions'];

  const filteredImages = activeFilter === 'All Work' 
    ? services 
    : services.filter(img => img.category.toLowerCase().includes(activeFilter.toLowerCase().split(' ')[0]));

  return (
    <main className="w-full flex-1 font-display">
      {/* Hero Section */}
      <section className="w-full bg-white py-16 md:py-20 px-5 md:px-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <span className="text-primary font-bold tracking-widest text-xs uppercase bg-primary/10 px-3 py-1 rounded-full w-fit">Our Masterpieces</span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight text-text-light">The Art of Beauty</h1>
          <p className="text-lg text-neutral-600 font-normal leading-relaxed max-w-2xl text-center">
            Explore our complete portfolio of exquisite nail designs and luxurious lash extensions.
          </p>
        </div>
      </section>

      {/* Filter Sticky Navigation */}
      <section className="sticky top-[65px] z-40 bg-background-light/95 backdrop-blur-sm border-b border-neutral-200 py-4 w-full">
        <div className="max-w-7xl mx-auto px-5 md:px-10 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-3 md:justify-center min-w-max">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${activeFilter === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="w-full py-12 px-5 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
            {filteredImages.map((img) => (
              <div key={img.id} className={`group relative overflow-hidden rounded-[2rem] cursor-pointer ${img.span}`}>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${img.image})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-2 py-1 mb-2 text-[10px] font-bold text-black bg-white rounded-md uppercase">{img.category}</span>
                  <h3 className="text-xl font-bold text-white mb-1">{img.title}</h3>
                  <p className="text-neutral-300 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformations (Before & After) */}
      <section className="w-full py-20 bg-background-light">
        <div className="max-w-7xl mx-auto px-5 md:px-10 text-left">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-12">
            <div className="flex flex-col gap-3 max-w-lg">
              <span className="text-primary font-bold tracking-widest text-sm uppercase">Transformations</span>
              <h2 className="text-3xl md:text-5xl font-black text-text-light">Real Results</h2>
              <p className="text-neutral-600">See the difference our expert stylists can make.</p>
            </div>
          </div>
          
          {/* Slider Container */}
          <div className="relative w-full h-[300px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl group">
             {/* After Image */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${transformationImages.after}')` }}>
              <span className="absolute top-6 right-6 bg-black/50 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold uppercase">After</span>
            </div>
            {/* Before Image (dengan clipping width dinamis) */}
            <div className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white/80 shadow-2xl" style={{ width: `${sliderPos}%` }}>
              <div className="absolute inset-0 w-[100vw] h-full bg-cover bg-center" style={{ backgroundImage: `url('${transformationImages.before}')` }}>
                <span className="absolute top-6 left-6 bg-white/90 text-black px-4 py-1 rounded-full text-xs font-bold uppercase">Before</span>
              </div>
            </div>
            {/* Slider Input Control */}
            <input 
              type="range" min="0" max="100" value={sliderPos} 
              onChange={(e) => setSliderPos(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
            {/* Slider Handle Visual */}
            <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 bg-white text-primary rounded-full shadow-xl z-20 pointer-events-none" style={{ left: `${sliderPos}%`, transform: `translate(-50%, -50%)` }}>
              <span className="material-symbols-outlined">code</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5 md:px-10">
        <div className="max-w-7xl mx-auto bg-primary rounded-[3rem] p-10 md:p-16 relative overflow-hidden text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">Ready to star in your own transformation?</h2>
          <Link to="/booking" className="bg-white text-primary hover:bg-neutral-100 font-bold py-4 px-10 rounded-full shadow-xl transition-all inline-block">
            Book Appointment
          </Link>
        </div>
      </section>
    </main>
  );
}