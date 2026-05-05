/**
 * Fran & Gema Wedding — GSAP Enhancement Layer
 * Preloader is pure CSS. GSAP only enhances scroll animations.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function fallbackReveal() {
    document.querySelectorAll('[data-reveal], .text-reveal__inner, .gold-line, .dia__event-img, .dia__event-media').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.clipPath = 'none';
    });
    document.querySelectorAll('.dia__timeline').forEach(el => el.classList.add('is-drawn'));
    document.querySelectorAll('.dia__event-media').forEach(el => el.classList.add('is-revealed'));
    document.querySelectorAll('.footer__names').forEach(el => el.classList.add('is-revealed'));
    document.querySelectorAll('.confirma__parchment').forEach(el => el.classList.add('is-revealed'));
  }

  function whenGsapReady(cb, timeoutMs) {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') { cb(); return; }
    const t = setInterval(() => {
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') { clearInterval(t); clearTimeout(to); cb(); }
    }, 50);
    const to = setTimeout(() => { clearInterval(t); fallbackReveal(); }, timeoutMs || 5000);
  }

  whenGsapReady(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (prefersReducedMotion) {
      fallbackReveal();
    } else {
      initHeroReveal();
      initScrollReveals();
      initTextReveals();
      initLineDraws();
      initParallax();
      initImageReveals();
      initTimelineLineDraw();
      initImageMaskReveals();
      initTimelineEvents();
      initStaggeredReveals();
      initIconReveals();
      initFooterReveal();
      initConfirmaCard();
      initNavigation();
      initFloatingDecor();
      initSmoothScroll();
      initMagneticButtons();
    }
  }, 6000);

  // ─── SMOOTH SCROLL ───
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          gsap.to(window, { duration: 1.2, scrollTo: { y: target, offsetY: 60 }, ease: 'expo.inOut' });
        }
      });
    });
  }

  // ─── HERO REVEAL ───
  function initHeroReveal() {
    const heroPretitle = document.querySelector('.hero__pretitle');
    const heroNames = document.querySelector('.hero__names .text-reveal__inner');
    const heroDate = document.querySelector('.hero__date');
    const heroLoc = document.querySelector('.hero__location');
    const heroLine = document.querySelector('.hero__line');

    const tl = gsap.timeline({ delay: 2.6 });

    if (heroPretitle) {
      gsap.set(heroPretitle, { opacity: 0, y: 25 });
      tl.to(heroPretitle, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' });
    }
    if (heroNames) {
      gsap.set(heroNames, { y: '110%' });
      tl.to(heroNames, { y: '0%', duration: 1.3, ease: 'expo.out' }, '-=0.7');
    }
    if (heroDate) {
      gsap.set(heroDate, { opacity: 0, y: 20 });
      tl.to(heroDate, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, '-=0.8');
    }
    if (heroLoc) {
      gsap.set(heroLoc, { opacity: 0, y: 20 });
      tl.to(heroLoc, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, '-=0.7');
    }
    if (heroLine) {
      gsap.set(heroLine, { scaleX: 0 });
      tl.to(heroLine, { scaleX: 1, duration: 1.4, ease: 'expo.out' }, '-=0.6');
    }
  }

  function initScrollReveals() {
    document.querySelectorAll('[data-reveal="up"]').forEach(el => {
      const delay = parseFloat(el.dataset.delay) || 0;
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'expo.out', delay: delay,
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none', once: true }
        }
      );
    });
  }

  function initTextReveals() {
    document.querySelectorAll('[data-reveal="text"]').forEach(el => {
      const inner = el.querySelector('.text-reveal__inner');
      if (!inner) return;
      gsap.fromTo(inner,
        { y: '110%' },
        {
          y: '0%', duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none', once: true }
        }
      );
    });
  }

  function initLineDraws() {
    document.querySelectorAll('[data-reveal="line"]').forEach(line => {
      gsap.fromTo(line,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.4, ease: 'expo.out', transformOrigin: 'left center',
          scrollTrigger: { trigger: line, start: 'top 90%', toggleActions: 'play none none none', once: true }
        }
      );
    });
  }

  function initImageReveals() {
    document.querySelectorAll('.dia__event-img').forEach(img => {
      gsap.fromTo(img,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: img, start: 'top 85%', toggleActions: 'play none none none', once: true }
        }
      );
    });
  }

  // ─── TIMELINE SPINE LINE DRAW ───
  function initTimelineLineDraw() {
    const timeline = document.querySelector('.dia__timeline');
    if (!timeline) return;
    ScrollTrigger.create({
      trigger: timeline,
      start: 'top 80%',
      once: true,
      onEnter: () => timeline.classList.add('is-drawn')
    });
  }

  // ─── TIMELINE EVENTS — slide in from sides ───
  function initTimelineEvents() {
    document.querySelectorAll('[data-timeline-event]').forEach(event => {
      const side = event.dataset.timelineEvent;
      const xOffset = side === 'left' ? -80 : 80;
      gsap.fromTo(event,
        { opacity: 0, x: xOffset },
        {
          opacity: 1, x: 0, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: event, start: 'top 80%', toggleActions: 'play none none none', once: true }
        }
      );
    });
  }

  // ─── IMAGE MASK REVEALS ───
  function initImageMaskReveals() {
    document.querySelectorAll('[data-mask-reveal]').forEach(container => {
      gsap.fromTo(container,
        { clipPath: 'polygon(0 100%, 0 100%, 0 100%)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.6,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: container, start: 'top 80%', toggleActions: 'play none none none', once: true }
        }
      );
    });
  }

  // ─── STAGGERED REVEALS ───
  function initStaggeredReveals() {
    document.querySelectorAll('[data-stagger]').forEach(container => {
      const children = container.children;
      gsap.fromTo(children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.12,
          scrollTrigger: { trigger: container, start: 'top 85%', toggleActions: 'play none none none', once: true }
        }
      );
    });

    const grid = document.querySelector('[data-stagger-grid]');
    if (grid) {
      const items = grid.querySelectorAll(':scope > [data-reveal]');
      gsap.fromTo(items,
        { opacity: 0, y: 60, rotateX: 8 },
        {
          opacity: 1, y: 0, rotateX: 0, duration: 1.1, ease: 'expo.out', stagger: 0.15,
          scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none none', once: true }
        }
      );
    }
  }

  // ─── ICON REVEALS ───
  function initIconReveals() {
    document.querySelectorAll('[data-icon-reveal]').forEach((icon, i) => {
      gsap.fromTo(icon,
        { scale: 0, rotate: -20, opacity: 0 },
        {
          scale: 1, rotate: 0, opacity: 1, duration: 0.8,
          ease: 'back.out(1.7)',
          delay: i * 0.15,
          scrollTrigger: { trigger: icon, start: 'top 88%', toggleActions: 'play none none none', once: true }
        }
      );
    });
  }

  // ─── FOOTER REVEAL ───
  function initFooterReveal() {
    const names = document.querySelector('.footer__names');
    if (names) {
      ScrollTrigger.create({
        trigger: names,
        start: 'top 92%',
        once: true,
        onEnter: () => names.classList.add('is-revealed')
      });
    }
  }

  // ─── CONFIRMA PARCHMENT REVEAL ───
  function initConfirmaCard() {
    const parchment = document.querySelector('.confirma__parchment');
    if (!parchment) return;
    gsap.fromTo(parchment,
      { opacity: 0, y: 100, rotateX: 15 },
      {
        opacity: 1, y: 0, rotateX: 0, duration: 1.6, ease: 'expo.out',
        scrollTrigger: { trigger: parchment, start: 'top 85%', toggleActions: 'play none none none', once: true },
        onComplete: () => parchment.classList.add('is-revealed')
      }
    );
  }

  // ─── MAGNETIC BUTTONS ───
  function initMagneticButtons() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.btn-gold--luxury').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.4, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      });
    });
  }

  function initParallax() {
    const heroBg = document.querySelector('[data-parallax]');
    if (heroBg) {
      gsap.to(heroBg, {
        y: 80, ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }
    const welcomeMono = document.querySelector('.welcome__bg-monogram');
    if (welcomeMono) {
      gsap.to(welcomeMono, {
        y: -60, ease: 'none',
        scrollTrigger: { trigger: '#bienvenida', start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }
    const detallesMono = document.querySelector('.detalles__bg-monogram');
    if (detallesMono) {
      gsap.to(detallesMono, {
        y: -40, ease: 'none',
        scrollTrigger: { trigger: '#detalles', start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }
  }

  function initFloatingDecor() {
    const elements = [
      { selector: '.float-decor--circle-1', y: -120, rotate: 15 },
      { selector: '.float-decor--circle-2', y: 80, rotate: -10 },
      { selector: '.float-decor--line-1', y: -60, rotate: 0 },
      { selector: '.float-decor--line-2', y: 100, rotate: 0 },
      { selector: '.float-decor--ring-1', y: -40, rotate: 45 },
      { selector: '.float-decor--ring-2', y: 60, rotate: -20 }
    ];
    elements.forEach(({ selector, y, rotate }) => {
      const el = document.querySelector(selector);
      if (!el) return;
      gsap.to(el, {
        y: y, rotate: rotate, ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.5 }
      });
    });
  }

  function initNavigation() {
    const nav = document.getElementById('siteNav');
    if (!nav) return;
    ScrollTrigger.create({
      trigger: '#hero', start: 'bottom 90%',
      onEnter: () => nav.classList.add('site-nav--visible'),
      onLeaveBack: () => nav.classList.remove('site-nav--visible')
    });
  }
})();
