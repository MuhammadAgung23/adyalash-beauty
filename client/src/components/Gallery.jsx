import nailImage1 from '../assets/nails1.png';
import lashImage1 from '../assets/eyelash1.png';
import lashImage3 from '../assets/eyelash3.png';

export default function Gallery() {
  const images = [
    { id: 1, title: "Basic Gel Polish", size: "col-span-2 row-span-2", url: nailImage1 },
    { id: 2, title: "Classic Red", size: "col-span-1 row-span-1", url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1000" },
    { id: 3, title: "Lash Extension Classic Natural", size: "col-span-1 row-span-1", url: lashImage1 },
    { id: 4, title: "Nail Tools", size: "col-span-2 row-span-1", url: lashImage3 },
  ];

  return (
    <section className="w-full flex justify-center py-16 px-5 md:px-10 bg-white">
      <div className="w-full max-w-7xl">
        {/* Header Gallery */}
        <div className="flex justify-between items-end mb-10">
          <div className="flex flex-col gap-2 text-left">
            <span className="text-primary font-bold tracking-widest text-sm uppercase">Gallery</span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-light">Trend Watch</h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-bold text-primary hover:underline">
            View Full Portfolio <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {/* Responsive Grid */}
        {/* Di HP: grid-cols-1, Di Tablet ke atas: grid-cols-4 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[600px]">
          {images.map((img) => (
            <div 
              key={img.id}
              className={`${img.size} relative group overflow-hidden rounded-[1.5rem] md:rounded-[2rem] h-[250px] md:h-full`}
            >
              {/* Image dengan Efek Zoom saat Hover */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${img.url})` }}
              ></div>
              
              {/* Overlay Hitam Transparan */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300"></div>
              
              {/* Label Nama (Muncul saat Hover) */}
              <div className="absolute bottom-6 left-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="font-bold text-lg">{img.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Semua (Hanya muncul di HP) */}
        <div className="mt-8 md:hidden">
          <button className="w-full py-3 border-2 border-primary text-primary font-bold rounded-full">
            View All Portfolio
          </button>
        </div>
      </div>
    </section>
  );
}