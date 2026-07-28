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
  <a href="#services">Services</a>
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
// ===== EMAILJS INIT =====
emailjs.init('j09AaEuD5lVlvOygR');

// ===== FORMULAIRE CONTACT =====
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

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

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Envoi en cours...';
    btn.disabled = true;
    formNote.textContent = '';

    const templateParams = {
      name: name,
      email: email,
      message: message,
      time: new Date().toLocaleString('fr-FR')
    };

    // Envoie le message à toi (Contact Us)
    emailjs.send('service_mtdlkv4', 'template_cneugtj', templateParams)
      .then(() => {
        // Envoie l'auto-reply au visiteur
        return emailjs.send('service_mtdlkv4', 'template_jdaa9m4', templateParams);
      })
      .then(() => {
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
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        btn.textContent = originalText;
        btn.disabled = false;
        formNote.style.color = '#ff6b6b';
        formNote.textContent = 'Erreur lors de l\'envoi. Réessayez ou contactez-moi directement.';
      });
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
  { threshold: 0, rootMargin: '-30% 0px -60% 0px' }
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

// ===== LANGUAGE SWITCH =====
const translations = {
  fr: {
    // NAV
    nav_about: 'À propos',
    nav_skills: 'Compétences',
    nav_experience: 'Expérience',
    nav_projects: 'Projets',
    nav_services: 'Services',
    nav_contact: 'Me contacter',

    // HERO
    hero_tag: 'Développeur Full-Stack · Madagascar 🇲🇬',
    hero_sub: 'Je construis des applications web <em>robustes</em> et des agents IA —<br/>du front soigné au back bien pensé.',
    hero_btn1: 'Voir mes projets',
    hero_btn2: 'Travaillons ensemble →',

    // ABOUT
    about_label: '01 — À propos',
    about_title: 'Passionné de code,<br/><em>guidé par la rigueur</em>',
    about_p1: 'Développeur junior basé à Antananarivo, je suis actuellement <strong>Responsable Technologique</strong> dans une startup en pleine transition vers l\'IA, où j\'encadre deux développeurs stagiaires.',
    about_p2: 'Mon parcours couvre le développement full-stack (React + Laravel), l\'intégration de paiement (Stripe), et le développement d\'agents IA en Python. Je construis chaque projet avec une volonté de comprendre avant de coder — pas seulement faire fonctionner, mais <strong>bien faire</strong>.',
    about_p3: 'En dehors du code : bassiste autodidacte et membre actif de mon église, où je suis le bassiste principal. La discipline musicale et technique se rejoignent.',
    stat1: 'ans d\'expérience',
    stat2: 'projets livrés',

    // SKILLS
    skills_label: '02 — Compétences',
    skills_title: 'Ce que je maîtrise',

    // EXPERIENCE
    exp_label: '03 — Parcours',
    exp_title: 'Expérience & Formation',

    // PROJECTS
    proj_label: '04 — Projets',
    proj_title: 'Ce que j\'ai construit',
    proj_link: 'Voir le projet →',

    // SERVICES
    serv_label: '05 — Services',
    serv_title: 'Ce que je propose',
    serv1_title: 'Site vitrine & Landing page',
    serv1_desc: 'Un site rapide, responsive et soigné pour présenter votre activité, attirer des clients et laisser une première impression mémorable.',
    serv1_f1: 'Design sur mesure', serv1_f2: '100% responsive', serv1_f3: 'Optimisé SEO', serv1_f4: 'Déployé et livré clé en main',
    serv2_title: 'Application web sur mesure',
    serv2_desc: 'Dashboard, gestion interne, système CRUD complet avec authentification. Je transforme vos processus métier en outils digitaux efficaces.',
    serv2_f1: 'React + Laravel', serv2_f2: 'Authentification & rôles', serv2_f3: 'Base de données structurée', serv2_f4: 'Interface intuitive',
    serv3_title: 'Intégration & Assistant IA',
    serv3_desc: 'J\'intègre un assistant IA dans votre application — chatbot métier, automatisation de tâches, connexion à vos données et APIs tierces.',
    serv3_f1: 'Chatbot sur mesure', serv3_f2: 'Intégration Stripe & APIs', serv3_f3: 'Agent IA avec vos données', serv3_f4: 'Stack Python + Flask + Groq',
    serv_cta: 'Démarrer un projet →',
    serv_note: '💬 Chaque projet est discuté ensemble — délais, budget et périmètre adaptés à vos besoins. <a href="#contact">Parlons-en →</a>',

    // CONTACT
    contact_label: '06 — Contact',
    contact_title: 'Travaillons ensemble',
    contact_sub: 'Disponible pour des missions freelance et collaborations remote.<br/>Réponse garantie sous 24h.',
    contact_form_name: 'Nom',
    contact_form_email: 'Email',
    contact_form_msg: 'Message',
    contact_form_ph_name: 'Votre nom',
    contact_form_ph_email: 'votre@email.com',
    contact_form_ph_msg: 'Décrivez votre projet...',
    contact_form_btn: 'Travaillons ensemble →',

    // FOOTER
    footer_copy: '© 2026 — Ando Rajohna — Antananarivo',
  },

  en: {
    // NAV
    nav_about: 'About',
    nav_skills: 'Skills',
    nav_experience: 'Experience',
    nav_projects: 'Projects',
    nav_services: 'Services',
    nav_contact: 'Contact me',

    // HERO
    hero_tag: 'Full-Stack Developer · Madagascar 🇲🇬',
    hero_sub: 'I build <em>robust</em> web applications and AI agents —<br/>clean frontend, solid backend.',
    hero_btn1: 'View my projects',
    hero_btn2: 'Let\'s work together →',

    // ABOUT
    about_label: '01 — About',
    about_title: 'Passionate about code,<br/><em>driven by quality</em>',
    about_p1: 'Junior developer based in Antananarivo, I currently serve as <strong>Tech Lead</strong> at an early-stage startup pivoting toward AI, where I manage two intern developers.',
    about_p2: 'My experience covers full-stack development (React + Laravel), payment integration (Stripe), and AI agent development in Python. I build every project with a drive to understand before coding — not just make it work, but <strong>make it right</strong>.',
    about_p3: 'Outside of code: self-taught bassist and active member of my church, where I play as the lead bassist. Musical and technical discipline go hand in hand.',
    stat1: 'years of experience',
    stat2: 'projects delivered',

    // SKILLS
    skills_label: '02 — Skills',
    skills_title: 'What I master',

    // EXPERIENCE
    exp_label: '03 — Journey',
    exp_title: 'Experience & Education',

    // PROJECTS
    proj_label: '04 — Projects',
    proj_title: 'What I\'ve built',
    proj_link: 'View project →',

    // SERVICES
    serv_label: '05 — Services',
    serv_title: 'What I offer',
    serv1_title: 'Landing page & Showcase website',
    serv1_desc: 'A fast, responsive, and polished website to present your business, attract clients, and make a memorable first impression.',
    serv1_f1: 'Custom design', serv1_f2: '100% responsive', serv1_f3: 'SEO optimized', serv1_f4: 'Deployed and delivered turnkey',
    serv2_title: 'Custom web application',
    serv2_desc: 'Dashboard, internal management, full CRUD system with authentication. I turn your business processes into efficient digital tools.',
    serv2_f1: 'React + Laravel', serv2_f2: 'Authentication & roles', serv2_f3: 'Structured database', serv2_f4: 'Intuitive interface',
    serv3_title: 'Integration & AI Assistant',
    serv3_desc: 'I integrate an AI assistant into your application — business chatbot, task automation, connection to your data and third-party APIs.',
    serv3_f1: 'Custom chatbot', serv3_f2: 'Stripe & API integration', serv3_f3: 'AI agent with your data', serv3_f4: 'Python + Flask + Groq stack',
    serv_cta: 'Start a project →',
    serv_note: '💬 Every project is discussed together — deadlines, budget and scope adapted to your needs. <a href="#contact">Let\'s talk →</a>',

    // CONTACT
    contact_label: '06 — Contact',
    contact_title: 'Let\'s work together',
    contact_sub: 'Available for freelance missions and remote collaborations.<br/>Reply guaranteed within 24h.',
    contact_form_name: 'Name',
    contact_form_email: 'Email',
    contact_form_msg: 'Message',
    contact_form_ph_name: 'Your name',
    contact_form_ph_email: 'your@email.com',
    contact_form_ph_msg: 'Describe your project...',
    contact_form_btn: 'Let\'s work together →',

    // FOOTER
    footer_copy: '© 2026 — Ando Rajohna — Antananarivo',
  }
};

