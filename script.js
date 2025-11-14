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
});
