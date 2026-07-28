/* ==========================================================================
   0. CONFIGURATION RAPIDE
   ========================================================================== */
// Texte du badge de disponibilité affiché sous les boutons du Hero.
// Modifiable facilement ici, dans les deux langues.
const AVAILABILITY_STATUS = {
  fr: "Disponible pour un poste ou un stage",
  en: "Available for a job or an internship",
};

/* ==========================================================================
   1. MENU HAMBURGER (mobile)
   ========================================================================== */
const menuToggle = document.getElementById("menuToggle");
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuIcon.classList.remove("fa-xmark");
  menuIcon.classList.add("fa-bars");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuIcon.classList.toggle("fa-bars", !isOpen);
  menuIcon.classList.toggle("fa-xmark", isOpen);
});

// Ferme le menu quand un lien est cliqué (mobile)
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/* ==========================================================================
   2. HEADER : ombre au scroll + lien actif selon la section visible
   ========================================================================== */
const header = document.getElementById("header");
const sections = document.querySelectorAll("section[id]");
const navLinkEls = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");

function onScroll() {
  header.classList.toggle("scrolled", window.scrollY > 20);
  backToTop.classList.toggle("show", window.scrollY > 400);

  let currentSectionId = "";
  const scrollPos = window.scrollY + window.innerHeight * 0.3;

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      currentSectionId = section.id;
    }
  });

  navLinkEls.forEach((link) => {
    link.classList.toggle(
      "active-link",
      link.getAttribute("href") === `#${currentSectionId}`
    );
  });
}

window.addEventListener("scroll", onScroll);
onScroll();

/* ==========================================================================
   3. BOUTON RETOUR EN HAUT
   ========================================================================== */
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ==========================================================================
   4. EFFET "TYPED TEXT" SUR LES RÔLES DU HERO
   ========================================================================== */
const roles = [
  "Étudiant en Génie Logiciel",
  "Développeur Backend",
  "Développeur Mobile Flutter",
];

const typedTextEl = document.getElementById("typedText");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedTextEl.textContent = currentRole.substring(0, charIndex);

  let speed = isDeleting ? 40 : 90;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

/* ==========================================================================
   5. ANIMATIONS "REVEAL ON SCROLL"
   ========================================================================== */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ==========================================================================
   6. THÈME SOMBRE / CLAIR (mémoire de session uniquement, pas de localStorage)
   ========================================================================== */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
let isDarkMode = false;

themeToggle.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode", isDarkMode);
  themeIcon.classList.toggle("fa-moon", !isDarkMode);
  themeIcon.classList.toggle("fa-sun", isDarkMode);
  themeToggle.setAttribute(
    "aria-label",
    isDarkMode ? "Activer le thème clair" : "Activer le thème sombre"
  );
});

/* ==========================================================================
   7. TRADUCTION FR / EN
   ========================================================================== */
