// Main Application JavaScript

class AcadifyApp {
    constructor() {
        this.currentSlide = 0;
        this.isAutoPlaying = true;
        this.init();
    }

    init() {
        this.initializeComponents();
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupForms();
        this.startAutoSlider();
    }

    initializeComponents() {
        // Initialize Header/Navigation
        this.initNavigation();
        
        // Initialize Testimonials Slider
        this.initTestimonialsSlider();
        
        // Initialize Counter Animation
        this.initCounterAnimation();
        
        // Initialize Scroll Animations
        this.initScrollAnimations();
        
        // Initialize Tech Stack Interactions
        this.initTechStack();
    }

    setupEventListeners() {
        // Smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-scroll-to]')) {
                e.preventDefault();
                const target = document.getElementById(e.target.dataset.scrollTo);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });

        // Mobile navigation toggle
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileNav = document.getElementById('mobile-nav');
        const mobileNavClose = document.getElementById('mobile-nav-close');

        if (hamburgerBtn && mobileNav) {
            hamburgerBtn.addEventListener('click', () => {
                mobileNav.classList.add('active');
                hamburgerBtn.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        if (mobileNavClose && mobileNav) {
            mobileNavClose.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                const hamburgerBtn = document.getElementById('hamburger-btn');
                if (hamburgerBtn) hamburgerBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close mobile nav on overlay click
        if (mobileNav) {
            mobileNav.addEventListener('click', (e) => {
                if (e.target.classList.contains('mobile-nav-overlay')) {
                    mobileNav.classList.remove('active');
                    const hamburgerBtn = document.getElementById('hamburger-btn');
                    if (hamburgerBtn) hamburgerBtn.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Mobile dropdown toggles
        document.addEventListener('click', (e) => {
            if (e.target.matches('.dropdown-toggle') || e.target.closest('.dropdown-toggle')) {
                e.preventDefault();
                const button = e.target.matches('.dropdown-toggle') ? e.target : e.target.closest('.dropdown-toggle');
                const targetId = button.dataset.target;
                const dropdown = document.getElementById(targetId);
                
                if (dropdown) {
                    const isActive = dropdown.classList.contains('active');
                    
                    // Close all dropdowns
                    document.querySelectorAll('.mobile-dropdown').forEach(dd => {
                        dd.classList.remove('active');
                    });
                    document.querySelectorAll('.dropdown-toggle').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    // Toggle current dropdown
                    if (!isActive) {
                        dropdown.classList.add('active');
                        button.classList.add('active');
                    }
                }
            }
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Scroll handler for header
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    initNavigation() {
        // Mega menu functionality
        const servicesLink = document.querySelector('[data-mega-menu="services"]');
        const megaMenu = document.getElementById('mega-menu');

        if (servicesLink && megaMenu) {
            let megaMenuTimeout;

            servicesLink.addEventListener('mouseenter', () => {
                clearTimeout(megaMenuTimeout);
                megaMenu.classList.add('active');
            });

            servicesLink.addEventListener('mouseleave', () => {
                megaMenuTimeout = setTimeout(() => {
                    megaMenu.classList.remove('active');
                }, 150);
            });

            megaMenu.addEventListener('mouseenter', () => {
                clearTimeout(megaMenuTimeout);
            });

            megaMenu.addEventListener('mouseleave', () => {
                megaMenu.classList.remove('active');
            });

            // Close mega menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    megaMenu.classList.remove('active');
                }
            });
        }
    }

    initTestimonialsSlider() {
        const track = document.querySelector('.testimonials-track');
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');
        const dots = document.querySelectorAll('.slider-dot');

        if (!track || !prevBtn || !nextBtn) return;

        const totalSlides = 4;

        prevBtn.addEventListener('click', () => {
            this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : totalSlides - 1;
            this.updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            this.currentSlide = this.currentSlide < totalSlides - 1 ? this.currentSlide + 1 : 0;
            this.updateSlider();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.currentSlide = index;
                this.updateSlider();
            });
        });

        // Pause auto-play on hover
        const slider = document.querySelector('.testimonials-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => {
                this.isAutoPlaying = false;
            });

            slider.addEventListener('mouseleave', () => {
                this.isAutoPlaying = true;
            });
        }
    }

    updateSlider() {
        const track = document.querySelector('.testimonials-track');
        const dots = document.querySelectorAll('.slider-dot');

        if (track) {
            track.dataset.slide = this.currentSlide;
        }

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoSlider() {
        setInterval(() => {
            if (this.isAutoPlaying) {
                this.currentSlide = this.currentSlide < 3 ? this.currentSlide + 1 : 0;
                this.updateSlider();
            }
        }, 5000);
    }

    initCounterAnimation() {
        const counters = document.querySelectorAll('[data-count]');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.count);
                    const duration = 2000; // 2 seconds
                    const stepTime = 50; // Update every 50ms
                    const totalSteps = duration / stepTime;
                    const increment = target / totalSteps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, stepTime);

                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    initScrollAnimations() {
        const animateElements = document.querySelectorAll('[data-animation], .service-card, .tech-category, .testimonial-card');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add staggered animation for tech items
                    if (entry.target.classList.contains('tech-category')) {
                        const techItems = entry.target.querySelectorAll('.tech-item');
                        techItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate-in');
                            }, index * 100);
                        });
                    }
                }
            });
        }, observerOptions);

        animateElements.forEach(element => observer.observe(element));

        // Hero animations
        setTimeout(() => {
            document.querySelectorAll('.title-line').forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('animate-in');
                }, index * 200);
            });

            setTimeout(() => {
                const subtitle = document.querySelector('.hero-subtitle');
                const stats = document.querySelector('.hero-stats');
                const actions = document.querySelector('.hero-actions');

                if (subtitle) subtitle.classList.add('animate-in');
                if (stats) setTimeout(() => stats.classList.add('animate-in'), 200);
                if (actions) setTimeout(() => actions.classList.add('animate-in'), 400);
            }, 600);
        }, 500);
    }

    initTechStack() {
        const techItems = document.querySelectorAll('.tech-item');
        
        techItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const tooltip = item.querySelector('.tech-tooltip');
                if (tooltip) {
                    // Position tooltip to prevent overflow
                    const rect = item.getBoundingClientRect();
                    const tooltipRect = tooltip.getBoundingClientRect();
                    
                    if (rect.left + tooltipRect.width > window.innerWidth) {
                        tooltip.style.left = 'auto';
                        tooltip.style.right = '0';
                    }
            
                    if (rect.top - tooltipRect.height < 0) {
                        tooltip.style.top = '100%';
                        tooltip.style.bottom = 'auto';
                        tooltip.style.transform = 'translateX(-50%) translateY(10px)';
                    }
                }
            });
        });
    }

    setupForms() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            new ContactFormHandler(contactForm);
        }

        const newsletterForms = document.querySelectorAll('.newsletter-form');
        newsletterForms.forEach(form => {
            new NewsletterFormHandler(form);
        });
    }

    handleResize() {
        // Handle responsive navigation
        if (window.innerWidth > 1023) {
            const mobileNav = document.getElementById('mobile-nav');
            if (mobileNav) {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }

    handleScroll() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    initializeAnimations() {
        // Add any custom animations or interactions here
        this.initParticleAnimation();
        this.initGlowEffects();
    }

    initParticleAnimation() {
        // Animate floating particles in hero section
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const delay = index * 0.5;
            particle.style.animationDelay = `${delay}s`;
        });
    }

    initGlowEffects() {
        // Add glow effects to interactive elements
        const glowElements = document.querySelectorAll('.glow-btn, .service-card, .tech-item');
        
        glowElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                element.style.setProperty('--mouse-x', `${x}px`);
                element.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }
}

