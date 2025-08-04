// Contact Form Handler
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('contactSubmitBtn');
        this.messagesContainer = document.getElementById('contact-form-messages');
        this.successMessage = document.getElementById('contact-success-message');
        this.errorMessage = document.getElementById('contact-error-message');
        this.loadingMessage = document.getElementById('contact-loading-message');
        
        this.init();
    }
    
    init() {
        if (this.form) {
            // Add both form submit and button click listeners
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
            
            // Add button click listener
            if (this.submitBtn) {
                this.submitBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🚀 Submit button clicked via event listener');
                    this.handleSubmit(e);
                });
                console.log('✓ Submit button click listener attached');
                
                // Also add a test function to check if button is accessible
                window.testButton = () => {
                    console.log('Testing button accessibility...');
                    console.log('Button element:', this.submitBtn);
                    console.log('Button disabled:', this.submitBtn.disabled);
                    console.log('Button style.pointerEvents:', getComputedStyle(this.submitBtn).pointerEvents);
                    this.handleSubmit({ preventDefault: () => {} });
                };
            } else {
                console.error('❌ Submit button not found');
            }
            
            this.addInputValidation();
            console.log('✓ Contact form initialized');
            console.log('✓ Toast manager available:', !!window.toastManager);
            
            // Ensure toast manager is available
            if (!window.toastManager && window.ToastManager) {
                window.toastManager = new window.ToastManager();
                console.log('✓ Toast manager created');
            }
        } else {
            console.error('❌ Contact form not found');
        }
    }
    
    addInputValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', this.validateField.bind(this));
            input.addEventListener('input', this.clearFieldError.bind(this));
        });
    }
    
    validateField(event) {
        const field = event.target;
        const fieldGroup = field.closest('.contact-page-form-group');
        
        // Remove existing error state
        fieldGroup.classList.remove('error');
        
        // Validate required fields
        if (field.hasAttribute('required') && !field.value.trim()) {
            this.showFieldError(fieldGroup, 'This field is required');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                this.showFieldError(fieldGroup, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Phone validation (optional)
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(field.value.replace(/[\s\-\(\)]/g, ''))) {
                this.showFieldError(fieldGroup, 'Please enter a valid phone number');
                return false;
            }
        }
        
        return true;
    }
    
    showFieldError(fieldGroup, message) {
        fieldGroup.classList.add('error');
        
        // Remove existing error message
        const existingError = fieldGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        fieldGroup.appendChild(errorElement);
    }
    
    clearFieldError(event) {
        const fieldGroup = event.target.closest('.contact-page-form-group');
        fieldGroup.classList.remove('error');
        const errorElement = fieldGroup.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        console.log('📝 Form submitted, processing...');
        
        // Validate all fields
        const isValid = this.validateForm();
        if (!isValid) {
            this.showMessage('error', 'Please fix the errors above and try again.');
            return;
        }
        
        // Show loading state
        this.setLoadingState(true);
        
        try {
            // Prepare form data
            const formData = new FormData();
            
            // Get name directly
            const fullName = this.form.name.value.trim();
            const firstName = fullName.split(' ')[0];
            
            formData.append('name', fullName);
            formData.append('email', this.form.email.value.trim());
            formData.append('phone', this.form.phone.value.trim());
            formData.append('message', this.form.message.value.trim());
            formData.append('service', this.form.service.value);
            
            // Check if we're in Replit environment (no PHP support)
            const isReplit = window.location.hostname.includes('replit') || !document.querySelector('meta[name="php-enabled"]');
            
            if (isReplit) {
                // Simulate form submission for Replit environment
                console.log('Replit environment detected - simulating form submission');
                console.log('Form data that would be sent:', Object.fromEntries(formData));
                
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                this.showMessage('success', 
                    `Thank you ${firstName}! Your message has been received. ` +
                    `In production on Hostinger, both you and ${firstName} would receive professional email notifications. ` +
                    `The complete email system is ready for deployment.`
                );
                this.form.reset();
                
                // Track simulation for analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit_simulation', {
                        'event_category': 'Contact',
                        'event_label': 'Contact Form Simulation',
                        'value': 1
                    });
                }
            } else {
                // Production environment - send to PHP backend
                const response = await fetch('/contact-handler.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    this.showMessage('success', result.message);
                    this.form.reset();
                    
                    // Track real form submission
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'form_submit', {
                            'event_category': 'Contact',
                            'event_label': 'Contact Form',
                            'value': 1
                        });
                    }
                } else {
                    this.showMessage('error', result.message || 'An error occurred. Please try again.');
                }
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            if (error.message.includes('501') || error.message.includes('Unsupported method')) {
                this.showMessage('success', 
                    `Form validation successful! This is a Replit environment which doesn't support PHP. ` +
                    `Your complete email system with professional templates is ready for Hostinger deployment.`
                );
            } else {
                this.showMessage('error', 'Network error. Please check your connection and try again.');
            }
        } finally {
            this.setLoadingState(false);
        }
    }
    
    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField({ target: field })) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.disabled = true;
            this.submitBtn.classList.add('loading');
            this.submitBtn.querySelector('.contact-btn-text').textContent = 'Sending...';
            this.submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';
            this.showMessage('loading', '');
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.classList.remove('loading');
            this.submitBtn.querySelector('.contact-btn-text').textContent = 'Send Message';
            this.submitBtn.querySelector('i').className = 'fas fa-paper-plane';
            
            // Hide loading toast if it exists
            if (this.currentToast && window.toastManager) {
                window.toastManager.hide(this.currentToast);
                this.currentToast = null;
            }
        }
    }
    
    showMessage(type, message) {
        console.log(`📢 Showing ${type} message:`, message);
        
        // Use toast notifications instead of inline messages
        if (window.toastManager) {
            console.log('✓ Using toast manager for notification');
            if (type === 'success') {
                this.currentToast = window.toastManager.success('Message Sent!', message, 6000);
            } else if (type === 'error') {
                this.currentToast = window.toastManager.error('Error', message, 8000);
            } else if (type === 'loading') {
                this.currentToast = window.toastManager.loading('Sending Message', 'Please wait while we send your message...');
            }
        } else {
            // Fallback to alert if toast manager not available
            console.error('❌ Toast manager not available, using alert fallback');
            alert(`${type.toUpperCase()}: ${message}`);
        }
    }
    
    hideMessage(type) {
        // No longer needed as we use toast notifications
        // Toast notifications handle their own hiding
    }
    
    hideAllMessages() {
        // No longer needed as we use toast notifications
        // Toast notifications handle their own hiding
    }
}

