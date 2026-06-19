// ─── EMAILJS INIT ─────────────────────────────────────────────────────────────
emailjs.init("5HShZdu-MRNAXFk1C");

// ─── PAGE LOADER ──────────────────────────────────────────────────────────────
window.addEventListener('load', () => {
  const loader     = document.getElementById('pageLoader');
  const loaderFill = document.getElementById('loaderFill');

  // Animasi bar loader
  setTimeout(() => { loaderFill.style.width = '100%'; }, 80);
  setTimeout(() => {
    loader.classList.add('done');
    document.body.style.overflow = '';
  }, 900);
});
// Sembunyikan scroll sementara loader aktif
document.body.style.overflow = 'hidden';

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let followerX = 0, followerY = 0;
let cursorX   = 0, cursorY   = 0;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  cursor.style.left = cursorX + 'px';
  cursor.style.top  = cursorY + 'px';
});

// Follower lebih lambat (pakai lerp)
function animateFollower() {
  followerX += (cursorX - followerX) * 0.12;
  followerY += (cursorY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Efek hover pada elemen interaktif
document.querySelectorAll('a, button, .skill-card, .project-card, .link-row').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovering');
    cursorFollower.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovering');
    cursorFollower.classList.remove('hovering');
  });
});

// ─── SCROLL PROGRESS + NAVBAR HIDE ───────────────────────────────────────────
const navbar    = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
let lastScrollY = window.scrollY;
let ticking     = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const cur = window.scrollY;

      // Progress bar CSS variable
      const scrolled = cur / (document.documentElement.scrollHeight - window.innerHeight);
      document.body.style.setProperty('--scroll-progress', (scrolled * 100) + '%');

      // Scrolled style
      navbar.classList.toggle('scrolled', cur > 80);

      // Hide saat scroll turun, muncul saat scroll naik
      if (cur > lastScrollY && cur > 300) {
        navbar.classList.add('hidden');
      } else {
        navbar.classList.remove('hidden');
      }
      lastScrollY = cur;

      // Back to top
      backToTop.classList.toggle('visible', cur > 500);

      ticking = false;
    });
    ticking = true;
  }
});

// ─── BACK TO TOP ──────────────────────────────────────────────────────────────
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── HAMBURGER & MOBILE MENU ──────────────────────────────────────────────────
const hamburger    = document.getElementById('hamburger');
const mobileMenu   = document.getElementById('mobileMenu');
const mobileClose  = document.getElementById('mobileClose');
const mobileOverlay = document.getElementById('mobileOverlay');

function openMenu() {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileOverlay.addEventListener('click', closeMenu);

// Tutup menu saat klik link mobile
document.querySelectorAll('.mob-link').forEach(a => {
  a.addEventListener('click', closeMenu);
});

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
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), Number(delay) + 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ─── GALLERY DATA ─────────────────────────────────────────────────────────────
// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  CARA GANTI LINK GALLERY:                                                   ║
// ║    label : judul yang tampil                                                 ║
// ║    url   : link Google Drive atau portfolio yang ingin dibuka               ║
// ╚══════════════════════════════════════════════════════════════════════════════╝
const galleryData = {
  poster: {
    title: 'Personal', titleSpan: 'Projects',
    subtitle: 'A collection of miscellaneous personal projects.',
    links: [
      // ▼ GANTI label DAN url DI BAWAH INI ▼
      { label: 'Miscellaneous Posters.', url: 'https://drive.google.com/drive/folders/1Gn2ht9FGMB4tqXKlBfF9dozRK_EBkBdV?usp=sharing' },
      { label: 'Spectrum of Concept.',   url: 'https://drive.google.com/drive/folders/1VFyRRXOwaGZy0yOofo_iHcZLhxO53LIY?usp=sharing' },
      { label: 'Cinematic Tributes.',    url: 'https://drive.google.com/drive/folders/1DvYIiCRMXgrVTsm5F0pUzxIfCoiIyF5B?usp=sharing' },
    ]
  },
  branding: {
    title: 'Diverse', titleSpan: 'Mediums',
    subtitle: 'A comparative exploration of design across various software.',
    links: [
      { label: 'Vector Art (Figma).', url: 'https://drive.google.com/drive/folders/1xdNXNZqdlAel0mIHdMh4EqJprwv-d7zW?usp=sharing' },
      { label: 'Sketches (Paper).',   url: 'https://drive.google.com/drive/folders/1utxVZLsFDaPuOUt5c3FaWXOX01S9sM49?usp=sharing' },
      { label: 'Ibis Paint.',         url: 'https://drive.google.com/drive/folders/1XsmaMu6VDAKemxv3hjZRSNtEFZHtaSzF?usp=sharing' },
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
      // Delay masuk per baris
      a.style.opacity   = '0';
      a.style.transform = 'translateY(12px)';
      a.style.transition = `opacity 0.4s ease ${i * 80}ms, transform 0.4s ease ${i * 80}ms`;
      a.innerHTML = `
        <span class="link-row-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="link-row-label">${item.label}</span>
        <span class="link-row-arrow">↗</span>
      `;
      galleryGrid.appendChild(a);
      // Trigger animasi setelah render
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          a.style.opacity   = '1';
          a.style.transform = 'translateY(0)';
        });
      });
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

