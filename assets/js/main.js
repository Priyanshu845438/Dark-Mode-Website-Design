// Main JavaScript Entry Point - Optimized and Modular
class TechVisionApp {
    constructor() {
        this.init();
    }

    async init() {
        try {
            // Load core modules
            await this.loadModules();
            
            // Initialize app features
            this.initializeFeatures();
            
            // Setup error handling
            this.setupErrorHandling();
            
            console.log('TechVision app initialized successfully');
        } catch (error) {
            console.error('Failed to initialize TechVision app:', error);
        }
    }

    async loadModules() {
        // Initialize core modules directly since they're loaded separately
        if (typeof NavigationManager !== 'undefined') {
            new NavigationManager();
        }
        if (typeof UtilityManager !== 'undefined') {
            new UtilityManager();
        }
        if (typeof ComponentLoader !== 'undefined') {
            new ComponentLoader();
        }
    }

    initializeFeatures() {
        // Initialize form handling
        this.initializeForms();
        
        // Initialize dark mode (disabled per requirements)
        // this.initializeDarkMode();
        
        // Initialize search functionality
        this.initializeSearch();
        
        // Initialize performance monitoring
        this.initializePerformanceMonitoring();
        
        // Initialize accessibility features
        this.initializeA11y();
    }

    initializeForms() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                    return false;
                }
                
                // Add loading state
                const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
                if (submitBtn) {
                    submitBtn.classList.add('btn--loading');
                    submitBtn.disabled = true;
                }
            });
        });

        // Real-time validation
        document.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
    }

    validateForm(form) {
        let isValid = true;
        const fields = form.querySelectorAll('input, textarea, select');
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        let isValid = true;
        let errorMessage = '';

        // Clear previous error
        this.clearFieldError(field);

        // Required check
        if (required && !value) {
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
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                errorMessage = 'Please enter a valid phone number';
                isValid = false;
            }
        }
        // URL validation
        else if (type === 'url' && value) {
            try {
                new URL(value);
            } catch {
                errorMessage = 'Please enter a valid URL';
                isValid = false;
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('form__input--error');
        
        let errorElement = field.parentNode.querySelector('.form__error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form__error';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    }

    clearFieldError(field) {
        field.classList.remove('form__input--error');
        const errorElement = field.parentNode.querySelector('.form__error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    initializeSearch() {
        const searchForm = document.querySelector('.search-form');
        const searchInput = document.querySelector('.search-form__input');
        
        if (!searchForm || !searchInput) return;

        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length > 2) {
                searchTimeout = setTimeout(() => {
                    this.performSearch(query);
                }, 300);
            }
        });
    }

    performSearch(query) {
        // Implement search functionality
        console.log('Searching for:', query);
        // This would typically make an API call or filter content
    }

    initializePerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('web-vitals' in window) {
            // This would require the web-vitals library
            return;
        }

        // Basic performance monitoring
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
            
            // Report to analytics if needed
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_load_time', {
                    'event_category': 'Performance',
                    'value': loadTime
                });
            }
        });
    }

    initializeA11y() {
        // Skip to content link
        if (!document.querySelector('.skip-to-content')) {
            const skipLink = document.createElement('a');
            skipLink.href = '#main';
            skipLink.className = 'skip-to-content';
            skipLink.textContent = 'Skip to main content';
            document.body.insertBefore(skipLink, document.body.firstChild);
        }

        // Keyboard navigation for custom dropdowns
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown__trigger');
            if (trigger) {
                trigger.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    } else if (e.key === 'Escape') {
                        dropdown.classList.remove('active');
                    }
                });
            }
        });

        // Announce dynamic content changes to screen readers
        this.setupAriaLiveRegions();
    }

    setupAriaLiveRegions() {
        if (!document.querySelector('#aria-live-region')) {
            const liveRegion = document.createElement('div');
            liveRegion.id = 'aria-live-region';
            liveRegion.className = 'sr-only';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            document.body.appendChild(liveRegion);
        }
    }

    announceToScreenReader(message) {
        const liveRegion = document.querySelector('#aria-live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }

    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
            // Could send to error tracking service
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            // Could send to error tracking service
        });
    }

    // Utility methods
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.techVisionApp = new TechVisionApp();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TechVisionApp;
}