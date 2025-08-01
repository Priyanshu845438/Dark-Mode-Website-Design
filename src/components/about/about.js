/**
 * About Section Component - Modern Animation Controller
 * Handles scroll-triggered animations and smooth transitions
 */

class AboutAnimationController {
    constructor() {
        this.aboutSection = null;
        this.observer = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.aboutSection = document.querySelector('.about-section');
        if (!this.aboutSection) return;

        this.setupIntersectionObserver();
        this.bindEvents();
    }

    setupIntersectionObserver() {
        // Configure intersection observer for scroll animations
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -20% 0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimations();
                }
            });
        }, observerOptions);

        // Observe the about section
        if (this.aboutSection) {
            this.observer.observe(this.aboutSection);
        }
    }

    triggerAnimations() {
        // Trigger slide animations for content and visual elements
        const contentElement = this.aboutSection.querySelector('.about-content');
        const visualElement = this.aboutSection.querySelector('.about-visual');

        if (contentElement) {
            setTimeout(() => {
                contentElement.classList.add('animate');
            }, 100);
        }

        if (visualElement) {
            setTimeout(() => {
                visualElement.classList.add('animate');
            }, 300);
        }

        // Add staggered animation to industry badges
        this.animateIndustryBadges();

        // Disconnect observer after animation is triggered
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    animateIndustryBadges() {
        const badges = this.aboutSection.querySelectorAll('.industry-badge');
        badges.forEach((badge, index) => {
            setTimeout(() => {
                badge.style.opacity = '1';
                badge.style.transform = 'translateY(0)';
            }, 500 + (index * 100));
        });
    }

    bindEvents() {
        // Force immediate visibility
        this.forceVisibility();
        
        // Add hover effects for tech animation
        const techAnimation = this.aboutSection.querySelector('.tech-animation');
        if (techAnimation) {
            techAnimation.addEventListener('mouseenter', this.enhanceTechAnimation);
            techAnimation.addEventListener('mouseleave', this.resetTechAnimation);
        }

        // Add click events to industry badges for subtle feedback
        const badges = this.aboutSection.querySelectorAll('.industry-badge');
        badges.forEach(badge => {
            badge.addEventListener('click', this.handleBadgeClick);
        });
    }

    forceVisibility() {
        // Force visibility on all About elements
        const aboutSection = document.querySelector('.about-section');
        const aboutContainer = document.querySelector('.about-container');
        const aboutGrid = document.querySelector('.about-grid');
        const aboutContent = document.querySelector('.about-content');
        const aboutVisual = document.querySelector('.about-visual');
        
        if (aboutSection) {
            aboutSection.style.display = 'flex';
            aboutSection.style.opacity = '1';
            aboutSection.style.visibility = 'visible';
            aboutSection.style.background = '#000000';
        }
        
        if (aboutContainer) {
            aboutContainer.style.display = 'block';
            aboutContainer.style.visibility = 'visible';
        }
        
        if (aboutGrid) {
            aboutGrid.style.display = 'grid';
            aboutGrid.style.visibility = 'visible';
        }

        if (aboutContent) {
            aboutContent.style.opacity = '1';
            aboutContent.style.visibility = 'visible';
            aboutContent.style.transform = 'translateX(0)';
            aboutContent.style.display = 'block';
        }

        if (aboutVisual) {
            aboutVisual.style.opacity = '1';
            aboutVisual.style.visibility = 'visible';
            aboutVisual.style.transform = 'translateX(0)';
            aboutVisual.style.display = 'flex';
        }

        console.log('About section visibility forced');
    }

    enhanceTechAnimation = () => {
        const techAnimation = this.aboutSection.querySelector('.tech-animation');
        if (techAnimation) {
            techAnimation.style.transform = 'scale(1.05)';
            techAnimation.style.transition = 'transform 0.3s ease';
        }
    }

    resetTechAnimation = () => {
        const techAnimation = this.aboutSection.querySelector('.tech-animation');
        if (techAnimation) {
            techAnimation.style.transform = 'scale(1)';
        }
    }

    handleBadgeClick = (event) => {
        const badge = event.target;
        badge.style.transform = 'scale(0.95)';
        setTimeout(() => {
            badge.style.transform = '';
        }, 150);
    }

    // Cleanup method
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Initialize the about animation controller
const aboutController = new AboutAnimationController();

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AboutAnimationController;
}