// ─── FORM STATUS ──────────────────────────────────────────────────────────────
function showFormStatus(isSuccess, title, desc) {
  const el   = document.getElementById('formStatus');
  const icon = document.getElementById('formStatusIcon');
  const t    = document.getElementById('formStatusTitle');
  const d    = document.getElementById('formStatusDesc');

  if (!el) return;
  el.className = 'form-status show ' + (isSuccess ? 'success' : 'error');
  icon.textContent = isSuccess ? '✓' : '✕';
  t.textContent    = title;
  d.textContent    = desc;

  if (isSuccess) {
    setTimeout(() => el.classList.remove('show'), 6000);
  }
}

// ─── SUBMIT FORM ──────────────────────────────────────────────────────────────
function handleSubmit() {
  const name    = document.getElementById('fromName').value.trim();
  const email   = document.getElementById('fromEmail').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const btn     = document.getElementById('submitBtn');

  // Validasi kosong
  if (!name || !email || !message) {
    showFormStatus(false, 'Form tidak lengkap', 'Nama, email, dan pesan wajib diisi.');
    return;
  }
  // Validasi email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFormStatus(false, 'Email tidak valid', 'Periksa kembali format email kamu.');
    return;
  }

  // Loading state
  btn.classList.add('loading');

  emailjs.send('service_neysa', 'template_neysa', {
    from_name:    name,
    from_email:   email,
    subject:      subject || '(no subject)',
    message:      message,
  }).then(() => {
    btn.classList.remove('loading');
    btn.classList.add('success');
    document.getElementById('btnText').textContent = 'Sent! ✓';
    showFormStatus(true, 'Pesan terkirim!', 'Terima kasih, Neysa akan segera membalas.');
    // Reset form
    document.getElementById('fromName').value  = '';
    document.getElementById('fromEmail').value = '';
    document.getElementById('subject').value   = '';
    document.getElementById('message').value   = '';
    setTimeout(() => {
      btn.classList.remove('success');
      document.getElementById('btnText').textContent = 'Send Message';
    }, 5000);
  }).catch(() => {
    btn.classList.remove('loading');
    showFormStatus(false, 'Gagal mengirim', 'Coba beberapa saat lagi ya.');
  });
}

// ─── SMOOTH NAV SCROLL ────────────────────────────────────────────────────────
// Menangani klik link navbar agar offset diperhitungkan
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // tinggi navbar
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── TICKER PAUSE ON VISIBILITY ───────────────────────────────────────────────
// Sudah ditangani via CSS hover, tidak perlu JS tambahan.