// Contact Form Handler
class ContactFormHandler {
    constructor(form) {
        this.form = form;
        this.submitBtn = form.querySelector('#submit-btn');
        this.successMessage = form.querySelector('#form-success');
        this.errorMessage = form.querySelector('#form-error');
        this.resetBtn = form.querySelector('#reset-btn');
        
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.resetBtn?.addEventListener('click', () => this.resetForm());
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) return;
        
        this.setLoading(true);
        
        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate API call (replace with actual endpoint)
            await this.simulateAPICall(data);
            
            this.showSuccess();
            this.form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError();
        } finally {
            this.setLoading(false);
        }
    }

    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const name = field.name;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
            isValid = false;
        }
        
        // Email validation
        else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        }
        
        // Phone validation
        else if (type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                errorMessage = 'Please enter a valid phone number';
                isValid = false;
            }
        }

        this.showFieldError(field, errorMessage);
        return isValid;
    }

    showFieldError(field, message) {
        const errorElement = document.getElementById(`${field.name}-error`);
        
        if (message) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.add('show');
            }
        } else {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        }
    }

    clearError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    setLoading(loading) {
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    showSuccess() {
        this.successMessage.classList.add('show');
        this.errorMessage.classList.remove('show');
        
        setTimeout(() => {
            this.successMessage.classList.remove('show');
        }, 5000);
    }

    showError() {
        this.errorMessage.classList.add('show');
        this.successMessage.classList.remove('show');
        
        setTimeout(() => {
            this.errorMessage.classList.remove('show');
        }, 5000);
    }

    resetForm() {
        this.form.reset();
        this.form.querySelectorAll('.error').forEach(field => {
            field.classList.remove('error');
        });
        this.form.querySelectorAll('.form-error.show').forEach(error => {
            error.classList.remove('show');
        });
        this.successMessage.classList.remove('show');
        this.errorMessage.classList.remove('show');
    }

    async simulateAPICall(data) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate random success/failure for demo
        if (Math.random() > 0.1) { // 90% success rate
            return { success: true };
        } else {
            throw new Error('Network error');
        }
    }
}

// Newsletter Form Handler
class NewsletterFormHandler {
    constructor(form) {
        this.form = form;
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const emailInput = this.form.querySelector('input[type="email"]');
        const submitBtn = this.form.querySelector('button[type="submit"]');
        
        if (!emailInput.value.trim()) {
            this.showMessage('Please enter your email address', 'error');
            return;
        }

        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.showMessage('Thanks for subscribing!', 'success');
            this.form.reset();
        } catch (error) {
            this.showMessage('Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    showMessage(message, type) {
        // Create or update message element
        let messageEl = this.form.querySelector('.newsletter-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'newsletter-message';
            this.form.appendChild(messageEl);
        }

        messageEl.textContent = message;
        messageEl.className = `newsletter-message ${type}`;
        
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AcadifyApp();
});

// Service worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful');
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed');
            });
    });
}