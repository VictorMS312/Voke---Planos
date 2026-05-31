/* ═══════════════════════════════════════════
   VOKE AGENCY — main.js
═══════════════════════════════════════════ */

// ── NAV SCROLL STATE ──────────────────────
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


// ── MOBILE MENU ───────────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose  = document.getElementById('menuClose');

burger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});

function closeMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

menuClose.addEventListener('click', closeMenu);

document.querySelectorAll('.mobile-menu__link').forEach(link => {
  link.addEventListener('click', closeMenu);
});


// ── SCROLL REVEAL ─────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});


// ── COUNTER ANIMATION ─────────────────────
function animateCounter(el, target, suffix) {
  const duration = 1400;
  let startTime = null;

  function ease(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(ease(progress) * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// Observe stats section for counter trigger
const statsSection = document.querySelector('.stats');
let counterFired = false;

if (statsSection) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counterFired) {
        counterFired = true;

        // Find element with data-target
        const targetEls = statsSection.querySelectorAll('[data-target]');
        targetEls.forEach(el => {
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix);
        });

        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counterObserver.observe(statsSection);
}


// ── SMOOTH ANCHOR SCROLL ──────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // nav height
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ── PLAN CARD GLOW ON HOVER ───────────────
document.querySelectorAll('.plano-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });

  card.addEventListener('mouseleave', () => {
    card.style.removeProperty('--mx');
    card.style.removeProperty('--my');
  });
});


// ── CONTACT PILL WHATSAPP DEEP LINK ───────
// Ensures WA link opens natively on mobile
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
  link.addEventListener('click', (e) => {
    // Allow default — just add rel for security
    link.rel = 'noopener noreferrer';
  });
});
