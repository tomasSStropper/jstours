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
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
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

// Booking form
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;
    const requiredFields = bookingForm.querySelectorAll('[required]');

    requiredFields.forEach(field => field.classList.remove('error'));

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('error');
        isValid = false;
      }
    });

    const emailField = bookingForm.querySelector('#email');
    if (emailField && emailField.value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailField.value)) {
        emailField.classList.add('error');
        isValid = false;
      }
    }

    if (isValid) {
      const name = bookingForm.querySelector('#name').value;
      const email = bookingForm.querySelector('#email').value;
      const phone = bookingForm.querySelector('#phone').value;
      const tour = bookingForm.querySelector('#tour');
      const tourText = tour.options[tour.selectedIndex].text;
      const date = bookingForm.querySelector('#date').value;
      const people = bookingForm.querySelector('#people').value;
      const message = bookingForm.querySelector('#message').value;

      let whatsappMsg = 'Hello Juan Carlos! I would like to book a tour.\n\n';
      whatsappMsg += 'Name: ' + name + '\n';
      whatsappMsg += 'Email: ' + email + '\n';
      if (phone) whatsappMsg += 'Phone: ' + phone + '\n';
      whatsappMsg += 'Tour: ' + tourText + '\n';
      whatsappMsg += 'Date: ' + date + '\n';
      whatsappMsg += 'People: ' + people + '\n';
      if (message) whatsappMsg += 'Message: ' + message + '\n';

      const whatsappURL = 'https://wa.me/50663914901?text=' + encodeURIComponent(whatsappMsg);
      window.open(whatsappURL, '_blank');
      bookingForm.reset();
    } else {
      const firstError = bookingForm.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
    }
  });

  bookingForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
}

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
