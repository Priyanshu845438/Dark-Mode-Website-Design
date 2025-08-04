// Ultra-Modern Footer Component JavaScript
class FooterComponent {
    constructor() {
        this.footer = null;
        this.statsAnimated = false;
        this.init();
    }

    async init() {
        try {
            await this.loadFooter();
            this.initAnimations();
            this.initInteractions();
            console.log('✓ Ultra-modern footer component loaded successfully');
        } catch (error) {
            console.error('✗ Footer component failed to load:', error);
        }
    }

    async loadFooter() {
        const footerContainer = document.getElementById('footer-container');
        if (!footerContainer) return;

        try {
            const response = await fetch('/src/components/footer/footer.html');
            const footerHTML = await response.text();
            
            footerContainer.innerHTML = footerHTML;
            this.footer = footerContainer.querySelector('.footer');
            
            if (this.footer) {
                this.setupIntersectionObserver();
            }
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }

    initAnimations() {
        // Animate stats when footer comes into view
        this.animateStats();
        
        // Initialize particle animations
        this.initParticles();
        
        // Initialize wave animations
        this.initWaves();
    }

    animateStats() {
        const statNumbers = this.footer.querySelectorAll('.stat-number');
        
        const animateCounter = (element, target) => {
            let current = 0;
            const increment = target / 50; // 50 steps
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current) + (target === 98 ? '' : '+');
            }, 30);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.statsAnimated) {
                    this.statsAnimated = true;
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.closest('.stat-item').dataset.count);
                        animateCounter(stat, target);
                    });
                }
            });
        }, { threshold: 0.5 });

        const statsSection = this.footer.querySelector('.footer-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    initParticles() {
        const particles = this.footer.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            // Add random movement variations
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            particle.style.left = randomX + '%';
            particle.style.top = randomY + '%';
            
            // Add random sizes
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Add random animation durations
            const duration = Math.random() * 4 + 4;
            particle.style.animationDuration = duration + 's';
        });
    }

    initWaves() {
        const waves = this.footer.querySelectorAll('.wave');
        waves.forEach((wave, index) => {
            // Add random heights and opacities
            const height = Math.random() * 2 + 1;
            const opacity = Math.random() * 0.4 + 0.2;
            wave.style.height = height + 'px';
            wave.style.opacity = opacity;
        });
    }

    initInteractions() {
        this.addSmoothScrolling();
        this.initBackToTop();
        this.addHoverEffects();
        this.initLazyLoading();
    }

    addSmoothScrolling() {
        const footerLinks = this.footer.querySelectorAll('a[href^="#"]');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initBackToTop() {
        const backToTopBtn = this.footer.querySelector('.back-to-top');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Show/hide based on scroll position
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopBtn.style.opacity = '0.8';
                    backToTopBtn.style.pointerEvents = 'auto';
                } else {
                    backToTopBtn.style.opacity = '0';
                    backToTopBtn.style.pointerEvents = 'none';
                }
            });
        }
    }

    addHoverEffects() {
        // Add 3D tilt effect to CTA buttons
        const ctaButtons = this.footer.querySelectorAll('.cta-btn');
        ctaButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                btn.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });

        // Add magnetic effect to social links
        const socialLinks = this.footer.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translate(0, 0)';
            });
        });
    }

    setupIntersectionObserver() {
        // Animate elements as they come into view
        const animatedElements = this.footer.querySelectorAll('.footer-column, .footer-cta, .footer-brand-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(element);
        });
    }

    initLazyLoading() {
        const footerImages = this.footer.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });

            footerImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            footerImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }
}

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FooterComponent();
});