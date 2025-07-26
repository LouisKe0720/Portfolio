/**
 * ===== PORTFOLIO JAVASCRIPT =====
 * Interactive portfolio website with smooth scrolling navigation,
 * mobile hamburger menu, section animations, and scroll-based effects.
 * 
 * Features:
 * - Dynamic navigation creation
 * - Mobile-responsive hamburger menu
 * - Smooth scrolling between sections
 * - Section animations on scroll
 * - Active navigation link highlighting
 * - Auto-closing mobile menu
 */

// ===== MAIN PORTFOLIO CLASS =====
class Portfolio {
    constructor() {
        this.init();
    }

    /**
     * Initialize all portfolio functionality
     */
    init() {
        this.createNavigation();
        this.setupSectionAnimations();
        this.setupSmoothScrolling();
        this.setupScrollNavigation();
    }

    /**
     * Create and inject the navigation bar into the page
     * Includes both desktop and mobile navigation elements
     */
    createNavigation() {
        const nav = document.createElement('nav');
        nav.className = 'top-nav';
        nav.innerHTML = `
            <div class="nav-content">
                <a href="#" class="nav-brand">Louis Ke</a>
                <ul class="nav-links">
                    <li><a href="#about">ABOUT</a></li>
                    <li><a href="#projects">PROJECTS</a></li>
                    <li><a href="#experience">EXPERIENCE</a></li>
                    <li><a href="#contact">CONTACT</a></li>
                </ul>
                <div class="nav-controls">
                    <button class="dark-mode-toggle" aria-label="Toggle dark mode">
                        <span class="sun-icon">☀️</span>
                        <span class="moon-icon">🌙</span>
                    </button>
                    <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
            <div class="mobile-dropdown">
                <ul class="mobile-nav-links">
                    <li><a href="#about">ABOUT</a></li>
                    <li><a href="#projects">PROJECTS</a></li>
                    <li><a href="#experience">EXPERIENCE</a></li>
                    <li><a href="#contact">CONTACT</a></li>
                </ul>
            </div>
        `;
        document.body.appendChild(nav);
        this.setupMobileMenu();
        this.setupDarkMode();
    }

    /**
     * Setup dark mode toggle functionality
     * Handles theme switching and persistence
     */
    setupDarkMode() {
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        const body = document.body;
        
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.classList.add(savedTheme);
        }
        
        // Toggle dark mode when button is clicked
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Save theme preference
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark-mode');
            } else {
                localStorage.removeItem('theme');
            }
        });
    }

    /**
     * Setup mobile hamburger menu functionality
     * Handles menu toggle, auto-close on link click, and outside click closing
     */
    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileDropdown = document.querySelector('.mobile-dropdown');
        const nav = document.querySelector('.top-nav');
        
        // Toggle mobile menu when hamburger is clicked
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
        });

        // Close mobile menu when clicking on a navigation link
        document.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('mobile-open');
            });
        });

        // Close mobile menu when clicking outside the navigation
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) {
                nav.classList.remove('mobile-open');
            }
        });
    }

    /**
     * Setup section animations using Intersection Observer API
     * Animates sections into view when they become visible
     */
    setupSectionAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { 
            threshold: 0.1 // Trigger when 10% of the section is visible
        });

        // Observe all sections for animation
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * Setup smooth scrolling for navigation links
     * Handles both desktop and mobile navigation links with enhanced smoothness
     */
    setupSmoothScrolling() {
        document.addEventListener('click', (e) => {
            // Check if clicked element is a navigation link
            if (e.target.matches('.nav-links a, .mobile-nav-links a')) {
                e.preventDefault();
                
                // Get target section ID from href
                const targetId = e.target.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const nav = document.querySelector('.top-nav');
                    const navHeight = nav.offsetHeight;
                    
                    // Calculate precise offset based on navigation state and screen size
                    let offset;
                    if (window.innerWidth <= 1024) {
                        // Mobile/tablet offset
                        offset = nav.classList.contains('scrolled') ? 10 : 20;
                    } else {
                        // Desktop offset
                        offset = nav.classList.contains('scrolled') ? 20 : 40;
                    }
                    
                    const targetPosition = targetSection.offsetTop - navHeight - offset;
                    
                    // Enhanced smooth scroll with custom easing
                    this.smoothScrollTo(Math.max(0, targetPosition), 800);
                }
            }
        });
    }

    /**
     * Custom smooth scroll function with slow-to-fast easing
     * @param {number} targetPosition - Target scroll position
     * @param {number} duration - Animation duration in milliseconds
     */
    smoothScrollTo(targetPosition, duration = 800) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        // Slow-to-fast easing function (ease-in cubic)
        const easeInCubic = (t) => {
            return t * t * t;
        };

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const easedProgress = easeInCubic(progress);
            const currentPosition = startPosition + (distance * easedProgress);
            
            window.scrollTo(0, currentPosition);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    /**
     * Setup scroll-based navigation effects
     * Handles navigation bar state changes and active link highlighting
     */
    setupScrollNavigation() {
        const nav = document.querySelector('.top-nav');
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add 'scrolled' class when user scrolls past threshold
            if (scrollTop > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            // Update active navigation link based on current section in view
            const sections = document.querySelectorAll('section[id]');
            let current = '';

            // Find which section is currently in view
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            // Update active state for navigation links
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// ===== INITIALIZATION =====
/**
 * Initialize the portfolio when DOM is fully loaded
 * This ensures all HTML elements are available before JavaScript runs
 */
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
