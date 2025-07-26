// Portfolio JavaScript
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.createNavigation();
        this.setupSectionAnimations();
        this.setupSmoothScrolling();
        this.setupScrollNavigation();
    }

    createNavigation() {
        const nav = document.createElement('nav');
        nav.className = 'top-nav';
        nav.innerHTML = `
            <div class="nav-content">
                <a href="#" class="nav-brand">Louis Ke</a>
                <ul class="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#experience">Experience</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
        `;
        document.body.appendChild(nav);
    }

    setupSectionAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    setupSmoothScrolling() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-links a')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const nav = document.querySelector('.top-nav');
                    const navHeight = nav.offsetHeight;
                    const offset = nav.classList.contains('scrolled') ? 20 : 60;
                    const targetPosition = targetSection.offsetTop - navHeight - offset;
                    
                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    setupScrollNavigation() {
        const nav = document.querySelector('.top-nav');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }
}

// Initialize portfolio when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
