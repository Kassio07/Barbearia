/* =========================================================
   OFÍCIO BARBEARIA — SCRIPT
   Módulos independentes, sem dependências externas.
   ========================================================= */

(() => {
  'use strict';

  /* ---------- Navbar: transparência ao rolar + menu mobile ---------- */
  const Navbar = (() => {
    const nav = document.getElementById('navbar');
    const navList = document.getElementById('navbar-nav');
    const toggle = document.getElementById('navToggle');
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toggle && navList) {
      toggle.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('is-open');
        toggle.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
      });
      navList.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navList.classList.remove('is-open');
          toggle.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  })();

  /* ---------- Scroll Reveal ---------- */
  const ScrollReveal = (() => {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach((el) => observer.observe(el));
  })();

  /* ---------- Contadores animados ---------- */
  const Counters = (() => {
    const counters = document.querySelectorAll('.stat__number');
    if (!counters.length) return;

    const animate = (el) => {
      const target = Number(el.dataset.count || '0');
      const isDecimal = el.dataset.decimal === 'true';
      const duration = 1400;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = isDecimal ? (value / 10).toFixed(1) : Math.round(value).toLocaleString('pt-BR');
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animate);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach((el) => observer.observe(el));
  })();

  /* ---------- FAQ Accordion ---------- */
  const FaqAccordion = (() => {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach((item) => {
      const button = item.querySelector('.faq-item__q');
      const answer = item.querySelector('.faq-item__a');

      button.addEventListener('click', () => {
        const isOpen = item.getAttribute('data-open') === 'true';

        items.forEach((other) => {
          other.setAttribute('data-open', 'false');
          other.querySelector('.faq-item__q').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-item__a').style.maxHeight = null;
        });

        if (!isOpen) {
          item.setAttribute('data-open', 'true');
          button.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  })();

  /* ---------- Galeria + Lightbox ---------- */
  const Gallery = (() => {
    const items = document.querySelectorAll('.galeria__item');
    const lightbox = document.getElementById('lightbox');
    if (!items.length || !lightbox) return;

    const swatchEl = document.getElementById('lightboxSwatch');
    const captionEl = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');
    let lastFocused = null;

    const open = (item) => {
      const swatch = item.querySelector('.galeria__swatch');
      swatchEl.style.background = getComputedStyle(swatch).backgroundImage;
      captionEl.textContent = item.dataset.caption || '';
      lastFocused = document.activeElement;
      lightbox.hidden = false;
      closeBtn.focus();
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      lightbox.hidden = true;
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    };

    items.forEach((item) => item.addEventListener('click', () => open(item)));
    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lightbox.hidden) close(); });
  })();

  /* ---------- Slider antes/depois ---------- */
  const CompareSlider = (() => {
    const range = document.getElementById('compareRange');
    const after = document.getElementById('compareAfter');
    const handle = document.getElementById('compareHandle');
    if (!range || !after || !handle) return;

    const update = (value) => {
      after.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
      handle.style.left = value + '%';
    };
    range.addEventListener('input', (e) => update(Number(e.target.value)));
    update(Number(range.value));
  })();

  /* ---------- Slider de depoimentos ---------- */
  const TestimonialSlider = (() => {
    const track = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const dotsWrap = document.getElementById('sliderDots');
    if (!track) return;

    const slides = track.children.length;
    let index = 0;

    for (let i = 0; i < slides; i++) {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }

    const dots = dotsWrap.querySelectorAll('button');

    const goTo = (i) => {
      index = (i + slides) % slides;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
    };

    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', () => goTo(index + 1));

    let autoplay = setInterval(() => goTo(index + 1), 7000);
    track.closest('.slider').addEventListener('mouseenter', () => clearInterval(autoplay));
    track.closest('.slider').addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goTo(index + 1), 7000);
    });
  })();

  /* ---------- Rodapé: ano atual ---------- */
  const anoEl = document.getElementById('anoAtual');
  if (anoEl) anoEl.textContent = new Date().getFullYear();

})();
