document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');
  const whatsappUrl = 'https://wa.me/51948406329';

  function createMobileMenu() {
    if (!header || !nav) {
      return;
    }

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Abrir menú');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'primary-navigation');
    toggle.innerHTML = '<span aria-hidden="true">☰</span> Menú';
    nav.id = 'primary-navigation';

    toggle.addEventListener('click', function () {
      document.body.classList.toggle('nav-open');
      const isOpen = document.body.classList.contains('nav-open');
      toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.parentElement.insertBefore(toggle, nav);

    navLinks.forEach((link) => {
      link.addEventListener('click', function () {
        if (document.body.classList.contains('nav-open')) {
          document.body.classList.remove('nav-open');
          toggle.setAttribute('aria-label', 'Abrir menú');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    document.addEventListener('click', function (event) {
      if (!header.contains(event.target) && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-label', 'Abrir menú');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function bindSmoothScroll() {
    navLinks.forEach((link) => {
      link.addEventListener('click', function (event) {
        const href = this.getAttribute('href') || '';
        if (!href.startsWith('#')) {
          return;
        }
        event.preventDefault();
        const targetId = href.slice(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function markCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach((link) => {
      const linkPage = (link.getAttribute('href') || '').split('#')[0] || 'index.html';
      if (linkPage === currentPage) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function addSharedContact() {
    if (document.querySelector('.floating-whatsapp-button')) {
      return;
    }

    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.className = 'floating-whatsapp-button';
    link.target = '_blank';
    link.rel = 'noopener';
    link.setAttribute('aria-label', 'Solicitar presupuesto por WhatsApp');
    link.innerHTML = '<span aria-hidden="true">WA</span>';
    document.body.appendChild(link);
  }

  function revealOnScroll() {
    if (!('IntersectionObserver' in window)) {
      return;
    }
    const observerOptions = {
      threshold: 0.15,
    };

    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      '.hero-content, .section-header, .service-grid article, .gallery-grid figure, .benefits li, .contact-info div, .location-details'
    );

    animatedElements.forEach((element) => {
      element.classList.add('will-reveal');
      revealObserver.observe(element);
    });
  }

  function setupContactValidation() {
    const form = document.querySelector('#contact-form');
    if (!form) {
      return;
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const data = new FormData(form);
      const message = [
        `Hola, soy ${data.get('name')}.`,
        `Necesito información sobre: ${data.get('service')}.`,
        `Mi teléfono es ${data.get('phone')}.`,
        `Detalle: ${data.get('message')}`,
      ].join('\n');
      if (!data.get('name') || !data.get('phone') || String(data.get('message')).trim().length < 10) {
        alert('Completa tu nombre, teléfono y un detalle de al menos 10 caracteres.');
        return;
      }
      window.open(`${whatsappUrl}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });
  }

  function respectReducedMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduce-motion');
    }
  }

  function addSkipLink() {
    if (!document.querySelector('.skip-link')) {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.className = 'skip-link';
      skipLink.textContent = 'Saltar al contenido';
      document.body.prepend(skipLink);
    }
    const main = document.querySelector('main');
    if (main) {
      main.id = 'main-content';
      main.tabIndex = -1;
    }
  }

  createMobileMenu();
  bindSmoothScroll();
  markCurrentPage();
  addSharedContact();
  revealOnScroll();
  setupContactValidation();
  respectReducedMotion();
  addSkipLink();
});
