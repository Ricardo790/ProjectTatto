
import React, { useState } from 'react';
import { PortfolioItem } from '../types';

const ITEMS: PortfolioItem[] = [
  { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1590246814883-57833e413fa4?q=80&w=1000', title: 'Realism_Core_01', category: 'Realismo' },
  { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=1000', title: 'Geometry_Void', category: 'Minimalista' },
  { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=1000', title: 'Heavy_Ink_Script', category: 'Blackwork' },
  { id: '4', type: 'image', url: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1000', title: 'Portrait_Anatomy', category: 'Realismo' },
  { id: '5', type: 'image', url: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=1000', title: 'Classic_Dagger_V2', category: 'Tradicional' },
  { id: '6', type: 'image', url: 'https://images.unsplash.com/photo-1512413316925-fd4b93f31521?q=80&w=1000', title: 'Dotwork_Symmetry', category: 'Minimalista' },
];

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('Todos');
  const categories = ['Todos', 'Realismo', 'Tradicional', 'Blackwork', 'Minimalista'];

  const filteredItems = filter === 'Todos' ? ITEMS : ITEMS.filter(item => item.category === filter);

  return (
    <section className="py-40 scroll-mt-24 border-x border-white/5" id="portfolio">
      <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12 reveal">
        <div className="max-w-2xl">
          <h2 className="text-7xl font-tech font-bold tracking-tighter mb-8 italic opacity-80 underline decoration-1 underline-offset-8">THE_ARCHIVE</h2>
          <p className="text-zinc-500 font-light text-lg">
            Una selección técnica de nuestras piezas más complejas. Filtrado por metodología y estilo de aplicación.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 border border-white/5 p-2 bg-[#0a0a0a]">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-tech text-[10px] tracking-[0.2em] uppercase px-6 py-3 transition-all ${
                filter === cat ? 'bg-white text-black font-bold' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, index) => (
          <div 
            key={item.id} 
            className={`group relative overflow-hidden bg-[#0a0a0a] border border-white/5 reveal ${
              index % 3 === 1 ? 'lg:translate-y-24' : ''
            }`}
          >
            <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="bg-white text-black px-2 py-1 text-[8px] font-bold font-tech uppercase tracking-widest">
                 {item.category}
               </span>
            </div>
            
            <div className="aspect-[3/4] overflow-hidden grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700">
               <img 
                 src={item.url} 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                 alt={item.title} 
               />
            </div>
            
            <div className="p-8 border-t border-white/5 flex justify-between items-center group-hover:bg-white/5 transition-colors">
              <div>
                <h3 className="font-tech text-sm font-bold tracking-widest mb-1">{item.title}</h3>
                <span className="text-[9px] text-zinc-600 font-tech uppercase tracking-widest">Entry ID: 00{item.id}_RAW</span>
              </div>
              <div className="w-8 h-8 border border-white/10 flex items-center justify-center group-hover:border-white transition-colors">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l10-10M7 7h10v10"/></svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
