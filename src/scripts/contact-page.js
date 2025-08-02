// Contact Page JavaScript
class ContactPage {
    constructor() {
        this.init();
    }

    init() {
        this.loadComponents();
        this.setupFormHandling();
        this.setupAnimations();
    }

    async loadComponents() {
        try {
            // Load header component
            const headerContainer = document.getElementById('header-container');
            if (headerContainer && window.HeaderComponent) {
                const header = new window.HeaderComponent();
                await header.init();
                // Set active path for navigation
                header.setActivePath('/contact');
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

    setupFormHandling() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(e);
        });

        // Add real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    async handleFormSubmit(event) {
        const form = event.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.submit-btn');
        
        // Validate form
        if (!this.validateForm(form)) {
            return;
        }

        // Show loading state
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Failed to send message. Please try again or contact us directly.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }
    }

    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Validate email format
        const emailField = form.querySelector('#email');
        if (emailField && emailField.value && !this.isValidEmail(emailField.value)) {
            this.showFieldError(emailField, 'Please enter a valid email address');
            isValid = false;
        }

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        if (field.type === 'email' && value && !this.isValidEmail(value)) {
            this.showFieldError(field, 'Please enter a valid email address');
            return false;
        }

        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.style.borderColor = '#ff4757';
        field.style.background = 'rgba(255, 71, 87, 0.1)';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ff4757;
            font-size: 0.8rem;
            margin-top: 0.25rem;
            display: block;
        `;
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        field.style.background = '';
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            padding: 1rem;
            border-radius: 8px;
            background: ${type === 'success' ? 'rgba(39, 255, 20, 0.1)' : type === 'error' ? 'rgba(255, 71, 87, 0.1)' : 'rgba(0, 191, 255, 0.1)'};
            border: 1px solid ${type === 'success' ? '#39ff14' : type === 'error' ? '#ff4757' : '#00bfff'};
            color: ${type === 'success' ? '#39ff14' : type === 'error' ? '#ff4757' : '#00bfff'};
            backdrop-filter: blur(10px);
            animation: slideInRight 0.3s ease;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                margin-left: auto;
                opacity: 0.7;
                transition: opacity 0.3s ease;
            }
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
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

        // Observe contact items
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            observer.observe(item);
        });

        // Add CSS for animations
        this.addAnimationStyles();
    }

    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .contact-item {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease;
            }
            
            .contact-item.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .contact-form-container {
                opacity: 0;
                transform: translateY(30px);
                animation: fadeInUp 0.8s ease 0.3s forwards;
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactPage();
});

// Export for use in other scripts
window.ContactPage = ContactPage;