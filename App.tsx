
import React from 'react';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import InkConsultant from './components/InkConsultant';
import Portfolio from './components/Portfolio';
import Reviews from './components/Reviews';

const Navbar: React.FC = () => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/95 border-b border-[#c5a059]/20 px-6 py-4 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-col items-center md:items-start group cursor-default">
        <h1 className="font-serif-bold text-2xl tracking-tight text-[#c5a059] group-hover:brightness-125 transition-all">ARTE & TINTA</h1>
        <span className="text-[10px] uppercase tracking-[0.3em] opacity-60">Estudio de Tatuajes Clásico</span>
      </div>
      <div className="flex flex-wrap justify-center gap-8 font-serif-bold text-[10px] uppercase tracking-widest">
        <a href="#inicio" className="nav-link text-white/80 hover:text-[#c5a059]">Inicio</a>
        <a href="#ai-consultant" className="nav-link text-white/80 hover:text-[#c5a059]">IA_Consultor</a>
        <a href="#portfolio" className="nav-link text-white/80 hover:text-[#c5a059]">Portfolio</a>
        <a href="#galeria" className="nav-link text-white/80 hover:text-[#c5a059]">Galería</a>
        <a href="#contacto" className="nav-link text-white/80 hover:text-[#c5a059]">Contacto</a>
      </div>
    </div>
  </nav>
);

const Hero: React.FC = () => (
  <header id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2000" 
        alt="Studio background" 
        className="w-full h-full object-cover opacity-30 grayscale scale-105 animate-[pulse_10s_infinite]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-transparent to-[#0f0f0f]"></div>
    </div>
    
    <div className="relative z-10 text-center max-w-4xl px-6">
      <div className="mb-8 inline-block reveal">
        <div className="h-[1px] w-16 bg-[#c5a059] mx-auto mb-4"></div>
        <span className="text-xs uppercase tracking-[0.6em] text-[#c5a059] font-bold">Experiencia & Tradición</span>
      </div>
      <h2 className="text-6xl md:text-9xl font-serif-bold leading-[0.9] mb-10 italic reveal" style={{ transitionDelay: '200ms' }}>
        El Arte de la <br /><span className="text-[#c5a059] not-italic">Piel.</span>
      </h2>
      <p className="text-lg md:text-2xl font-light italic text-zinc-400 mb-12 max-w-2xl mx-auto reveal" style={{ transitionDelay: '400ms' }}>
        Don de cada línea cuenta una historia eterna. Especialistas en realismo y trazo fino en el corazón de la ciudad.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center reveal" style={{ transitionDelay: '600ms' }}>
        <a href="#galeria" className="btn-wine px-14 py-5 font-serif-bold tracking-[0.3em] uppercase text-xs shadow-xl">
          Ver Galería
        </a>
        <a href="#contacto" className="bg-transparent border border-[#c5a059]/40 px-14 py-5 font-serif-bold tracking-[0.3em] uppercase text-xs hover:bg-[#c5a059]/10 transition-all text-white backdrop-blur-sm">
          Agendar Cita
        </a>
      </div>
    </div>
  </header>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-[#c5a059] selection:text-black bg-[#0f0f0f] text-[#e5e1d8]">
      <Navbar />
      <Hero />
      <main className="max-w-7xl mx-auto px-6">
        <InkConsultant />
        <Portfolio />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      
      <footer className="py-24 border-t border-[#c5a059]/10 bg-[#0a0a0a] px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <h3 className="font-serif-bold text-4xl text-[#c5a059] mb-2 italic">Arte & Tinta</h3>
            <div className="h-[1px] w-20 bg-[#c5a059]/30"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-12 mb-16 opacity-60 font-serif-bold text-[10px] uppercase tracking-[0.4em]">
            <a href="#" className="hover:text-[#c5a059] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#c5a059] transition-colors">Facebook</a>
            <a href="#" className="hover:text-[#c5a059] transition-colors">WhatsApp</a>
            <a href="#" className="hover:text-[#c5a059] transition-colors">TikTok</a>
          </div>
          <p className="text-[9px] uppercase tracking-[0.5em] opacity-20">
            © 2024 Arte & Tinta Tattoo Studio | Crafting Eternal Marks
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
