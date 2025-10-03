

emailjs.init("ERXE5QuyI7eXpXQJs");


var typed = new Typed('#element', {
    strings: ['Java', 'Python', 'Android Studio', 'C', 'n8n - <i>Creating AI Agents</i>', '<i>HTML</i>, <i>CSS</i>, and <i>JS</i>'],
    typeSpeed: 50,
});

const project1 = document.getElementById("project1");
const project2 = document.getElementById("project2");
const project3 = document.getElementById("project3");
const project4 = document.getElementById("project4");
const projectDescription = document.getElementById("projectDescription");

let currentTyped = null;

function showProject(targetId, strings) {
    projectDescription.style.display = "block";

    if (currentTyped) {
        currentTyped.destroy();
    }

    document.querySelectorAll("#projecttyped1, #projecttyped2, #projecttyped3, #projecttyped4")
        .forEach(el => el.innerHTML = "");

    currentTyped = new Typed(targetId, {
        strings: strings,
        typeSpeed: 10,
    });
}

project1.addEventListener("click", () => {
    showProject("#projecttyped1", [
        '<span style="font-size: 56px; color: black; font-weight: bold;">PetMed</span>',
        'As a Junior Developer, I played a key role in the development and launch of the PetMed website, an interactive online simulation designed for veterinary students. The platform enables users to practice administering different drug doses to virtual cat patients while tracking their physiological responses through three real-time data graphs. My contributions included assisting in feature implementation, ensuring accurate data visualization, and supporting the overall functionality and usability of the simulation to provide an engaging and effective learning experience.'
    ]);
});

project2.addEventListener("click", () => {
    showProject("#projecttyped2", [
        '<span style="font-size: 56px; color: black; font-weight: bold;">Chat Application in Server</span>',
        'Developed a simple client-server chat application in Java where the server listens for client connections, handles incoming messages, and allows two-way communication. Implemented multithreading for simultaneous message exchange and console-based interaction.'
    ]);
});

project3.addEventListener("click", () => {
    showProject("#projecttyped3", [
        '<span style="font-size: 56px; color: black; font-weight: bold;">QuickCash</span>',
        'QuickCash is a mobile application designed to simplify short-term job posting and hiring. Built using Android Studio, it enables users to post and browse local job ads with ease. The app integrates Google Maps for location-based job discovery and PayPal for secure payments. It offers a fast, reliable platform for students and freelancers seeking quick employment opportunities.'
    ]);
});

project4.addEventListener("click", () => {
    showProject("#projecttyped4", [
        '<span style="font-size: 56px; color: black; font-weight: bold;">SPA (Student Personal Assistant)</span>',
        'SPA is an AI-powered assistant developed to support students in managing daily tasks efficiently. It automates email handling, scheduling, and reminders while also providing health guidance and budget tracking. The system integrates smart features to improve productivity and reduce stress during academic life. SPA demonstrates how AI can be used to create a practical, user-centric support system for students.'
    ]);
});

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
                formMessage.style.color = 'green';
                formMessage.textContent = `Thanks ${name}! Your message has been sent. 🚀`;
                form.reset();
            }, (error) => {
                formMessage.style.color = 'red';
                formMessage.textContent = 'Oops! Something went wrong. Try again.';
                console.error(error);
            });
    } else {
        formMessage.style.color = 'red';
        formMessage.textContent = 'Please fill in all fields.';
    }
});
