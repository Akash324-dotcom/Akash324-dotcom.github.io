// EmailJS init (contact form)
emailjs.init("ERXE5QuyI7eXpXQJs");

// Hero typed text
var typed = new Typed('#element', {
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

// Mobile nav toggle
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

// Contact form (EmailJS)
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name && email && message) {
        const templateParams = { name, email, message };

        emailjs.send('service_a4u7y3q', 'template_xf34a4r', templateParams)
            .then(() => {
                formMessage.style.color = '#6ee7ff';
                formMessage.textContent = `Thanks ${name}! Your message has been sent.`;
                form.reset();
            }, (error) => {
                formMessage.style.color = '#ff6b6b';
                formMessage.textContent = 'Oops! Something went wrong. Try again.';
                console.error(error);
            });
    } else {
        formMessage.style.color = '#ff6b6b';
        formMessage.textContent = 'Please fill in all fields.';
    }
});

// Fade-in on scroll
const revealTargets = document.querySelectorAll('.section, .hero');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('inView');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealTargets.forEach(el => observer.observe(el));
