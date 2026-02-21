/* ============================================================
   FlowDesk – Script
   Hamburger Menu, Smooth Scroll, Scroll Nav, Scroll Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === 1. HAMBURGER MENU TOGGLE ===
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const body = document.body;

  function openMenu() {
    navMenu.classList.add('open');
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Menü schliessen');
    body.classList.add('menu-open');
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Menü öffnen');
    body.classList.remove('menu-open');
  }

  // Toggle on hamburger click
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
      navToggle.focus();
    }
  });


  // === 2. SMOOTH SCROLL + CLOSE MENU ON NAV LINK CLICK ===
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

  allAnchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return; // skip empty anchors

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        // Close mobile menu if open
        closeMenu();

        // Scroll to target with offset for fixed nav
        const navHeight = document.getElementById('nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // === 3. SCROLL-BASED NAVIGATION STATE ===
  const nav = document.getElementById('nav');
  const SCROLL_THRESHOLD = 50;

  function updateNavState() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  // Run on load + scroll
  updateNavState();
  window.addEventListener('scroll', updateNavState, { passive: true });


  // === 4. SCROLL ANIMATIONS (Intersection Observer) ===
  const animatedElements = document.querySelectorAll(
    '.feature-card, .pricing-card, .testimonial__card'
  );

  if ('IntersectionObserver' in window && animatedElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // only animate once
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    animatedElements.forEach((el) => observer.observe(el));
  }

});
