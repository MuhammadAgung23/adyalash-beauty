import React, { useState } from 'react';
import { services } from '../data/siteData'; // Mengambil data awal jika diperlukan

export default function AdminGallery() {
  // State untuk menyimpan daftar foto (Mock Data)
  const [photos, setPhotos] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371', category: 'Nails', title: 'Pink Marble Art' },
    { id: 2, url: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223', category: 'Eyelash', title: 'Classic Volume' },
    { id: 3, url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b', category: 'Nails', title: 'Red Glossy' },
  ]);

  const [filter, setFilter] = useState('All');

  const handleDelete = (id) => {
    if(window.confirm("Hapus foto ini dari gallery?")) {
      setPhotos(photos.filter(p => p.id !== id));
    }
  };

  const filteredPhotos = filter === 'All' ? photos : photos.filter(p => p.category === filter);

  return (
    <div className="flex flex-col gap-8 text-left font-display">
      {/* Header Management */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-text-main">Gallery Management</h1>
          <p className="text-sm text-[#896172]">Update and organize your work portfolio.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
          <span className="material-symbols-outlined">add_a_photo</span>
          Upload New Photo
        </button>
      </div>

      {/* Filter & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 bg-white p-1 rounded-full border border-gray-100 shadow-sm w-fit">
          {['All', 'Nails', 'Eyelash'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${filter === cat ? 'bg-primary text-white shadow-md' : 'text-[#896172] hover:bg-gray-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="text-xs font-bold text-[#896172] uppercase tracking-widest">
          Showing {filteredPhotos.length} Photos
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Upload Card Placeholder */}
        <div className="aspect-square rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group bg-white/50">
          <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <span className="material-symbols-outlined">upload_file</span>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-primary">Click to Upload</p>
        </div>

        {/* Existing Photos */}
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="group relative aspect-square rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100">
            <img src={photo.url} alt={photo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 backdrop-blur-[2px]">
              <div className="flex justify-end">
                <button 
                  onClick={() => handleDelete(photo.id)}
                  className="size-10 bg-white/20 hover:bg-red-500 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">delete</span>
                </button>
              </div>
              <div>
                <span className="text-[9px] font-black bg-primary text-white px-2 py-1 rounded-md uppercase tracking-tighter">
                  {photo.category}
                </span>
                <p className="text-white font-bold text-sm mt-1 truncate">{photo.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}