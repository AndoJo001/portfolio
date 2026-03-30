/* ====================================
   PORTFOLIO — ANDO RAJOHNA
   script.js — Interactions & Animations
   ==================================== */

// ===== CUSTOM CURSOR =====
document.addEventListener('mousemove', (e) => {
  document.body.style.setProperty('--cx', e.clientX + 'px');
  document.body.style.setProperty('--cy', e.clientY + 'px');
});

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===== SMOOTH NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Ferme le menu mobile si ouvert
      mobileMenu.classList.remove('open');
    }
  });
});

// ===== MENU MOBILE =====
const burger = document.getElementById('burger');

// Créer le menu mobile dynamiquement
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu';
mobileMenu.innerHTML = `
  <a href="#about">À propos</a>
  <a href="#skills">Compétences</a>
  <a href="#experience">Expérience</a>
  <a href="#projects">Projets</a>
  <a href="#contact">Me contacter</a>
`;
document.body.appendChild(mobileMenu);

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  // Animate burger
  burger.classList.toggle('active');
});

// Burger animation CSS via JS
const style = document.createElement('style');
style.textContent = `
  .burger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .burger.active span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .burger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
`;
document.head.appendChild(style);

// ===== INTERSECTION OBSERVER — REVEAL =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // On arrête d'observer une fois révélé
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  }
);

// Observer tous les éléments .reveal
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ===== FORMULAIRE CONTACT =====
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation basique
    if (!name || !email || !message) {
      formNote.style.color = '#ff6b6b';
      formNote.textContent = 'Veuillez remplir tous les champs.';
      return;
    }

    if (!isValidEmail(email)) {
      formNote.style.color = '#ff6b6b';
      formNote.textContent = 'Adresse email invalide.';
      return;
    }

    // Simulation d'envoi (remplacer par vrai backend si besoin)
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Envoi en cours...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✓ Message envoyé !';
      btn.style.background = '#22c55e';
      formNote.style.color = 'var(--accent)';
      formNote.textContent = 'Merci ! Je vous répondrai dans les 24h.';
      contactForm.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        formNote.textContent = '';
      }, 4000);
    }, 1200);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== ACTIVE NAV LINK (scroll spy) =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--white)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => spyObserver.observe(section));

// ===== TITRE HERO — ANIMATION LETTRE PAR LETTRE =====
// Appliquée au chargement de la page
window.addEventListener('load', () => {
  // Délai progressif pour les éléments hero
  const heroEls = document.querySelectorAll('.hero .reveal');
  heroEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 150);
  });
});

// ===== PARALLAX LÉGER SUR LE TEXTE BG HERO =====
const heroBgText = document.querySelector('.hero-bg-text');

window.addEventListener('scroll', () => {
  if (heroBgText) {
    const scrollY = window.scrollY;
    heroBgText.style.transform = `translateY(calc(-50% + ${scrollY * 0.15}px))`;
  }
});

// ===== HOVER SUR LES CARDS — EFFET LUMIÈRE =====
document.querySelectorAll('.skill-card, .project-card, .contact-item').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

// ===== CONSOLE EGG POUR LES RECRUTEURS =====
console.log(`
%c⚡ ANDO RAJOHNA — Portfolio
%cDéveloppeur Full-Stack · Madagascar

%cVous regardez le code source ? Voilà qui est prometteur.
Contactez-moi : tahirisoaandoo@gmail.com
`,
  'font-size:20px; font-weight:bold; color:#f0a500;',
  'font-size:13px; color:#7a7a9a;',
  'font-size:12px; color:#4a4a6a;'
);