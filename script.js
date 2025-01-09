// ===== 1. PRELOADER =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.display = 'none';
  }
});

// ===== 2. AOS INIT =====
AOS.init({
  duration: 1000, // animation duration
  once: true
});

// ===== 3. TYPED.JS FOR HERO TEXT (AND GLITCH LAYERS) =====
document.addEventListener('DOMContentLoaded', function() {
  // Main typed
  new Typed('#typed', {
    strings: ['Amrit Acharya', 'Full Stack Developer', 'Python Expert'],
    typeSpeed: 60,
    backSpeed: 30,
    loop: true
  });
  // Glitch layer 1
  new Typed('#typed-layer1', {
    strings: ['Amrit Acharya', 'Full Stack Developer', 'Python Expert'],
    typeSpeed: 60,
    backSpeed: 30,
    loop: true
  });
  // Glitch layer 2
  new Typed('#typed-layer2', {
    strings: ['Amrit Acharya', 'Full Stack Developer', 'Python Expert'],
    typeSpeed: 60,
    backSpeed: 30,
    loop: true
  });
});

// ===== 4. DARK MODE (LOCALSTORAGE) =====
const themeToggle = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// ===== 5. HAMBURGER MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
menuToggle.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    navLinks.classList.toggle('show');
  }
});

// ===== 6. SMOOTH SCROLL & CLOSE MENU =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50, // offset for navbar
        behavior: 'smooth'
      });
    }
    if (navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
    }
  });
});

// ===== 7. BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== 8. CONTACT FORM VALIDATION & CONFETTI =====
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameVal = contactForm.elements['name'].value.trim();
  const emailVal = contactForm.elements['email'].value.trim();
  const msgVal = contactForm.elements['message'].value.trim();
  if (!nameVal || !emailVal || !msgVal) {
    formFeedback.style.display = 'block';
    formFeedback.style.color = 'red';
    formFeedback.textContent = 'Please fill out all required fields.';
    return;
  }
  // Simulate submission
  formFeedback.style.display = 'block';
  formFeedback.style.color = 'green';
  formFeedback.textContent = 'Thank you! Your message has been sent.';
  contactForm.reset();

  // Launch Confetti
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 }
  });
});

// ===== 9. PORTFOLIO FILTER =====
const filterButtons = document.querySelectorAll('.filter-buttons button');
const portfolioItems = document.querySelectorAll('.portfolio-item');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filterVal = button.getAttribute('data-filter');
    portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filterVal === 'all' || filterVal === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===== 10. SVG SKILLS ANIMATION (Gradient + Count Up) =====
const skillBoxes = document.querySelectorAll('.skill-box');
const skillObserverOptions = { threshold: 0.2 };

const skillObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBox = entry.target;
      const circleContainer = skillBox.querySelector('.circular-skill');
      const progressCircle = circleContainer.querySelector('.progress');
      const skillValue = parseInt(circleContainer.getAttribute('data-skill-value'), 10);
      const skillText = circleContainer.querySelector('.skill-value');

      // Retrieve custom gradient color from data attributes
      const gradStart = skillBox.getAttribute('data-gradient-start');
      const gradEnd = skillBox.getAttribute('data-gradient-end');
      const skillSvg = circleContainer.querySelector('svg');
      const gradientId = skillSvg.querySelector('defs linearGradient').id;

      // Update the stroke to use the correct gradient ID
      progressCircle.setAttribute('stroke', `url(#${gradientId})`);

      // Animate progress
      const circumference = 2 * Math.PI * 54; // ~339.292
      const offset = circumference - (circumference * skillValue) / 100;
      progressCircle.style.strokeDashoffset = offset;

      // Animate text count
      let current = 0;
      const step = () => {
        if (current < skillValue) {
          current += 1;
          skillText.textContent = current + '%';
          requestAnimationFrame(step);
        } else {
          skillText.textContent = skillValue + '%';
        }
      };
      requestAnimationFrame(step);

      observer.unobserve(skillBox);
    }
  });
}, skillObserverOptions);

skillBoxes.forEach(box => skillObserver.observe(box));

// ===== 11. STARFIELD GENERATOR =====
const starfield = document.getElementById('starfield');
const numStars = 80;
for (let i = 0; i < numStars; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.top = Math.random() * 100 + '%';
  star.style.left = Math.random() * 100 + '%';
  starfield.appendChild(star);
}

// ===== 12. 3D TILT FOR CARDS =====
// Service Cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => tiltEffect(e, card));
  card.addEventListener('mouseleave', () => resetTilt(card));
});
// Portfolio Items
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('mousemove', (e) => tiltEffect(e, item));
  item.addEventListener('mouseleave', () => resetTilt(item));
});
function tiltEffect(e, element) {
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * 6; 
  const rotateY = ((x - centerX) / centerX) * 6;
  element.style.transform = `perspective(600px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
}
function resetTilt(element) {
  element.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
}

// ===== 13. PROJECT MODAL HANDLER =====
const projectModal = document.getElementById('projectModal');
const projectTitle = document.getElementById('projectTitle');
const projectDescription = document.getElementById('projectDescription');
const projectTech = document.getElementById('projectTech');
const projectDemoLink = document.getElementById('projectDemoLink');
const modalCloseBtn = document.querySelector('.project-modal-close');

const projectInfoButtons = document.querySelectorAll('.project-info-btn');
projectInfoButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const portfolioItem = btn.closest('.portfolio-item');
    const infoJSON = portfolioItem.getAttribute('data-info');
    if (!infoJSON) return;

    // Parse JSON
    const infoData = JSON.parse(infoJSON);
    projectTitle.textContent = infoData.title || 'Untitled Project';
    projectDescription.textContent = infoData.description || 'No description provided.';
    projectTech.textContent = infoData.tech ? infoData.tech.join(', ') : 'N/A';
    projectDemoLink.href = infoData.demoLink || '#';

    // Show the modal
    projectModal.style.display = 'flex';

    // Quick Confetti for fun!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  });
});

// Close modal when clicking the "×"
modalCloseBtn.addEventListener('click', () => {
  projectModal.style.display = 'none';
});

// Close modal if clicking outside of content
projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) {
    projectModal.style.display = 'none';
  }
});

// ===== 14. RANDOM HUE EXAMPLE (Optional) =====
// document.documentElement.style.setProperty('--random', Math.random());
