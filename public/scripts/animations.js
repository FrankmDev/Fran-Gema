/**
 * Fran & Gema Wedding — GSAP Enhancement Layer
 * Preloader is pure CSS. GSAP only enhances scroll animations.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function fallbackReveal() {
    document.querySelectorAll('[data-reveal], .text-reveal__inner, .gold-line, .dia__event-img').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.clipPath = 'none';
    });
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
      initNavigation();
      initFloatingDecor();
    }
  }, 6000);

  // ─── HERO REVEAL — starts after CSS preloader exits (~2.6s) ───
  function initHeroReveal() {
    const heroPretitle = document.querySelector('.hero__pretitle');
    const heroNames = document.querySelector('.hero__names .text-reveal__inner');
    const heroDate = document.querySelector('.hero__date');
    const heroLoc = document.querySelector('.hero__location');
    const heroLine = document.querySelector('.hero__line');

    const tl = gsap.timeline({ delay: 2.7 });

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

  function initParallax() {
    const heroBg = document.querySelector('[data-parallax]');
    if (heroBg) {
      gsap.to(heroBg, {
        y: 80, ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }
  }

  function initFloatingDecor() {
    const elements = [
      { selector: '.float-decor--circle-1', y: -120, rotate: 15 },
      { selector: '.float-decor--circle-2', y: 80, rotate: -10 },
      { selector: '.float-decor--line-1', y: -60, rotate: 0 },
      { selector: '.float-decor--line-2', y: 100, rotate: 0 },
      { selector: '.float-decor--ring-1', y: -40, rotate: 45 }
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