const translations = {
  fr: {
    navHome: "Accueil",
    navAbout: "À propos",
    navExperience: "Expérience",
    navSkills: "Compétences",
    navProjects: "Projets",
    navContact: "Contact",

    heroGreeting: "Bonjour, je suis",
    heroDesc:
      "Étudiant en Master Systèmes d'Information et Génie Logiciel à l'Institut Universitaire de la Côte, passionné par le développement backend, le développement mobile Flutter et l'architecture logicielle orientée services.",
    heroCtaCv: "Télécharger mon CV",
    heroCtaContact: "Me contacter",

    aboutSubtitle: "Faisons connaissance",
    aboutTitle: 'À propos de <span class="text-gradient">moi</span>',
    aboutP1:
      "Je m'appelle <strong>Kengne Ouafo Cabrel</strong>, titulaire d'un Master Professionnel en Systèmes d'Information et Génie Logiciel (SIGL) de l'<strong>Institut Universitaire de la Côte</strong>. Au fil de mon parcours, j'ai développé une solide culture technique allant des fondamentaux de la programmation jusqu'à la conception d'architectures backend orientées services.",
    aboutP2:
      "Curieux et rigoureux, j'aime transformer des problématiques réelles — santé, gestion locative, gestion d'entreprise — en solutions logicielles fiables, en combinant développement backend, applications mobiles Flutter et bonnes pratiques DevOps.",
    aboutLabelSchool: "Établissement",
    aboutLabelLocation: "Localisation",
    aboutLabelEmail: "Email",

    t1Title: "Master Professionnel — SIGL",
    t1Desc: "Institut Universitaire de la Côte · diplôme obtenu",
    t2Title: "Licence Professionnelle — Génie Logiciel",
    t2Desc: "Institut Universitaire de la Côte",
    t3Title: "Brevet de Technicien Supérieur — Génie Logiciel",
    t3Desc: "Institut Universitaire de la Côte",
    t4Title: "Baccalauréat C",
    t4Desc: "Lycée Bilingue de Mambanda",

    memoireLabel: "Mémoire de fin d'études",
    memoireBtn: "Télécharger le mémoire (PDF)",

    experienceSubtitle: "Mon parcours",
    experienceTitle: 'Expérience <span class="text-gradient">professionnelle</span>',

    exp1Role: "Développeur Backend (Stage) · 2026 · 3 mois",
    exp1Desc:
      "ERP cloud-native pour PME africaines (Douala), méthodologie Agile Scrum, 22 tickets Jira traités.",
    exp1Bullet1:
      "Conception d'une architecture microservices ERP : 7 services Django indépendants derrière une Gateway Nginx",
    exp1Bullet2:
      "Module CRM : 38 endpoints API, pipeline Kanban, conversion devis→facture, dashboard KPIs, interface i18n FR/EN/PT",
    exp1Bullet3:
      "Module Stock : mouvements transactionnels atomiques (transaction.atomic + select_for_update), alertes de seuil minimum",
    exp1Bullet4:
      "Module Analytics : KPIs inter-services, dashboards configurables, webhooks sécurisés HMAC-SHA256",
    exp1Bullet5: "Stack d'observabilité : Prometheus + Grafana (3 dashboards) + OpenTelemetry",
    exp1Bullet6: "6 contrats OpenAPI publiés en approche Contract-First (clés API, rate limiting)",
    exp1Bullet7:
      "Pipeline CI/CD GitLab (lint, validation de contrats, tests) et sécurité (RBAC granulaire, isolation multi-tenant JWT, 0 secret en clair)",

    stat1Label: "Endpoints API",
    stat2Label: "Tests automatisés",
    stat3Label: "Tests passants",
    stat4Label: "Documents techniques",

    tabAuth: "Authentification",
    tabCompta: "Comptabilité",
    tabCrm: "CRM &amp; Ventes",
    tabRh: "Ressources Humaines",

    capLogin: "Connexion sécurisée avec SSO Keycloak",
    capRegister: "Inscription multi-profils (particulier, entreprise, administrateur)",
    capBilan: "Bilan comptable SYSCOHADA généré en temps réel",
    capSaisie: "Saisie d'écriture en partie double avec contrôle d'équilibre automatique",
    capPipeline: "Pipeline commercial avec valeur pondérée par probabilité",
    capContacts: "Gestion des contacts CRM, clients et prospects",
    capFactures: "Suivi de facturation avec DSO moyen et relances",
    capEmployes: "Annuaire des employés avec contrats et salaires",
    capOrganigramme: "Organigramme par département",
    capPaie: "Gestion de la paie multi-devise (XAF)",

    galleryContext:
      "ERP cloud-native multi-tenant pour PME africaines — modules RH, Comptabilité SYSCOHADA, CRM et Ventes sur une seule plateforme.",
    privacyBadge: "Code source privé — projet propriétaire de l'entreprise",
    quotePlaceholder: "[Citation de l'encadrant à ajouter]",

    exp2Role: "Développeur Web · 2024 - 2025",
    exp2Desc: "Conception et réalisation d'un système de détection de la pneumonie par intelligence artificielle.",
    exp3Role: "Développeur Web · 2023 - 2024",
    exp3Desc: "Conception et développement d'une application de e-learning.",
    exp4Role: "Développeur Web · 2022 - 2023",
    exp4Desc: "Conception et réalisation d'une application de gestion hospitalière.",

    skillsSubtitle: "Ce que je maîtrise",
    skillsTitle: 'Mes <span class="text-gradient">compétences</span>',
    skillCatBackend: "Backend",
    skillCatDevops: "DevOps &amp; Ops",
    skillCatLanguages: "Langages",
    skillCatFrameworks: "Frameworks &amp; Front-End",
    skillCatMethodology: "Méthodologie",
    skillCatSpoken: "Langues parlées",
    skillLangFrLevel: "Bon niveau",
    skillLangEnLevel: "Niveau moyen",

    projectsSubtitle: "Mon travail",
    projectsTitle: 'Mes <span class="text-gradient">projets</span>',
    project1Title: "Détection de la pneumonie par IA",
    project1Meta: "Réalisé chez Nobisoft",
    project1Desc:
      "Système permettant d'uploader une image radiographique des poumons, analysée automatiquement par un modèle d'intelligence artificielle afin de détecter une pneumonie.",
    project2Title: "Gestion de contrats de location immobilière",
    project2Desc:
      "Application de gestion locative complète : biens, locataires, contrats et paiements avec rappels automatiques, génération de reçus et gestion des documents légaux. Interface mobile dédiée pour locataires et propriétaires.",
    projectCodeBtn: "Voir le code sur GitHub",

    contactSubtitle: "Discutons",
    contactTitle: 'Me <span class="text-gradient">contacter</span>',
    contactLead:
      "Une question, une opportunité de stage/emploi ou simplement envie d'échanger ? N'hésitez pas à me contacter directement ou via le formulaire.",
    contactLabelEmail: "Email",
    contactLabelPhone: "Téléphone",
    contactLabelGithub: "GitHub",
    contactLabelGitlab: "GitLab",

    formLabelName: "Nom complet",
    formPlaceholderName: "Votre nom",
    formLabelEmail: "Adresse email",
    formLabelMessage: "Message",
    formPlaceholderMessage: "Votre message...",
    formSubmit: "Envoyer le message",
    formSuccess: "Merci ! Votre message a bien été pris en compte.",

    footerRights: "Tous droits réservés.",

    chatTitle: "Assistant de Cabrel",
    chatSubtitle: "Posez une question sur son parcours",
    chatPlaceholder: "Écrivez votre message...",
    chatWelcome:
      "Bonjour ! Je suis l'assistant IA de Cabrel. Posez-moi une question sur son parcours, ses expériences ou ses compétences.",
    chatError: "Une erreur est survenue. Réessayez ou contactez-moi directement par email.",
  },

  en: {
    navHome: "Home",
    navAbout: "About",
    navExperience: "Experience",
    navSkills: "Skills",
    navProjects: "Projects",
    navContact: "Contact",

    heroGreeting: "Hello, I'm",
    heroDesc:
      "Master's student in Information Systems & Software Engineering at Institut Universitaire de la Côte, passionate about backend development, Flutter mobile development and service-oriented software architecture.",
    heroCtaCv: "Download my resume",
    heroCtaContact: "Contact me",

    aboutSubtitle: "Get to know me",
    aboutTitle: 'About <span class="text-gradient">me</span>',
    aboutP1:
      "My name is <strong>Kengne Ouafo Cabrel</strong>, holder of a Professional Master's degree in Information Systems & Software Engineering (SIGL) from <strong>Institut Universitaire de la Côte</strong>. Throughout my studies, I have built a solid technical foundation, from programming fundamentals to designing service-oriented backend architectures.",
    aboutP2:
      "Curious and rigorous, I enjoy turning real-world problems — healthcare, rental management, business management — into reliable software solutions, combining backend development, Flutter mobile apps and DevOps best practices.",
    aboutLabelSchool: "Institution",
    aboutLabelLocation: "Location",
    aboutLabelEmail: "Email",

    t1Title: "Professional Master's — SIGL",
    t1Desc: "Institut Universitaire de la Côte · degree obtained",
    t2Title: "Professional Bachelor's — Software Engineering",
    t2Desc: "Institut Universitaire de la Côte",
    t3Title: "Higher Technician Certificate (BTS) — Software Engineering",
    t3Desc: "Institut Universitaire de la Côte",
    t4Title: "Baccalaureate C",
    t4Desc: "Bilingual High School of Mambanda",

    memoireLabel: "Final-year thesis",
    memoireBtn: "Download the thesis (PDF)",

    experienceSubtitle: "My journey",
    experienceTitle: 'Professional <span class="text-gradient">experience</span>',

    exp1Role: "Backend Developer (Internship) · 2026 · 3 months",
    exp1Desc: "Cloud-native ERP for African SMEs (Douala), Agile Scrum methodology, 22 Jira tickets completed.",
    exp1Bullet1:
      "Designed a microservices ERP architecture: 7 independent Django services behind an Nginx Gateway",
    exp1Bullet2:
      "CRM module: 38 API endpoints, Kanban pipeline, quote-to-invoice conversion, KPI dashboard, FR/EN/PT i18n interface",
    exp1Bullet3:
      "Inventory module: atomic transactional operations (transaction.atomic + select_for_update), minimum-threshold alerts",
    exp1Bullet4:
      "Analytics module: cross-service KPIs, configurable dashboards, HMAC-SHA256 secured webhooks",
    exp1Bullet5: "Observability stack: Prometheus + Grafana (3 dashboards) + OpenTelemetry",
    exp1Bullet6: "6 OpenAPI contracts published using a Contract-First approach (API keys, rate limiting)",
    exp1Bullet7:
      "GitLab CI/CD pipeline (lint, contract validation, tests) and security (granular RBAC, JWT multi-tenant isolation, zero plaintext secrets)",

    stat1Label: "API Endpoints",
    stat2Label: "Automated tests",
    stat3Label: "Passing tests",
    stat4Label: "Technical documents",

    tabAuth: "Authentication",
    tabCompta: "Accounting",
    tabCrm: "CRM &amp; Sales",
    tabRh: "Human Resources",

    capLogin: "Secure sign-in with Keycloak SSO",
    capRegister: "Multi-profile registration (individual, company, administrator)",
    capBilan: "SYSCOHADA balance sheet generated in real time",
    capSaisie: "Double-entry bookkeeping with automatic balance control",
    capPipeline: "Sales pipeline with probability-weighted value",
    capContacts: "CRM contact management for clients and prospects",
    capFactures: "Invoicing tracking with average DSO and reminders",
    capEmployes: "Employee directory with contracts and salaries",
    capOrganigramme: "Organization chart by department",
    capPaie: "Multi-currency payroll management (XAF)",

    galleryContext:
      "Cloud-native multi-tenant ERP for African SMEs — HR, SYSCOHADA Accounting, CRM and Sales modules on a single platform.",
    privacyBadge: "Private source code — proprietary company project",
    quotePlaceholder: "[Supervisor's quote to be added]",

    exp2Role: "Web Developer · 2024 - 2025",
    exp2Desc: "Design and development of an AI-based pneumonia detection system.",
    exp3Role: "Web Developer · 2023 - 2024",
    exp3Desc: "Design and development of an e-learning application.",
    exp4Role: "Web Developer · 2022 - 2023",
    exp4Desc: "Design and development of a hospital management application.",

    skillsSubtitle: "What I master",
    skillsTitle: 'My <span class="text-gradient">skills</span>',
    skillCatBackend: "Backend",
    skillCatDevops: "DevOps &amp; Ops",
    skillCatLanguages: "Languages",
    skillCatFrameworks: "Frameworks &amp; Front-End",
    skillCatMethodology: "Methodology",
    skillCatSpoken: "Spoken languages",
    skillLangFrLevel: "Good level",
    skillLangEnLevel: "Intermediate level",

    projectsSubtitle: "My work",
    projectsTitle: 'My <span class="text-gradient">projects</span>',
    project1Title: "AI-based pneumonia detection",
    project1Meta: "Built at Nobisoft",
    project1Desc:
      "System that lets users upload a chest X-ray image, automatically analyzed by an AI model to detect pneumonia.",
    project2Title: "Rental property contract management",
    project2Desc:
      "Full rental management application: properties, tenants, contracts and payments with automatic reminders, receipt generation and legal document management. Dedicated mobile interface for tenants and landlords.",
    projectCodeBtn: "View code on GitHub",

    contactSubtitle: "Let's talk",
    contactTitle: '<span class="text-gradient">Contact</span> me',
    contactLead:
      "A question, a job or internship opportunity, or just want to connect? Feel free to reach out directly or through the form.",
    contactLabelEmail: "Email",
    contactLabelPhone: "Phone",
    contactLabelGithub: "GitHub",
    contactLabelGitlab: "GitLab",

    formLabelName: "Full name",
    formPlaceholderName: "Your name",
    formLabelEmail: "Email address",
    formLabelMessage: "Message",
    formPlaceholderMessage: "Your message...",
    formSubmit: "Send message",
    formSuccess: "Thank you! Your message has been received.",

    footerRights: "All rights reserved.",

    chatTitle: "Cabrel's Assistant",
    chatSubtitle: "Ask a question about his background",
    chatPlaceholder: "Type your message...",
    chatWelcome:
      "Hello! I'm Cabrel's AI assistant. Ask me anything about his background, experience or skills.",
    chatError: "Something went wrong. Please try again or email me directly.",
  },
};

