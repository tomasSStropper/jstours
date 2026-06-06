/* ============================================
   JC Tours — Monteverde Cloud Forest Guide
   Main JavaScript
   Developed by TyT Software & Solutions
   ============================================ */

// Scroll reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'),
        parseInt(entry.target.dataset.delay) || 0);
    }
  });
}, { threshold: 0.12 });
revealElements.forEach(el => revealObserver.observe(el));

// Animated stat counters
function animateCount(el) {
  const target = parseInt(el.dataset.target);
  if (!target) return;
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
  }, 16);
}
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => statObserver.observe(el));

// Language toggle
let currentLang = localStorage.getItem('lang') || 'en';
function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = lang === 'en' ? el.dataset.en : el.dataset.es;
    if (text) el.innerHTML = text;
  });

  // Swap placeholders
  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    const placeholder = lang === 'en' ? el.getAttribute('data-en-placeholder') : el.getAttribute('data-es-placeholder');
    if (placeholder) el.setAttribute('placeholder', placeholder);
  });

  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'en' ? 'ES' : 'EN';

  document.documentElement.lang = lang === 'en' ? 'en' : 'es';

  // Let JS-rendered content (spotlight, carousel, per-tour fauna) re-localize.
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}
const langToggle = document.getElementById('langToggle');
if (langToggle) langToggle.addEventListener('click', () => {
  applyLang(currentLang === 'en' ? 'es' : 'en');
});
applyLang(currentLang);

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  const setMenu = (open) => {
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  hamburger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });
}

// Navbar scroll (for guide/places pages)
const navbar = document.querySelector('.navbar');
if (navbar) {
  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

// Booking form -> WhatsApp
document.getElementById('booking-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name    = document.getElementById('f-name')?.value.trim() || '';
  const email   = document.getElementById('f-email')?.value.trim() || '';
  const phone   = document.getElementById('f-phone')?.value.trim() || '';
  const tourSel = document.getElementById('f-tour');
  const tour    = tourSel ? (tourSel.options[tourSel.selectedIndex]?.text || tourSel.value || '') : '';
  const date    = document.getElementById('f-date')?.value || '';
  const people  = document.getElementById('f-people')?.value || '';
  const message = document.getElementById('f-message')?.value.trim() || '';
  if (!name || !email || !tour) {
    alert('Please fill in your name, email, and tour type.');
    return;
  }
  const text =
    `🌿 *NEW RESERVATION — JC Tours*\n\n` +
    `👤 *Name:* ${name}\n` +
    `📧 *Email:* ${email}\n` +
    `📞 *Phone:* ${phone || 'Not provided'}\n` +
    `🗺 *Tour:* ${tour}\n` +
    `📅 *Date:* ${date || 'Flexible'}\n` +
    `👥 *People:* ${people}\n` +
    `💬 *Message:* ${message || '—'}\n\n` +
    `_Sent from jctours.vercel.app_`;
  window.open(`https://wa.me/50663914901?text=${encodeURIComponent(text)}`, '_blank');
});

// Scroll reveal (new sections)
const revealTargets = document.querySelectorAll(
  '.faq-item, .guide-photos, .section-header'
);
const newRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('revealed'), i * 80);
      newRevealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(el => newRevealObserver.observe(el));

