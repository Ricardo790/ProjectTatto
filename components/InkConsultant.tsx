
import React, { useState } from 'react';
import { getTattooConsultation, generateTattooSketch } from '../services/geminiService';
import { TattooIdea } from '../types';

const InkConsultant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState<TattooIdea | null>(null);
  const [sketch, setSketch] = useState<string | null>(null);

  const handleConsult = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setIdea(null);
    setSketch(null);
    try {
      const result = await getTattooConsultation(prompt);
      setIdea(result);
      const sketchUrl = await generateTattooSketch(result.title + " " + result.style);
      setSketch(sketchUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-40 scroll-mt-24 border-x border-white/5" id="ai-consultant">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0c0c0c] border border-white/5 p-12 lg:p-20 relative reveal overflow-hidden">
          {/* Decorative Corner Lines */}
          <div className="absolute top-0 right-0 w-32 h-[1px] bg-white opacity-20"></div>
          <div className="absolute top-0 right-0 h-32 w-[1px] bg-white opacity-20"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-6xl font-tech font-bold leading-none mb-6">BLUEPRINT <br /> <span className="opacity-20">GENERATOR_</span></h2>
                <div className="flex gap-2">
                   <div className="w-1 h-1 bg-white"></div>
                   <div className="w-1 h-1 bg-white opacity-50"></div>
                   <div className="w-1 h-1 bg-white opacity-20"></div>
                </div>
              </div>
              
              <p className="text-zinc-500 font-light leading-relaxed">
                Nuestra red neuronal traduce tus conceptos abstractos en directrices técnicas de composición, sugiriendo estilos y ubicaciones anatómicas óptimas.
              </p>

              <div className="space-y-6">
                <div className="relative">
                  <span className="absolute -top-3 left-4 bg-[#0c0c0c] px-2 font-tech text-[8px] uppercase tracking-widest text-zinc-500">Input_Concept</span>
                  <textarea
                    className="w-full bg-transparent border border-white/10 p-8 outline-none font-tech text-xl focus:border-white transition-all min-h-[160px] placeholder-zinc-800"
                    placeholder="SISTEMA_ESPERANDO_DATOS..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleConsult}
                  disabled={loading}
                  className={`w-full py-6 font-tech text-[10px] tracking-[0.6em] uppercase transition-all ${
                    loading ? 'bg-zinc-900 text-zinc-700' : 'bg-white text-black font-bold hover:invert'
                  }`}
                >
                  {loading ? 'Sincronizando...' : 'Ejecutar_Analisis'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center">
              {idea ? (
                <div className="border border-white/10 p-12 bg-[#080808] relative group animate-in fade-in slide-in-from-right-10 duration-700">
                  <div className="flex justify-between items-start mb-12">
                    <div>
                       <span className="font-tech text-[9px] text-zinc-600 uppercase tracking-widest block mb-2">Technical_Result:</span>
                       <h3 className="text-4xl font-tech font-bold">{idea.title}</h3>
                    </div>
                    <div className="animate-pulse w-2 h-2 bg-white"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <p className="text-sm font-light leading-relaxed text-zinc-400 font-tech uppercase italic">
                        {idea.description}
                      </p>
                      <div className="space-y-6 pt-6 border-t border-white/5">
                        <div className="flex flex-col">
                          <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-600 mb-2">Metodología</span>
                          <span className="font-tech text-xs tracking-widest">{idea.style}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-600 mb-2">Anatomía</span>
                          <span className="font-tech text-xs tracking-widest">{idea.placement_suggestion}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative overflow-hidden bg-black p-4 border border-white/5">
                       {sketch ? (
                         <img src={sketch} alt="AI Draft" className="w-full h-auto brightness-150 contrast-125 invert opacity-70 group-hover:scale-110 transition-transform duration-1000" />
                       ) : (
                         <div className="aspect-square flex items-center justify-center opacity-10">
                            <div className="w-12 h-12 border-2 border-white border-t-transparent animate-spin"></div>
                         </div>
                       )}
                       <div className="absolute bottom-2 right-2 text-[7px] font-tech text-zinc-700">SIM_OUTPUT_01.PNG</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-[#080808] border border-white/5 flex flex-col items-center justify-center text-center opacity-30 group">
                   <div className="font-tech text-[10px] tracking-[1em] uppercase mb-8">Awaiting_Neural_Link</div>
                   <div className="w-48 h-[1px] bg-white/20 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-1/3 bg-white animate-[loading_2s_infinite]"></div>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes loading {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </section>
  );
};

export default InkConsultant;