let currentLang = "fr";

const langToggle = document.getElementById("langToggle");
const langLabel = document.getElementById("langLabel");
const availabilityText = document.getElementById("availabilityText");

function applyTranslations(lang) {
  const dict = translations[lang];
  document.documentElement.setAttribute("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
  });

  document.querySelectorAll(".gallery-thumb[data-i18n-key]").forEach((thumb) => {
    const key = thumb.dataset.i18nKey;
    const text = dict[key];
    if (text === undefined) return;
    thumb.setAttribute("data-caption", text);
    const img = thumb.querySelector("img");
    if (img) img.alt = text;
    const captionEl = thumb.querySelector(".gallery-caption");
    if (captionEl) captionEl.textContent = text;
  });

  availabilityText.textContent = AVAILABILITY_STATUS[lang];
  langLabel.textContent = lang === "fr" ? "EN" : "FR";
}

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "fr" ? "en" : "fr";
  applyTranslations(currentLang);
});

// Applique la langue par défaut (français) au chargement, dont le texte de disponibilité
applyTranslations(currentLang);

/* ==========================================================================
   8. STATS BAR ANIMÉE (comptage au scroll — IntersectionObserver)
   ========================================================================== */
function animateStatNumber(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || "";
  const duration = 1500;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value + suffix;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(tick);
}