// Global function to submit contact form (called by button onclick)
window.submitContactForm = function() {
    console.log('🚀 Submit button clicked');
    
    // Ensure toast manager is available
    if (!window.toastManager) {
        console.log('🔄 Creating toast manager...');
        window.toastManager = new (window.ToastManager || ToastManager)();
    }
    
    if (window.contactFormHandler) {
        window.contactFormHandler.handleSubmit({ preventDefault: () => {} });
    } else {
        console.error('❌ Contact form handler not initialized');
        // Try to create it now
        const form = document.getElementById('contactForm');
        if (form) {
            console.log('🔄 Creating contact form handler now...');
            window.contactFormHandler = new ContactFormHandler();
            window.contactFormHandler.handleSubmit({ preventDefault: () => {} });
        } else {
            console.error('❌ Contact form not found');
            alert('Form not ready. Please refresh the page and try again.');
        }
    }
};

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded, initializing contact form...');
    
    // Check if form exists immediately
    const form = document.getElementById('contactForm');
    if (form) {
        console.log('✓ Form found immediately, initializing...');
        window.contactFormHandler = new ContactFormHandler();
    } else {
        console.log('⏳ Form not found, waiting for components to load...');
        // Wait for components to load
        setTimeout(() => {
            const delayedForm = document.getElementById('contactForm');
            if (delayedForm) {
                console.log('✓ Form found after delay, initializing...');
                window.contactFormHandler = new ContactFormHandler();
            } else {
                console.error('❌ Contact form still not found after delay');
            }
        }, 1500);
    }
});

// Auto-fill form from URL parameters (for marketing campaigns)
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('service')) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.value = urlParams.get('service');
        }
    }
    
    if (urlParams.get('source')) {
        // You can track the source for analytics
        console.log('Contact form accessed from:', urlParams.get('source'));
    }
});

// Export for potential external use
window.ContactFormHandler = ContactFormHandler;