document.addEventListener("DOMContentLoaded", function () {
  const switchInput = document.querySelector(".switch input");
  const body = document.body;
  const navbarHeader = document.querySelector(".navbar-header");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".close-icon");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarLogo = document.querySelector(".navbar-logo");
  
  let particleAnimation = null;
  let activeSection = "home";
  let landingAnimationInitialized = false;

  // Handle scroll events to change navbar appearance
  function handleScroll() {
    if (window.scrollY > 20) {
      navbarHeader.classList.add("scrolled");
    } else {
      navbarHeader.classList.remove("scrolled");
    }
    
    // Update active section based on scroll position with improved detection
    const sections = ["home", "about", "projects", "experience", "contact"];
    
    // First, get the navbar height to account for offset
    const navbarHeight = document.querySelector('.navbar-header').offsetHeight;
    
    // Find which section is currently in view
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Consider a section in view when its top is near the navbar bottom
        if (rect.top <= navbarHeight + 50 && rect.bottom > navbarHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  }

  // Set active navigation link
  function setActiveSection(sectionId) {
    if (activeSection === sectionId) return;
    
    activeSection = sectionId;
    navLinks.forEach(link => {
      if (link.dataset.section === sectionId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Scroll to section with improved offset calculation
  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate scroll position with proper offset
      const navbarHeight = document.querySelector('.navbar-header').offsetHeight;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setActiveSection(sectionId);
    
    // Close mobile menu if open
    if (mobileNav.classList.contains("open")) {
      toggleMobileMenu();
    }
  }

  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileNav.classList.toggle("open");
    menuIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  }

  // Update the SVG logo with the correct animation for the current theme
  function updateLogoAnimation() {
    if (!navbarLogo) return;
    
    // Create dark or light mode SVG based on the current theme
    const isDarkMode = body.classList.contains("dark-theme");
    const strokeColor = isDarkMode ? "#fff" : "#000";
    const animateValues = isDarkMode 
      ? "rgba(255,255,255,1); rgba(100,100,100,0)" 
      : "rgba(0,0,0,1); rgba(100,100,100,0)";
    const bottomAnimateValues = isDarkMode 
      ? "rgba(100,100,100,0); rgba(255,255,255,1)" 
      : "rgba(100,100,100,0); rgba(0,0,0,1)";
    
    // Replace the entire SVG with the correct animation values
    navbarLogo.innerHTML = `
      <svg viewBox="0 0 100 100" class="logo-svg" style="stroke: ${strokeColor}">
        <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="6">
          <!-- left line -->
          <path d="M 21 40 V 59">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" values="0 21 59; 180 21 59" dur="2s" repeatCount="indefinite" />
          </path>
          <!-- right line -->
          <path d="M 79 40 V 59">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" values="0 79 59; -180 79 59" dur="2s" repeatCount="indefinite" />
          </path>
          <!-- top line -->
          <path d="M 50 21 V 40">
            <animate attributeName="d" values="M 50 21 V 40; M 50 59 V 40" dur="2s" repeatCount="indefinite" />
          </path>
          <!-- btm line -->
          <path d="M 50 60 V 79">
            <animate attributeName="d" values="M 50 60 V 79; M 50 98 V 79" dur="2s" repeatCount="indefinite" />
          </path>
          <!-- top box -->
          <path d="M 50 21 L 79 40 L 50 60 L 21 40 Z">
            <animate attributeName="stroke" values="${animateValues}" dur="2s" repeatCount="indefinite" />
          </path>
          <!-- mid box -->
          <path d="M 50 40 L 79 59 L 50 79 L 21 59 Z" />
          <!-- btm box -->
          <path d="M 50 59 L 79 78 L 50 98 L 21 78 Z">
            <animate attributeName="stroke" values="${bottomAnimateValues}" dur="2s" repeatCount="indefinite" />
          </path>
          <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; 0 -19" dur="2s" repeatCount="indefinite" />
        </g>
      </svg>
      <span class="navbar-name">Narendra Chowdary</span>
    `;
  }

  // Toggle dark/light theme
  function toggleTheme() {
    body.classList.add("dark-mode-animation");
    body.classList.toggle("dark-theme");
    document.documentElement.classList.toggle("dark"); // Toggle the .dark class for CSS variables
    
    updateLogoAnimation(); // Update the logo with proper animation
    
    // Initialize or destroy particle animation based on dark mode state
    if (body.classList.contains("dark-theme")) {
      if (!particleAnimation) {
        particleAnimation = new ParticleAnimation({
          particleCount: 100,
          particleColor: "rgba(255, 255, 255, 0.5)",
          backgroundColor: "transparent",
          particleSize: { min: 0.1, max: 2 },
          particleSpeed: { min: -0.5, max: 0.5 }
        });
        particleAnimation.start();
      }
    } else {
      if (particleAnimation) {
        particleAnimation.destroy();
        particleAnimation = null;
      }
    }
    
    setTimeout(() => {
      body.classList.remove("dark-mode-animation");
    }, 1000);
  }

  // Initialize logo animation on page load
  updateLogoAnimation();

  // Add dark mode toggle event listener
  if (switchInput) {
    switchInput.addEventListener("change", toggleTheme);
  }
  
  // Check if dark mode is already active on page load
  if (body.classList.contains("dark-theme")) {
    document.documentElement.classList.add("dark"); // Make sure the dark class is applied
    
    particleAnimation = new ParticleAnimation({
      particleCount: 100,
      particleColor: "rgba(255, 255, 255, 0.5)",
      backgroundColor: "transparent",
      particleSize: { min: 0.1, max: 2 },
      particleSpeed: { min: -0.5, max: 0.5 }
    });
    particleAnimation.start();
  }
  
  // Add event listeners for navigation
  window.addEventListener("scroll", handleScroll);
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  }
  
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      scrollToSection(link.dataset.section);
    });
  });

  // Add event listeners to the "Get in Touch" and "View Projects" buttons
  const getInTouchButton = document.querySelector(".get-in-touch");
  const viewProjectsButton = document.querySelector(".view-projects");

  if (getInTouchButton) {
    getInTouchButton.addEventListener("click", function() {
      scrollToSection("contact");
    });
  }

  if (viewProjectsButton) {
    viewProjectsButton.addEventListener("click", function() {
      scrollToSection("projects");
    });
  }
  
  // Initialize navbar state
  handleScroll();
  
  // Initialize landing page animation if it hasn't already been done
  if (!landingAnimationInitialized) {
    initLandingAnimation();
    landingAnimationInitialized = true;
  }
  
  // Landing Page Animation
  function initLandingAnimation() {
    const messages = document.querySelectorAll('.message');
    if (messages.length === 0) return; // Exit if no messages (already gone)
    
    let currentIndex = 0;
    const landingScreen = document.getElementById('landing');
    const mainContent = document.querySelector('.introduction');
    const header = document.querySelector('.navbar-header'); // Updated selector to new navbar
    
    // Create particles for visual effect
    function createParticles() {
      if (!landingScreen) return;
      
      // Clear any existing particles
      const existingParticles = document.querySelectorAll('.particle');
      existingParticles.forEach(p => p.remove());
      
      // Create new particles
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positions
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Random animation
        const duration = 0.8 + Math.random() * 0.7;
        const direction = Math.random() > 0.5 ? 1 : -1;
        const xMove = (Math.random() * 100) * direction;
        const yMove = (Math.random() * 100) * direction;
        
        particle.style.animation = `particleMove ${duration}s ease-out forwards`;
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        // Add keyframes dynamically
        const keyframes = `
          @keyframes particleMove {
            0% { transform: translate(0, 0); opacity: ${particle.style.opacity}; }
            100% { transform: translate(${xMove}px, ${yMove}px); opacity: 0; }
          }
        `;
        
        const style = document.createElement('style');
        style.innerHTML = keyframes;
        document.head.appendChild(style);
        
        landingScreen.appendChild(particle);
      }
    }

    function showNextMessage() {
      messages[currentIndex].classList.remove('visible');
      currentIndex = (currentIndex + 1) % messages.length;
      messages[currentIndex].classList.add('visible');
    }

    // Start text animation
    messages[currentIndex].classList.add('visible');
    const messageInterval = setInterval(showNextMessage, 250);

    // Enhanced slide-up animation
    setTimeout(() => {
      if (!landingScreen) return;
      
      // Create particle effect right before transition
      createParticles();
      
      // Add 3D transition effect to landing screen
      landingScreen.classList.add('hidden');
      
      // Prepare main content for reveal
      if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(30px)';
      }
      
      if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-30px)';
      }
      
      // Clear message animation
      clearInterval(messageInterval);
      
      // Hide landing screen and reveal content with faster staggered animation
      setTimeout(() => {
        if (landingScreen) landingScreen.style.display = 'none';
        
        // Reveal header first
        if (header) {
          header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          header.style.opacity = '1';
          header.style.transform = 'translateY(0)';
        }
        
        // Then reveal main content with shorter delay
        setTimeout(() => {
          if (mainContent) {
            mainContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
          }
        }, 200);
      }, 800);
    }, 1500);
  }
});

