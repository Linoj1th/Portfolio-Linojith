document.addEventListener("DOMContentLoaded", () => {
  const phrases = ["startups.", "digital brands.", "businesses."];
  const target = document.getElementById("animated-text");

  const typingSpeed = 100;
  const erasingSpeed = 60;
  const delayBetween = 2000;
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = phrases[phraseIndex];
    
    if (!isDeleting && charIndex < current.length) {
      target.textContent += current.charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } 
    else if (isDeleting && charIndex > 0) {
      target.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, erasingSpeed);
    } 
    else {
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(type, delayBetween);
      } else {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, typingSpeed);
      }
    }
  }

  type();
});

// script.js (replace existing content with this)

// Helper: animate number using requestAnimationFrame
function animateNumber(el, to, duration = 1200) {
  const start = performance.now();
  const from = 0;
  function tick(now) {
    const elapsed = Math.min(now - start, duration);
    const progress = elapsed / duration;
    const current = Math.floor(from + (to - from) * progress);
    el.textContent = current + (to ? "+" : "");
    if (elapsed < duration) requestAnimationFrame(tick);
    else el.textContent = to + "+";
  }
  requestAnimationFrame(tick);
}

// IntersectionObserver options
const revealOptions = {
  root: null,
  rootMargin: '0px 0px -100px 0px', // trigger a bit before element fully in view
  threshold: 0
};

// Observe and reveal elements with .fade-up
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      obs.unobserve(entry.target);
    }
  });
}, revealOptions);

// Observe about section to start counters
const aboutObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // start counters
      const counters = document.querySelectorAll('.about .stat-box h4[data-count]');
      counters.forEach(c => {
        const target = parseInt(c.dataset.count, 10) || 0;
        // prevent running twice
        if (!c.classList.contains('counted')) {
          c.classList.add('counted');
          animateNumber(c, target, 1200);
        }
      });
      obs.unobserve(entry.target);
    }
  });
}, { root: null, rootMargin: '0px 0px -120px 0px', threshold: 0 });

document.addEventListener('DOMContentLoaded', () => {
  // attach reveal observer to all fade-up elements
  document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

  // attach about section observer
  const aboutSection = document.querySelector('.about');
  if (aboutSection) aboutObserver.observe(aboutSection);
  
  // Project modal preview logic for work.html
  const projectData = {
    project1: {
      title: 'Responsive E‑commerce',
      img: './logos/icons8-web-development-50.png',
      desc: 'Design and build of a fast, accessible store focusing on performance and accessibility.',
      link: './projects/project1.html'
    },
    project2: {
      title: 'Startup Landing',
      img: './logos/icons8-internet-50.png',
      desc: 'Landing page with clear messaging, lead-capture and lightweight analytics.',
      link: './projects/project2.html'
    },
    project3: {
      title: 'Dashboard UI',
      img: './logos/icons8-web-analytics-50.png',
      desc: 'Admin dashboard with charts, filters, and responsive controls.',
      link: './projects/project3.html'
    },
    project4: {
      title: 'Brand Website',
      img: './logos/icons8-backend-development-50.png',
      desc: 'Full brand site with animations and SEO optimizations.',
      link: './projects/project4.html'
    },
    project5: {
      title: 'Portfolio Microsite',
      img: './logos/icons8-source-code-50.png',
      desc: 'Micro-interactions and rapid prototyping for campaigns.',
      link: './projects/project5.html'
    },
    project6: {
      title: 'Landing A/B',
      img: './logos/icons8-javascript-50.png',
      desc: 'A/B-tested landing pages to improve conversion flows.',
      link: './projects/project6.html'
    }
  };

  const modal = document.getElementById('project-modal');
  if (modal) {
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDesc = modal.querySelector('.modal-desc');
    const modalLink = modal.querySelector('.modal-link');
    const closeBtn = modal.querySelector('.modal-close');

    function openModal(data) {
      modalImage.src = data.img;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;
      modalLink.href = data.link;
      modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
      modal.setAttribute('aria-hidden', 'true');
    }

    closeBtn.addEventListener('click', closeModal);
    modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // if clicking the inner link, let it navigate to detail page
        const anchor = e.target.closest('a');
        if (anchor) return;
        const id = card.dataset.project;
        if (id && projectData[id]) openModal(projectData[id]);
      });
    });
  }

  // Smooth scroll with offset to account for nav height
  const navEl = document.querySelector('nav');
  function getNavHeight() {
    return navEl ? navEl.offsetHeight : 0;
  }

  function scrollToHash(hash) {
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!target) return;
    const navH = getNavHeight();
    const y = window.pageYOffset + target.getBoundingClientRect().top - navH - 12;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  // Intercept same-page anchor clicks to apply offset
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        ev.preventDefault();
        history.pushState(null, '', href);
        scrollToHash(href);
      }
    });
  });

  // If page loads with a hash, scroll to it with offset
  if (location.hash) {
    setTimeout(() => scrollToHash(location.hash), 60);
  }

  // Also handle back/forward hash changes
  window.addEventListener('hashchange', () => scrollToHash(location.hash));
});
