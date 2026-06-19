// ─── EMAILJS INIT ─────────────────────────────────────────────────────────────
emailjs.init("5HShZdu-MRNAXFk1C");

// ─── NAVBAR SCROLL ────────────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const cur = window.scrollY;
      navbar.classList.toggle('scrolled', cur > 80);
      navbar.classList.toggle('hidden', cur > lastScrollY && cur > 200);
      lastScrollY = cur;
      ticking = false;
      document.getElementById('backToTop').classList.toggle('visible', cur > 400);
      const scrolled = cur / (document.documentElement.scrollHeight - window.innerHeight);
      document.body.style.setProperty('--scroll-progress', (scrolled * 100) + '%');
    });
    ticking = true;
  }
});

// ─── BACK TO TOP ──────────────────────────────────────────────────────────────
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── HAMBURGER ────────────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ─── ABOUT TABS ───────────────────────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ─── PROJECT CARDS ANIMATION ──────────────────────────────────────────────────
const cardObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.project-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('card-visible'), i * 120);
      });
      cardObs.disconnect();
    }
  });
}, { threshold: 0.1 });
const grid = document.querySelector('.projects-grid');
if (grid) cardObs.observe(grid);

// ─── GALLERY DATA ─────────────────────────────────────────────────────────────
// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  CARA MENGGANTI LINK DI DALAM GALLERY:                                      ║
// ║  Ubah properti:                                                             ║
// ║    label : judul yang tampil di layar                                       ║
// ║    url   : alamat web yang akan dibuka saat diklik                          ║
// ║                                                                             ║
// ║  Contoh:                                                                    ║
// ║    { label: 'Behance Portfolio', url: 'https://www.behance.net/...' }       ║
// ╚══════════════════════════════════════════════════════════════════════════════╝
const galleryData = {
  poster: {
    title: 'Personal', titleSpan: 'Projects',
    subtitle: 'A collection of miscellaneous personal projects.',
    links: [
      // ▼ GANTI label DAN url DI BAWAH INI ▼
      { label: 'Miscellaneous Posters.', url: 'https://drive.google.com/drive/folders/1Gn2ht9FGMB4tqXKlBfF9dozRK_EBkBdV?usp=sharing' },
      { label: 'Spectrum of Concept.', url: 'https://drive.google.com/drive/folders/1VFyRRXOwaGZy0yOofo_iHcZLhxO53LIY?usp=sharing' },
      { label: 'Cinematic Tributes.', url: 'https://drive.google.com/drive/folders/1DvYIiCRMXgrVTsm5F0pUzxIfCoiIyF5B?usp=sharing' },
    ]
  },
  branding: {
    title: ' Diverse', titleSpan: 'Mediums',
    subtitle: 'A comparative exploration of design across various software.',
    links: [
      { label: 'Vector Art (Figma).', url: 'https://drive.google.com/drive/folders/1xdNXNZqdlAel0mIHdMh4EqJprwv-d7zW?usp=sharing' },
      { label: 'Sketches (Paper).', url: 'https://drive.google.com/drive/folders/1utxVZLsFDaPuOUt5c3FaWXOX01S9sM49?usp=sharing' },
      { label: 'Ibis Paint.', url: 'https://drive.google.com/drive/folders/1XsmaMu6VDAKemxv3hjZRSNtEFZHtaSzF?usp=sharing' },
    ]
  },
};

// ─── GALLERY PAGE LOGIC ───────────────────────────────────────────────────────
const galleryPage     = document.getElementById('gallery-page');
const galleryTitle    = document.getElementById('galleryTitle');
const gallerySubtitle = document.getElementById('gallerySubtitle');
const galleryGrid     = document.getElementById('galleryGrid');
const galleryBack     = document.getElementById('galleryBack');

document.querySelectorAll('.project-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const key  = btn.dataset.gallery;
    const data = galleryData[key];
    if (!data) return;

    galleryTitle.innerHTML      = `${data.title} <span>${data.titleSpan}</span>`;
    gallerySubtitle.textContent = data.subtitle || '';
    galleryGrid.innerHTML       = '';

    data.links.forEach((item, i) => {
      const a = document.createElement('a');
      a.className = 'link-row';
      a.href      = item.url;
      a.target    = '_blank';
      a.rel       = 'noopener noreferrer';
      a.innerHTML = `
        <span class="link-row-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="link-row-label">${item.label}</span>
        <span class="link-row-arrow">↗</span>
      `;
      galleryGrid.appendChild(a);
    });

    galleryPage.classList.add('open');
    galleryPage.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  });
});

galleryBack.addEventListener('click', () => {
  galleryPage.classList.remove('open');
  document.body.style.overflow = '';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && galleryPage.classList.contains('open')) {
    galleryPage.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ─── NOTIFICATION ─────────────────────────────────────────────────────────────
function showNotif(msg, isError = false) {
  const notif = document.getElementById('notif');
  notif.textContent = msg;
  notif.className = 'notif' + (isError ? ' error' : '');
  notif.classList.add('show');
  setTimeout(() => notif.classList.remove('show'), 3500);
}

// ─── FORM STATUS (ganti showNotif) ───────────────────────────────────────────
function showFormStatus(isSuccess, title, desc) {
  const el   = document.getElementById('formStatus');
  const icon = document.getElementById('formStatusIcon');
  const t    = document.getElementById('formStatusTitle');
  const d    = document.getElementById('formStatusDesc');

  el.className = 'form-status show ' + (isSuccess ? 'success' : 'error');
  icon.textContent = isSuccess ? '✓' : '✕';
  t.textContent = title;
  d.textContent = desc;

  if (isSuccess) {
    setTimeout(() => {
      el.classList.remove('show');
    }, 5000);
  }
}

// validasi kosong:
showFormStatus(false, 'Formulir tidak lengkap', 'Semua bidang harus diisi.');

// email tidak valid:
showFormStatus(false, 'Email tidak valid', 'Periksa kembali format email kamu.');

// sukses kirim:
showFormStatus(true, 'Pesan terkirim!', 'Terima kasih, akan segera dibalas.');

// gagal kirim:
showFormStatus(false, 'Gagal mengirim', 'Coba lagi beberapa saat ya.');
