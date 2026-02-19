
// 1. Datos del Portafolio (Imágenes y Videos)
const WORKS = [
  { id: '1', title: 'León Realista', style: 'Realismo', type: 'image', url: 'https://images.unsplash.com/photo-1590246814883-57833e413fa4?q=80&w=1000' },
  { id: '2', title: 'Daga Clásica', style: 'Tradicional', type: 'image', url: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=1000' },
  { id: '3', title: 'Proceso de Sombreado', style: 'Videos', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' }, // Video de ejemplo
  { id: '4', title: 'Geometría Áurea', style: 'Realismo', type: 'image', url: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=1000' },
  { id: '5', title: 'Cuervo Blackwork', style: 'Tradicional', type: 'image', url: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=1000' },
  { id: '6', title: 'Time-lapse Sesión', style: 'Videos', type: 'video', url: 'https://www.w3schools.com/html/movie.mp4' }, // Video de ejemplo
];

// 2. Renderizar Portafolio
const grid = document.getElementById('tattoo-grid');

function renderWorks(filter = 'Todos') {
    // Animación de salida antes de limpiar
    grid.style.opacity = '0';
    
    setTimeout(() => {
        grid.innerHTML = '';
        const filtered = filter === 'Todos' ? WORKS : WORKS.filter(w => w.style === filter);
        
        filtered.forEach((w, index) => {
            const card = document.createElement('div');
            card.className = 'tattoo-card bg-[#0a0a0a] border border-white/5 overflow-hidden group reveal';
            card.style.transitionDelay = `${index * 100}ms`;

            const mediaHTML = w.type === 'video' 
                ? `<video src="${w.url}" class="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" loop muted onmouseover="this.play()" onmouseout="this.pause()"></video>`
                : `<img src="${w.url}" class="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="${w.title}">`;

            card.innerHTML = `
                <div class="aspect-[4/5] overflow-hidden relative">
                    ${mediaHTML}
                    <span class="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 text-[8px] font-bold text-[#c5a059] uppercase tracking-widest">${w.style}</span>
                </div>
                <div class="p-8">
                    <h4 class="font-serif-bold text-xl text-[#c5a059] mb-4">${w.title}</h4>
                    <div class="pt-4 border-t border-white/5">
                        <div id="comments-${w.id}" class="space-y-3 max-h-[120px] overflow-y-auto mb-6 custom-scrollbar pr-2">
                            <p class="text-[10px] opacity-20 italic">No hay comentarios aún...</p>
                        </div>
                        <div class="flex gap-2">
                            <input type="text" id="input-${w.id}" placeholder="Escribe un comentario..." class="flex-1 bg-transparent border-b border-white/10 text-[10px] outline-none py-2 focus:border-[#c5a059] transition-all">
                            <button onclick="window.postComment('${w.id}')" class="text-[9px] font-bold uppercase text-[#c5a059] hover:text-white transition-all">Publicar</button>
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
        
        // Animación de entrada
        grid.style.opacity = '1';
        handleScrollReveal(); // Re-ejecutar observador
    }, 300);
}

// 3. Sistema de Comentarios
window.postComment = (id) => {
    const input = document.getElementById(`input-${id}`);
    const box = document.getElementById(`comments-${id}`);
    const text = input.value.trim();
    
    if (!text) return;

    if (box.querySelector('.opacity-20')) box.innerHTML = '';
    
    const div = document.createElement('div');
    div.className = 'animate-in fade-in slide-in-from-bottom-1 duration-500';
    div.innerHTML = `<p class="text-[11px] text-zinc-400 italic">"${text}"</p>`;
    
    box.appendChild(div);
    input.value = '';
    box.scrollTop = box.scrollHeight;
};

// 4. Filtros con Animación
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.className = 'filter-btn border border-white/5 text-zinc-500 px-6 py-2 text-[9px] font-bold uppercase tracking-widest hover:text-white transition-all';
        });
        btn.className = 'filter-btn bg-[#c5a059] text-black px-6 py-2 text-[9px] font-bold uppercase tracking-widest transition-all';
        renderWorks(btn.dataset.filter);
    };
});

// 5. Animación de Scroll Reveal
function handleScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// 6. WhatsApp
document.getElementById('contact-form').onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const style = document.getElementById('form-style').value;
    const desc = document.getElementById('form-desc').value;
    const msg = `Hola Arte & Tinta, soy ${name}. Quiero un tatuaje ${style}: ${desc}`;
    window.open(`https://wa.me/34600000000?text=${encodeURIComponent(msg)}`, '_blank');
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    renderWorks();
    handleScrollReveal();
});
