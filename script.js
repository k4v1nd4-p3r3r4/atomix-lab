// ======= CURSOR =======
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx+'px'; cursor.style.top = my+'px'; });
setInterval(() => {
  rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
}, 16);
document.querySelectorAll('a, button, .service-card, .project-card, .why-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width='6px'; cursor.style.height='6px'; ring.style.width='56px'; ring.style.height='56px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width='12px'; cursor.style.height='12px'; ring.style.width='36px'; ring.style.height='36px'; });
});

// ======= NAVBAR SCROLL =======
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ======= PARTICLE CANVAS BG =======
(function() {
  const canvas = document.getElementById('canvas-bg');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], lines = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  for (let i = 0; i < 80; i++) {
    particles.push({ x: Math.random()*2000, y: Math.random()*1200, vx: (Math.random()-.5)*.3, vy: (Math.random()-.5)*.3, r: Math.random()*1.5+.3, o: Math.random()*.5+.1 });
  }
  function draw() {
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x<0) p.x=W; if (p.x>W) p.x=0;
      if (p.y<0) p.y=H; if (p.y>H) p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(0,240,255,${p.o})`; ctx.fill();
    });
    particles.forEach((a, i) => {
      for (let j = i+1; j < particles.length; j++) {
        const b = particles[j], d = Math.hypot(a.x-b.x, a.y-b.y);
        if (d < 120) {
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle = `rgba(0,240,255,${0.04*(1-d/120)})`; ctx.lineWidth=.5; ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ======= ATOM CANVAS =======
(function() {
  const c = document.getElementById('atom-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  c.width = 340; c.height = 340;
  let t = 0;
  const cx = 170, cy = 170, rx = 130, ry = 44;
  const orbits = [0, Math.PI/3, 2*Math.PI/3];
  function draw() {
    ctx.clearRect(0,0,340,340);
    // Core glow
    const grad = ctx.createRadialGradient(cx,cy,0,cx,cy,40);
    grad.addColorStop(0,'rgba(0,240,255,0.8)'); grad.addColorStop(.4,'rgba(0,240,255,0.3)'); grad.addColorStop(1,'transparent');
    ctx.beginPath(); ctx.arc(cx,cy,40,0,Math.PI*2); ctx.fillStyle=grad; ctx.fill();
    ctx.beginPath(); ctx.arc(cx,cy,8,0,Math.PI*2); ctx.fillStyle='#00F0FF'; ctx.fill();
    orbits.forEach((angle, i) => {
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(angle);
      ctx.beginPath(); ctx.ellipse(0,0,rx,ry,0,0,Math.PI*2);
      ctx.strokeStyle='rgba(0,240,255,0.25)'; ctx.lineWidth=1; ctx.stroke();
      // electron
      const ea = t + i*(Math.PI*2/3);
      const ex = rx*Math.cos(ea), ey = ry*Math.sin(ea);
      const eg = ctx.createRadialGradient(ex,ey,0,ex,ey,10);
      eg.addColorStop(0,'rgba(0,240,255,1)'); eg.addColorStop(1,'transparent');
      ctx.beginPath(); ctx.arc(ex,ey,10,0,Math.PI*2); ctx.fillStyle=eg; ctx.fill();
      ctx.beginPath(); ctx.arc(ex,ey,4,0,Math.PI*2); ctx.fillStyle='#00F0FF'; ctx.fill();
      ctx.restore();
    });
    t += 0.018; requestAnimationFrame(draw);
  }
  draw();
})();

// ======= ORBIT CANVAS =======
(function() {
  const c = document.getElementById('orbit-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  c.width = 480; c.height = 480;
  const cx=240, cy=240;
  const techs = [
    { name:'React', color:'#61DAFB', r:100 },
    { name:'Laravel', color:'#FF2D20', r:150 },
    { name:'Node.js', color:'#8CC84B', r:100 },
    { name:'PostgreSQL', color:'#336791', r:150 },
    { name:'Python', color:'#FFD43B', r:200 },
    { name:'Docker', color:'#2496ED', r:200 },
    { name:'AWS', color:'#FF9900', r:200 },
    { name:'Redis', color:'#DC382D', r:150 },
  ];
  let t = 0;
  const speeds = [0.008, 0.005, 0.007, 0.004, 0.003, 0.006, 0.0025, 0.009];
  const offsets = techs.map((_,i) => (i/techs.length)*Math.PI*2);
  function draw() {
    ctx.clearRect(0,0,480,480);
    // Center core
    const cg = ctx.createRadialGradient(cx,cy,0,cx,cy,30);
    cg.addColorStop(0,'rgba(0,240,255,0.9)'); cg.addColorStop(.5,'rgba(122,0,255,0.4)'); cg.addColorStop(1,'transparent');
    ctx.beginPath(); ctx.arc(cx,cy,30,0,Math.PI*2); ctx.fillStyle=cg; ctx.fill();
    ctx.beginPath(); ctx.arc(cx,cy,12,0,Math.PI*2); ctx.fillStyle='#00F0FF'; ctx.fill();
    // Orbit rings
    [100,150,200].forEach(r => {
      ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
      ctx.strokeStyle='rgba(0,240,255,0.07)'; ctx.lineWidth=1; ctx.setLineDash([4,8]); ctx.stroke(); ctx.setLineDash([]);
    });
    techs.forEach((tech, i) => {
      const angle = offsets[i] + t * speeds[i]*800;
      const x = cx + tech.r * Math.cos(angle);
      const y = cy + tech.r * Math.sin(angle);
      // Trail
      const tg = ctx.createRadialGradient(x,y,0,x,y,18);
      tg.addColorStop(0, tech.color+'44'); tg.addColorStop(1,'transparent');
      ctx.beginPath(); ctx.arc(x,y,18,0,Math.PI*2); ctx.fillStyle=tg; ctx.fill();
      ctx.beginPath(); ctx.arc(x,y,6,0,Math.PI*2); ctx.fillStyle=tech.color; ctx.fill();
      // Label
      ctx.fillStyle = tech.color; ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center'; ctx.fillText(tech.name, x, y+22);
    });
    t += 1; requestAnimationFrame(draw);
  }
  draw();
})();

// ======= SCROLL REVEAL =======
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => io.observe(el));

// ======= STAGGER CHILDREN =======
document.querySelectorAll('.services-grid, .projects-grid, .why-grid, .process-grid').forEach(grid => {
  grid.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (i * 0.1)+'s'; });
});