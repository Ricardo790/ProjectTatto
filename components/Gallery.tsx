
import React, { useState } from 'react';
import TattooCard from './TattooCard';
import { Tattoo } from '../types';

const TATTOOS: Tattoo[] = [
  { id: '1', title: 'León Realista', description: 'Trabajo de sombras profundas con enfoque en la mirada. 6 horas de sesión.', style: 'Realismo', imageUrl: 'https://images.unsplash.com/photo-1590246814883-57833e413fa4?q=80&w=1000' },
  { id: '2', title: 'Daga Tradicional', description: 'Línea gruesa y colores sólidos. Un clásico imperecedero.', style: 'Tradicional', imageUrl: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=1000' },
  { id: '3', title: 'Geometría Áurea', description: 'Simetría matemática aplicada a la anatomía del brazo.', style: 'Minimalista', imageUrl: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=1000' },
  { id: '4', title: 'Cuervo Blackwork', description: 'Contraste extremo. Solo tinta negra pura.', style: 'Blackwork', imageUrl: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=1000' },
  { id: '5', title: 'Retrato de Época', description: 'Técnica de realismo fotográfico sobre piel.', style: 'Realismo', imageUrl: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1000' },
  { id: '6', title: 'Botánica Minimalista', description: 'Línea fina y elegante. Naturaleza en la piel.', style: 'Minimalista', imageUrl: 'https://images.unsplash.com/photo-1512413316925-fd4b93f31521?q=80&w=1000' },
];

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('Todos');
  const categories = ['Todos', 'Realismo', 'Tradicional', 'Blackwork', 'Minimalista'];

  const filteredTattoos = filter === 'Todos' ? TATTOOS : TATTOOS.filter(t => t.style === filter);

  return (
    <section id="galeria" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24 reveal">
        <h2 className="font-serif-bold text-5xl md:text-7xl mb-6 italic">Portafolio</h2>
        <div className="w-24 h-[1px] bg-[#c5a059] mx-auto mb-8"></div>
        <p className="text-[#c5a059] uppercase tracking-[0.4em] text-[10px] mb-12 font-bold">Explora nuestros diversos estilos</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-serif-bold text-[10px] uppercase tracking-[0.2em] px-8 py-3 transition-all border ${
                filter === cat 
                ? 'bg-[#c5a059] text-black border-[#c5a059]' 
                : 'border-white/10 text-zinc-500 hover:border-[#c5a059]/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredTattoos.map((tattoo, index) => (
          <div key={tattoo.id} className="reveal" style={{ transitionDelay: `${index * 100}ms` }}>
            <TattooCard tattoo={tattoo} />
          </div>
        ))}
      </div>
      
      {filteredTattoos.length === 0 && (
        <div className="text-center py-20 opacity-30 italic">
          No hay trabajos en esta categoría por el momento.
        </div>
      )}
    </section>
  );
};

export default Gallery;