// Particle Animation Class
class ParticleAnimation {
  constructor(options = {}) {
    this.particleCount = options.particleCount || 100;
    this.particleColor = options.particleColor || "rgba(255, 255, 255, 0.5)";
    this.backgroundColor = options.backgroundColor || "transparent";
    this.particleSize = options.particleSize || { min: 0.1, max: 2 };
    this.particleSpeed = options.particleSpeed || { min: -1, max: 1 };
    
    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "fixed";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.zIndex = "-1"; // Behind main content
    this.canvas.style.pointerEvents = "none"; // Don't intercept mouse events
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.animationFrameId = null;
    
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener("resize", this.handleResize);
  }
  
  start() {
    document.body.appendChild(this.canvas);
    this.handleResize();
    this.createParticles();
    this.animate();
  }
  
  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    window.removeEventListener("resize", this.handleResize);
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
  
  handleResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(
        this.canvas,
        this.particleColor,
        this.particleSize,
        this.particleSpeed
      ));
    }
  }
  
  animate() {
    // Clear canvas with background color
    if (this.backgroundColor === "transparent") {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    } else {
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // Update and draw particles
    this.particles.forEach(particle => {
      particle.update();
      particle.draw(this.ctx);
    });
    
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}

class Particle {
  constructor(canvas, color, sizeRange, speedRange) {
    this.canvas = canvas;
    this.color = color;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min;
    this.speedX = Math.random() * (speedRange.max - speedRange.min) + speedRange.min;
    this.speedY = Math.random() * (speedRange.max - speedRange.min) + speedRange.min;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Wrap around edges
    if (this.x > this.canvas.width) this.x = 0;
    if (this.x < 0) this.x = this.canvas.width;
    if (this.y > this.canvas.height) this.y = 0;
    if (this.y < 0) this.y = this.canvas.height;
  }
  
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

document.addEventListener("mousemove", function(event) {
  let dot = document.querySelector(".cursor-dot");
  if (dot) {
    dot.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  }
});

const image = document.querySelector(".background-image");
if (image) {
  const originalImageSrc = image.src;
  const newImageSrc = "assets/images/Finding paradise wherever the waves take me. . . . . . . . . . . . . . . .beachbound beachlife beach beachdreaming ocean paradise wavesfordays explore rainyday shorelineadventures seasideescape beach.jpg";

  image.addEventListener("mouseover", function() {
    image.src = newImageSrc;
  });

  image.addEventListener("mouseout", function() {
    image.src = originalImageSrc;
  });
}
