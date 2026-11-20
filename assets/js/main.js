/**
 * Funngro Smart Website - Core Interactive Scripts
 * Earnings Calculator, Project Estimator, Modals, Accordions & Dynamic Slider Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initFloatingHeaderScroll();
  initSliderNavigation();
  initMobileMenu();
  initFaqAccordion();
  initTeenEarningsCalculator();
  initCompanyProjectEstimator();
  initModals();
  initAnimatedCounters();
});

/* --------------------------------------------------------------------------
   Floating Transparent Header on Scroll
   -------------------------------------------------------------------------- */
function initFloatingHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 15) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   Dynamic Slider Navigation (Segmented Control)
   -------------------------------------------------------------------------- */
function initSliderNavigation() {
  const container = document.querySelector('.slider-nav-container');
  const indicator = document.querySelector('.slider-indicator');
  const tabs = document.querySelectorAll('.slider-tab-btn');

  if (!container || !indicator || !tabs.length) return;

  function updateIndicator(targetTab) {
    if (!targetTab) return;
    const tabRect = targetTab.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const leftOffset = tabRect.left - containerRect.left;
    const width = tabRect.width;

    indicator.style.transform = `translateX(${leftOffset - 4}px)`;
    indicator.style.width = `${width}px`;

    // Dynamic color matching
    const target = targetTab.getAttribute('data-target');
    indicator.className = 'slider-indicator';
    if (target === 'teen') {
      indicator.classList.add('indicator-teen');
    } else if (target === 'company') {
      indicator.classList.add('indicator-business');
    } else if (target === 'audit') {
      indicator.classList.add('indicator-audit');
    }
  }

  // Set initial position
  const activeTab = document.querySelector('.slider-tab-btn.active') || tabs[0];
  setTimeout(() => updateIndicator(activeTab), 50);

  // Click/tap handler to slide active indicator
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      updateIndicator(tab);
    });
  });

  // Resize handler
  window.addEventListener('resize', () => {
    const currentActive = document.querySelector('.slider-tab-btn.active') || tabs[0];
    updateIndicator(currentActive);
  });
}

/* --------------------------------------------------------------------------
   Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-drawer');

  if (!menuBtn || !drawer) return;

  const hamburgerSvg = `<svg class="svg-icon" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
  const closeSvg = `<svg class="svg-icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

  menuBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    menuBtn.innerHTML = isOpen ? closeSvg : hamburgerSvg;
    menuBtn.setAttribute('aria-expanded', isOpen);
  });
}

/* --------------------------------------------------------------------------
   FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(el => el.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Interactive Teen Earnings Calculator (Teen Page)
   -------------------------------------------------------------------------- */
function initTeenEarningsCalculator() {
  const hoursSlider = document.getElementById('teen-hours-slider');
  const hoursDisplay = document.getElementById('teen-hours-value');
  const skillSelect = document.getElementById('teen-skill-select');
  const earningOutput = document.getElementById('teen-earning-output');
  const badgeOutput = document.getElementById('teen-badge-output');
  const projectCountOutput = document.getElementById('teen-projects-count');

  if (!hoursSlider || !skillSelect || !earningOutput) return;

  const skillMultipliers = {
    webdev: 350,       // Web & App Dev
    content: 200,      // Content & Copywriting
    design: 250,       // Graphic Design & Canva
    video: 300,        // Video & Reels Editing
    testing: 220,      // QA & App Testing
    social: 180        // Social Media & Influencer
  };

  function calculateEarnings() {
    const hours = parseInt(hoursSlider.value, 10);
    const skill = skillSelect.value;
    const rate = skillMultipliers[skill] || 200;

    hoursDisplay.textContent = `${hours} hrs/week`;

    const monthlyTotal = Math.round(hours * 4 * rate);
    const approxProjects = Math.max(1, Math.round(hours * 4 / 6));

    earningOutput.textContent = `₹${monthlyTotal.toLocaleString('en-IN')}`;
    if (projectCountOutput) {
      projectCountOutput.textContent = `${approxProjects}+ Projects / Month`;
    }

    if (badgeOutput) {
      if (hours <= 5) {
        badgeOutput.textContent = 'Starter Teenlancer';
        badgeOutput.style.color = '#34d399';
      } else if (hours <= 12) {
        badgeOutput.textContent = 'Growth Teenlancer';
        badgeOutput.style.color = '#60a5fa';
      } else {
        badgeOutput.textContent = 'Pro Creator & Teen Tech Lead';
        badgeOutput.style.color = '#fbbf24';
      }
    }
  }

  hoursSlider.addEventListener('input', calculateEarnings);
  skillSelect.addEventListener('change', calculateEarnings);
  calculateEarnings();
}

/* --------------------------------------------------------------------------
   Interactive Company Project Estimator (Company Page)
   -------------------------------------------------------------------------- */
function initCompanyProjectEstimator() {
  const serviceType = document.getElementById('company-service-type');
  const projectScale = document.getElementById('company-project-scale');
  const costOutput = document.getElementById('company-cost-output');
  const turnaroundOutput = document.getElementById('company-turnaround-output');
  const poolOutput = document.getElementById('company-pool-output');

  if (!serviceType || !projectScale || !costOutput) return;

  const costMatrix = {
    webdev: { starter: 4999, growth: 12999, enterprise: 29999 },
    content: { starter: 1999, growth: 4999, enterprise: 12999 },
    design: { starter: 2499, growth: 6499, enterprise: 15999 },
    testing: { starter: 2999, growth: 7999, enterprise: 18999 },
    video: { starter: 3499, growth: 8999, enterprise: 21999 }
  };

  const turnaroundMatrix = {
    starter: '24 - 48 Hours',
    growth: '3 - 5 Days',
    enterprise: '7 - 10 Days'
  };

  const poolMatrix = {
    starter: '10+ Verified Teens',
    growth: '45+ Specialized Creators',
    enterprise: '150+ Teen Pod Network'
  };

  function updateCompanyEstimate() {
    const service = serviceType.value;
    const scale = projectScale.value;

    const baseCost = costMatrix[service] ? costMatrix[service][scale] : 4999;
    costOutput.textContent = `₹${baseCost.toLocaleString('en-IN')}`;

    if (turnaroundOutput) {
      turnaroundOutput.textContent = turnaroundMatrix[scale] || '48 Hours';
    }
    if (poolOutput) {
      poolOutput.textContent = poolMatrix[scale] || '25+ Teens Available';
    }
  }

  serviceType.addEventListener('change', updateCompanyEstimate);
  projectScale.addEventListener('change', updateCompanyEstimate);
  updateCompanyEstimate();
}

/* --------------------------------------------------------------------------
   Modal Controller
   -------------------------------------------------------------------------- */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloses = document.querySelectorAll('.modal-close, [data-modal-close]');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal-target');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.add('active');
      }
    });
  });

  modalCloses.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal-overlay');
      if (parentModal) {
        parentModal.classList.remove('active');
      }
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Animated Number Counters
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        let count = 0;
        const duration = 1200;
        const step = target / (duration / 16);

        function update() {
          count += step;
          if (count < target) {
            el.textContent = `${prefix}${Math.round(count * 10) / 10}${suffix}`;
            requestAnimationFrame(update);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        }
        update();
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}
