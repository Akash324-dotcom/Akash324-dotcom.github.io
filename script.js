// ==================================================
// 1. THREE.JS 3D BACKGROUND
// ==================================================
const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Wireframe Sphere
    const geometry = new THREE.IcosahedronGeometry(10, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true, transparent: true, opacity: 0.3 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 700;
    const posArray = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i++) { posArray[i] = (Math.random() - 0.5) * 60; }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0xbc13fe, transparent: true, opacity: 0.8 });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse Interaction
    let mouseX = 0; let mouseY = 0;
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    const animate = () => {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.002; sphere.rotation.x += 0.001;
        particlesMesh.rotation.y -= 0.0005;
        sphere.rotation.y += 5 * (mouseX - sphere.rotation.y) * 0.01;
        sphere.rotation.x += 5 * (mouseY - sphere.rotation.x) * 0.01;
        renderer.render(scene, camera);
    };
    animate();
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};
initThreeJS();

// ==================================================
// 2. TYPED.JS (UPDATED FOR DATA ENG)
// ==================================================
var typed = new Typed('#element', {
    strings: [
        'Data Engineering & ETL', 
        'AI Agents with n8n', 
        'Data Analysis (Pandas/SQL)', 
        'Secure Android Apps'
    ],
    typeSpeed: 40, backSpeed: 30, loop: true, showCursor: true, cursorChar: '_'
});

// ==================================================
// 3. PROJECT DATA (WITH NEW DATA PIPELINE PROJECT)
// ==================================================
const projectData = [
    {
        title: "PetMed",
        desc: "An interactive veterinary simulation platform. Features real-time data visualization graphs and physiological tracking. <br><br><strong style='color:#00f3ff'>Tech:</strong> HTML5, CSS3, JavaScript.",
        link: "https://github.com/Akash324-dotcom/PetMed" 
    },
    {
        title: "Chat Server",
        desc: "A raw Java-based client-server communication system. Implements multithreading for simultaneous message exchange. <br><br><strong style='color:#00f3ff'>Tech:</strong> Java, Sockets, Multithreading.",
        link: "https://github.com/Akash324-dotcom/ChatApplication"
    },
    {
        title: "QuickCash",
        desc: "Android application for short-term job discovery. Integrates Google Maps API and PayPal SDK. <br><br><strong style='color:#00f3ff'>Tech:</strong> Android Studio, Java, Google Maps API.",
        link: "https://github.com/Akash324-dotcom/QuickCash"
    },
    {
        title: "SPA (Student Personal Assistant)",
        desc: "An AI-powered agent that automates student life. Handles emails, scheduling, and budgeting. <br><br><strong style='color:#00f3ff'>Tech:</strong> n8n, Python, AI Agents.",
        link: "https://github.com/Akash324-dotcom/SPA"
    },
    {
        title: "Gemini Chrome Extension",
        desc: "Manifest V3 extension integrating Google's Gemini API via a local Node.js proxy. <br><br><strong style='color:#00f3ff'>Tech:</strong> JavaScript, Node.js Proxy, Chrome API.",
        link: "https://github.com/Akash324-dotcom/GeminiExtension"
    },
    {
        // --- NEW DATA ENG PROJECT ---
        title: "ETL Data Pipeline",
        desc: "End-to-end data pipeline construction. Extracted raw datasets, performed cleaning and transformation using Pandas, and loaded structured data into SQL databases for analysis. <br><br><strong style='color:#00f3ff'>Tech:</strong> Python, Pandas, SQL, ETL.",
        link: "https://github.com/Akash324-dotcom" // Link to main profile if specific repo doesn't exist yet
    }
];

let currentTypedProject = null;

function updateProject(index) {
    document.querySelectorAll('.p-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
    
    const titleEl = document.getElementById('proj-title');
    titleEl.innerText = projectData[index].title;
    titleEl.style.opacity = 0;
    setTimeout(() => titleEl.style.opacity = 1, 100);

    if (currentTypedProject) currentTypedProject.destroy();
    document.getElementById('proj-desc').innerHTML = '';
    
    const content = `
        ${projectData[index].desc}
        <br><br>
        <a href="${projectData[index].link}" target="_blank" class="cyber-btn" style="font-size: 0.8rem; padding: 10px 20px; display:inline-block; margin-top:10px;">
            ACCESS CODE &gt;&gt;
        </a>
    `;

    currentTypedProject = new Typed('#proj-desc', {
        strings: [content],
        typeSpeed: 5,
        showCursor: false,
        contentType: 'html'
    });
}
window.onload = () => updateProject(0);

// ==================================================
// 4. MODAL LOGIC
// ==================================================
function openModal(file) {
    const modal = document.getElementById('pdf-modal');
    document.getElementById('pdf-frame').src = file;
    document.getElementById('download-link').href = file;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}
function closeModal() {
    document.getElementById('pdf-modal').style.display = "none";
    document.getElementById('pdf-frame').src = "";
    document.body.style.overflow = "auto";
}
window.onclick = function(event) {
    if (event.target === document.getElementById('pdf-modal')) closeModal();
}

// ==================================================
// 5. CONTACT FORM
// ==================================================
emailjs.init("ERXE5QuyI7eXpXQJs"); 
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.innerText = "Transmitting...";
    
    emailjs.send('service_a4u7y3q', 'template_xf34a4r', {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    }).then(() => {
        formMessage.style.color = '#0aff0a';
        formMessage.innerText = "Transmission Received.";
        btn.innerText = "Transmit";
        form.reset();
    }, (error) => {
        formMessage.style.color = 'red';
        formMessage.innerText = "Uplink Failed.";
        btn.innerText = "Retry";
    });
});

// ==================================================
// 6. VANILLA TILT
// ==================================================
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 10, speed: 400, glare: true, "max-glare": 0.2, scale: 1.02
});