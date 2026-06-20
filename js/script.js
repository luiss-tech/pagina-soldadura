document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  function createMobileMenu() {
    if (!header || !nav) {
      return;
    }

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.ariaLabel = 'Abrir menú';
    toggle.innerHTML = '<span>Menú</span>';

    toggle.addEventListener('click', function () {
      document.body.classList.toggle('nav-open');
      const isOpen = document.body.classList.contains('nav-open');
      toggle.ariaLabel = isOpen ? 'Cerrar menú' : 'Abrir menú';
    });

    header.insertBefore(toggle, nav);

    navLinks.forEach((link) => {
      link.addEventListener('click', function () {
        if (document.body.classList.contains('nav-open')) {
          document.body.classList.remove('nav-open');
          toggle.ariaLabel = 'Abrir menú';
        }
      });
    });

    document.addEventListener('click', function (event) {
      if (!header.contains(event.target) && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        toggle.ariaLabel = 'Abrir menú';
      }
    });
  }

  function bindSmoothScroll() {
    navLinks.forEach((link) => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function revealOnScroll() {
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
    const contactSection = document.querySelector('.contact');
    if (!contactSection) {
      return;
    }

    const form = contactSection.querySelector('form');
    if (!form) {
      return;
    }

    const emailInput = form.querySelector('input[type="email"]');
    const phoneInput = form.querySelector('input[type="tel"]');
    const messageInput = form.querySelector('textarea');

    form.addEventListener('submit', function (event) {
      let valid = true;
      const errors = [];

      if (emailInput) {
        const emailValue = emailInput.value.trim();
        const validEmail = /^\S+@\S+\.\S+$/.test(emailValue);
        if (!validEmail) {
          valid = false;
          errors.push('Por favor ingrese un correo válido.');
        }
      }

      if (phoneInput) {
        const phoneValue = phoneInput.value.trim();
        const validPhone = /^\+?\d[\d\s\-]{6,}$/.test(phoneValue);
        if (!validPhone) {
          valid = false;
          errors.push('Por favor ingrese un teléfono válido.');
        }
      }

      if (messageInput) {
        const messageValue = messageInput.value.trim();
        if (messageValue.length < 10) {
          valid = false;
          errors.push('El mensaje debe tener al menos 10 caracteres.');
        }
      }

      if (!valid) {
        event.preventDefault();
        alert(errors.join('\n'));
      }
    });
  }

  createMobileMenu();
  bindSmoothScroll();
  revealOnScroll();
  setupContactValidation();
});
