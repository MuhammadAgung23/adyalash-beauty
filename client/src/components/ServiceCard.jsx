import { Link } from 'react-router-dom';

export default function ServiceCard({ title, price, description, image }) {
  return (
    <div className="group flex flex-col gap-4 p-4 rounded-[2rem] bg-white dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-primary/20 shadow-sm">
      {/* Gambar dengan Efek Zoom */}
      <div 
        className="w-full h-64 bg-center bg-no-repeat bg-cover rounded-[1.5rem] group-hover:scale-[1.02] transition-transform duration-500"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      
      <div className="px-2 pb-2 text-left">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-text-light">{title}</h3>
          <span className="bg-background-light dark:bg-neutral-00 px-3 py-1 rounded-full text-sm font-bold text-primary">
            {price}
          </span>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
          {description}
        </p>
        <Link 
          to="/services" 
          className="inline-flex items-center gap-1 mt-4 text-sm font-bold text-primary hover:underline"
        >
          Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}