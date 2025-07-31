// Component Loading Module - Optimized and Cleaned
class ComponentLoader {
    constructor() {
        this.loadComponents();
    }

    async loadComponents() {
        // Detect if we're in a subdirectory
        const pathParts = window.location.pathname.split('/');
        const isInSubdir = pathParts.length > 2 && pathParts[1] !== '';
        const basePath = isInSubdir ? '../' : '';
        
        const components = [
            { selector: '#header-placeholder', url: `${basePath}components/header.html` },
            { selector: '#footer-placeholder', url: `${basePath}components/footer.html` },
            { selector: '#hero-placeholder', url: `${basePath}components/hero.html` },
            { selector: '#testimonials-placeholder', url: `${basePath}components/testimonials.html` },
            { selector: '#client-logos-placeholder', url: `${basePath}components/client-logos.html` },
            { selector: '#benchmark-hero-placeholder', url: `${basePath}components/benchmark-hero.html` },
            { selector: '#cta-premium-placeholder', url: `${basePath}components/cta-premium.html` },
            { selector: '#why-choose-us-placeholder', url: `${basePath}components/why-choose-us.html` },
            { selector: '#expertise-placeholder', url: `${basePath}components/expertise.html` }
        ];

        const loadPromises = components.map(component => this.loadComponent(component));
        
        try {
            await Promise.all(loadPromises);
            this.initializeLoadedComponents();
        } catch (error) {
            console.warn('Some components failed to load:', error);
        }
    }

    async loadComponent({ selector, url }) {
        const placeholder = document.querySelector(selector);
        if (!placeholder) return;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to load ${url}`);
            
            const html = await response.text();
            placeholder.innerHTML = html;
            placeholder.classList.add('component-loaded');
            
            return true;
        } catch (error) {
            console.warn(`Failed to load component ${url}:`, error);
            placeholder.style.display = 'none';
            return false;
        }
    }

    initializeLoadedComponents() {
        // Initialize any component-specific JavaScript after loading
        this.initializeCounters();
        this.initializeCarousels();
        this.initializeModals();
    }

    initializeCounters() {
        const counters = document.querySelectorAll('[data-count]');
        if (counters.length === 0) return;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    }

    initializeCarousels() {
        document.querySelectorAll('[data-carousel]').forEach(carousel => {
            new SimpleCarousel(carousel);
        });
    }

    initializeModals() {
        document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal-trigger');
                const modal = document.getElementById(modalId);
                if (modal) this.openModal(modal);
            });
        });

        document.querySelectorAll('.modal__close, .modal').forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal__close') || e.target.classList.contains('modal')) {
                    this.closeModal(e.target.closest('.modal'));
                }
            });
        });
    }

    openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Simple Carousel Implementation
class SimpleCarousel {
    constructor(element) {
        this.carousel = element;
        this.track = element.querySelector('.carousel-track');
        this.slides = element.querySelectorAll('.carousel-slide');
        this.nextBtn = element.querySelector('.carousel-next');
        this.prevBtn = element.querySelector('.carousel-prev');
        this.indicators = element.querySelectorAll('.carousel-indicator');
        
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        
        if (this.slideCount > 0) {
            this.init();
        }
    }

    init() {
        this.setupEventListeners();
        this.updateCarousel();
        
        // Auto-play if enabled
        const autoPlay = this.carousel.getAttribute('data-autoplay');
        if (autoPlay) {
            this.startAutoPlay(parseInt(autoPlay) || 5000);
        }
    }

    setupEventListeners() {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goTo(index));
        });

        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slideCount;
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.updateCarousel();
    }

    goTo(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        if (this.track) {
            const translateX = -this.currentIndex * 100;
            this.track.style.transform = `translateX(${translateX}%)`;
        }
        
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoPlay(interval) {
        setInterval(() => {
            if (!this.carousel.matches(':hover')) {
                this.next();
            }
        }, interval);
    }
}

// Initialize component loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ComponentLoader();
});