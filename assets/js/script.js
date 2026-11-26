/* Fotos e vídeos dos trabalhos */
const CASES = [
  { t: "Substituição de iluminação", cat: "Iluminação", img: "", video: "assets/videos/substituicao-iluminacao.mp4" },
  { t: "Iluminação sob medida", cat: "Iluminação", img: "assets/img/projeto-iluminacao-1.jpeg", video: "" },
  { t: "Instalação de luminárias", cat: "Iluminação", img: "assets/img/projeto-iluminacao-2.jpeg", video: "" },
  { t: "Instalação de motor de portão", cat: "Portões", img: "", video: "assets/videos/portao-instalacao.mp4" },
  { t: "Portão deslizante", cat: "Portões", img: "assets/img/portao-deslizante.svg", video: "" },
  { t: "Instalação de cerca e alarme", cat: "Cercas", img: "assets/img/cerca-alarme.svg", video: "" },
  { t: "Instalação organizada e limpa", cat: "Instalação limpa", img: "assets/img/instalacao-luminarias.jpeg", video: "" }
];
const grid=document.getElementById('cases-grid');
const filters=document.getElementById('filters');
const ph='<div class="ph"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 8"/></svg>Sua foto aqui</div>';
grid.innerHTML=CASES.map(c=>{
const m=c.video?`<video src="${c.video}" muted loop playsinline preload="metadata" controls></video>`:c.img?`<img src="${c.img}" alt="${c.t}" loading="lazy">`:ph;
return `<article class="case rv${c.video?' has-video':''}" data-cat="${c.cat}">${m}<div class="cap"><small>${c.cat}</small><h4>${c.t}</h4></div></article>`}).join('');
['Todos',...new Set(CASES.map(c=>c.cat))].forEach((category,index)=>{
  const button=document.createElement('button');
  button.type='button';
  button.textContent=category;
  button.setAttribute('aria-pressed',String(index===0));
  if(index===0) button.classList.add('on');
  button.addEventListener('click',()=>{
    filters.querySelectorAll('button').forEach(item=>{
      const active=item===button;
      item.classList.toggle('on',active);
      item.setAttribute('aria-pressed',String(active));
    });
    grid.querySelectorAll('.case').forEach(item=>{
      item.classList.toggle('hide',index!==0&&item.dataset.cat!==category);
    });
  });
  filters.appendChild(button);
});
/* menu mobile */
const nav=document.getElementById('nav');
document.getElementById('mb').onclick=()=>nav.classList.toggle('open');
nav.querySelectorAll('a').forEach(a=>a.onclick=()=>nav.classList.remove('open'));
/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
document.getElementById('y').textContent=new Date().getFullYear();

document.getElementById('whatsapp-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const message = [
    `Olá! Meu nome é ${data.get('name')}.`,
    data.get('phone') ? `Meu telefone: ${data.get('phone')}.` : '',
    `Preciso de: ${data.get('message')}`
  ].filter(Boolean).join('\n');
  const url = `https://wa.me/5519996852202?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});
