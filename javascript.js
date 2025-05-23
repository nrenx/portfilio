document.addEventListener("DOMContentLoaded", function () {
  // macOS Interface functionality
  initMacOSInterface();
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

    // Update active section based on scroll position with improved mobile detection
    const sections = ["home", "about", "projects", "experience", "contact"];

    // Get the navbar height to account for offset
    const navbarHeight = document.querySelector('.navbar-header').offsetHeight;
    const isMobile = window.innerWidth <= 768;

    // Additional offset for mobile devices
    const viewportOffset = isMobile ? navbarHeight + 20 : navbarHeight + 50;

    // Find which section is currently in view
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();

        // Mobile devices need different calculation due to different viewport sizes
        if (isMobile) {
          // On mobile, consider a section in view when it occupies significant portion of screen
          if (rect.top <= viewportOffset && rect.bottom > viewportOffset / 2) {
            setActiveSection(section);
            break;
          }
        } else {
          // Desktop calculation (unchanged)
          if (rect.top <= viewportOffset && rect.bottom > navbarHeight) {
            setActiveSection(section);
            break;
          }
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

    // Update scroll indicator visibility when section changes
    if (typeof updateScrollIndicatorVisibility === 'function') {
      updateScrollIndicatorVisibility();
    }
  }

  // Improved scroll to section for mobile devices
  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate scroll position with proper offset
      const navbarHeight = document.querySelector('.navbar-header').offsetHeight;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      // Add additional offset for mobile
      const isMobile = window.innerWidth <= 768;
      const mobileOffset = isMobile ? 10 : 0; // Extra 10px offset on mobile

      window.scrollTo({
        top: offsetPosition - mobileOffset,
        behavior: "smooth"
      });

      // For mobile, add a slight delay before setting active to ensure scrolling is complete
      if (isMobile) {
        setTimeout(() => {
          setActiveSection(sectionId);
        }, 300);
      } else {
        setActiveSection(sectionId);
      }

      // Close mobile menu if open
      if (mobileNav.classList.contains("open")) {
        toggleMobileMenu();
      }
    }
  }

  // Toggle mobile menu with improved animation and body scroll lock
  function toggleMobileMenu() {
    const isOpening = !mobileNav.classList.contains("open");

    // Toggle classes for menu appearance
    mobileNav.classList.toggle("open");

    // Ensure only one icon is visible at a time with proper transitions
    if (isOpening) {
      // When opening menu - show X, hide hamburger
      menuIcon.classList.add("hidden");

      // Small delay to ensure smooth transition
      setTimeout(() => {
        closeIcon.classList.remove("hidden");
      }, 50);

      // Prevent background scrolling
      document.body.style.overflow = "hidden";

      // Add active indicator to current section
      setTimeout(() => {
        const currentActiveLink = document.querySelector(`.mobile-nav .nav-link[data-section="${activeSection}"]`);
        if (currentActiveLink) {
          currentActiveLink.classList.add("active");
        }
      }, 100);
    } else {
      // When closing menu - show hamburger, hide X
      closeIcon.classList.add("hidden");

      // Small delay to ensure smooth transition
      setTimeout(() => {
        menuIcon.classList.remove("hidden");
      }, 50);

      // Re-enable scrolling after menu closes
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 300); // Match this with the menu transition time
    }
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
      const sectionId = link.dataset.section;
      scrollToSection(sectionId);

      // Special case for home section to ensure scroll indicator appears
      if (sectionId === "home" && typeof updateScrollIndicatorVisibility === 'function') {
        // Multiple timeouts to ensure it catches after scrolling completes
        setTimeout(updateScrollIndicatorVisibility, 100);
        setTimeout(updateScrollIndicatorVisibility, 500);
        setTimeout(updateScrollIndicatorVisibility, 1000);
      }
    });
  });

  // Add event listeners to the "Get in Touch" and "View Projects" buttons
  const getInTouchButton = document.querySelector(".get-in-touch");
  const viewProjectsButton = document.querySelector(".view-projects");
  const scrollIndicator = document.querySelector(".scroll-indicator");

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

  // Function to handle scroll indicator click/touch
  function handleScrollIndicatorClick(e) {
    e.preventDefault();
    // Scroll to the about section when clicked
    scrollToSection("about");
  }

  function handleScrollIndicatorTouchStart(e) {
    // Prevent default to avoid any unwanted behaviors
    e.preventDefault();
  }

  // Function to update scroll indicator visibility
  let updateScrollIndicatorVisibility;

  // Add functionality to the scroll indicator
  if (scrollIndicator) {
    // Add click event for desktop
    scrollIndicator.addEventListener("click", handleScrollIndicatorClick);

    // Add touch events for mobile devices
    scrollIndicator.addEventListener("touchstart", handleScrollIndicatorTouchStart, { passive: false });
    scrollIndicator.addEventListener("touchend", handleScrollIndicatorClick, { passive: false });

    // Define the function to update scroll indicator visibility
    updateScrollIndicatorVisibility = function() {
      const homeSection = document.getElementById("home");
      if (!homeSection || !scrollIndicator) return;

      const homeSectionRect = homeSection.getBoundingClientRect();
      const isHomeVisible = homeSectionRect.top <= 100 && homeSectionRect.bottom > 0;
      const isAtTop = window.scrollY < 100;
      const isHomeActive = activeSection === "home";

      if ((isHomeVisible && isAtTop) || isHomeActive) {
        scrollIndicator.style.opacity = "0.8";
        scrollIndicator.style.pointerEvents = "auto";
      } else {
        scrollIndicator.style.opacity = "0";
        scrollIndicator.style.pointerEvents = "none";
      }
    };

    // Hide scroll indicator when user scrolls down or is not on the home section
    window.addEventListener("scroll", updateScrollIndicatorVisibility);

    // Also update visibility when clicking on navigation links
    navLinks.forEach(link => {
      link.addEventListener("click", function() {
        // Short delay to allow scrolling to complete
        setTimeout(updateScrollIndicatorVisibility, 100);
      });
    });

    // Make sure the scroll indicator is visible on page load
    setTimeout(function() {
      updateScrollIndicatorVisibility();
    }, 2000); // Show after landing animation completes

    // Add event listener for the home navigation link to ensure scroll indicator appears
    const homeLink = document.querySelector('.nav-link[data-section="home"]');
    if (homeLink) {
      homeLink.addEventListener("click", function() {
        setTimeout(function() {
          updateScrollIndicatorVisibility();
        }, 500);
      });
    }
  }

  // Initialize navbar state
  handleScroll();

  // Ensure menu icons are in the correct state on page load
  if (menuIcon && closeIcon) {
    menuIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  }

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

  // Function to check if an element is in the viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  // Add scroll event listener for contact section
  function handleContactSectionVisibility() {
    const contactSection = document.getElementById('contact');
    if (contactSection && isInViewport(contactSection)) {
      contactSection.classList.add('in-view');
    }
  }

  // Initialize contact section visibility
  handleContactSectionVisibility();

  // Add event listener for scroll to check contact section visibility
  window.addEventListener('scroll', handleContactSectionVisibility);

  // Handle resume button click
  const resumeButton = document.querySelector('.resume-button');
  if (resumeButton) {
    resumeButton.addEventListener('click', function() {
      // Open the resume in a new window
      window.open('assets/resume/resume.pdf', '_blank');
    });
  }

  // Add mobile device detection and handling
  function isMobileDevice() {
    return (window.innerWidth <= 768) ||
           (navigator.maxTouchPoints > 0) ||
           (navigator.msMaxTouchPoints > 0);
  }

  // Adjust landing animation for mobile
  function adjustForMobileDevice() {
    if (isMobileDevice()) {
      // Adjust particle count for better performance on mobile
      if (particleAnimation) {
        particleAnimation.destroy();
        particleAnimation = new ParticleAnimation({
          particleCount: 30, // Reduced for mobile
          particleColor: "rgba(255, 255, 255, 0.5)",
          backgroundColor: "transparent",
          particleSize: { min: 0.1, max: 1.5 },
          particleSpeed: { min: -0.3, max: 0.3 }
        });
        particleAnimation.start();
      }

      // Reduce or disable cursor dot on mobile
      const cursorDot = document.querySelector('.cursor-dot');
      if (cursorDot) {
        cursorDot.style.display = 'none';
      }
    }
  }

  // Call adjustments after initialization
  window.addEventListener('load', adjustForMobileDevice);
  window.addEventListener('resize', adjustForMobileDevice);

  // Enhanced function to fix viewport issues on mobile devices
  function fixViewportIssues() {
    // Fix the visual viewport issues on mobile
    const viewportMetaTag = document.querySelector('meta[name="viewport"]');
    if (viewportMetaTag) {
      // Ensure proper viewport settings for mobile
      viewportMetaTag.setAttribute('content',
        'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no');

      // After a short delay, allow user scaling again for accessibility
      setTimeout(() => {
        viewportMetaTag.setAttribute('content',
          'width=device-width, initial-scale=1.0, minimum-scale=1.0');
      }, 1000);
    }

    // Force a re-layout to fix any positioning issues
    document.body.style.display = 'none';
    document.body.offsetHeight; // Force a reflow
    document.body.style.display = '';

    // Update active section
    handleScroll();

    // Fix content positioning after resize/orientation change
    setTimeout(() => {
      // Adjust scroll position if needed
      const activeElement = document.querySelector('.nav-link.active');
      if (activeElement && activeElement.dataset.section) {
        // Only scroll if we're not at the top of the section already
        const section = document.getElementById(activeElement.dataset.section);
        if (section) {
          const navbarHeight = document.querySelector('.navbar-header').offsetHeight;
          const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
          const currentPos = window.pageYOffset;

          // Only adjust if we're significantly off
          if (Math.abs(currentPos - (sectionTop - navbarHeight)) > 50) {
            scrollToSection(activeElement.dataset.section);
          }
        }
      }
    }, 300);
  }

  // Call on orientation change and after page load
  window.addEventListener('orientationchange', fixViewportIssues);
  window.addEventListener('load', () => setTimeout(fixViewportIssues, 500));
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

