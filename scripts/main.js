// Acadify Solution Main JavaScript

class AcadifySolution {
    constructor() {
        this.init();
    }

    init() {
        console.log('Acadify Solution website initialized');
        this.setupContactForm();
        this.setupAnimations();
        this.initializeCounters();
        this.handleFormInteractions();
    }

    setupContactForm() {
        const contactForms = document.querySelectorAll('#contact-form, #meeting-form');
        
        contactForms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                // Show loading state
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitButton.disabled = true;
                
                try {
                    // Simulate form submission (replace with actual endpoint)
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    // Show success message
                    const isContactForm = form.id === 'contact-form';
                    const message = isContactForm 
                        ? 'Message sent successfully! We\'ll get back to you soon.'
                        : 'Meeting request submitted! We\'ll send you a calendar invitation within 24 hours.';
                    
                    this.showNotification(message, 'success');
                    form.reset();
                    
                } catch (error) {
                    this.showNotification('Failed to send message. Please try again.', 'error');
                } finally {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }
            });
        });
    }

    setupAnimations() {
        // Animate elements on scroll
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }

    initializeCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    let count = 0;
                    const increment = target / 100;
                    
                    const updateCounter = () => {
                        if (count < target) {
                            count += increment;
                            counter.textContent = Math.ceil(count);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    handleFormInteractions() {
        // Enhanced form label animations
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            const label = group.querySelector('label');
            
            if (!input || !label) return;
            
            // Handle initial state
            if (input.value) {
                label.classList.add('active');
            }
            
            // Handle focus/blur events
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value && input.type !== 'date' && input.tagName !== 'SELECT') {
                    label.classList.remove('active');
                }
            });
            
            // Handle input events
            input.addEventListener('input', () => {
                if (input.value) {
                    label.classList.add('active');
                } else if (input.type !== 'date' && input.tagName !== 'SELECT') {
                    label.classList.remove('active');
                }
            });
            
            // Handle select changes
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', () => {
                    if (input.value) {
                        label.classList.add('active');
                    } else {
                        label.classList.remove('active');
                    }
                });
            }
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const colors = {
            success: 'var(--neon-green)',
            error: '#ff4444',
            info: 'var(--electric-blue)'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: var(--text-primary);
            padding: var(--spacing-md) var(--spacing-lg);
            border-radius: var(--border-radius-lg);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            font-weight: 500;
            font-family: var(--font-family-primary);
            max-width: 350px;
            word-wrap: break-word;
        `;
        
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

    // Utility method for smooth scrolling
    scrollToElement(targetSelector, offset = 80) {
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - offset;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Utility method for throttling events
    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Utility method for debouncing events
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new AcadifySolution();
});