// Hero Fauna Spotlight — data-driven crossfade rotation (reads js/fauna.js)
function initSpotlight() {
  const root = document.getElementById('faunaSpotlight');
  if (!root || typeof FaunaData === 'undefined') return;
  const items = FaunaData.featured();
  if (!items.length) return;

  const media    = root.querySelector('.spotlight-media');
  const commonEl = root.querySelector('.spotlight-common');
  const sciEl    = root.querySelector('.spotlight-sci');
  const counter  = root.querySelector('.spotlight-counter');

  media.innerHTML = items.map((f, i) =>
    `<img class="spotlight-img${i === 0 ? ' is-active' : ''}" src="${f.img}" alt="${f.comunEn}" ` +
    `loading="${i === 0 ? 'eager' : 'lazy'}" onerror="this.classList.add('img-missing')">`
  ).join('');
  const imgs = Array.from(media.querySelectorAll('.spotlight-img'));

  let idx = 0;
  function render() {
    imgs.forEach((im, i) => im.classList.toggle('is-active', i === idx));
    const f = items[idx];
    commonEl.innerHTML = FaunaData.name(f, currentLang);
    sciEl.innerHTML = f.cientifico;
    counter.textContent =
      String(idx + 1).padStart(2, '0') + ' / ' + String(items.length).padStart(2, '0');
  }
  render();

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer = null;
  function start() {
    if (reduce || items.length < 2) return;
    stop();
    timer = setInterval(() => { idx = (idx + 1) % items.length; render(); }, 3500);
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  start();

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  document.addEventListener('langchange', render);
}
initSpotlight();

// Wildlife carousel — continuous marquee, pause on hover, draggable (reads js/fauna.js)
function initFaunaCarousel() {
  const root = document.getElementById('faunaCarousel');
  if (!root || typeof FaunaData === 'undefined') return;
  const viewport = root.querySelector('.fauna-viewport');
  const track = root.querySelector('.fauna-track');
  const items = FaunaData.all();
  if (!viewport || !track || !items.length) return;

  const cardHTML = (f) =>
    `<article class="fauna-card">` +
      `<img src="${f.img}" alt="${f.comunEn}" loading="lazy" onerror="this.classList.add('img-missing')">` +
      `<div class="fauna-card-info">` +
        `<span class="fauna-name" data-en="${f.comunEn}" data-es="${f.comunEs}">${FaunaData.name(f, currentLang)}</span>` +
        `<span class="fauna-sci">${f.cientifico}</span>` +
      `</div>` +
    `</article>`;

  // Duplicate the list so the marquee can loop seamlessly.
  track.innerHTML = items.map(cardHTML).join('') + items.map(cardHTML).join('');

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const half = () => track.scrollWidth / 2;
  let paused = false, dragging = false, startX = 0, startScroll = 0;
  const speed = 0.5;

  function step() {
    if (!paused && !dragging) {
      viewport.scrollLeft += speed;
      if (viewport.scrollLeft >= half()) viewport.scrollLeft -= half();
    }
    requestAnimationFrame(step);
  }
  if (!reduce) requestAnimationFrame(step);

  root.addEventListener('mouseenter', () => { paused = true; });
  root.addEventListener('mouseleave', () => { paused = false; });

  // Pointer drag
  viewport.addEventListener('pointerdown', (e) => {
    dragging = true;
    startX = e.clientX;
    startScroll = viewport.scrollLeft;
    viewport.classList.add('dragging');
    viewport.setPointerCapture(e.pointerId);
  });
  viewport.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    viewport.scrollLeft = startScroll - (e.clientX - startX);
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    viewport.classList.remove('dragging');
    // keep within the loop window
    if (viewport.scrollLeft <= 0) viewport.scrollLeft += half();
    else if (viewport.scrollLeft >= half()) viewport.scrollLeft -= half();
  }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);

  // Arrows
  const cardWidth = () => {
    const c = track.querySelector('.fauna-card');
    return c ? c.offsetWidth + 16 : 280;
  };
  root.querySelector('.fauna-arrow--prev')?.addEventListener('click',
    () => viewport.scrollBy({ left: -cardWidth(), behavior: 'smooth' }));
  root.querySelector('.fauna-arrow--next')?.addEventListener('click',
    () => viewport.scrollBy({ left: cardWidth(), behavior: 'smooth' }));

  // Localize icon-button labels (names are handled by applyLang via data-en/es).
  function applyArrowLabels() {
    root.querySelectorAll('.fauna-arrow').forEach((btn) => {
      const label = currentLang === 'es' ? btn.dataset.labelEs : btn.dataset.labelEn;
      if (label) btn.setAttribute('aria-label', label);
    });
  }
  applyArrowLabels();
  document.addEventListener('langchange', applyArrowLabels);
}
initFaunaCarousel();

// Per-tour fauna sentence on tours.html (reads js/fauna.js)
function initTourFauna() {
  if (typeof FaunaData === 'undefined') return;
  const blocks = document.querySelectorAll('.exp-fauna[data-tour]');
  if (!blocks.length) return;

  function joinNames(names, lang) {
    if (names.length <= 1) return names.join('');
    const last = names[names.length - 1];
    return names.slice(0, -1).join(', ') + (lang === 'es' ? ' y ' : ' and ') + last;
  }

  blocks.forEach((block) => {
    const species = FaunaData.forTour(block.dataset.tour).slice(0, 5);
    const target = block.querySelector('.exp-fauna-list');
    if (!target || !species.length) { block.style.display = 'none'; return; }
    const en = 'On this walk you can spot, among others: ' +
      joinNames(species.map((f) => f.comunEn), 'en') + '.';
    const es = 'En este recorrido pod&eacute;s observar, entre otras especies: ' +
      joinNames(species.map((f) => f.comunEs), 'es') + '.';
    target.setAttribute('data-en', en);
    target.setAttribute('data-es', es);
    target.innerHTML = currentLang === 'es' ? es : en;
  });
}
initTourFauna();

// Custom cursor (desktop only)
if (window.innerWidth > 768) {
  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
  });
  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx - 18}px,${ry - 18}px)`;
    requestAnimationFrame(animateRing);
  })();
  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('expand'));
    el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
  });
}