const statsBar = document.querySelector("[data-stats]");
if (statsBar) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".stat-number").forEach(animateStatNumber);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  statsObserver.observe(statsBar);
}

/* ==========================================================================
   9. VIDÉO DE DÉMO — repli gracieux si demo.mp4 est absent
   ========================================================================== */
const demoVideo = document.getElementById("demoVideo");
const demoVideoWrapper = document.getElementById("demoVideoWrapper");

if (demoVideo && demoVideoWrapper) {
  demoVideo.addEventListener("error", () => {
    demoVideoWrapper.style.display = "none";
  });
}

/* ==========================================================================
   10. GALERIE À ONGLETS (section Expérience — Formuloo OS)
   ========================================================================== */
document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const tabs = gallery.querySelectorAll(".gallery-tab");
  const panels = gallery.querySelectorAll(".gallery-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      panels.forEach((panel) => {
        panel.classList.remove("active");
        panel.hidden = true;
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const targetPanel = gallery.querySelector(`[data-panel="${tab.dataset.tab}"]`);
      targetPanel.classList.add("active");
      targetPanel.hidden = false;
    });
  });
});

/* ==========================================================================
   11. LIGHTBOX (aperçu plein écran + navigation précédent/suivant)
   ========================================================================== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImages = [];
let currentIndex = 0;

function showLightboxImage() {
  const { src, caption } = currentImages[currentIndex];
  lightboxImg.src = src;
  lightboxImg.alt = caption;
  lightboxCaption.textContent = caption;
}

function openLightbox(images, index) {
  currentImages = images;
  currentIndex = index;
  showLightboxImage();
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  showLightboxImage();
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  showLightboxImage();
}

document.querySelectorAll(".gallery-panel").forEach((panel) => {
  const thumbs = Array.from(panel.querySelectorAll(".gallery-thumb"));

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      // Recalculé à chaque clic pour tenir compte de la langue active
      const images = thumbs.map((t) => ({
        src: t.querySelector("img").getAttribute("src"),
        caption: t.dataset.caption,
      }));
      openLightbox(images, index);
    });
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", showPrevImage);
lightboxNext.addEventListener("click", showNextImage);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showPrevImage();
  if (e.key === "ArrowRight") showNextImage();
});

/* ==========================================================================
   12. FORMULAIRE DE CONTACT (UI uniquement, sans backend)
   ========================================================================== */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  formStatus.textContent = translations[currentLang].formSuccess;
  contactForm.reset();

  setTimeout(() => {
    formStatus.textContent = "";
  }, 5000);
});

