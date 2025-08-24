// Persistencia de tema (día/noche)
const root = document.documentElement;
const modeBtn = document.getElementById('modeBtn');

const saved = localStorage.getItem('theme');
if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    modeBtn.textContent = saved === 'dark' ? '☀️' : '🌙';
}

modeBtn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    modeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
});

// Menú hamburguesa en móvil
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.getElementById('navLinks');
const links = [...document.querySelectorAll('.nav-links a')];
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));

// Cerrar menú al hacer clic en un enlace (solo mobile, no afecta desktop ni scroll activo)
links.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 640) {
      navLinks.classList.remove('open');
    }
  });
});

// Scroll activo (mantiene highlight en desktop y mobile)
const setActive = () => {
    const y = window.scrollY + 120;
    links.forEach(a => {
        const id = a.getAttribute('href');
        const el = document.querySelector(id);
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
            links.forEach(l => l.classList.remove('active'));
            a.classList.add('active');
        }
    });
};
window.addEventListener('scroll', setActive);

// Proyectos demo (puedes reemplazar por tus propios datos)
const projects = [
    { title: 'Postula Smart', cat: 'diseno', tags: ['Figma', 'UI Kit'], img: './Assets/images/Postula_Smart_2.jpg', src: 'https://www.behance.net/gallery/196849055/Postula-Smart-UX-UI-Design' },
    { title: 'Universidades Licenciadas en el Perú', cat: 'datos', tags: ['Power BI', 'DAX', 'Excel'], img: './Assets/images/sunedu_2.jpg' },
    { title: 'Portal Web de la Municipalidad Distrital de Quilmaná', cat: 'desarrollo', tags: ['HTML', 'CSS', 'JS', 'Boostrap', 'PHP', 'MySQL'], img: './Assets/images/mdq_2.jpg' , src: 'https://www.behance.net/gallery/230457805/Portal-Web-de-la-Municipalidad-Distrital-de-Quilmana' },
    { title: 'Sistema de Ventas de la Agencia Vive tu Aventura', cat: 'diseno', tags: ['Figma', 'Prototype', 'UI Kit'], img: './Assets/images/agencia_2.jpg', src: 'https://www.behance.net/gallery/202987841/Sistema-de-ventas-Vive-tu-aventura-Lunahuana' },
    { title: 'Publicidad para Redes Sociales', cat: 'diseno', tags: ['Canva', 'Adobe Illustrator', 'Figma'], img: './Assets/images/aruma_2.jpg', src: 'https://www.behance.net/gallery/218757957/Carrusel-para-redes-sociales-ARUMA' },
    { title: 'Data Reporting: Vive tu Aventura Lunahuaná', cat: 'datos', tags: ['Excel', 'VBA', 'Tablas dinámicas', 'Macros'],  img: './Assets/images/excel_vive.jpg', src: 'https://www.behance.net/gallery/232571569/Data-Reporting-Vive-tu-Aventura-Lunahuana' },
    { title: 'Data Reporting: Covid-19 en el Mundo', cat: 'datos', tags: ['Excel', 'Power BI', 'Base de Datos'],  img: './Assets/images/covid.jpg', src: 'https://www.behance.net/gallery/232629925/Data-Reporting-Covid19-en-el-mundo' },
     { title: 'Data Analytics: Herramientas Aplicadas', cat: 'datos', tags: ['Excel', 'Power BI', 'Base de Datos', 'SQL Server'],  img: './Assets/images/proyectos.jpg', src: 'https://www.behance.net/gallery/233211341/Data-Analytics-Ejercicios-Practicos' }
];

const grid = document.getElementById('projectGrid');
function render(list) {
  grid.innerHTML = '';
  list.forEach(p => {
    const hasLink = Boolean(p.src);
    const wrapper = document.createElement(hasLink ? 'a' : 'div');
    if (hasLink) {
      wrapper.href = p.src;
      wrapper.target = '_blank';
      wrapper.rel = 'noopener noreferrer';
      wrapper.className = 'proj-link';
      wrapper.setAttribute('aria-label', `Abrir proyecto: ${p.title}`);
    }

    const card = document.createElement('article');
    card.className = 'proj';

    const bg = p.img ? `style="background-image:url('${p.img}')" ` : '';
    card.innerHTML = `
      <div class="thumb" ${bg}></div>
      <div class="content">
        <h3>${p.title}</h3>
        <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
    `;

    wrapper.appendChild(card);
    grid.appendChild(wrapper);
  });
}


render(projects);

(() => {
  const tabs = [...document.querySelectorAll('.tabs .tab')];

  const applyFilter = (value) => {
    tabs.forEach(t => t.classList.toggle('is-active', t.dataset.value === value));
    const data = (value === 'all') ? projects : projects.filter(p => p.cat === value);
    render(data);
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => applyFilter(tab.dataset.value));
  });

  const moveFocus = (idx, dir) => {
    const next = (idx + dir + tabs.length) % tabs.length;
    tabs[next].focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); moveFocus(i, +1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); moveFocus(i, -1); }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        applyFilter(tab.dataset.value);
      }
    });
  });

  applyFilter('all'); // estado inicial
})();


document.getElementById('year').textContent = new Date().getFullYear();

// tipeo
(function typeNameOnce(){
  const el = document.getElementById('typeName');
  if (!el) return;

  const text = el.getAttribute('aria-label') || 'Jeanettis';
  const speed = 700; // ms por letra

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { el.textContent = text; return; }

  el.textContent = '';
  let i = 0;
  (function tick(){
    if (i <= text.length){
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(tick, speed);
    }
  })();
})();


