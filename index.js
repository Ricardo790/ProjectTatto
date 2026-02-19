
const WORKS = [
    { id: 1, type: 'image', style: 'Realismo', url: 'https://images.unsplash.com/photo-1590246814883-57833e413fa4?q=80&w=1000', likes: 1240 },
    { id: 2, type: 'image', style: 'Tradicional', url: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=1000', likes: 856 },
    { id: 3, type: 'video', style: 'Realismo', url: 'https://www.w3schools.com/html/mov_bbb.mp4', likes: 2103 },
    { id: 4, type: 'image', style: 'Minimalista', url: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=1000', likes: 432 },
    { id: 5, type: 'image', style: 'Tradicional', url: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=1000', likes: 967 },
    { id: 6, type: 'video', style: 'Minimalista', url: 'https://www.w3schools.com/html/movie.mp4', likes: 1544 }
];

let currentTattooId = null;
const commentsData = {}; // Simulación de base de datos local

function renderFeed(filter = 'Todos') {
    const feed = document.getElementById('feed');
    feed.style.opacity = '0';
    
    setTimeout(() => {
        feed.innerHTML = '';
        const filtered = filter === 'Todos' ? WORKS : WORKS.filter(w => w.style === filter);

        filtered.forEach(w => {
            const item = document.createElement('div');
            item.className = 'group relative aspect-square bg-black overflow-hidden cursor-pointer';
            
            const media = w.type === 'video' 
                ? `<video src="${w.url}" class="w-full h-full object-cover group-hover:opacity-50 transition-all duration-700" loop muted onmouseover="this.play()" onmouseout="this.pause()"></video>`
                : `<img src="${w.url}" class="w-full h-full object-cover group-hover:opacity-50 transition-all duration-700">`;

            item.innerHTML = `
                ${media}
                <div class="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onclick="toggleLike(event, this)" class="like-btn flex flex-col items-center text-white">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/></svg>
                        <span class="text-[10px] font-bold mt-1">${w.likes}</span>
                    </button>
                    <button onclick="openComments(${w.id})" class="flex flex-col items-center text-white">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
                        <span class="text-[10px] font-bold mt-1">Comentar</span>
                    </button>
                </div>
            `;
            feed.appendChild(item);
        });
        feed.style.opacity = '1';
    }, 300);
}

// Interacciones Sociales
window.toggleLike = (e, btn) => {
    e.stopPropagation();
    btn.classList.toggle('active');
    const span = btn.querySelector('span');
    const count = parseInt(span.textContent);
    span.textContent = btn.classList.contains('active') ? count + 1 : count - 1;
};

window.openComments = (id) => {
    currentTattooId = id;
    const modal = document.getElementById('comment-modal');
    const list = document.getElementById('comment-list');
    modal.classList.remove('hidden');
    
    const comments = commentsData[id] || [];
    list.innerHTML = comments.length 
        ? comments.map(c => `<p class="border-l border-[#c5a059]/30 pl-3">"${c}"</p>`).join('')
        : `<p class="opacity-20">Sé el primero en comentar...</p>`;
};

window.closeModal = () => {
    document.getElementById('comment-modal').classList.add('hidden');
};

window.postComment = () => {
    const input = document.getElementById('comment-input');
    const list = document.getElementById('comment-list');
    const text = input.value.trim();
    if (!text) return;

    if (!commentsData[currentTattooId]) commentsData[currentTattooId] = [];
    commentsData[currentTattooId].push(text);
    
    input.value = '';
    openComments(currentTattooId); // Refrescar lista
};

window.filterFeed = (style) => {
    renderFeed(style);
};

// Animación de Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderFeed();
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Formulario de Contacto
    document.getElementById('social-form').onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const style = document.getElementById('style').value;
        const idea = document.getElementById('idea').value;
        const msg = `Hola Marcos! Soy ${name}. He visto tu perfil y quiero tatuarme algo ${style}: ${idea}`;
        window.open(`https://wa.me/34600000000?text=${encodeURIComponent(msg)}`, '_blank');
    };
});