/* ==========================================================================
   13. ANNÉE COURANTE DANS LE FOOTER
   ========================================================================== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ==========================================================================
   14. ASSISTANT IA (CHAT) — appelle /api/chat, jamais l'API Anthropic en direct
   ========================================================================== */
const chatToggle = document.getElementById("chatToggle");
const chatToggleIcon = document.getElementById("chatToggleIcon");
const chatPanel = document.getElementById("chatPanel");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

const chatHistory = [];
let welcomeShown = false;

function setChatOpen(isOpen) {
  chatPanel.hidden = !isOpen;
  chatToggle.setAttribute("aria-expanded", String(isOpen));
  chatToggleIcon.classList.toggle("fa-comment-dots", !isOpen);
  chatToggleIcon.classList.toggle("fa-xmark", isOpen);

  if (isOpen) {
    chatInput.focus();
    if (!welcomeShown) {
      appendChatMessage("assistant", translations[currentLang].chatWelcome);
      welcomeShown = true;
    }
  }
}

chatToggle.addEventListener("click", () => setChatOpen(chatPanel.hidden));
chatClose.addEventListener("click", () => setChatOpen(false));

function appendChatMessage(role, text) {
  const el = document.createElement("div");
  el.className = `chat-message chat-message-${role}`;
  el.textContent = text;
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return el;
}

// Indicateur "en train d'écrire" (3 points animés)
function showTypingIndicator() {
  const el = document.createElement("div");
  el.className = "chat-typing";
  el.id = "chatTypingIndicator";
  el.innerHTML = "<span></span><span></span><span></span>";
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return el;
}

function removeTypingIndicator() {
  const el = document.getElementById("chatTypingIndicator");
  if (el) el.remove();
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = chatInput.value.trim();
  if (!text) return;

  chatInput.value = "";
  chatInput.disabled = true;

  appendChatMessage("user", text);
  chatHistory.push({ role: "user", content: text });

  showTypingIndicator();

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatHistory }),
    });

    const data = await response.json();
    removeTypingIndicator();

    if (!response.ok) {
      throw new Error(data.error || "Erreur serveur");
    }

    const reply = data.content?.[0]?.text || translations[currentLang].chatError;
    appendChatMessage("assistant", reply);
    chatHistory.push({ role: "assistant", content: reply });
  } catch (error) {
    removeTypingIndicator();
    const errorEl = appendChatMessage("assistant", translations[currentLang].chatError);
    errorEl.classList.add("chat-message-error");
  } finally {
    chatInput.disabled = false;
    chatInput.focus();
  }
});
