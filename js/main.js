/* ════════════════════════════════════════════════════════
   Colegio Real de Santiago — Sitio Web Oficial
   Plantel San Juan del Río · 2025
   ════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CURSOR ───────────────────────────────────────── */
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY;
    dot.style.left=mx+'px'; dot.style.top=my+'px';
  });
  (function animCursor(){
    rx+=(mx-rx)*.14; ry+=(my-ry)*.14;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(animCursor);
  })();
  document.querySelectorAll('a,button,.gallery-item,.detail-card,.acc-header,.filter-btn').forEach(el=>{
    el.addEventListener('mouseenter',()=>{
      dot.style.transform='translate(-50%,-50%) scale(2.2)';
      ring.style.transform='translate(-50%,-50%) scale(1.6)';
      ring.style.opacity='.25';
    });
    el.addEventListener('mouseleave',()=>{
      dot.style.transform='translate(-50%,-50%) scale(1)';
      ring.style.transform='translate(-50%,-50%) scale(1)';
      ring.style.opacity='.6';
    });
  });

  /* ── PARTÍCULAS ───────────────────────────────────── */
  const canvas=document.getElementById('particles');
  const ctx=canvas.getContext('2d');
  function resize(){ canvas.width=innerWidth; canvas.height=innerHeight; }
  resize(); window.addEventListener('resize',resize);

  class Particle{
    constructor(init){this.reset(init);}
    reset(init=false){
      this.x=Math.random()*canvas.width;
      this.y=init?Math.random()*canvas.height:canvas.height+10;
      this.size=Math.random()*2.2+.4;
      this.vy=-(Math.random()*.38+.12);
      this.vx=(Math.random()-.5)*.28;
      this.life=0; this.maxLife=Math.random()*420+180;
      this.maxOp=Math.random()*.5+.14; this.op=0;
      this.gold=Math.random()>.42;
    }
    update(){
      this.x+=this.vx; this.y+=this.vy; this.life++;
      const f=70;
      this.op=this.life<f?(this.life/f)*this.maxOp:
               this.life>this.maxLife-f?((this.maxLife-this.life)/f)*this.maxOp:this.maxOp;
      if(this.life>=this.maxLife)this.reset();
    }
    draw(){
      ctx.save(); ctx.globalAlpha=this.op;
      ctx.fillStyle=this.gold?'#c9a84c':'rgba(180,200,255,.9)';
      ctx.shadowColor=this.gold?'#e8c96a':'rgba(200,220,255,.7)';
      ctx.shadowBlur=this.gold?5:3;
      ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill();
      ctx.restore();
    }
  }
  const pts=Array.from({length:55},(_,i)=>new Particle(i<25));
  (function render(){ ctx.clearRect(0,0,canvas.width,canvas.height); pts.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(render); })();

  /* Birretes eliminados — página institucional */

  /* ── NAV ──────────────────────────────────────────── */
  const nav=document.getElementById('nav');
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>60),{passive:true});

  const burger=document.getElementById('navBurger');
  const menu=document.getElementById('navMenu');
  burger.addEventListener('click',()=>menu.classList.toggle('open'));
  menu.querySelectorAll('.nav-link').forEach(l=>l.addEventListener('click',()=>menu.classList.remove('open')));

  /* ── SMOOTH ANCHOR ────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const t=document.querySelector(a.getAttribute('href'));
      if(!t)return; e.preventDefault();
      window.scrollTo({top:t.getBoundingClientRect().top+scrollY-68,behavior:'smooth'});
    });
  });

  /* ── REVEAL ON SCROLL ─────────────────────────────── */
  const ro=new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(!en.isIntersecting)return;
      setTimeout(()=>en.target.classList.add('visible'),+(en.target.dataset.delay||0));
      ro.unobserve(en.target);
    });
  },{threshold:.13,rootMargin:'0px 0px -36px 0px'});
  document.querySelectorAll('.reveal').forEach((el,i)=>{
    el.dataset.delay=(i%4)*90;
    ro.observe(el);
  });

  /* ── COUNTER ANIMADO ──────────────────────────────── */
  const counters=document.querySelectorAll('.stat-num[data-target]');
  const co=new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(!en.isIntersecting)return;
      const target=+en.target.dataset.target, dur=1600;
      const start=performance.now();
      (function tick(now){
        const p=Math.min((now-start)/dur,1);
        const ease=1-Math.pow(1-p,3);
        en.target.textContent=Math.round(ease*target);
        if(p<1)requestAnimationFrame(tick);
      })(start);
      co.unobserve(en.target);
    });
  },{threshold:.5});
  counters.forEach(c=>co.observe(c));

  /* ── GALERÍA ──────────────────────────────────────── */
  // Datos de eventos — reemplaza src con tus fotos reales
  const eventos=[
    {src:'',title:'Día del Estudiante 2024',cat:'cultural',placeholder:true},
    {src:'',title:'Torneo de Futbol Escolar',cat:'deportes',placeholder:true},
    {src:'',title:'Ceremonia de Graduación 2024',cat:'graduacion',placeholder:true},
    {src:'',title:'Feria de Ciencias',cat:'academico',placeholder:true},
    {src:'',title:'Festival Navideño',cat:'cultural',placeholder:true},
    {src:'',title:'Olimpiada de Matemáticas',cat:'academico',placeholder:true},
    {src:'',title:'Campeonato de Basquetbol',cat:'deportes',placeholder:true},
    {src:'',title:'Graduación Primaria 2024',cat:'graduacion',placeholder:true},
    {src:'',title:'Exposición de Arte',cat:'cultural',placeholder:true},
  ];

  const grid=document.getElementById('galleryGrid');
  const placeholderSVG=`<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.2"/><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="1.2"/></svg>`;

  eventos.forEach((ev,i)=>{
    const item=document.createElement('div');
    item.className='gallery-item reveal';
    item.dataset.cat=ev.cat;
    item.dataset.delay=i*60;
    item.dataset.index=i;
    item.innerHTML=ev.placeholder
      ?`<div class="gallery-placeholder">${placeholderSVG}<span>Foto: ${ev.title}</span><span style="font-size:.65rem;margin-top:4px">Agrega tu imagen en img/eventos/</span></div>
         <div class="gallery-overlay"><h4>${ev.title}</h4><span>${catLabel(ev.cat)}</span></div>`
      :`<img src="${ev.src}" alt="${ev.title}" loading="lazy"/>
        <div class="gallery-overlay"><h4>${ev.title}</h4><span>${catLabel(ev.cat)}</span></div>`;
    item.addEventListener('click',()=>openLightbox(i));
    grid.appendChild(item);
    ro.observe(item);
  });

  function catLabel(c){return{cultural:'Cultural',deportes:'Deportes',academico:'Académico',graduacion:'Graduación'}[c]||c;}

  // Filtros con animación
  document.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f=btn.dataset.filter;
      const items=document.querySelectorAll('.gallery-item');

      // Primero fade-out todo
      items.forEach(item=>{
        item.classList.add('gallery-exiting');
      });

      setTimeout(()=>{
        items.forEach(item=>{
          const show=f==='all'||item.dataset.cat===f;
          item.classList.remove('gallery-exiting');
          if(show){
            item.classList.remove('hidden');
            // Stagger de entrada
            const visibles=[...document.querySelectorAll('.gallery-item:not(.hidden)')];
            const idx=visibles.indexOf(item);
            item.style.transitionDelay=(idx*55)+'ms';
            item.classList.add('gallery-entering');
            requestAnimationFrame(()=>requestAnimationFrame(()=>{
              item.classList.remove('gallery-entering');
            }));
          } else {
            item.classList.add('hidden');
            item.style.transitionDelay='0ms';
          }
        });
      }, 220);
    });
  });

  // Lightbox
  const lb=document.getElementById('lightbox');
  const lbOv=document.getElementById('lightboxOverlay');
  const lbImg=document.getElementById('lightboxImg');
  const lbCap=document.getElementById('lightboxCaption');
  let currentIdx=0;

  function openLightbox(i){
    currentIdx=i;
    const ev=eventos[i];
    lbImg.src=ev.src||'';
    lbImg.alt=ev.title;
    lbImg.style.display=ev.placeholder?'none':'block';
    lbCap.textContent=ev.title;
    lb.classList.add('active');
    lbOv.classList.add('active');
    document.body.style.overflow='hidden';
  }
  function closeLightbox(){
    lb.classList.remove('active');
    lbOv.classList.remove('active');
    document.body.style.overflow='';
  }
  document.getElementById('lightboxClose').addEventListener('click',closeLightbox);
  lbOv.addEventListener('click',closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click',()=>{
    currentIdx=(currentIdx-1+eventos.length)%eventos.length;
    openLightbox(currentIdx);
  });
  document.getElementById('lightboxNext').addEventListener('click',()=>{
    currentIdx=(currentIdx+1)%eventos.length;
    openLightbox(currentIdx);
  });
  document.addEventListener('keydown',e=>{
    if(!lb.classList.contains('active'))return;
    if(e.key==='Escape')closeLightbox();
    if(e.key==='ArrowLeft')document.getElementById('lightboxPrev').click();
    if(e.key==='ArrowRight')document.getElementById('lightboxNext').click();
  });

  /* ── ACCORDION ────────────────────────────────────── */
  document.querySelectorAll('.acc-header').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const item=btn.closest('.acc-item');
      const wasOpen=item.classList.contains('open');
      document.querySelectorAll('.acc-item').forEach(i=>i.classList.remove('open'));
      if(!wasOpen)item.classList.add('open');
    });
  });

  /* ── FORMULARIO DE CONTACTO ───────────────────────── */
  document.getElementById('contactForm').addEventListener('submit',e=>{
    e.preventDefault();
    const success=document.getElementById('formSuccess');
    success.classList.add('show');
    e.target.reset();
    setTimeout(()=>success.classList.remove('show'),5000);
  });

  /* ── TILT EN TARJETAS ─────────────────────────────── */
  document.querySelectorAll('.plantel-card,.mv-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const x=((e.clientX-r.left)/r.width-.5)*10;
      const y=((e.clientY-r.top)/r.height-.5)*10;
      card.style.transform=`perspective(700px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave',()=>card.style.transform='');
  });

});
