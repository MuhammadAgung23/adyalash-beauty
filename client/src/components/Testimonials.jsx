const reviews = [
  { id: 1, name: "Sarah", text: "Hasil nail art-nya rapi banget dan awet sampai sebulan lebih!", stars: 5 },
  { id: 2, name: "Emily Chen", text: "Lash extension-nya ringan banget, serasa nggak pakai apa-apa tapi mata jadi cantik.", stars: 5 },
  { id: 3, name: "Jessica", text: "Tempatnya nyaman dan stafnya ramah-ramah. My favorite place!", stars: 5 },
];

export default function Testimonials() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col items-center">
        <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3">Testimonials</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-text-light">What Our Clients Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-background-light p-8 rounded-[2rem] relative shadow-sm hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-4xl text-primary/20 absolute top-8 right-8">format_quote</span>
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-text-light">{rev.name}</h4>
                <div className="flex text-yellow-400">
                  {[...Array(rev.stars)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px] fill-current">star</span>
                  ))}
                </div>
                <p className="text-neutral-600 italic">"{rev.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}