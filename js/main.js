/* ============================================
   Juan Carlos Calvo Esquivel — Monteverde Guide
   Main JavaScript
   Developed by TyT Software & Solutions
   ============================================ */

(function () {
  'use strict';

  // --- Custom Cursor ---
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursorDot && cursorRing) {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    var hoverTargets = document.querySelectorAll('a, button, input, textarea, select, .gallery-item');
    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', function () {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // --- Navbar Scroll ---
  var navbar = document.querySelector('.navbar');

  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // --- Mobile Hamburger ---
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Scroll Reveal (IntersectionObserver) ---
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- Language Toggle ---
  var langEN = document.getElementById('langEN');
  var langES = document.getElementById('langES');
  var currentLang = localStorage.getItem('lang') || 'en';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // Update toggle buttons
    if (langEN && langES) {
      langEN.classList.toggle('active', lang === 'en');
      langES.classList.toggle('active', lang === 'es');
    }

    // Swap text content
    var elements = document.querySelectorAll('[data-en]');
    elements.forEach(function (el) {
      var text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
      if (text) {
        el.innerHTML = text;
      }
    });

    // Swap placeholders
    var placeholderEls = document.querySelectorAll('[data-en-placeholder]');
    placeholderEls.forEach(function (el) {
      var placeholder = lang === 'en'
        ? el.getAttribute('data-en-placeholder')
        : el.getAttribute('data-es-placeholder');
      if (placeholder) {
        el.setAttribute('placeholder', placeholder);
      }
    });

    // Update html lang attribute
    document.documentElement.lang = lang === 'en' ? 'en' : 'es';
  }

  // Initialize language
  setLanguage(currentLang);

  // Bind toggle buttons
  if (langEN) {
    langEN.addEventListener('click', function () {
      setLanguage('en');
    });
  }

  if (langES) {
    langES.addEventListener('click', function () {
      setLanguage('es');
    });
  }

  // --- Booking Form Validation ---
  var bookingForm = document.getElementById('bookingForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var isValid = true;
      var requiredFields = bookingForm.querySelectorAll('[required]');

      // Clear previous errors
      requiredFields.forEach(function (field) {
        field.classList.remove('error');
      });

      // Validate required fields
      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add('error');
          isValid = false;
        }
      });

      // Email validation
      var emailField = bookingForm.querySelector('#email');
      if (emailField && emailField.value) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          emailField.classList.add('error');
          isValid = false;
        }
      }

      if (isValid) {
        // Build WhatsApp message from form data
        var name = bookingForm.querySelector('#name').value;
        var email = bookingForm.querySelector('#email').value;
        var phone = bookingForm.querySelector('#phone').value;
        var tour = bookingForm.querySelector('#tour');
        var tourText = tour.options[tour.selectedIndex].text;
        var date = bookingForm.querySelector('#date').value;
        var people = bookingForm.querySelector('#people').value;
        var message = bookingForm.querySelector('#message').value;

        var whatsappMsg = 'Hello Juan Carlos! I would like to book a tour.\n\n';
        whatsappMsg += 'Name: ' + name + '\n';
        whatsappMsg += 'Email: ' + email + '\n';
        if (phone) whatsappMsg += 'Phone: ' + phone + '\n';
        whatsappMsg += 'Tour: ' + tourText + '\n';
        whatsappMsg += 'Date: ' + date + '\n';
        whatsappMsg += 'People: ' + people + '\n';
        if (message) whatsappMsg += 'Message: ' + message + '\n';

        var whatsappURL = 'https://wa.me/50688887777?text=' + encodeURIComponent(whatsappMsg);
        window.open(whatsappURL, '_blank');

        bookingForm.reset();
      } else {
        // Scroll to first error
        var firstError = bookingForm.querySelector('.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
      }
    });

    // Remove error class on input
    bookingForm.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('error');
      });
    });
  }

})();
