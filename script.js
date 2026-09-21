// ============================================================
// EmailJS init (contact form)
// ============================================================
if (window.emailjs) {
    emailjs.init("ERXE5QuyI7eXpXQJs");
}

// ============================================================
// Hero typed text
// ============================================================
if (window.Typed) {
    new Typed('#element', {
        strings: [
            'ML pipelines',
            'AI agents',
            'research prototypes',
            'RAG systems',
            'full-stack apps'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1400,
        loop: true,
    });
}

// ============================================================
// Respect reduced-motion preference
// ============================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

// ============================================================
// Scroll progress bar
// ============================================================
const scrollProgressBar = document.getElementById('scrollProgressBar');

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgressBar) scrollProgressBar.style.width = pct + '%';
}

// ============================================================
// Scrollspy — highlight active nav link
// ============================================================
const navAnchors = document.querySelectorAll('nav a[data-nav]');
const sections = Array.from(navAnchors)
    .map(a => document.getElementById(a.getAttribute('data-nav')))
    .filter(Boolean);

function updateScrollspy() {
    let currentId = sections[0] ? sections[0].id : null;
    const scrollPos = window.scrollY + window.innerHeight * 0.35;

    sections.forEach(sec => {
        if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });

    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('data-nav') === currentId);
    });
}

// ============================================================
// Back to top button
// ============================================================
const backToTop = document.getElementById('backToTop');

function updateBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle('visible', window.scrollY > 500);
}

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
}

window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateScrollspy();
    updateBackToTop();
}, { passive: true });

updateScrollProgress();
updateScrollspy();
updateBackToTop();

// ============================================================
// Reveal-on-scroll (IntersectionObserver)
// ============================================================
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('inView'), (i % 6) * 70);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('inView'));
}

// ============================================================
// Animated stat counters
// ============================================================
const counterEls = document.querySelectorAll('.factNum[data-count]');

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const start = parseInt(el.getAttribute('data-start') || '0', 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1200;
    const startTime = performance.now();

    function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(start + (target - start) * eased);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
    }

    if (prefersReducedMotion) {
        el.textContent = target + suffix;
    } else {
        requestAnimationFrame(tick);
    }
}

if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    counterEls.forEach(el => counterObserver.observe(el));
}

// ============================================================
// Custom cursor
// ============================================================
const cursorDot = document.querySelector('.cursorDot');
const cursorRing = document.querySelector('.cursorRing');

if (isFinePointer && cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .projectCard, .chip, .tilt').forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
    });
}

// ============================================================
// Magnetic buttons
// ============================================================
if (isFinePointer && !prefersReducedMotion) {
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================================
// Project card tilt effect
// ============================================================
if (isFinePointer && !prefersReducedMotion) {
    document.querySelectorAll('.tilt').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateX(${py * -6}deg) rotateY(${px * 8}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ============================================================
// Contact form (EmailJS)
// ============================================================
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (name && email && message) {
            const templateParams = { name, email, message };

            emailjs.send('service_a4u7y3q', 'template_xf34a4r', templateParams)
                .then(() => {
                    formMessage.style.color = '#5eead4';
                    formMessage.textContent = `Thanks ${name}! Your message has been sent.`;
                    form.reset();
                }, (error) => {
                    formMessage.style.color = '#f472b6';
                    formMessage.textContent = 'Oops! Something went wrong. Try again.';
                    console.error(error);
                });
        } else {
            formMessage.style.color = '#f472b6';
            formMessage.textContent = 'Please fill in all fields.';
        }
    });
}

// ============================================================
// Living background — drifting constellation / trajectory field
// ============================================================
(function initBackgroundfield() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, particles, mouse = { x: null, y: null };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createParticles() {
        const count = prefersReducedMotion ? 0 : Math.min(70, Math.floor((width * height) / 22000));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            r: Math.random() * 1.4 + 0.6,
        }));
    }

    function step() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (mouse.x !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const force = (120 - dist) / 120;
                    p.x += (dx / dist) * force * 0.6;
                    p.y += (dy / dist) * force * 0.6;
                }
            }

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
        });

        ctx.fillStyle = 'rgba(94, 234, 212, 0.55)';
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });

        const maxDist = 130;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i], b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    ctx.strokeStyle = `rgba(167, 139, 250, ${0.14 * (1 - dist / maxDist)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(step);
    }

    resize();
    createParticles();
    window.addEventListener('resize', () => { resize(); createParticles(); });

    if (isFinePointer) {
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
    }

    if (particles.length > 0) {
        requestAnimationFrame(step);
    }
})();

// ============================================================
// Research section — illustrative trajectory-prediction sketch
// (a simplified visual analogy, not live model output)
// ============================================================
(function initTrajectoryCanvas() {
    const canvas = document.getElementById('trajectoryCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, t = 0;

    function resize() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * devicePixelRatio;
        canvas.height = rect.height * devicePixelRatio;
        ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        width = rect.width;
        height = rect.height;
    }

    function actualPath(progress) {
        const x = 20 + progress * (width - 40);
        const y = height / 2 + Math.sin(progress * Math.PI * 2.4) * (height * 0.24);
        return { x, y };
    }

    function predictedPath(progress) {
        const x = 20 + progress * (width - 40);
        const y = height / 2 + Math.sin(progress * Math.PI * 2.4 + 0.35) * (height * 0.19);
        return { x, y };
    }

    function drawPath(fn, color, dashed) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        if (dashed) ctx.setLineDash([5, 5]); else ctx.setLineDash([]);
        for (let i = 0; i <= 100; i++) {
            const p = fn(i / 100);
            if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
    }

    function render() {
        ctx.clearRect(0, 0, width, height);
        drawPath(actualPath, 'rgba(94, 234, 212, 0.55)', false);
        drawPath(predictedPath, 'rgba(244, 114, 182, 0.55)', true);

        const progress = (Math.sin(t) + 1) / 2;
        const a = actualPath(progress);
        const b = predictedPath(progress);

        ctx.fillStyle = '#5eead4';
        ctx.beginPath();
        ctx.arc(a.x, a.y, 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f472b6';
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4.5, 0, Math.PI * 2);
        ctx.fill();

        t += prefersReducedMotion ? 0 : 0.006;
        requestAnimationFrame(render);
    }

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(render);
})();
