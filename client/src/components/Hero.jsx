import { useNavigate } from 'react-router-dom';


export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="w-full flex justify-center py-6 md:py-20 px-5 md:px-10">
      <div className="w-full max-w-7xl">
        {/* Di HP: flex-col (atas-bawah), Di Laptop: flex-row (kiri-kanan) */}
        <div className="flex flex-col gap-8 md:gap-16 items-center md:flex-row">

          
          
          {/* Bagian Teks */}
          <div className="flex flex-col gap-4 md:gap-6 flex-1 items-center md:items-start text-center md:text-left">
            <span className="text-primary font-bold tracking-widest text-[10px] md:text-xs uppercase bg-primary/10 px-3 py-1 rounded-full">
              Baru di Batam
            </span>
            <h1 className="text-3xl md:text-6xl font-black leading-tight text-text-light">
              Hadir sebagai spesialis Eyelash Extension dan Nail Art <span className="text-primary">Adyalash Beauty</span> datang dengan konsep Home Service.
            </h1>
            <p className="text-sm md:text-lg text-neutral-600 max-w-md">
              Kami adalah pionir layanan kecantikan panggilan di Batam yang mengutamakan kualitas, kenyamanan, dan kebersihan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button 
                onClick={() => navigate('/services')} 
                className="w-full sm:w-auto h-12 px-8 bg-primary text-white font-bold rounded-full shadow-lg"
              >
                Book Now
              </button>
            </div>
          </div>
          
          {/* Bagian Gambar (Di HP tingginya kita kurangi agar tidak terlalu panjang) */}
          <div className="w-full flex-1 relative group">
            <div className="absolute -inset-2 bg-primary/20 rounded-[1.5rem] md:rounded-[2.5rem] rotate-3 blur-md opacity-70"></div>
            <div 
              className="w-full h-[300px] md:h-[550px] bg-center bg-cover rounded-[1.5rem] md:rounded-[2rem] relative z-10 shadow-xl"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1000')` }}
            ></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}