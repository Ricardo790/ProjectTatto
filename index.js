
const TATTOOS = [
    { id: 1, title: 'León Realista', category: 'Realismo', url: 'https://images.unsplash.com/photo-1590246814883-57833e413fa4?q=80&w=800' },
    { id: 2, title: 'Daga Clásica', category: 'Tradicional', url: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=800' },
    { id: 3, title: 'Línea Fina Botánica', category: 'Minimalista', url: 'https://images.unsplash.com/photo-1512413316925-fd4b93f31521?q=80&w=800' },
    { id: 4, title: 'Geometría Sagrada', category: 'Minimalista', url: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=800' },
    { id: 5, title: 'Cuervo Blackwork', category: 'Tradicional', url: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=800' },
    { id: 6, title: 'Retrato de Época', category: 'Realismo', url: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=800' }
];

const commentsDB = {}; // Local storage simulado

function renderGallery(filter = 'Todos') {
    const grid = document.getElementById('gallery-grid');
    grid.style.opacity = '0';
    
    setTimeout(() => {
        grid.innerHTML = '';
        const filtered = filter === 'Todos' ? TATTOOS : TATTOOS.filter(t => t.category === filter);

        filtered.forEach((t, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item reveal group bg-[#0a0a0a] border border-white/5 overflow-hidden';
            item.style.transitionDelay = `${index * 100}ms`;

            item.innerHTML = `
                <div class="relative aspect-[3/4] overflow-hidden">
                    <img src="${t.url}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-8">
                        <div class="text-center">
                            <h4 class="font-serif-bold text-2xl mb-2 text-[#c5a059]">${t.title}</h4>
                            <span class="text-[9px] uppercase tracking-widest text-white/50">${t.category}</span>
                        </div>
                    </div>
                </div>
                <div class="p-8">
                    <div class="flex justify-between items-center mb-6">
                        <span class="text-[10px] uppercase font-bold text-zinc-600">Comentarios</span>
                        <button onclick="toggleComments(${t.id})" class="text-[10px] text-[#c5a059] hover:underline">Ver/Escribir</button>
                    </div>
                    
                    <div id="comment-box-${t.id}" class="hidden space-y-4 animate-in fade-in duration-500">
                        <div id="list-${t.id}" class="max-h-32 overflow-y-auto space-y-2 pr-2 text-[11px] italic text-zinc-400">
                            ${(commentsDB[t.id] || []).map(c => `<p class="border-l border-[#c5a059]/30 pl-3">"${c}"</p>`).join('') || '<p class="opacity-20">Sin opiniones aún...</p>'}
                        </div>
                        <div class="flex gap-2 pt-4 border-t border-white/5">
                            <input type="text" id="input-${t.id}" placeholder="Tu opinión..." class="flex-1 bg-transparent border-b border-white/10 py-1 text-xs outline-none">
                            <button onclick="addComment(${t.id})" class="text-[10px] font-bold text-[#c5a059]">OK</button>
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(item);
        });
        grid.style.opacity = '1';
        observeElements();
    }, 300);
}

// Funciones de Comentarios
window.toggleComments = (id) => {
    const box = document.getElementById(`comment-box-${id}`);
    box.classList.toggle('hidden');
};

window.addComment = (id) => {
    const input = document.getElementById(`input-${id}`);
    const list = document.getElementById(`list-${id}`);
    const text = input.value.trim();
    if (!text) return;

    if (!commentsDB[id]) commentsDB[id] = [];
    commentsDB[id].push(text);
    
    input.value = '';
    
    // Actualizar lista visualmente
    if (list.querySelector('.opacity-20')) list.innerHTML = '';
    const p = document.createElement('p');
    p.className = 'border-l border-[#c5a059]/30 pl-3';
    p.textContent = `"${text}"`;
    list.appendChild(p);
};

// Filtrado
window.filterGallery = (cat) => {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-[#c5a059]', 'text-black', 'font-bold');
        btn.classList.add('border-white/10', 'text-zinc-500');
        if (btn.innerText.toLowerCase() === cat.toLowerCase() || (cat === 'Todos' && btn.innerText === 'Todos')) {
            btn.classList.add('active', 'bg-[#c5a059]', 'text-black', 'font-bold');
            btn.classList.remove('border-white/10', 'text-zinc-500');
        }
    });
    renderGallery(cat);
};

// Observador para animaciones
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();

    // Formulario de Cita
    const form = document.getElementById('appointment-form');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById('form-name').value;
            const style = document.getElementById('form-style').value;
            const idea = document.getElementById('form-idea').value;
            const msg = `Hola Arte & Tinta, soy ${name}. Quiero consultar disponibilidad para un tatuaje estilo ${style}. Idea: ${idea}`;
            window.open(`https://wa.me/34600000000?text=${encodeURIComponent(msg)}`, '_blank');
        };
    }
});
