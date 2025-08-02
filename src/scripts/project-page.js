// Project Page JavaScript
class ProjectPage {
    constructor() {
        this.init();
    }

    init() {
        this.loadComponents();
        this.setupAnimations();
        this.setupEventListeners();
    }

    async loadComponents() {
        try {
            // Load header component
            const headerContainer = document.getElementById('header-container');
            if (headerContainer && window.HeaderComponent) {
                const header = new window.HeaderComponent();
                await header.init();
                // Set active path for navigation
                header.setActivePath('/company/projects');
            }

            // Load testimonials component  
            const testimonialsContainer = document.getElementById('testimonials-container');
            if (testimonialsContainer) {
                const response = await fetch('../src/components/testimonials/testimonials.html');
                if (response.ok) {
                    const html = await response.text();
                    testimonialsContainer.innerHTML = html;
                    this.initTestimonials();
                }
            }

            // Load footer component
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                const response = await fetch('../src/components/footer/footer.html');
                if (response.ok) {
                    const html = await response.text();
                    footerContainer.innerHTML = html;
                    
                    // Initialize footer functionality if FooterComponent exists
                    if (window.FooterComponent) {
                        const footer = new window.FooterComponent();
                        await footer.init();
                    }
                }
            }

        } catch (error) {
            console.error('Error loading components:', error);
        }
    }

    initTestimonials() {
        const testimonialsTrack = document.getElementById('testimonials-track');
        if (testimonialsTrack && testimonialsTrack.getAttribute('data-auto-scroll') === 'true') {
            this.startTestimonialsAutoScroll(testimonialsTrack);
        }
    }

    startTestimonialsAutoScroll(track) {
        const cards = track.querySelectorAll('.testimonial-card');
        if (cards.length === 0) return;

        const cardWidth = cards[0].offsetWidth + 32; // Include gap
        let currentPosition = 0;

        setInterval(() => {
            currentPosition -= cardWidth;
            
            // Reset to start when reaching the end
            if (Math.abs(currentPosition) >= cardWidth * cards.length) {
                currentPosition = 0;
            }
            
            track.style.transform = `translateX(${currentPosition}px)`;
        }, 4000);
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            observer.observe(card);
        });

        // Add CSS for animations
        this.addAnimationStyles();
    }

    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .project-card {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease;
            }
            
            .project-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .hero-content > * {
                opacity: 0;
                transform: translateY(30px);
                animation: fadeInUp 0.8s ease forwards;
            }
            
            .hero-badge {
                animation-delay: 0.2s;
            }
            
            .hero-title {
                animation-delay: 0.4s;
            }
            
            .hero-subtitle {
                animation-delay: 0.6s;
            }
            
            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        // Add hover effects for project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCard(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCard(card, false);
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    animateCard(card, isHover) {
        const techTags = card.querySelectorAll('.tech-tag');
        
        if (isHover) {
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.05)';
                    tag.style.backgroundColor = 'rgba(255, 165, 0, 0.2)';
                }, index * 50);
            });
        } else {
            techTags.forEach(tag => {
                tag.style.transform = 'scale(1)';
                tag.style.backgroundColor = 'rgba(255, 165, 0, 0.1)';
            });
        }
    }

    handleResize() {
        // Reinitialize testimonials on resize if needed
        const testimonialsTrack = document.getElementById('testimonials-track');
        if (testimonialsTrack) {
            testimonialsTrack.style.transform = 'translateX(0)';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectPage();
});

// Export for use in other scripts
window.ProjectPage = ProjectPage;