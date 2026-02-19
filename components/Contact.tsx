
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    estilo: 'Realismo',
    descripcion: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppSend = () => {
    // REEMPLAZA ESTE NÚMERO con tu número real (incluyendo código de país sin el +)
    const telefono = "34600000000"; 
    
    const mensaje = `Hola *Arte & Tinta*, me gustaría agendar una cita:%0A%0A` +
      `*Nombre:* ${formData.nombre}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Estilo:* ${formData.estilo}%0A` +
      `*Descripción:* ${formData.descripcion}`;

    const whatsappUrl = `https://wa.me/${telefono}?text=${mensaje}`;
    
    if (formData.nombre && formData.descripcion) {
      window.open(whatsappUrl, '_blank');
    } else {
      alert("Por favor, completa al menos tu nombre y la descripción de tu idea.");
    }
  };

  return (
    <section id="contacto" className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <div className="border-ornamental p-12 md:p-20 card-shadow bg-[#0f0f0f]">
          <div className="text-center mb-16">
            <h2 className="font-serif-bold text-4xl md:text-6xl mb-4 italic">Cita Previa</h2>
            <p className="text-[#c5a059] uppercase tracking-[0.3em] text-[10px] font-bold">Inicia tu proyecto vía WhatsApp</p>
          </div>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-8">
              <div className="relative">
                <label className="block text-[10px] font-serif-bold uppercase tracking-widest text-zinc-500 mb-2">Nombre Completo</label>
                <input 
                  type="text" 
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#c5a059]/20 p-2 outline-none focus:border-[#c5a059] transition-colors italic" 
                  placeholder="Ej. Juan Pérez" 
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-[10px] font-serif-bold uppercase tracking-widest text-zinc-500 mb-2">Correo Electrónico</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#c5a059]/20 p-2 outline-none focus:border-[#c5a059] transition-colors italic" 
                  placeholder="juan@ejemplo.com" 
                />
              </div>
              <div className="relative">
                <label className="block text-[10px] font-serif-bold uppercase tracking-widest text-zinc-500 mb-2">Estilo Interesado</label>
                <select 
                  name="estilo"
                  value={formData.estilo}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border-b border-[#c5a059]/20 p-2 outline-none focus:border-[#c5a059] transition-colors italic cursor-pointer"
                >
                  <option>Realismo</option>
                  <option>Tradicional</option>
                  <option>Blackwork</option>
                  <option>Minimalista</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="relative h-full flex flex-col">
                <label className="block text-[10px] font-serif-bold uppercase tracking-widest text-zinc-500 mb-2">Descripción del Tatuaje</label>
                <textarea 
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-[#c5a059]/20 p-4 outline-none focus:border-[#c5a059] transition-colors italic flex-1 min-h-[150px]" 
                  placeholder="Cuéntanos tu idea..."
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="md:col-span-2 pt-8 text-center">
              <button 
                type="button" 
                onClick={handleWhatsAppSend}
                className="w-full btn-wine py-5 font-serif-bold tracking-[0.5em] uppercase text-xs flex items-center justify-center gap-3"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Enviar Solicitud por WhatsApp
              </button>
              <p className="mt-4 text-[9px] text-zinc-600 uppercase tracking-widest italic">
                * Se abrirá WhatsApp para finalizar los detalles de tu cita.
              </p>
            </div>
          </form>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-[#c5a059]/10 pt-12">
            <div>
              <span className="text-[10px] font-serif-bold uppercase text-zinc-600 block mb-2">Visítanos</span>
              <p className="text-xs italic">Calle de la Tinta 42, Madrid</p>
            </div>
            <div>
              <span className="text-[10px] font-serif-bold uppercase text-zinc-600 block mb-2">Llámanos</span>
              <p className="text-xs italic">+34 912 345 678</p>
            </div>
            <div>
              <span className="text-[10px] font-serif-bold uppercase text-zinc-600 block mb-2">Horario</span>
              <p className="text-xs italic">L-S: 11:00 - 20:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
