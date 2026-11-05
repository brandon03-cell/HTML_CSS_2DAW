/**
 * LUMIA MEDICAL LASER CLINIC - SENIOR JAVASCRIPT ARCHITECTURE
 * Clean, modular, accessible and performant Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. DATA SOURCES: TREATMENT ZONES & FITZPATRICK PHOTOTYPES
  // =========================================================================

  const TREATMENT_DATA = {
    mujer: [
      { id: 'm_axilas', name: 'Axilas', price: 25, category: 'Zonas Medias' },
      { id: 'm_ingles_c', name: 'Ingles Clásicas', price: 29, category: 'Zonas Medias' },
      { id: 'm_ingles_b', name: 'Ingles Brasileñas / Completas', price: 39, category: 'Zonas Medias' },
      { id: 'm_piernas_c', name: 'Piernas Completas', price: 65, category: 'Zonas Grandes' },
      { id: 'm_medias_p', name: 'Medias Piernas', price: 39, category: 'Zonas Medias' },
      { id: 'm_labio', name: 'Labio Superior o Mentón', price: 18, category: 'Zonas Faciales' },
      { id: 'm_facial_c', name: 'Facial Completo', price: 35, category: 'Zonas Faciales' },
      { id: 'm_brazos', name: 'Brazos Completos', price: 42, category: 'Zonas Grandes' },
      { id: 'm_linea_a', name: 'Línea Alba', price: 19, category: 'Zonas Pequeñas' },
      { id: 'm_gluteos', name: 'Glúteos', price: 35, category: 'Zonas Medias' },
      { id: 'm_cuerpo_c', name: 'Cuerpo Entero Premium', price: 129, category: 'Packs Integrales' }
    ],
    hombre: [
      { id: 'h_espalda', name: 'Espalda Completa + Hombros', price: 69, category: 'Zonas Grandes' },
      { id: 'h_pecho_abd', name: 'Pecho + Abdomen', price: 65, category: 'Zonas Grandes' },
      { id: 'h_piernas_c', name: 'Piernas Completas', price: 79, category: 'Zonas Grandes' },
      { id: 'h_barba', name: 'Perfilado de Barba y Cuello', price: 32, category: 'Zonas Faciales' },
      { id: 'h_axilas', name: 'Axilas', price: 29, category: 'Zonas Medias' },
      { id: 'h_brazos', name: 'Brazos Completos', price: 49, category: 'Zonas Grandes' },
      { id: 'h_hombros', name: 'Hombros / Nuca', price: 35, category: 'Zonas Medias' },
      { id: 'h_lumbar', name: 'Zona Lumbar', price: 39, category: 'Zonas Medias' },
      { id: 'h_cuerpo_c', name: 'Cuerpo Completo Integral', price: 169, category: 'Packs Integrales' }
    ]
  };

  const PHOTOTYPE_DATA = {
    1: {
      type: 'Fototipo I (Piel Muy Clara / Nórdica)',
      description: 'Piel de tono marfil muy sensible, pecas frecuentes, cabello rubio claro o pelirrojo. Siempre se quema con el sol, nunca se broncea.',
      wavelength: 'Alejandrita (755 nm) + Diodo Alta Fluencia',
      cooling: '-5 ºC Zafiro Máximo',
      sessions: '6 - 8 sesiones',
      safety: 'Máxima seguridad. Cero foto-reactividad si se evita la exposición solar 3 días antes.'
    },
    2: {
      type: 'Fototipo II (Piel Clara Europea)',
      description: 'Piel blanca sensible, ojos claros o miel, cabello rubio o castaño claro. Se quema con gran facilidad y adquiere un bronceado mínimo.',
      wavelength: 'Diodo Médico Triple Onda (808 nm)',
      cooling: '-5 ºC Contacto Continuo',
      sessions: '6 - 8 sesiones',
      safety: 'Eficacia óptima. Gran absorción por melanina en raíz folicular sin dañar la dermis.'
    },
    3: {
      type: 'Fototipo III (Piel Caucásica Media)',
      description: 'Piel clara a ligeramente morena, castaña o morena. Se quema moderadamente y adquiere un bronceado dorado uniforme.',
      wavelength: 'Diodo 808 nm de Alta Potencia',
      cooling: '-4 ºC Refrigerado',
      sessions: '6 - 7 sesiones',
      safety: 'El fototipo con respuesta clínica más rápida y duradera del mercado.'
    },
    4: {
      type: 'Fototipo IV (Piel Morena Mediterránea)',
      description: 'Piel morena o aceitunada, ojos oscuros, cabello castaño oscuro o negro. Rara vez se quema, se broncea con extrema facilidad y rapidez.',
      wavelength: 'Trionda 808 nm + Nd:YAG 1064 nm',
      cooling: '-5 ºC Protección Térmica Reforzada',
      sessions: '7 - 8 sesiones',
      safety: '100% Seguro. Protocolo de pulso extendido que previene la hiperpigmentación.'
    },
    5: {
      type: 'Fototipo V (Piel Oscura / Mulata / Árabe)',
      description: 'Piel morena oscura natural, ojos negros, cabello negro. Se quema en raras ocasiones, pigmentación profunda y constante.',
      wavelength: 'Nd:YAG Médico Pulso Largo (1064 nm)',
      cooling: '-5 ºC Glacial Activo',
      sessions: '7 - 9 sesiones',
      safety: 'Longitud de onda profunda que bypassa la melanina epidérmica garantizando cero quemaduras.'
    },
    6: {
      type: 'Fototipo VI (Piel Negra Profunda)',
      description: 'Piel de alta densidad melánica, nunca se quema bajo el sol. Requiere protección epidérmica estricta mediante longitud de onda larga.',
      wavelength: 'Nd:YAG Exclusivo 1064 nm Deep Skin',
      cooling: '-5 ºC Protección Epidérmica Continua',
      sessions: '8 - 10 sesiones',
      safety: 'Tecnología médica certificada que asegura total indemnidad de la capa superficial.'
    }
  };

  // =========================================================================
  // 2. STICKY NAVBAR & MOBILE MENU CONTROLLER
  // =========================================================================
  const siteHeader = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active Link ScrollSpy via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => spyObserver.observe(section));
  }

  // =========================================================================
  // 3. INTERACTIVE TREATMENT & PRICE CALCULATOR
  // =========================================================================
  const calcGenderBtns = document.querySelectorAll('.gender-btn');
  const sessionPlanCards = document.querySelectorAll('.session-plan-card');
  const zonesGrid = document.getElementById('zonesGrid');
  const selectedZonesList = document.getElementById('selectedZonesList');
  const calcSubtotalElem = document.getElementById('calcSubtotal');
  const calcDiscountElem = document.getElementById('calcDiscount');
  const calcSavingsElem = document.getElementById('calcSavings');
  const calcTotalElem = document.getElementById('calcTotal');
  const bookPresupuestoBtn = document.getElementById('bookPresupuestoBtn');

  let currentGender = 'mujer';
  let currentSessions = 5; // default 5 sessions pack (15% discount)
  let currentDiscount = 0.15;
  let selectedZoneIds = new Set(['m_axilas', 'm_ingles_b']); // Defaults for attractive demo

  function renderZones() {
    if (!zonesGrid) return;
    const zones = TREATMENT_DATA[currentGender] || [];
    zonesGrid.innerHTML = '';

    zones.forEach(zone => {
      const isSelected = selectedZoneIds.has(zone.id);
      const card = document.createElement('div');
      card.className = `zone-checkbox-card ${isSelected ? 'selected' : ''}`;
      card.setAttribute('role', 'checkbox');
      card.setAttribute('aria-checked', isSelected);
      card.dataset.id = zone.id;
      card.dataset.price = zone.price;
      card.dataset.name = zone.name;

      card.innerHTML = `
        <div class="zone-left">
          <div class="custom-chk">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div>
            <div class="zone-name">${zone.name}</div>
            <span style="font-size: 0.72rem; color: var(--text-subtle);">${zone.category}</span>
          </div>
        </div>
        <div class="zone-base-price">${zone.price} € <span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal;">/ses</span></div>
      `;

      card.addEventListener('click', () => {
        if (selectedZoneIds.has(zone.id)) {
          selectedZoneIds.delete(zone.id);
        } else {
          selectedZoneIds.add(zone.id);
        }
        renderZones();
        updateCalculations();
      });

      zonesGrid.appendChild(card);
    });
  }

  // Gender Switch
  calcGenderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      calcGenderBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGender = btn.dataset.gender;
      selectedZoneIds.clear();
      // Add default for gender
      if (currentGender === 'mujer') {
        selectedZoneIds.add('m_axilas');
        selectedZoneIds.add('m_ingles_b');
      } else {
        selectedZoneIds.add('h_espalda');
        selectedZoneIds.add('h_pecho_abd');
      }
      renderZones();
      updateCalculations();
    });
  });

  // Session Packs
  sessionPlanCards.forEach(card => {
    card.addEventListener('click', () => {
      sessionPlanCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentSessions = parseInt(card.dataset.sessions, 10);
      currentDiscount = parseFloat(card.dataset.discount);
      updateCalculations();
    });
  });

  // Number animation helper (Easing)
  function animateValue(element, start, end, duration = 400) {
    if (!element) return;
    const startTime = performance.now();
    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * ease);
      element.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = end;
      }
    };
    requestAnimationFrame(update);
  }

  let previousTotal = 0;

  function updateCalculations() {
    if (!selectedZonesList || !calcTotalElem) return;

    const zones = TREATMENT_DATA[currentGender] || [];
    selectedZonesList.innerHTML = '';

    let baseSingleSessionSum = 0;
    const selectedNames = [];

    zones.forEach(zone => {
      if (selectedZoneIds.has(zone.id)) {
        baseSingleSessionSum += zone.price;
        selectedNames.push(zone.name);

        const item = document.createElement('div');
        item.className = 'receipt-item';
        item.innerHTML = `
          <span>${zone.name} (${currentSessions} ses.)</span>
          <span>${(zone.price * currentSessions * (1 - currentDiscount)).toFixed(0)} €</span>
        `;
        selectedZonesList.appendChild(item);
      }
    });

    const subtotalRaw = baseSingleSessionSum * currentSessions;
    const finalTotal = Math.round(subtotalRaw * (1 - currentDiscount));
    const totalSavings = subtotalRaw - finalTotal;

    if (calcSubtotalElem) calcSubtotalElem.textContent = `${subtotalRaw} €`;
    if (calcDiscountElem) calcDiscountElem.textContent = currentDiscount > 0 ? `-${Math.round(currentDiscount * 100)}%` : '0%';
    if (calcSavingsElem) calcSavingsElem.textContent = totalSavings > 0 ? `-${totalSavings} €` : '0 €';

    animateValue(calcTotalElem, previousTotal, finalTotal);
    previousTotal = finalTotal;

    // Save calculation state for prefilling the booking modal
    window.lastCalculatedEstimate = {
      gender: currentGender,
      sessions: currentSessions,
      zones: selectedNames.join(', '),
      total: finalTotal
    };
  }

  // Initialize Calculator
  renderZones();
  updateCalculations();

  // "Reservar este presupuesto" trigger
  if (bookPresupuestoBtn) {
    bookPresupuestoBtn.addEventListener('click', () => {
      openAppointmentModal();
      const zoneInput = document.getElementById('modalZoneInput');
      if (zoneInput && window.lastCalculatedEstimate) {
        zoneInput.value = `${window.lastCalculatedEstimate.zones || 'Consulta personalizada'} (${window.lastCalculatedEstimate.sessions} sesiones - ${window.lastCalculatedEstimate.total}€)`;
      }
    });
  }

  // =========================================================================
  // 4. FITZPATRICK SKIN PHOTOTYPE QUIZ
  // =========================================================================
  const phototypeBtns = document.querySelectorAll('.phototype-btn');
  const resTypeName = document.getElementById('resTypeName');
  const resTypeDesc = document.getElementById('resTypeDesc');
  const resWavelength = document.getElementById('resWavelength');
  const resCooling = document.getElementById('resCooling');
  const resSessions = document.getElementById('resSessions');
  const resSafety = document.getElementById('resSafety');

  phototypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      phototypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const typeId = btn.dataset.phototype;
      const data = PHOTOTYPE_DATA[typeId];

      if (data) {
        if (resTypeName) resTypeName.textContent = data.type;
        if (resTypeDesc) resTypeDesc.textContent = data.description;
        if (resWavelength) resWavelength.textContent = data.wavelength;
        if (resCooling) resCooling.textContent = data.cooling;
        if (resSessions) resSessions.textContent = data.sessions;
        if (resSafety) resSafety.textContent = data.safety;
      }
    });
  });

  // =========================================================================
  // 5. INTERACTIVE BEFORE & AFTER SLIDER
  // =========================================================================
  const baContainer = document.querySelector('.before-after-box');
  const baAfter = document.querySelector('.ba-after');
  const baHandle = document.querySelector('.ba-handle');

  if (baContainer && baAfter && baHandle) {
    let isDragging = false;

    const setPosition = (clientX) => {
      const rect = baContainer.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      percentage = Math.max(0, Math.min(100, percentage));

      baAfter.style.width = `${percentage}%`;
      baHandle.style.left = `${percentage}%`;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setPosition(clientX);
    };

    const onPointerUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseup', onPointerUp);
      document.removeEventListener('touchmove', onPointerMove);
      document.removeEventListener('touchend', onPointerUp);
    };

    const onPointerDown = (e) => {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setPosition(clientX);
      document.addEventListener('mousemove', onPointerMove, { passive: false });
      document.addEventListener('mouseup', onPointerUp);
      document.addEventListener('touchmove', onPointerMove, { passive: false });
      document.addEventListener('touchend', onPointerUp);
    };

    baHandle.addEventListener('mousedown', onPointerDown);
    baHandle.addEventListener('touchstart', onPointerDown, { passive: true });
    baContainer.addEventListener('click', (e) => setPosition(e.clientX));
  }

  // =========================================================================
  // 6. REAL-TIME SEARCHABLE FAQ ACCORDION
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  const faqSearch = document.getElementById('faqSearch');
  const faqEmptyState = document.getElementById('faqEmptyState');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others (single open mode)
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherAns = other.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      }
    });
  });

  // Real-time keyword filter
  if (faqSearch) {
    faqSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      let matchCount = 0;

      faqItems.forEach(item => {
        const questionText = item.querySelector('.faq-question').textContent.toLowerCase();
        const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();

        if (questionText.includes(query) || answerText.includes(query)) {
          item.style.display = 'block';
          matchCount++;
        } else {
          item.style.display = 'none';
        }
      });

      if (faqEmptyState) {
        faqEmptyState.style.display = matchCount === 0 ? 'block' : 'none';
      }
    });
  }

  // =========================================================================
  // 7. APPOINTMENT MODAL & FORM VALIDATION
  // =========================================================================
  const modalOverlay = document.getElementById('appointmentModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const appointmentForm = document.getElementById('appointmentForm');
  const submitBtn = document.getElementById('modalSubmitBtn');
  const toastContainer = document.getElementById('toastContainer');

  function openAppointmentModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    const firstInput = modalOverlay.querySelector('input');
    if (firstInput) setTimeout(() => firstInput.focus(), 150);
  }

  function closeAppointmentModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openAppointmentModal();
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeAppointmentModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeAppointmentModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeAppointmentModal();
      }
    });
  }

  // Set minimum date for appointment to tomorrow
  const dateInput = document.getElementById('modalDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
  }

  // Toast Notification Trigger
  function showToast(title, message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div class="toast-content">
        <strong>${title}</strong>
        <span>${message}</span>
      </div>
    `;

    toastContainer.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  // Form Validation & Submission
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const name = document.getElementById('modalName');
      const phone = document.getElementById('modalPhone');
      const email = document.getElementById('modalEmail');
      const terms = document.getElementById('modalTerms');

      // Helper validation
      const validateField = (input, condition) => {
        const group = input.closest('.form-group') || input.parentElement;
        if (!condition) {
          input.classList.add('error');
          if (group) group.classList.add('has-error');
          isValid = false;
        } else {
          input.classList.remove('error');
          if (group) group.classList.remove('has-error');
        }
      };

      validateField(name, name.value.trim().length >= 3);
      validateField(phone, /^[0-9+\s-]{9,15}$/.test(phone.value.trim()));
      validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));

      if (!terms.checked) {
        terms.focus();
        isValid = false;
      }

      if (!isValid) return;

      // Loading state
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
        </svg> Confirmando Diagnóstico...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        closeAppointmentModal();
        appointmentForm.reset();

        showToast(
          '¡Cita Solicitada con Éxito!',
          `Gracias ${name.value.split(' ')[0]}. Un médico especialista te contactará en menos de 2 horas para confirmar tu cita y prueba gratuita.`
        );
      }, 1200);
    });
  }

  // =========================================================================
  // 8. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // =========================================================================
  const revealElements = document.querySelectorAll('.step-card, .treatment-visual-card, .story-img-card, .tech-card, .pricing-card, .review-card');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      revealObserver.observe(el);
    });
  }
});
