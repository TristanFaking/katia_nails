
/* ── Gallery Data ─────────────────────────────────────────────── */
const nailDesigns = [
{ id: 1,  name: "French Oro Rosa",        category: "french",  image: "./images/french-oro-rosa.jpg", npClass: "np-1",  },
{ id: 2,  name: "Chrome Oceánico",         category: "chrome",  image: "./images/chrome-oceanico.jpg", npClass: "np-2", },
{ id: 3,  name: "Gel Berries",             category: "gel",     image: "./images/gel-berries.jpg", npClass: "np-3", },
{ id: 4,  name: "Jardín Esmeralda",        category: "floral",  image: "./images/jardin-esmeralda.jpg", npClass: "np-4", },
{ id: 5,  name: "Glitter Champagne",       category: "glitter", image: "./images/glitter-champagne.jpg", npClass: "np-5", },
{ id: 6,  name: "Sueños Lavanda",          category: "gel",     image: "./images/suenos-lavanda.jpg", npClass: "np-6", },
{ id: 7,  name: "Chrome Medianoche",       category: "chrome",  image: "./images/chrome-medianoche.jpg", npClass: "np-7", },
{ id: 8,  name: "Florales 3D Nude",        category: "3d",      image: "./images/florales-3d-nude.jpg", npClass: "np-8", },
];

/* ── Render Cards ─────────────────────────────────────────────── */
function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = '';
    nailDesigns.forEach((d, i) => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.dataset.category = d.category;
        card.style.animationDelay = `${i * 0.07}s`;
        card.innerHTML = `
        <div class="card-img-wrap" onclick="openLightbox(${d.id})">
            <img src="${d.image}" alt="${d.name}" class="nail-image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
            <div class="card-overlay">
            <div class="card-tag">${d.category}</div>
            <div class="card-name">${d.name}</div>
            </div>
        </div>
        <div class="card-bottom">
            <span class="card-label">${d.name}</span>
            <button class="card-heart" onclick="toggleLike(this)" title="Like">
            <i class="bi bi-heart"></i>
            </button>
        </div>
        `;
        grid.appendChild(card);
    });
}

renderGallery();

/* ── Filter Tabs ──────────────────────────────────────────────── */
document.getElementById('filterTabs').addEventListener('click', e => {
const btn = e.target.closest('.filter-btn');
if (!btn) return;
document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
btn.classList.add('active');
const filter = btn.dataset.filter;
document.querySelectorAll('.gallery-card').forEach(card => {
    const match = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('hidden', !match);
});
});

/* ── Like Button ──────────────────────────────────────────────── */
function toggleLike(btn) {
    btn.classList.toggle('liked');
    const icon = btn.querySelector('i');
    icon.className = btn.classList.contains('liked') ? 'bi bi-heart-fill' : 'bi bi-heart';
}

/* ── Lightbox ─────────────────────────────────────────────────── */
function openLightbox(id) {
    const d = nailDesigns.find(x => x.id === id);
    if (!d) return;
    const nail = document.getElementById('lightboxNail');
    const info = document.getElementById('lightboxInfo');
    nail.className = `lightbox-nail ${d.npClass}`;
    nail.innerHTML = `<div class="nail-shape" style="width:45%;height:65%;font-size:3rem;">${d.emoji}</div>`;
    info.innerHTML = `
        <span class="label-small d-block mb-1">${d.category}</span>
        <h3 style="font-family:'Playfair Display',serif;color:var(--cream);font-size:1.8rem;">${d.name}</h3>
        <p style="color:var(--muted);font-size:0.95rem;margin-top:0.5rem;">Diseño hecho a mano — set disponible bajo pedido.</p>
    `;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
    if (e && e.target !== document.getElementById('lightbox') && !e.target.closest('.lightbox-close')) return;
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ── Navbar scroll ─────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);
});

/* ── Count-up animation ─────────────────────────────────────────── */
const counters = document.querySelectorAll('[data-count]');
const countersObserver = new IntersectionObserver(entries => {
entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    const suffix = el.dataset.count === '98' ? '%' : '+';
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start) + (start >= target ? suffix : '');
    if (start >= target) clearInterval(timer);
    }, 25);
    countersObserver.unobserve(el);
});
}, { threshold: 0.5 });

counters.forEach(c => countersObserver.observe(c));

/* ── WhatsApp link ──────────────────────────────────────────────── */
// ✏️  Cambia este número por el real de Katia (solo dígitos, con código de país)
const WA_NUMBER = '52332059914';
const WA_MESSAGE = encodeURIComponent('¡Hola Katia! Me gustaría agendar una cita');
const waUrl = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

document.getElementById('waBtn').href = waUrl;
const waFooter = document.getElementById('waFooter');
if (waFooter) waFooter.href = waUrl;

document.querySelectorAll('a[href="#contact"]').forEach(a => {
if (a.classList.contains('nav-book-btn')) return;
});
