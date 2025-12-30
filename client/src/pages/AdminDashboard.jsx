import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Sub-Komponen Sidebar ---
const SidebarItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-full transition-colors cursor-pointer group ${active ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 text-[#181114]'}`}>
    <span className={`material-symbols-outlined text-[24px] ${active ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>{icon}</span>
    <p className={`text-sm leading-normal ${active ? 'font-bold' : 'font-medium'}`}>{label}</p>
  </div>
);

// --- Sub-Komponen Stat Card ---
const StatCard = ({ title, value, change, icon }) => (
  <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-[#e6dbe0] shadow-sm hover:border-primary/50 transition-colors group text-left">
    <div className="flex justify-between items-center text-left">
      <p className="text-[#181114] text-base font-medium">{title}</p> 
      <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-full">{icon}</span>
    </div>
    <div className="flex items-end gap-3 mt-2">
      <p className="text-[#181114] tracking-light text-3xl font-bold leading-tight">{value}</p>
      <span className="text-[#078856] bg-[#078856]/10 px-2 py-0.5 rounded-full text-xs font-bold mb-1">{change}</span>
    </div>
  </div>
);

// --- Sub-Komponen Promo Card ---
const PromoCard = ({ title, desc, status, footer, isDraft = false }) => (
  <div className={`${isDraft ? 'bg-gray-50 border-dashed border-gray-300 opacity-75' : 'bg-white border-[#e6dbe0]'} p-5 rounded-2xl border shadow-sm flex flex-col gap-3 relative overflow-hidden group`}>
    <div className="flex justify-between items-start z-10">
      <div className={`${isDraft ? 'bg-gray-200 text-gray-600' : 'bg-green-100 text-green-700'} px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1`}>
        {!isDraft && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>}
        {status}
      </div>
      <div className="flex gap-1">
        <button className="p-1.5 text-gray-400 hover:text-primary rounded-full transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
        {!isDraft && <button className="p-1.5 text-gray-400 hover:text-red-500 rounded-full transition-colors"><span className="material-symbols-outlined text-[20px]">delete</span></button>}
      </div>
    </div>
    <div className="text-left">
      <h4 className={`font-bold text-lg ${isDraft ? 'text-gray-500' : 'text-[#181114]'}`}>{title}</h4>
      <p className="text-sm text-[#896172]">{desc}</p>
    </div>
    <div className="pt-3 mt-1 border-t border-gray-100 flex justify-between items-center text-xs font-medium text-gray-500">
      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> {footer}</span>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // STATE LOADING BARU
  const [editId, setEditId] = useState(null); 
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Eyelash',
    time: '60 mins',
    image: null
  });
  const navigate = useNavigate();

  // Load Data
  useEffect(() => {
    fetch('http://localhost:5001/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error("Gagal load database:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setEditId(null);
    setFormData({ name: '', description: '', price: '', category: 'Eyelash', time: '60 mins', image: null });
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditId(service._id);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      category: service.category,
      time: service.time,
      image: service.image
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    console.log("Tombol ditekan! Mulai proses..."); // Cek di Console (F12)
    setLoading(true); // Aktifkan status loading

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('time', formData.time);
    
    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }

    const url = editId 
      ? `http://localhost:5001/api/services/${editId}` 
      : 'http://localhost:5001/api/services';
    const method = editId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        body: data, 
      });
      
      if (res.ok) {
        const resultData = await res.json();
        
        if (editId) {
          setServices(services.map(s => s._id === editId ? resultData : s));
        } else {
          setServices([...services, resultData]);
        }

        setIsModalOpen(false);
        setEditId(null); // Reset Edit ID
        alert(editId ? 'Sukses update data!' : 'Sukses tambah data!');
      } else {
        const errorData = await res.json();
        alert("Gagal: " + errorData.message);
      }
    } catch (err) {
      console.error("Error submit:", err);
      alert('Gagal koneksi ke server');
    } finally {
      setLoading(false); // Matikan loading selesai atau gagal
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Yakin hapus data ini?')) {
      try {
        const res = await fetch(`http://localhost:5001/api/services/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setServices(services.filter(s => s._id !== id));
          alert('Terhapus!');
        }
      } catch (err) {
        alert('Gagal hapus');
      }
    }
  };

  // ... import useNavigate dll

// Fungsi Logout
const handleLogout = () => {
  // 1. Hapus kunci dari saku (LocalStorage)
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // 2. Tendang ke halaman Login
  navigate('/admin/login');
};

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light font-display relative">
      
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-[#e6dbe0] flex flex-col hidden lg:flex shadow-sm z-20">
        <div className="flex flex-col h-full justify-between p-6 text-left">
          <div className="flex flex-col gap-8">
            <div className="flex gap-3 items-center">
              <div className="size-12 rounded-full border-2 border-primary/20 bg-cover bg-center" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=Admin&background=ee2b7c&color=fff')" }}></div>
              <div>
                <h1 className="text-[#181114] text-lg font-bold">Lidya Admin</h1>
                <p className="text-[#896172] text-xs">Manage Website</p>
              </div>
            </div>
            <nav className="flex flex-col gap-2">
              <div onClick={() => setActiveTab('Dashboard')}><SidebarItem icon="dashboard" label="Dashboard" active={activeTab === 'Dashboard'} /></div>
              <div onClick={() => setActiveTab('Services')}><SidebarItem icon="content_cut" label="Manage Services" active={activeTab === 'Services'} /></div>
              <div onClick={() => setActiveTab('Photos')}><SidebarItem icon="photo_library" label="Manage Photos" active={activeTab === 'Photos'} /></div>
              <div onClick={() => setActiveTab('Promotions')}><SidebarItem icon="loyalty" label="Manage Promotions" active={activeTab === 'Promotions'} /></div>
            </nav>
          </div>
          <button onClick={() => window.open('/', '_blank')} className="flex w-full items-center justify-center rounded-full h-12 bg-primary text-white text-sm font-bold hover:bg-pink-600 transition-all shadow-lg">
            <span>View Live Site</span>
            <span className="material-symbols-outlined text-[18px] ml-2">open_in_new</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto relative bg-background-light">
        <div className="max-w-[1200px] mx-auto p-4 md:p-8 flex flex-col gap-8 pb-20">
          
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-white p-6 rounded-xl border border-[#e6dbe0] shadow-sm">
            <div className="text-left">
              <h1 className="text-[#181114] text-3xl font-black tracking-tight">
                {activeTab === 'Dashboard' ? 'Welcome back, Lidya' : `Manage ${activeTab}`}
              </h1>
              <p className="text-[#896172] text-base">Kontrol penuh website Adyalash Beauty.</p>
            </div>
            <button 
              onClick={handleLogout} // <--- Ganti ini, jangan cuma navigate
              className="h-10 px-6 rounded-full bg-gray-100 text-sm font-bold hover:bg-red-100 hover:text-red-600 transition-colors"
            >
              Log Out
            </button>
          </header>

          {/* TAB CONTENT (Dashboard, Services, etc) */}
          {activeTab === 'Dashboard' && (
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard title="Active Services" value={services.length} change="Live in DB" icon="content_cut" />
              <StatCard title="Gallery Photos" value="124" change="+12 week" icon="photo_library" />
              <StatCard title="Page Views" value="1.2k" change="+5% growth" icon="visibility" />
            </section>
          )}

          {activeTab === 'Services' && (
            <section className="bg-white rounded-xl border border-[#e6dbe0] shadow-sm text-left">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Daftar Layanan</h2>
                <button onClick={openAddModal} className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                  Add New Service
                </button>
              </div>
              <div className="p-6 space-y-4">
                {services.map(s => (
                  <div key={s._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <img src={s.image || 'https://via.placeholder.com/50'} className="size-16 rounded-lg object-cover shadow-sm" alt="" />
                      <div>
                        <p className="font-bold text-[#181114]">{s.name}</p>
                        <p className="text-xs text-[#896172] font-medium">{s.category} • Rp {s.price?.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openEditModal(s)} className="p-2 text-gray-400 hover:text-primary transition-colors bg-gray-50 hover:bg-primary/10 rounded-full">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button onClick={() => handleDeleteService(s._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 hover:bg-red-50 rounded-full">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ... (Photos & Promotions Tabs sama seperti sebelumnya) ... */}
          {activeTab === 'Photos' && <div className="text-center p-10 text-gray-400">Gallery Manager Coming Soon</div>}
          {activeTab === 'Promotions' && <div className="text-center p-10 text-gray-400">Promotions Manager Coming Soon</div>}

        </div>
      </main>
      
      {/* --- MODAL FORM FIX (Ditaruh paling bawah agar Z-Index Menang) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop Gelap */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          {/* Konten Modal */}
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-6 text-left">{editId ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Nama Layanan <span className="text-red-500">*</span></label>
                <input name="name" onChange={handleChange} value={formData.name} required className="w-full h-12 px-4 bg-gray-50 rounded-xl outline-none border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Contoh: Classic Lash" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400">Harga (Rp) <span className="text-red-500">*</span></label>
                  <input name="price" type="number" onChange={handleChange} value={formData.price} required className="w-full h-12 px-4 bg-gray-50 rounded-xl outline-none border focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="150000" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400">Kategori</label>
                  <select name="category" onChange={handleChange} value={formData.category} className="w-full h-12 px-4 bg-gray-50 rounded-xl outline-none border focus:border-primary bg-white">
                    <option value="Eyelash">Eyelash</option>
                    <option value="Nails">Nails</option>
                    <option value="Add-ons">Add-ons</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Deskripsi <span className="text-red-500">*</span></label>
                <textarea name="description" onChange={handleChange} value={formData.description} required className="w-full p-4 bg-gray-50 rounded-xl h-24 outline-none border focus:border-primary resize-none" placeholder="Deskripsi singkat..." />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Foto Layanan</label>
                {/* Preview Image */}
                {typeof formData.image === 'string' && (
                  <div className="mb-2 mt-1 relative w-20 h-20 group">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover rounded-lg border" />
                    <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center text-white text-[10px] rounded-lg">Current</div>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                  className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                />
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 h-12 rounded-full font-bold bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600">Batal</button>
                
                {/* TOMBOL SIMPAN FIX */}
                <button 
                  type="submit" 
                  disabled={loading} 
                  className={`flex-1 h-12 rounded-full font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-pink-600 shadow-primary/30'}`}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <span>{editId ? 'Simpan Perubahan' : 'Simpan Data'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}