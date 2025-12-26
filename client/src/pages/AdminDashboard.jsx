import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Sub-Komponen Sidebar ---
const SidebarItem = ({ icon, label, active = false }) => (
  <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-full transition-colors group ${active ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 text-[#181114]'}`}>
    <span className={`material-symbols-outlined text-[24px] ${active ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>{icon}</span>
    <p className={`text-sm leading-normal ${active ? 'font-bold' : 'font-medium'}`}>{label}</p>
  </a>
);

// --- Sub-Komponen Stat Card ---
const StatCard = ({ title, value, change, icon }) => (
  <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-[#e6dbe0] shadow-sm hover:border-primary/50 transition-colors group">
    <div className="flex justify-between items-center">
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light font-display">
      
      {/* Sidebar Desktop */}
      <aside className="w-72 bg-white border-r border-[#e6dbe0] flex flex-col hidden lg:flex shadow-sm z-20">
        <div className="flex flex-col h-full justify-between p-6">
          <div className="flex flex-col gap-8 text-left">
            <div className="flex gap-3 items-center">
              <div className="size-12 rounded-full border-2 border-primary/20 bg-cover bg-center" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=Admin&background=ee2b7c&color=fff')" }}></div>
              <div className="flex flex-col">
                <h1 className="text-[#181114] text-lg font-bold">Lidya Admin</h1>
                <p className="text-[#896172] text-xs">Manage Website</p>
              </div>
            </div>
            <nav className="flex flex-col gap-2">
              <SidebarItem icon="dashboard" label="Dashboard" active />
              <SidebarItem icon="photo_library" label="Manage Photos" />
              <SidebarItem icon="loyalty" label="Manage Promotions" />
              <SidebarItem icon="edit_document" label="Edit Content" />
              <SidebarItem icon="settings" label="Settings" />
            </nav>
          </div>
          <button onClick={() => window.open('/', '_blank')} className="flex w-full items-center justify-center rounded-full h-12 bg-primary text-white text-sm font-bold hover:bg-pink-600 transition-all shadow-lg shadow-primary/30">
            <span>View Live Site</span>
            <span className="material-symbols-outlined text-[18px] ml-2">open_in_new</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto relative scroll-smooth bg-background-light">
        <div className="max-w-[1200px] mx-auto p-4 md:p-8 flex flex-col gap-8 pb-20">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-white p-6 rounded-xl border border-[#e6dbe0] shadow-sm">
            <div className="flex flex-col gap-2 text-left">
              <h1 className="text-[#181114] text-3xl md:text-4xl font-black tracking-tight">Welcome back, Lidya</h1>
              <p className="text-[#896172] text-base">Here is what's happening on your website today.</p>
            </div>
            <button onClick={() => navigate('/admin/login')} className="h-10 px-6 rounded-full bg-gray-100 text-[#181114] text-sm font-bold hover:bg-gray-200 transition-colors">
              Log Out
            </button>
          </header>

          {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Active Promotions" value="3" change="+1 new" icon="loyalty" />
            <StatCard title="Gallery Photos" value="124" change="+12 this week" icon="photo_library" />
            <StatCard title="Page Views" value="1.2k" change="+5% growth" icon="visibility" />
          </section>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Col: Editor & Gallery */}
            <div className="flex flex-col gap-8 flex-[2]">
              
              {/* Gallery Manager */}
              <section className="bg-white rounded-xl border border-[#e6dbe0] shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-xl font-bold">Gallery Manager</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-full text-sm font-bold transition-colors">
                    <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                    <span>Upload</span>
                  </button>
                </div>
                <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">add_a_photo</span>
                    <span className="text-[10px] font-bold text-gray-500 mt-2">Add New</span>
                  </div>
                  {/* Foto dummy */}
                  {[1, 2, 3].map(i => (
                    <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img src={`https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=200&sig=${i}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button className="p-2 bg-white/20 rounded-full hover:bg-white text-white hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick Editor */}
              <section className="bg-white rounded-xl border border-[#e6dbe0] shadow-sm p-6 flex flex-col gap-6 text-left">
                <h2 className="text-xl font-bold">Quick Page Editor</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Hero Headline</label>
                    <input className="w-full h-12 px-4 bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-primary/20" defaultValue="Experience the Art of Beauty" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Main Content</label>
                    <textarea className="w-full p-4 bg-gray-50 rounded-lg h-32 outline-none focus:ring-2 focus:ring-primary/20 resize-none" defaultValue="Welcome to our luxury salon..."></textarea>
                  </div>
                </div>
                <button className="bg-primary text-white h-12 rounded-full font-bold shadow-lg shadow-primary/20 hover:bg-pink-600 transition-all">Save Changes</button>
              </section>
            </div>

            {/* Right Col: Promotions */}
            <div className="flex-1 flex flex-col gap-6">
              <button className="w-full flex items-center justify-center gap-2 rounded-full h-14 bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform">
                <span className="material-symbols-outlined">add_circle</span>
                <span>Add New Promotion</span>
              </button>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-left px-1">Active Campaigns</h3>
                <PromoCard title="Summer Gel Mani" desc="20% Off all gel services" status="Live" footer="Ends Aug 31" />
                <PromoCard title="New Client Discount" desc="Rp.20.000 Off first visit" status="Live" footer="Always on" />
                <PromoCard title="Holiday Bundle" desc="Free nail art with lash" status="Draft" footer="Starts Dec 1" isDraft />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}