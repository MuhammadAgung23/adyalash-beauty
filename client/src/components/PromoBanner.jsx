export default function PromoBanner() {
  return (
    <section className="w-full py-16 px-5 md:px-10 bg-primary/5 mt-10 relative overflow-hidden">
      {/* Dekorasi Lingkaran Blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
        <div className="max-w-2xl text-left">
          <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Limited Offer</span>
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-text-light">Spring Special: 20% Off Your First Visit</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Siap untuk tampil beda? Booking layanan manicure atau lash extension pertama Anda dan dapatkan diskon khusus serta free konsultasi.
          </p>
          <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/30 transition-all">
            Ambil Promo Sekarang
          </button>
        </div>
        
        {/* Gambar Dekoratif Berputar */}
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary animate-[spin_10s_linear_infinite]"></div>
          <div 
            className="absolute inset-4 rounded-full bg-cover bg-center shadow-xl"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1000')` }}
          ></div>
        </div>
      </div>
    </section>
  );
}