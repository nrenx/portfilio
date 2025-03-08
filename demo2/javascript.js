document.addEventListener("DOMContentLoaded", function () {
  const switchInput = document.querySelector(".switch input");
  const body = document.body;
  const logo = document.querySelector(".logo");

  function updateLogo() {
    if (body.classList.contains("dark-theme")) {
      logo.innerHTML = `
        <svg viewBox="0 0 100 100" style="width: 30px; height: 30px; margin-right: 10px; fill: none;">
          <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="6">
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
              <animate attributeName="stroke" values="rgba(255,255,255,1); rgba(100,100,100,0)" dur="2s" repeatCount="indefinite" />
            </path>
            <!-- mid box -->
            <path d="M 50 40 L 79 59 L 50 79 L 21 59 Z" />
            <!-- btm box -->
            <path d="M 50 59 L 79 78 L 50 98 L 21 78 Z">
              <animate attributeName="stroke" values="rgba(100,100,100,0); rgba(255,255,255,1)" dur="2s" repeatCount="indefinite" />
            </path>
            <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; 0 -19" dur="2s" repeatCount="indefinite" />
          </g>
        </svg>
        <div class="name">
          Bollineni Narendra Chowdary
        </div>
      `;
    } else {
      logo.innerHTML = `
        <svg viewBox="0 0 100 100" style="width: 30px; height: 30px; margin-right: 10px; fill: none;">
          <g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="6">
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
              <animate attributeName="stroke" values="rgba(0,0,0,1); rgba(100,100,100,0)" dur="2s" repeatCount="indefinite" />
            </path>
            <!-- mid box -->
            <path d="M 50 40 L 79 59 L 50 79 L 21 59 Z" />
            <!-- btm box -->
            <path d="M 50 59 L 79 78 L 50 98 L 21 78 Z">
              <animate attributeName="stroke" values="rgba(100,100,100,0); rgba(0,0,0,1)" dur="2s" repeatCount="indefinite" />
            </path>
            <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; 0 -19" dur="2s" repeatCount="indefinite" />
          </g>
        </svg>
        <div class="name">
          Bollineni Narendra Chowdary
        </div>
      `;
    }
  }

  updateLogo();

  switchInput.addEventListener("change", function () {
    body.classList.add("dark-mode-animation");
    body.classList.toggle("dark-theme");
    updateLogo();
    setTimeout(() => {
      body.classList.remove("dark-mode-animation");
    }, 1000);
  });
});

// Enhanced Landing Page Animation
document.addEventListener('DOMContentLoaded', function() {
    // Animation for landing page messages
    const messages = document.querySelectorAll('.message');
    let currentIndex = 0;
    const landingScreen = document.getElementById('landing');
    const mainContent = document.querySelector('.introduction');
    const header = document.querySelector('header');
    
    // Create particles for visual effect
    function createParticles() {
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

    // Start text animation with faster 150ms interval (was 200ms)
    messages[currentIndex].classList.add('visible');
    const messageInterval = setInterval(showNextMessage, 250);

    // Enhanced slide-up animation after 2 seconds (was 3 seconds)
    setTimeout(() => {
        // Create particle effect right before transition
        createParticles();
        
        // Add 3D transition effect to landing screen
        landingScreen.classList.add('hidden');
        
        // Prepare main content for reveal
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(30px)';
        header.style.opacity = '0';
        header.style.transform = 'translateY(-30px)';
        
        // Clear message animation
        clearInterval(messageInterval);
        
        // Hide landing screen and reveal content with faster staggered animation
        setTimeout(() => {
            landingScreen.style.display = 'none';
            
            // Reveal header first
            header.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Faster transition
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
            
            // Then reveal main content with shorter delay
            setTimeout(() => {
                mainContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Faster transition
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }, 200); // Was 300ms
        }, 800); // Was 1100ms
    }, 1500); // Was 3000ms - Cut to half the time
});

document.addEventListener("mousemove", function(event) {
    let dot = document.querySelector(".cursor-dot");
    dot.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

const image = document.querySelector(".background-image");
const originalImageSrc = image.src;
const newImageSrc = "assets/images/Finding paradise wherever the waves take me. . . . . . . . . . . . . . . .beachbound beachlife beach beachdreaming ocean paradise wavesfordays explore rainyday shorelineadventures seasideescape beach.jpg";

image.addEventListener("mouseover", function() {
  image.src = newImageSrc;
});

image.addEventListener("mouseout", function() {
  image.src = originalImageSrc;
});