function applyLang(lang) {
  const t = translations[lang];

  // NAV
  document.querySelector('a[href="#about"]').textContent = t.nav_about;
  document.querySelector('a[href="#skills"]').textContent = t.nav_skills;
  document.querySelector('a[href="#experience"]').textContent = t.nav_experience;
  document.querySelector('a[href="#projects"]').textContent = t.nav_projects;
  document.querySelector('a[href="#services"]').textContent = t.nav_services;
  document.querySelector('a[href="#contact"].nav-cta').textContent = t.nav_contact;

  // HERO
  document.querySelector('.hero-tag').textContent = t.hero_tag;
  document.querySelector('.hero-sub').innerHTML = t.hero_sub;
  const heroBtns = document.querySelectorAll('.hero-actions a');
  heroBtns[0].textContent = t.hero_btn1;
  heroBtns[1].textContent = t.hero_btn2;

  // ABOUT
  document.querySelector('#about .section-label').textContent = t.about_label;
  document.querySelector('#about .section-title').innerHTML = t.about_title;
  const aboutTexts = document.querySelectorAll('.about-text');
  aboutTexts[0].innerHTML = t.about_p1;
  aboutTexts[1].innerHTML = t.about_p2;
  aboutTexts[2].innerHTML = t.about_p3;
  const statLabels = document.querySelectorAll('.stat-label');
  statLabels[0].textContent = t.stat1;
  statLabels[1].textContent = t.stat2;

  // SKILLS
  document.querySelector('#skills .section-label').textContent = t.skills_label;
  document.querySelector('#skills .section-title').textContent = t.skills_title;

  // EXPERIENCE
  document.querySelector('#experience .section-label').textContent = t.exp_label;
  document.querySelector('#experience .section-title').textContent = t.exp_title;

  // PROJECTS
  document.querySelector('#projects .section-label').textContent = t.proj_label;
  document.querySelector('#projects .section-title').textContent = t.proj_title;
  document.querySelectorAll('.btn-project').forEach(btn => {
    btn.textContent = t.proj_link;
  });

  // SERVICES
  document.querySelector('#services .section-label').textContent = t.serv_label;
  document.querySelector('#services .section-title').textContent = t.serv_title;
  const cards = document.querySelectorAll('.service-card');
  const servData = [
    { title: t.serv1_title, desc: t.serv1_desc, f: [t.serv1_f1, t.serv1_f2, t.serv1_f3, t.serv1_f4] },
    { title: t.serv2_title, desc: t.serv2_desc, f: [t.serv2_f1, t.serv2_f2, t.serv2_f3, t.serv2_f4] },
    { title: t.serv3_title, desc: t.serv3_desc, f: [t.serv3_f1, t.serv3_f2, t.serv3_f3, t.serv3_f4] },
  ];
  cards.forEach((card, i) => {
    card.querySelector('h3').textContent = servData[i].title;
    card.querySelector('p').textContent = servData[i].desc;
    const lis = card.querySelectorAll('.service-features li');
    lis.forEach((li, j) => li.textContent = servData[i].f[j]);
    card.querySelector('.service-cta').textContent = t.serv_cta;
  });
  document.querySelector('.services-note p').innerHTML = t.serv_note;

  // CONTACT
  document.querySelector('#contact .section-label').textContent = t.contact_label;
  document.querySelector('#contact .section-title').textContent = t.contact_title;
  document.querySelector('.contact-sub').innerHTML = t.contact_sub;
  document.querySelector('label[for="name"]').textContent = t.contact_form_name;
  document.querySelector('label[for="email"]').textContent = t.contact_form_email;
  document.querySelector('label[for="message"]').textContent = t.contact_form_msg;
  document.querySelector('#name').placeholder = t.contact_form_ph_name;
  document.querySelector('#email').placeholder = t.contact_form_ph_email;
  document.querySelector('#message').placeholder = t.contact_form_ph_msg;
  document.querySelector('#contactForm button[type="submit"]').textContent = t.contact_form_btn;

  // FOOTER
  document.querySelector('.footer-copy').textContent = t.footer_copy;

  // HTML lang attribute
  document.documentElement.lang = lang;

  // Persist
  localStorage.setItem('lang', lang);
}

// Boutons switch
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyLang(lang);
  });
});

// Charger la langue sauvegardée
const savedLang = localStorage.getItem('lang') || 'fr';
if (savedLang === 'en') {
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === 'en');
  });
  applyLang('en');
}