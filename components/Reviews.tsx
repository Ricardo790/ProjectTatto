
import React from 'react';

const REVIEWS = [
  { id: '1', author: 'ID_CLIENT_MARCO_S', content: 'Ejecución técnica impecable. El contraste en los grises es de nivel quirúrgico.', date: '24.10.2024' },
  { id: '2', author: 'ID_CLIENT_ELENA_V', content: 'Concepto IA integrado perfectamente con la anatomía. Cicatrización sin pérdida de detalle.', date: '12.09.2024' },
  { id: '3', author: 'ID_CLIENT_DANIEL_R', content: 'Entorno profesional, aséptico y centrado en el arte puro. Recomendado 100%.', date: '05.08.2024' },
];

const Reviews: React.FC = () => {
  return (
    <section className="py-40 border-x border-white/5" id="reviews">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-32 reveal">
        <h2 className="text-7xl font-tech font-bold italic opacity-80 tracking-tighter">CLIENT_LOGS</h2>
        <span className="font-tech text-[10px] tracking-[0.5em] text-zinc-600 uppercase">Status: 100% Verified Entries</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-white/5">
        {REVIEWS.map((review, idx) => (
          <div key={review.id} className={`p-16 bg-[#0a0a0a] group hover:bg-white transition-all duration-500 reveal border-r border-white/5 last:border-0`}>
            <div className="flex justify-between items-center mb-16">
               <span className="font-tech text-[9px] text-zinc-600 group-hover:text-black uppercase tracking-widest">{review.author}</span>
               <div className="w-2 h-2 bg-zinc-800 group-hover:bg-black"></div>
            </div>
            
            <p className="text-2xl font-tech font-light leading-snug text-zinc-300 group-hover:text-black mb-16 transition-colors">
              "{review.content}"
            </p>
            
            <div className="flex flex-col gap-2 pt-8 border-t border-white/5 group-hover:border-black/10 transition-colors">
               <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Timestamp_</span>
               <span className="font-tech text-xs group-hover:text-black">{review.date}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-32 flex flex-col items-center reveal">
         <div className="font-tech text-[10px] tracking-[0.4em] text-zinc-700 uppercase mb-8">¿Deseas registrar tu experiencia?</div>
         <button className="px-16 py-5 border border-white/10 font-tech text-[10px] tracking-[0.6em] uppercase hover:bg-white hover:text-black transition-all">
           AÑADIR_TESTIMONIO
         </button>
      </div>
    </section>
  );
};

export default Reviews;
