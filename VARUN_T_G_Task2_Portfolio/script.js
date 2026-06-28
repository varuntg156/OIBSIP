const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('active');
    const isOpen = siteNav.classList.contains('active');
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
}

const links = document.querySelectorAll('.site-nav a');
for (const link of links) {
  link.addEventListener('click', () => {
    siteNav.classList.remove('active');
  });
}
