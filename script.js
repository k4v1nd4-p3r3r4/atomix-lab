// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

if (cursor && ring) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  const smoothRing = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(smoothRing);
  };
  smoothRing();

  // hover effect on interactive elements
  const interactive = document.querySelectorAll('a, button, .service-item, .work-card, .about-card, input, textarea, select, .nav-mobile-toggle');
  interactive.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '4px';
      cursor.style.height = '4px';
      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = 'rgba(95, 92, 255, 0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '8px';
      cursor.style.height = '8px';
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.borderColor = 'rgba(95, 92, 255, 0.5)';
    });
  });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU TOGGLE =====
const mobileToggle = document.getElementById('mobile-toggle');
if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    
    // Create mobile menu if it doesn't exist
    let mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenu) {
      mobileMenu = document.createElement('div');
      mobileMenu.className = 'mobile-menu';
      mobileMenu.innerHTML = `
        <ul class="mobile-nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#tech">Tech Stack</a></li>
          <li><a href="#contact" class="mobile-nav-cta">Contact</a></li>
        </ul>
      `;
      document.body.appendChild(mobileMenu);
      
      // Add styles for mobile menu
      const style = document.createElement('style');
      style.textContent = `
        .mobile-menu {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: var(--bg-elevated);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-dim);
          padding: 30px 24px;
          z-index: 99;
          transform: translateY(-100%);
          opacity: 0;
          transition: all 0.3s ease;
          pointer-events: none;
        }
        
        .mobile-menu.active {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        
        .mobile-nav-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
        }
        
        .mobile-nav-links a {
          text-decoration: none;
          color: var(--text-body);
          font-size: 1.2rem;
          font-weight: 500;
        }
        
        .mobile-nav-cta {
          border: 1.5px solid var(--primary);
          padding: 10px 30px;
          border-radius: 60px;
          color: var(--primary) !important;
          display: inline-block;
        }
      `;
      document.head.appendChild(style);
    }
    
    mobileMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = mobileToggle.querySelectorAll('span');
    if (mobileToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// ===== ATOM CANVAS =====
(function initAtomCanvas() {
  const canvas = document.getElementById('atom-canvas');
  if (!canvas) return;

  // Set canvas dimensions
  const size = Math.min(420, window.innerWidth * 0.8);
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  let t = 0;
  const cx = size / 2;
  const cy = size / 2;
  const rx = size * 0.35;
  const ry = size * 0.12;
  const orbits = [0, Math.PI / 3, (2 * Math.PI) / 3];

  function draw() {
    ctx.clearRect(0, 0, size, size);

    // Core glow
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.15);
    grad.addColorStop(0, 'rgba(95, 92, 255, 0.8)');
    grad.addColorStop(0.4, 'rgba(95, 92, 255, 0.3)');
    grad.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Core
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.03, 0, Math.PI * 2);
    ctx.fillStyle = '#5f5cff';
    ctx.fill();

    // Orbits and electrons
    orbits.forEach((angle, i) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // Draw orbit ellipse
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(95, 92, 255, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Electron position
      const ea = t + i * ((Math.PI * 2) / 3);
      const ex = rx * Math.cos(ea);
      const ey = ry * Math.sin(ea);

      // Electron glow
      const eg = ctx.createRadialGradient(ex, ey, 0, ex, ey, size * 0.04);
      eg.addColorStop(0, 'rgba(95, 92, 255, 1)');
      eg.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(ex, ey, size * 0.04, 0, Math.PI * 2);
      ctx.fillStyle = eg;
      ctx.fill();

      // Electron core
      ctx.beginPath();
      ctx.arc(ex, ey, size * 0.015, 0, Math.PI * 2);
      ctx.fillStyle = '#5f5cff';
      ctx.fill();

      ctx.restore();
    });

    t += 0.015;
    requestAnimationFrame(draw);
  }

  draw();

  // Resize handler
  window.addEventListener('resize', () => {
    const newSize = Math.min(420, window.innerWidth * 0.8);
    canvas.width = newSize;
    canvas.height = newSize;
    // Reset dimensions and let draw continue
  });
})();

// ===== BACKGROUND CANVAS (particle network) =====
(function initBgCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    
    // Reinitialize particles for new size
    particles = [];
    const PARTICLE_COUNT = Math.min(40, Math.floor(width * height / 20000));
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 0.8,
      });
    }
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(95, 92, 255, 0.3)';
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(95, 92, 255, ${0.1 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }

  drawParticles();
})();

// ===== SCROLL REVEAL (intersection observer) =====
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px',
  }
);

revealElements.forEach((el) => observer.observe(el));

// ===== STAGGER CHILDREN =====
document.querySelectorAll('.services-detailed, .work-grid, .about-grid, .tech-grid').forEach((grid) => {
  const children = grid.children;
  for (let i = 0; i < children.length; i++) {
    if (children[i].classList.contains('reveal')) {
      children[i].style.transitionDelay = `${i * 0.08}s`;
    }
  }
});

// ===== FORM SUBMISSION =====
const demoForm = document.getElementById('demo-form');
if (demoForm) {
  demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✨ Thank you! We will contact you within 24 hours.');
    demoForm.reset();
  });
}

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.style.color = 'var(--primary-light)';
      } else {
        navLink.style.color = 'var(--text-body)';
      }
    }
  });
});

// ===== CLOSE MOBILE MENU WHEN CLICKING A LINK =====
document.addEventListener('click', (e) => {
  if (e.target.matches('.mobile-nav-links a')) {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileToggle = document.getElementById('mobile-toggle');
    
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
      
      const spans = mobileToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


// ===== NEWSLETTER FORM SUBMISSION =====
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    alert(`✨ Thank you for subscribing! We'll send updates to ${email}`);
    newsletterForm.reset();
  });
}