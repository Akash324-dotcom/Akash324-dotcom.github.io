// ============================================================
// EmailJS init (contact form)
// ============================================================
if (window.emailjs) {
    emailjs.init("ERXE5QuyI7eXpXQJs");
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const isMobileViewport = () => window.innerWidth <= 900;

// ============================================================
// Preloader — quick counter, skipped after first visit this tab
// ============================================================
(function initPreloader() {
    const preloader = document.getElementById('preloader');
    const countEl = document.getElementById('preloaderCount');
    if (!preloader) return;

    const alreadySeen = sessionStorage.getItem('seenPreloader');

    if (prefersReducedMotion || alreadySeen) {
        preloader.remove();
        return;
    }

    sessionStorage.setItem('seenPreloader', '1');
    let count = 0;
    const interval = setInterval(() => {
        count += Math.ceil(Math.random() * 18);
        if (count >= 100) {
            count = 100;
            clearInterval(interval);
            if (countEl) countEl.textContent = '100';
            setTimeout(() => {
                preloader.classList.add('done');
                setTimeout(() => preloader.remove(), 800);
            }, 200);
        } else if (countEl) {
            countEl.textContent = String(count);
        }
    }, 90);
})();

// ============================================================
// Full-screen menu overlay
// ============================================================
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');

function closeMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.remove('open');
    menuOverlay.setAttribute('aria-hidden', 'true');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
}

function openMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.add('open');
    menuOverlay.setAttribute('aria-hidden', 'false');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
}

if (menuToggle && menuOverlay) {
    menuToggle.addEventListener('click', () => {
        const isOpen = menuOverlay.classList.contains('open');
        isOpen ? closeMenu() : openMenu();
    });

    menuOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
}

// ============================================================
// Local time (Halifax) in menu footer
// ============================================================
(function initLocalTime() {
    const el = document.getElementById('localTime');
    if (!el) return;

    function tick() {
        try {
            const formatted = new Intl.DateTimeFormat('en-CA', {
                timeZone: 'America/Halifax',
                hour: '2-digit',
                minute: '2-digit',
            }).format(new Date());
            el.textContent = formatted + ' AT';
        } catch (err) {
            el.textContent = '';
        }
    }

    tick();
    setInterval(tick, 30000);
})();

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
// Scrollspy — highlight active menu link
// ============================================================
const navAnchors = document.querySelectorAll('.menuNav a[data-nav]');
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

// ============================================================
// Hero parallax (subtle, based on scroll position only — cheap)
// ============================================================
const heroLines = document.querySelectorAll('.heroLine[data-speed]');

function updateHeroParallax() {
    if (prefersReducedMotion || heroLines.length === 0) return;
    const scrollTop = window.scrollY;
    if (scrollTop > window.innerHeight) return;
    heroLines.forEach(line => {
        const speed = parseFloat(line.getAttribute('data-speed')) || 0.2;
        line.style.transform = `translateY(${scrollTop * speed}px)`;
    });
}

// ============================================================
// Horizontal scroll-jacked project gallery
// ============================================================
const hzSection = document.querySelector('.horizontalProjects');
const hzTrack = document.getElementById('hzTrack');
const hzProgressBar = document.getElementById('hzProgressBar');

function updateHorizontalScroll() {
    if (!hzSection || !hzTrack || isMobileViewport()) return;

    const rect = hzSection.getBoundingClientRect();
    const sectionHeight = hzSection.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollable = sectionHeight - viewportHeight;
    if (scrollable <= 0) return;

    const scrolledIntoSection = -rect.top;
    const progress = Math.min(Math.max(scrolledIntoSection / scrollable, 0), 1);

    const trackWidth = hzTrack.scrollWidth;
    const maxTranslate = Math.max(trackWidth - window.innerWidth, 0);

    hzTrack.style.transform = `translateX(-${progress * maxTranslate}px)`;
    if (hzProgressBar) hzProgressBar.style.width = (progress * 100) + '%';
}

// ============================================================
// Master scroll handler
// ============================================================
window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateScrollspy();
    updateBackToTop();
    updateHeroParallax();
    updateHorizontalScroll();
}, { passive: true });

window.addEventListener('resize', () => {
    updateHorizontalScroll();
}, { passive: true });

updateScrollProgress();
updateScrollspy();
updateBackToTop();
updateHorizontalScroll();

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
// Custom cursor (with "VIEW" label over project cards)
// ============================================================
const cursorDot = document.querySelector('.cursorDot');
const cursorRing = document.getElementById('cursorRing');
const cursorLabel = document.getElementById('cursorLabel');

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

    document.querySelectorAll('a, button, .chip').forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
    });

    document.querySelectorAll('.projCard').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorLabel) cursorLabel.textContent = 'VIEW';
            cursorRing.classList.add('labeled');
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('labeled');
        });
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
// Copy email to clipboard
// ============================================================
(function initEmailCopy() {
    const btn = document.getElementById('emailCopy');
    const toast = document.getElementById('toast');
    if (!btn) return;

    btn.addEventListener('click', async () => {
        const email = btn.getAttribute('data-email');
        try {
            await navigator.clipboard.writeText(email);
        } catch (err) {
            // Clipboard API unavailable — fall back silently, link still visible to copy manually.
        }
        if (toast) {
            toast.classList.add('visible');
            setTimeout(() => toast.classList.remove('visible'), 1800);
        }
    });
})();

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
                    formMessage.style.color = '#d9ff4b';
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
// Living background — drifting constellation field
// ============================================================
(function initBackgroundField() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, particles, mouse = { x: null, y: null };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createParticles() {
        const count = prefersReducedMotion ? 0 : Math.min(60, Math.floor((width * height) / 26000));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.22,
            vy: (Math.random() - 0.5) * 0.22,
            r: Math.random() * 1.3 + 0.5,
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
                if (dist < 110) {
                    const force = (110 - dist) / 110;
                    p.x += (dx / dist) * force * 0.5;
                    p.y += (dy / dist) * force * 0.5;
                }
            }

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
        });

        ctx.fillStyle = 'rgba(217, 255, 75, 0.4)';
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });

        const maxDist = 120;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i], b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / maxDist)})`;
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
