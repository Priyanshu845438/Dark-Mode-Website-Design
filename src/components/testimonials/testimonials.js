// Testimonials component with animations
class TestimonialsComponent {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeTestimonials());
        } else {
            this.initializeTestimonials();
        }
    }

    initializeTestimonials() {
        console.log('✓ Testimonials component initialized');
        
        // Animate metrics counter
        this.animateMetrics();
        
        // Setup hover effects
        this.setupHoverEffects();
        
        // Setup intersection observer for animations
        this.setupScrollAnimations();
    }

    animateMetrics() {
        const metricNumbers = document.querySelectorAll('.metric-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const finalValue = element.textContent;
                    
                    // Extract number and suffix
                    const match = finalValue.match(/(\d+)([%+]*)/);
                    if (match) {
                        const number = parseInt(match[1]);
                        const suffix = match[2] || '';
                        
                        // Animate from 0 to final value
                        let current = 0;
                        const increment = number / 60; // 60 frames for smooth animation
                        
                        const animate = () => {
                            current += increment;
                            if (current >= number) {
                                element.textContent = number + suffix;
                            } else {
                                element.textContent = Math.floor(current) + suffix;
                                requestAnimationFrame(animate);
                            }
                        };
                        
                        animate();
                        observer.unobserve(element);
                    }
                }
            });
        }, { threshold: 0.5 });

        metricNumbers.forEach(metric => observer.observe(metric));
    }

    setupHoverEffects() {
        // Add magnetic effect to cards
        const cards = document.querySelectorAll('.testimonial-card, .testimonial-featured');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add glow effect to rating stars
        const ratings = document.querySelectorAll('.rating');
        ratings.forEach(rating => {
            rating.addEventListener('mouseenter', () => {
                const stars = rating.querySelectorAll('i');
                stars.forEach((star, index) => {
                    setTimeout(() => {
                        star.style.transform = 'scale(1.2)';
                        star.style.filter = 'brightness(1.5)';
                        setTimeout(() => {
                            star.style.transform = 'scale(1)';
                            star.style.filter = 'brightness(1)';
                        }, 150);
                    }, index * 100);
                });
            });
        });
    }

    setupScrollAnimations() {
        const animateElements = document.querySelectorAll('.testimonial-card, .testimonial-featured, .metric-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease-out';
            observer.observe(element);
        });
    }
}

// Initialize when script loads
new TestimonialsComponent();