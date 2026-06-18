// Nav: backdrop + scroll class
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  })
);

// Active nav link — highlight the section currently in view
const sections = document.querySelectorAll('section[id]');
const anchors  = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      anchors.forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`)
      );
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => activeObserver.observe(s));

// Scroll-reveal for content sections
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// Stagger reveal for exp-items so they enter one after another
document.querySelectorAll('.exp-item.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
});
