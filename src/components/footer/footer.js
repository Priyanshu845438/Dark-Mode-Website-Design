// Footer Component JavaScript
class FooterComponent {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadFooter();
        this.setupFooterInteractions();
    }

    async loadFooter() {
        // Footer HTML is now loaded by the main component loader
        // This method just sets up interactions
        console.log('Footer component initialized');
    }

    setupFooterInteractions() {
        // Smooth scroll for footer links that are anchors
        const footerLinks = document.querySelectorAll('.footer a[href^="#"]');
        
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

        // Add hover effects to social links
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-2px)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0)';
            });
        });

        // Newsletter subscription (if present)
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubscription(e);
            });
        }
    }

    handleNewsletterSubscription(event) {
        const form = event.target;
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (!emailInput || !emailInput.value.trim()) {
            this.showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Disable submit button
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';

        // Simulate newsletter subscription (replace with actual endpoint)
        setTimeout(() => {
            this.showNotification('Thank you for subscribing to our newsletter!', 'success');
            form.reset();
            
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = 'Subscribe';
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--neon-green)' : type === 'error' ? '#ff4444' : 'var(--electric-blue)'};
            color: var(--text-primary);
            padding: var(--spacing-md) var(--spacing-lg);
            border-radius: var(--border-radius-md);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            font-weight: 500;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FooterComponent();
});