// macOS Interface Functionality
function initMacOSInterface() {
  // Update macOS clock
  function updateMacOSClock() {
    const clockElement = document.getElementById('macos-clock');
    if (clockElement) {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours ? hours : 12; // Convert 0 to 12

      const timeString = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      clockElement.textContent = timeString;
    }
  }

  // Update clock initially and then every minute
  updateMacOSClock();
  setInterval(updateMacOSClock, 60000);

  // Handle folder clicks to open project windows
  const folders = document.querySelectorAll('.macos-folder');
  const overlay = document.querySelector('.macos-overlay');

  folders.forEach(folder => {
    folder.addEventListener('click', () => {
      const projectId = folder.getAttribute('data-project');
      const projectWindow = document.getElementById(`${projectId}-window`);

      if (projectWindow) {
        // Show overlay and window
        overlay.classList.add('active');
        projectWindow.classList.add('active');

        // Add animation class
        projectWindow.classList.add('window-opening');
        setTimeout(() => {
          projectWindow.classList.remove('window-opening');
        }, 300);
      }
    });
  });

  // Handle window controls (close, minimize, maximize)
  const closeButtons = document.querySelectorAll('.window-close');
  const minimizeButtons = document.querySelectorAll('.window-minimize');
  const maximizeButtons = document.querySelectorAll('.window-maximize');

  closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const window = e.target.closest('.macos-window');
      if (window) {
        window.classList.remove('active');
        overlay.classList.remove('active');
      }
    });
  });

  minimizeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const window = e.target.closest('.macos-window');
      if (window) {
        window.classList.add('minimizing');
        setTimeout(() => {
          window.classList.remove('active');
          window.classList.remove('minimizing');
          overlay.classList.remove('active');
        }, 300);
      }
    });
  });

  maximizeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const window = e.target.closest('.macos-window');
      if (window) {
        window.classList.toggle('maximized');
      }
    });
  });

  // Close windows when clicking on overlay
  if (overlay) {
    overlay.addEventListener('click', () => {
      const activeWindows = document.querySelectorAll('.macos-window.active');
      activeWindows.forEach(window => {
        window.classList.remove('active');
      });
      overlay.classList.remove('active');
    });
  }

  // Make windows draggable
  const windows = document.querySelectorAll('.macos-window');

  windows.forEach(window => {
    const titlebar = window.querySelector('.window-titlebar');

    if (titlebar) {
      let isDragging = false;
      let offsetX, offsetY;

      titlebar.addEventListener('mousedown', (e) => {
        // Don't drag if clicking on window controls
        if (e.target.closest('.window-controls')) return;

        isDragging = true;
        offsetX = e.clientX - window.getBoundingClientRect().left;
        offsetY = e.clientY - window.getBoundingClientRect().top;

        // Add dragging class for styling
        window.classList.add('dragging');
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        // Apply new position
        window.style.left = `${x}px`;
        window.style.top = `${y}px`;
        window.style.transform = 'none'; // Remove default centering
      });

      document.addEventListener('mouseup', () => {
        isDragging = false;
        window.classList.remove('dragging');
      });
    }
  });

  // Add animation to project files
  const projectFiles = document.querySelectorAll('.project-file');

  projectFiles.forEach(file => {
    file.addEventListener('click', () => {
      file.classList.add('file-clicked');
      setTimeout(() => {
        file.classList.remove('file-clicked');
      }, 300);
    });
  });

  // Add dock hover effect with tooltips
  const dockItems = document.querySelectorAll('.dock-item');

  dockItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      // Apply neighbor effect to other dock items
      dockItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.add('dock-item-neighbor');
        }
      });
    });

    item.addEventListener('mouseleave', () => {
      // Remove neighbor effect from all dock items
      dockItems.forEach(otherItem => {
        otherItem.classList.remove('dock-item-neighbor');
      });
    });

    // Add click functionality for GitHub and LinkedIn icons
    item.addEventListener('click', () => {
      const tooltip = item.getAttribute('data-tooltip');

      // Handle special cases for GitHub and LinkedIn
      if (tooltip === 'GitHub') {
        window.open('https://github.com/nrenx', '_blank');
      } else if (tooltip === 'LinkedIn') {
        window.open('https://linkedin.com/in/bollineninarendrachowdary', '_blank');
      } else if (tooltip === 'Calculator') {
        // You could implement a calculator functionality here
        // For now, let's just add a bounce animation
        item.classList.add('dock-bounce');
        setTimeout(() => {
          item.classList.remove('dock-bounce');
        }, 800);
      }
    });

    // Add touch support for mobile devices
    item.addEventListener('touchstart', (e) => {
      // Don't prevent default for GitHub and LinkedIn to allow clicks
      const tooltip = item.getAttribute('data-tooltip');
      if (tooltip !== 'GitHub' && tooltip !== 'LinkedIn') {
        e.preventDefault();
      }

      // First remove all active tooltips
      dockItems.forEach(otherItem => {
        const otherTooltip = otherItem.querySelector('.dock-tooltip');
        if (otherTooltip) {
          otherTooltip.style.opacity = '0';
          otherTooltip.style.visibility = 'hidden';
        }
        otherItem.classList.remove('dock-item-neighbor');
      });

      // Then show this tooltip
      const tooltipElement = item.querySelector('.dock-tooltip');
      if (tooltipElement) {
        tooltipElement.style.opacity = '1';
        tooltipElement.style.visibility = 'visible';
        tooltipElement.style.transform = 'translateX(-50%) translateY(-5px)';

        // Add neighbor effect
        dockItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.add('dock-item-neighbor');
          }
        });

        // Hide tooltip after a delay
        setTimeout(() => {
          tooltipElement.style.opacity = '0';
          tooltipElement.style.visibility = 'hidden';

          // Remove neighbor effect
          dockItems.forEach(otherItem => {
            otherItem.classList.remove('dock-item-neighbor');
          });
        }, 1500);
      }
    });
  });

  // Add animation to projects section when it comes into view
  const projectsSection = document.getElementById('projects');
  const projectsContent = document.querySelector('.projects-content');

  if (projectsSection && projectsContent) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          projectsContent.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(projectsSection);
  }
}
