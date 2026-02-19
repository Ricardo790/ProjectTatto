
import { GoogleGenAI, Type } from "@google/genai";

// 1. Datos de la Galería
const TATTOOS = [
  { id: '1', title: 'León Realista', style: 'Realismo', url: 'https://images.unsplash.com/photo-1590246814883-57833e413fa4?q=80&w=1000' },
  { id: '2', title: 'Daga Clásica', style: 'Tradicional', url: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=1000' },
  { id: '3', title: 'Geometría Áurea', style: 'Minimalista', url: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=1000' },
  { id: '4', title: 'Cuervo Blackwork', style: 'Blackwork', url: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=1000' },
  { id: '5', title: 'Botánica Fina', style: 'Minimalista', url: 'https://images.unsplash.com/photo-1512413316925-fd4b93f31521?q=80&w=1000' },
];

// 2. Renderizar Galería
const grid = document.getElementById('tattoo-grid');

function renderGallery(filter = 'Todos') {
  grid.innerHTML = '';
  const filtered = filter === 'Todos' ? TATTOOS : TATTOOS.filter(t => t.style === filter);
  
  filtered.forEach(t => {
    const card = document.createElement('div');
    card.className = 'bg-[#0a0a0a] border border-white/5 overflow-hidden group hover:border-[#c5a059]/30 transition-all';
    card.innerHTML = `
      <div class="aspect-square overflow-hidden relative">
        <img src="${t.url}" class="w-full h-full object-cover group-hover:scale-110 transition-duration-700" alt="${t.title}">
        <span class="absolute top-4 right-4 bg-black/60 px-3 py-1 text-[8px] font-bold text-[#c5a059] uppercase">${t.style}</span>
      </div>
      <div class="p-6">
        <h4 class="font-serif-bold text-xl text-[#c5a059]">${t.title}</h4>
        <div class="mt-4 pt-4 border-t border-white/5">
           <p class="text-[10px] text-zinc-600 uppercase mb-2">Comentarios:</p>
           <div id="comments-${t.id}" class="space-y-2 max-h-[100px] overflow-y-auto mb-4 text-[11px] italic">
             <p class="opacity-30">Sin comentarios todavía...</p>
           </div>
           <div class="flex gap-2">
             <input type="text" id="input-${t.id}" placeholder="Tu opinión..." class="flex-1 bg-transparent border-b border-white/10 text-[10px] outline-none">
             <button onclick="window.addComment('${t.id}')" class="text-[10px] font-bold uppercase text-[#c5a059]">Post</button>
           </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// 3. Comentarios (Locales por ahora para simplicidad)
window.addComment = (id) => {
    const input = document.getElementById(`input-${id}`);
    const box = document.getElementById(`comments-${id}`);
    if (!input.value.trim()) return;
    
    if (box.querySelector('.opacity-30')) box.innerHTML = '';
    const p = document.createElement('p');
    p.className = 'text-zinc-400';
    p.textContent = `• "${input.value}"`;
    box.appendChild(p);
    input.value = '';
};

// 4. Filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.className = 'filter-btn border border-white/10 text-zinc-500 px-6 py-2 text-[10px] font-bold uppercase tracking-widest');
        btn.className = 'filter-btn bg-[#c5a059] text-black px-6 py-2 text-[10px] font-bold uppercase tracking-widest';
        renderGallery(btn.dataset.filter);
    };
});

// 5. Consultor IA (Gemini)
const btnAi = document.getElementById('btn-ai');
const aiInput = document.getElementById('ai-input');
const aiResult = document.getElementById('ai-result');

btnAi.onclick = async () => {
    const prompt = aiInput.value.trim();
    if (!prompt) return;

    btnAi.textContent = 'PROCESANDO_DATOS...';
    btnAi.disabled = true;

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Eres un experto tatuador. Sugiere un concepto basado en: "${prompt}". Responde solo en JSON.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                    },
                    required: ["title", "description"]
                },
            },
        });

        const data = JSON.parse(response.text);
        document.getElementById('ai-title').textContent = data.title;
        document.getElementById('ai-desc').textContent = data.description;
        aiResult.classList.remove('hidden');

        // Generar Imagen
        const imgResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: `A professional black and gray tattoo sketch: ${data.title}` }] },
        });

        for (const part of imgResponse.candidates[0].content.parts) {
            if (part.inlineData) {
                document.getElementById('sketch-img').src = `data:image/png;base64,${part.inlineData.data}`;
                document.getElementById('sketch-img').classList.remove('hidden');
                document.getElementById('sketch-loading').classList.add('hidden');
            }
        }

    } catch (e) {
        console.error(e);
        alert("Configura tu API_KEY en Netlify para usar la IA.");
    } finally {
        btnAi.textContent = 'Generar Propuesta';
        btnAi.disabled = false;
    }
};

// 6. WhatsApp Form
document.getElementById('contact-form').onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const style = document.getElementById('form-style').value;
    const desc = document.getElementById('form-desc').value;
    const msg = `Hola Arte & Tinta, soy ${name}. Me interesa un tatuaje estilo ${style}: ${desc}`;
    window.open(`https://wa.me/34600000000?text=${encodeURIComponent(msg)}`, '_blank');
};

// Inicio
renderGallery();
