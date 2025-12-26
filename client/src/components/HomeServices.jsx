import ServiceCard from './ServiceCard';
// Import data terpusat
import { services } from '../data/siteData';

// Helper untuk format Rupiah agar konsisten dengan halaman lain
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

export default function HomeServices() {
  // Mengambil 3 layanan pertama untuk ditampilkan di Home (Highlight)
  const featuredServices = services.slice(0, 3);

  return (
    <>
      {/* Header Seksi */}
      <div className="w-full flex justify-center pt-10">
        <div className="w-full max-w-7xl px-5 md:px-10">
          <div className="flex flex-col gap-2 text-left">
            <span className="text-primary font-bold tracking-widest text-sm uppercase">Our Menu</span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-text-light">
              Pamper Yourself
            </h2>
          </div>
        </div>
      </div>

      {/* Grid Seksi */}
      <section className="w-full flex justify-center py-10 px-5 md:px-10">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard 
                key={service.id}
                title={service.name} // Mengambil dari properti 'name' di siteData
                price={formatRupiah(service.price)} // Menggunakan helper Rupiah
                description={service.desc} // Mengambil dari properti 'desc' di siteData
                image={service.image} // Mengambil dari properti 'image' di siteData
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}