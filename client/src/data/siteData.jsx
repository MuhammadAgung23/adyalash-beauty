import nailImage1 from '../assets/nails1.png';
import nailImage2 from '../assets/nails2.png';
import nailImage3 from '../assets/nails3.png';
import nailImage4 from '../assets/nails4.webp';
import nailImage5 from '../assets/nails5.png';
import nailImage6 from '../assets/nails6.webp';
import nailImage7 from '../assets/nails7.png';
import nailImage8 from '../assets/nails8.png';

import lashImage1 from '../assets/eyelash1.png';
import lashImage2 from '../assets/eyelash2.png';
import lashImage3 from '../assets/eyelash3.png';
import lashImage4 from '../assets/eyelash4.png';
import beforeImage from '../assets/before.png';
import afterImage from '../assets/after.png';




// Data semua layanan (Nails, Eyelash, dll)
export const services = [
  { 
    id: 1, 
    category: 'Nails', 
    name: "Basic Gel Polish", 
    price: 50000, 
    time: "-", 
    desc: "Polos 1-2 warna, termasuk pembersihan kutikula.", 
    image: nailImage1 
  },
  { 
    id: 2, 
    category: 'Nails', 
    name: "French Nail", 
    price: 60000, 
    time: "-", 
    desc: "Klasik elegan dengan ujung putih/warna.", 
    image: nailImage2
  },
  { 
    id: 3, 
    category: 'Nails', 
    name: "Nails Mix Color", 
    price: 70000, 
    time: "", 
    desc: "", 
    image: nailImage3
  },
  { 
    id: 4, 
    category: 'Nails', 
    name: "Custom Accessories", 
    price: 70000, 
    time: "", 
    desc: "", 
    image: nailImage7
  },
  { 
    id: 5, 
    category: 'Nails', 
    name: "Fake Nail Set", 
    price: 100000, 
    time: "-", 
    desc: "Kuku palsu custom (bisa lepas pasang).", 
    image: nailImage5
  },
  { 
    id: 6, 
    category: 'Nails', 
    name: "Tanya tanya duluu", 
    price: 0, 
    time: "", 
    desc: "", 
    image: nailImage4
  },

// eyelash data 

  { 
    id: 7, 
    category: 'Eyelash', 
    name: "Classic Natural", 
    price: 100000, 
    time: "-", 
    desc: "Rasio 1:1, memberikan kesan seperti memakai maskara. Cocok untuk tampilan sehari-hari.", 
    image: lashImage1
  },
  { 
    id: 8, 
    category: 'Eyelash', 
    name: "Double Lash / 2D", 
    price: 100000, 
    time: "-", 
    desc: "Lebih bervolume namun tetap terlihat natural. Memberikan efek mata lebih terbuka.", 
    image: lashImage2
  },
  { 
    id: 9, 
    category: 'Eyelash', 
    name: "Russian Volume", 
    price: 100000, 
    time: "-0 min", 
    desc: "Tampilan bold dan dramatis. Cocok untuk acara spesial atau kamu yang suka bulu mata tebal.", 
    image: lashImage3
  },
  { 
    id: 10, 
    category: 'Eyelash', 
    name: "Lash Lift & Tint", 
    price: 150000, 
    time: "-", 
    desc: "Melentikkan bulu mata asli tanpa sambungan. Hasil bertahan 4-6 minggu.", 
    image: lashImage4
  },
];

// Data Staf / Professional
export const professionals = [
  { id: 'any', name: 'Any Pro', role: 'First available', icon: 'groups' },
  { id: 1, name: 'Lidya', image: 'https://i.pravatar.cc/150?u=sarah' },
  { id: 2, name: 'Amel', image: 'https://i.pravatar.cc/150?u=michelle' },
  { id: 3, name: 'Suchen', image: 'https://i.pravatar.cc/150?u=david' },
];

// Data Maintenance & Add-ons (untuk halaman Service)
export const maintenanceServices = [
  { id: 101, title: "2-Week Refill", info: "Must have 50% lashes remaining", price: 65000 },
  { id: 102, title: "Gel Removal", info: "Soak off and clean up", price: 20000 },
];

// Jadwal Kerja
export const workingHours = {
  weekdays: ["06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM", "12:00 AM"],
  sabtu: ["06:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM", "12:00 AM"],
  weekends: ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM", "12:00 AM"]
};

// Tambahkan di src/data/siteData.js
export const galleryData = [
  { id: 1, category: 'Nails', url: 'https://images.unsplash.com/photo-1632345031435-8196195de809?q=80&w=400', title: 'Elegant Pink' },
  { id: 2, category: 'Eyelash', url: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?q=80&w=400', title: 'Volume Lash' },
  { id: 3, category: 'Nails', url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=400', title: 'Marble Art' },
];

// src/data/siteData.js

// ... data services, professionals, dll tetap ada ...

export const galleryImages = [
  { id: 1, category: 'Nail Art', title: 'Abstract Pastel Dreams', desc: 'Hand-painted abstract shapes using our spring pastel collection.', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800', span: 'row-span-2' },
  { id: 2, category: 'Eyelash', title: 'Hybrid Volume Set', desc: 'A mix of classic and volume fans for texture.', image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?q=80&w=600', span: '' },
  { id: 3, category: 'Manicure', title: 'Classic French Tip', desc: 'Timeless elegance with a modern finish.', image: 'https://images.unsplash.com/photo-1632345031435-8196195de809?q=80&w=600', span: '' },
  { id: 4, category: 'Nail Art', title: 'Elegant Gold Foil', desc: 'Soft pink base with delicate gold leaf accents.', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800', span: 'row-span-2' },
  { id: 5, category: 'Nail Art', title: 'Gemstone Encapsulation', desc: '3D gemstone art for a bold look.', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600', span: '' },
  { id: 6, category: 'Eyelash', title: 'Classic Natural Set', desc: 'Enhancing your natural beauty subtly.', image: 'https://images.unsplash.com/photo-1512102845293-ee3c7c72638b?q=80&w=600', span: '' },
];  


// Data untuk slider Before & After di halaman Gallery
export const transformationImages = {
    // GANTI URL INI dengan link foto "Sebelum" punya kamu sendiri
    before: beforeImage, // Contoh: Mata polos
    
    // GANTI URL INI dengan link foto "Sesudah" punya kamu sendiri
    after: afterImage, // Contoh: Mata dengan eyelash extension
};