const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const sections = document.querySelectorAll('main section[id]');
const links = document.querySelectorAll('.nav-links a[href^="#"]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));

// Rotating role text: Aspiring Developer <-> Sales Man (typewriter)
(function(){
  const el = document.getElementById('roleText');
  if(!el) return;
  const roles = ['Aspiring Developer', 'Sales Man'];
  let ri = 0, ci = roles[0].length, deleting = true;
  function pop(){
    el.classList.remove('role-pop');
    void el.offsetWidth;
    el.classList.add('role-pop');
    setTimeout(() => el.classList.remove('role-pop'), 600);
  }
  function tick(){
    const full = roles[ri];
    if(deleting){
      ci--;
      el.textContent = full.slice(0, Math.max(0,ci));
      if(ci<=0){ deleting=false; ri=(ri+1)%roles.length; pop(); setTimeout(tick, 450); return; }
      setTimeout(tick, 38);
    } else {
      const target = roles[ri];
      ci++;
      el.textContent = target.slice(0, ci);
      if(ci>=target.length){ deleting=true; setTimeout(tick, 1800); return; }
      setTimeout(tick, 55);
    }
  }
  setTimeout(tick, 1800);
})();
