
// 1. Datos del Portafolio Ampliados
const WORKS = [
  { id: '1', title: 'León Realista', style: 'Realismo', type: 'image', url: 'https://images.unsplash.com/photo-1590246814883-57833e413fa4?q=80&w=1000', likes: 245 },
  { id: '2', title: 'Daga Clásica', style: 'Tradicional', type: 'image', url: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=1000', likes: 128 },
  { id: '3', title: 'Proceso de Sombreado', style: 'Videos', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', likes: 512 },
  { id: '4', title: 'Geometría Áurea', style: 'Minimalista', type: 'image', url: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=1000', likes: 89 },
  { id: '5', title: 'Cuervo Blackwork', style: 'Tradicional', type: 'image', url: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=1000', likes: 320 },
  { id: '6', title: 'Time-lapse Sesión', style: 'Videos', type: 'video', url: 'https://www.w3schools.com/html/movie.mp4', likes: 742 },
];

// 2. Renderizar Portafolio (Feed Style)
const grid = document.getElementById('tattoo-grid');

function renderWorks(filter = 'Todos') {
    if (!grid) return;
    grid.style.opacity = '0';
    
    setTimeout(() => {
        grid.innerHTML = '';
        const filtered = filter === 'Todos' ? WORKS : WORKS.filter(w => w.style === filter);
        
        filtered.forEach((w, index) => {
            const card = document.createElement('div');
            card.className = 'group relative overflow-hidden bg-black aspect-square reveal';
            card.style.transitionDelay = `${index * 50}ms`;

            const mediaHTML = w.type === 'video' 
                ? `<video src="${w.url}" class="w-full h-full object-cover group-hover:opacity-70 transition-all" loop muted onmouseover="this.play()" onmouseout="this.pause()"></video>`
                : `<img src="${w.url}" class="w-full h-full object-cover group-hover:opacity-70 transition-all" alt="${w.title}">`;

            card.innerHTML = `
                ${mediaHTML}
                
                <!-- Overlay Social -->
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center gap-6">
                    <div class="flex items-center gap-8">
                        <button onclick="window.toggleLike(this, ${w.likes})" class="like-btn flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform">
                            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/></svg>
                            <span class="text-xs font-bold">${w.likes}</span>
                        </button>
                        <button onclick="window.showComments('${w.id}')" class="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform">
                            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
                            <span class="text-xs font-bold">Comentar</span>
                        </button>
                    </div>
                </div>

                <!-- Modal de Comentarios -->
                <div id="modal-${w.id}" class="hidden fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl p-6 flex items-center justify-center">
                    <div class="max-w-lg w-full bg-[#0a0a0a] border border-white/10 p-10 rounded-2xl relative">
                        <button onclick="window.hideComments('${w.id}')" class="absolute top-4 right-4 text-zinc-500 hover:text-white">✕</button>
                        <h4 class="text-2xl font-serif-bold text-[#c5a059] mb-6">${w.title}</h4>
                        <div id="box-${w.id}" class="space-y-4 mb-8 max-h-[300px] overflow-y-auto custom-scrollbar pr-4 italic text-zinc-400 text-sm">
                            <p class="opacity-20 italic">No hay comentarios en este post...</p>
                        </div>
                        <div class="flex gap-4">
                            <input type="text" id="in-${w.id}" placeholder="Escribe tu opinión..." class="flex-1 bg-transparent border-b border-white/10 py-2 outline-none text-sm">
                            <button onclick="window.addSocialComment('${w.id}')" class="text-[10px] font-bold uppercase text-[#c5a059]">Publicar</button>
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
        
        grid.style.opacity = '1';
        if (window.handleReveal) window.handleReveal();
    }, 300);
}

// 3. Funciones Globales de Interacción
window.toggleLike = (btn, initialLikes) => {
    btn.classList.toggle('active');
    const span = btn.querySelector('span');
    const isActive = btn.classList.contains('active');
    span.textContent = isActive ? initialLikes + 1 : initialLikes;
};

window.showComments = (id) => {
    document.getElementById(`modal-${id}`).classList.remove('hidden');
};

window.hideComments = (id) => {
    document.getElementById(`modal-${id}`).classList.add('hidden');
};

window.addSocialComment = (id) => {
    const input = document.getElementById(`in-${id}`);
    const box = document.getElementById(`box-${id}`);
    if (!input || !input.value.trim()) return;

    if (box.querySelector('.opacity-20')) box.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = `• "${input.value}"`;
    box.appendChild(p);
    input.value = '';
    box.scrollTop = box.scrollHeight;
};

// 4. Filtrado por historias
window.filterBy = (style) => {
    renderWorks(style);
};

// 5. Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Render inicial
    renderWorks();

    // Configuración del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.onsubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById('form-name')?.value || '';
            const style = document.getElementById('form-style')?.value || '';
            const desc = document.getElementById('form-desc')?.value || '';
            
            if (!name || !desc) {
                alert("Por favor completa los campos obligatorios.");
                return;
            }

            const msg = `Hola @Marcos_Tattoo, soy ${name}. Vi tu perfil social y quiero agendar un tatuaje ${style}: ${desc}`;
            window.open(`https://wa.me/34600000000?text=${encodeURIComponent(msg)}`, '_blank');
        };
    }
});
