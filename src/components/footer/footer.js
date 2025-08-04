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
            this.footer = footerContainer.querySelector('.acadify-footer-unique-container');
            
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
        const statNumbers = this.footer.querySelectorAll('.acadify-stat-number-unique');
        
        const animateCounter = (element, target) => {
            let current = 0;
            const increment = target / 50; // 50 steps
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                if (target === 98) {
                    element.textContent = Math.floor(current) + '%';
                } else {
                    element.textContent = Math.floor(current) + '+';
                }
            }, 30);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.statsAnimated) {
                    this.statsAnimated = true;
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.closest('.acadify-stat-item-unique').dataset.count);
                        animateCounter(stat, target);
                    });
                }
            });
        }, { threshold: 0.5 });

        const statsSection = this.footer.querySelector('.acadify-footer-stats-unique');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    initParticles() {
        const particles = this.footer.querySelectorAll('.acadify-particle-unique');
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
        const waves = this.footer.querySelectorAll('.acadify-wave-unique');
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
        this.initAcadifyAnimations();
        this.initAdvancedInteractions();
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
        const backToTopBtn = this.footer.querySelector('.acadify-back-to-top');
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
                    backToTopBtn.style.opacity = '0.9';
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

        // Add magnetic effect to social icons
        const socialIcons = this.footer.querySelectorAll('.acadify-social-icon');
        socialIcons.forEach((icon, index) => {
            icon.addEventListener('mousemove', (e) => {
                const rect = icon.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                icon.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) translateY(-8px) scale(1.15) rotate(0deg)`;
                
                // Create ripple effect
                this.createRipple(icon, e.clientX - rect.left, e.clientY - rect.top);
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'translate(0, 0) translateY(0) scale(1)';
                icon.style.animation = `acadify-icon-rotate 8s linear infinite`;
                icon.style.animationDelay = `${index * 2}s`;
            });
            
            // Add click animation
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                this.createClickEffect(icon);
                
                // Simulate social media link action
                setTimeout(() => {
                    console.log(`Opening ${icon.getAttribute('aria-label')} social media...`);
                }, 300);
            });
        });

        // Add hover effects to CTA buttons
        const ctaButtons = this.footer.querySelectorAll('.acadify-contact-cta-unique, .acadify-meeting-cta-unique');
        ctaButtons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                const icon = btn.querySelector('.acadify-cta-icon-unique');
                if (icon) {
                    icon.style.animation = 'acadify-cta-bounce 0.6s ease-in-out infinite';
                }
            });
            
            btn.addEventListener('mouseleave', () => {
                const icon = btn.querySelector('.acadify-cta-icon-unique');
                if (icon) {
                    icon.style.animation = 'acadify-cta-bounce 2s ease-in-out infinite';
                }
            });
        });

        // Initialize back to top button
        const backToTopBtn = this.footer.querySelector('.acadify-back-to-top');
        if (backToTopBtn) {
            const showButton = () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.style.opacity = '1';
                    backToTopBtn.style.visibility = 'visible';
                } else {
                    backToTopBtn.style.opacity = '0.9';
                    backToTopBtn.style.visibility = 'visible';
                }
            };

            window.addEventListener('scroll', showButton);

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
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

    initAcadifyAnimations() {
        // Initialize staggered entrance animations
        this.initStaggeredAnimations();
        
        // Initialize particle interactions
        this.initParticleInteractions();
        
        // Initialize typing effect for social title
        this.initTypingEffect();
        
        // Initialize floating elements
        this.initFloatingElements();
    }

    initStaggeredAnimations() {
        const elements = this.footer.querySelectorAll('.acadify-footer-column-unique, .acadify-social-icon, .acadify-back-to-top');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('acadify-animate-in');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(element);
        });

        // Add CSS class dynamically
        const style = document.createElement('style');
        style.textContent = `
            .acadify-animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    initParticleInteractions() {
        const particles = this.footer.querySelectorAll('.acadify-particle-unique');
        
        particles.forEach(particle => {
            particle.addEventListener('click', () => {
                this.createParticleExplosion(particle);
            });
        });

        // Add mouse interaction for particles
        this.footer.addEventListener('mousemove', (e) => {
            particles.forEach(particle => {
                const rect = particle.getBoundingClientRect();
                const distance = Math.sqrt(
                    Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
                    Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
                );
                
                if (distance < 100) {
                    const scale = 1 + (100 - distance) / 100;
                    particle.style.transform += ` scale(${scale})`;
                    particle.style.opacity = 0.9;
                }
            });
        });
    }

    initTypingEffect() {
        const socialTitle = this.footer.querySelector('.acadify-social-title');
        if (socialTitle) {
            const originalText = socialTitle.textContent;
            socialTitle.textContent = '';
            
            let index = 0;
            const typeInterval = setInterval(() => {
                socialTitle.textContent += originalText[index];
                index++;
                
                if (index >= originalText.length) {
                    clearInterval(typeInterval);
                    // Add cursor blink effect
                    socialTitle.innerHTML += '<span class="acadify-cursor">|</span>';
                    
                    const style = document.createElement('style');
                    style.textContent = `
                        .acadify-cursor {
                            animation: acadify-blink 1s infinite;
                        }
                        @keyframes acadify-blink {
                            0%, 50% { opacity: 1; }
                            51%, 100% { opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }, 100);
        }
    }

    initFloatingElements() {
        const floatingElements = [
            { emoji: '💫', size: 20, duration: 8 },
            { emoji: '✨', size: 16, duration: 6 },
            { emoji: '🚀', size: 24, duration: 10 },
            { emoji: '💻', size: 18, duration: 7 }
        ];

        floatingElements.forEach((elem, index) => {
            const floating = document.createElement('div');
            floating.innerHTML = elem.emoji;
            floating.style.cssText = `
                position: absolute;
                font-size: ${elem.size}px;
                pointer-events: none;
                opacity: 0.3;
                animation: acadify-float-random ${elem.duration}s ease-in-out infinite;
                animation-delay: ${index * 2}s;
                left: ${Math.random() * 80 + 10}%;
                top: ${Math.random() * 60 + 20}%;
                z-index: 1;
            `;
            
            this.footer.appendChild(floating);
        });

        // Add floating animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes acadify-float-random {
                0%, 100% { 
                    transform: translateY(0px) rotate(0deg); 
                    opacity: 0.3; 
                }
                25% { 
                    transform: translateY(-20px) rotate(90deg); 
                    opacity: 0.6; 
                }
                50% { 
                    transform: translateY(-10px) rotate(180deg); 
                    opacity: 0.4; 
                }
                75% { 
                    transform: translateY(-15px) rotate(270deg); 
                    opacity: 0.5; 
                }
            }
        `;
        document.head.appendChild(style);
    }

    initAdvancedInteractions() {
        // Initialize parallax scrolling for footer
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = this.footer.querySelector('.acadify-footer-particles-unique');
            
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });

        // Initialize wave cursor interaction
        this.footer.addEventListener('mousemove', (e) => {
            const waves = this.footer.querySelectorAll('.acadify-wave-unique');
            const rect = this.footer.getBoundingClientRect();
            const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
            
            waves.forEach((wave, index) => {
                wave.style.top = `${mouseY + (index * 10)}%`;
                wave.style.opacity = 0.6 - (index * 0.1);
            });
        });

        // Initialize social icons constellation effect
        this.initConstellationEffect();
    }

    initConstellationEffect() {
        const socialIcons = Array.from(this.footer.querySelectorAll('.acadify-social-icon'));
        const lines = [];

        socialIcons.forEach((icon, i) => {
            socialIcons.slice(i + 1).forEach((otherIcon, j) => {
                const line = document.createElement('div');
                line.style.cssText = `
                    position: absolute;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(0, 191, 255, 0.3), transparent);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                    z-index: 5;
                `;
                
                this.footer.querySelector('.acadify-footer-social').appendChild(line);
                lines.push({ line, icon1: icon, icon2: otherIcon });
            });
        });

        // Show constellation on hover
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                lines.forEach(({ line, icon1, icon2 }) => {
                    if (icon1 === icon || icon2 === icon) {
                        const rect1 = icon1.getBoundingClientRect();
                        const rect2 = icon2.getBoundingClientRect();
                        const containerRect = this.footer.querySelector('.acadify-footer-social').getBoundingClientRect();
                        
                        const x1 = rect1.left + rect1.width / 2 - containerRect.left;
                        const y1 = rect1.top + rect1.height / 2 - containerRect.top;
                        const x2 = rect2.left + rect2.width / 2 - containerRect.left;
                        const y2 = rect2.top + rect2.height / 2 - containerRect.top;
                        
                        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                        
                        line.style.width = `${length}px`;
                        line.style.left = `${x1}px`;
                        line.style.top = `${y1}px`;
                        line.style.transform = `rotate(${angle}deg)`;
                        line.style.transformOrigin = '0 0';
                        line.style.opacity = '1';
                    }
                });
            });
            
            icon.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    if (!socialIcons.some(i => i.matches(':hover'))) {
                        lines.forEach(({ line }) => {
                            line.style.opacity = '0';
                        });
                    }
                }, 100);
            });
        });
    }

    createRipple(element, x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 191, 255, 0.6);
            transform: scale(0);
            animation: acadify-ripple 0.6s linear;
            left: ${x - 10}px;
            top: ${y - 10}px;
            width: 20px;
            height: 20px;
            pointer-events: none;
            z-index: 10;
        `;
        
        element.appendChild(ripple);
        
        // Add ripple animation CSS if not exists
        if (!document.querySelector('#acadify-ripple-style')) {
            const style = document.createElement('style');
            style.id = 'acadify-ripple-style';
            style.textContent = `
                @keyframes acadify-ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => ripple.remove(), 600);
    }

    createClickEffect(element) {
        element.style.transform = 'scale(0.9)';
        element.style.filter = 'brightness(1.5)';
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.filter = '';
        }, 150);
    }

    createParticleExplosion(particle) {
        const colors = ['#00BFFF', '#39FF14', '#FFA500'];
        
        for (let i = 0; i < 8; i++) {
            const fragment = document.createElement('div');
            fragment.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 20;
            `;
            
            const rect = particle.getBoundingClientRect();
            fragment.style.left = rect.left + rect.width / 2 + 'px';
            fragment.style.top = rect.top + rect.height / 2 + 'px';
            
            document.body.appendChild(fragment);
            
            const angle = (i / 8) * Math.PI * 2;
            const velocity = 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let posX = 0;
            let posY = 0;
            let opacity = 1;
            
            const animate = () => {
                posX += vx * 0.1;
                posY += vy * 0.1;
                opacity -= 0.05;
                
                fragment.style.transform = `translate(${posX}px, ${posY}px)`;
                fragment.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    fragment.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
    }

    // Utility method for throttling events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FooterComponent();
});