/**
 * Comprehensive Lazy Loading Implementation for Acadify Solution
 * Handles images, background images, and optimization
 */

class LazyLoader {
    constructor(options = {}) {
        this.options = {
            threshold: 0.1,
            rootMargin: '50px',
            loadingClass: 'lazy-loading',
            loadedClass: 'lazy-loaded',
            errorClass: 'lazy-error',
            placeholderColor: '#1a1a1a',
            ...options
        };
        
        this.init();
    }

    init() {
        // Check for Intersection Observer support
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }
        
        // Handle images that might be added dynamically
        this.setupMutationObserver();
    }

    setupIntersectionObserver() {
        this.imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: this.options.threshold,
            rootMargin: this.options.rootMargin
        });

        // Observe all lazy images
        this.observeImages();
    }

    observeImages() {
        // Find all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]:not([data-lazy-loaded])');
        
        // Find all elements with data-bg attribute for background images
        const lazyBackgrounds = document.querySelectorAll('[data-bg]:not([data-lazy-loaded])');
        
        // Observe images
        lazyImages.forEach(img => {
            this.prepareImage(img);
            this.imageObserver.observe(img);
        });
        
        // Observe background images
        lazyBackgrounds.forEach(element => {
            this.prepareBgElement(element);
            this.imageObserver.observe(element);
        });
    }

    prepareImage(img) {
        // Add loading class
        img.classList.add(this.options.loadingClass);
        
        // Set placeholder if no src is present
        if (!img.src) {
            img.src = this.generatePlaceholder(img);
        }
        
        // Set loading attribute for native lazy loading as fallback
        img.loading = 'lazy';
        
        // Set dimensions from data attributes if available
        if (img.dataset.width) img.width = img.dataset.width;
        if (img.dataset.height) img.height = img.dataset.height;
    }

    prepareBgElement(element) {
        // Add loading class
        element.classList.add(this.options.loadingClass);
        
        // Set initial background
        if (!element.style.backgroundImage) {
            element.style.backgroundColor = this.options.placeholderColor;
        }
    }

    loadImage(element) {
        const isImg = element.tagName === 'IMG';
        const src = element.dataset.src || element.dataset.bg;
        
        if (!src) return;

        element.classList.add(this.options.loadingClass);

        if (isImg) {
            this.loadImageElement(element, src);
        } else {
            this.loadBackgroundImage(element, src);
        }
    }

    loadImageElement(img, src) {
        // Create a new image to test if it loads successfully
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            // Image loaded successfully
            img.src = src;
            img.classList.remove(this.options.loadingClass);
            img.classList.add(this.options.loadedClass);
            img.removeAttribute('data-src');
            img.setAttribute('data-lazy-loaded', 'true');
            
            // Trigger custom event
            img.dispatchEvent(new CustomEvent('lazyLoaded', { detail: { src } }));
        };
        
        imageLoader.onerror = () => {
            // Image failed to load
            img.classList.remove(this.options.loadingClass);
            img.classList.add(this.options.errorClass);
            img.setAttribute('data-lazy-error', 'true');
            
            // Set fallback image if available
            if (img.dataset.fallback) {
                img.src = img.dataset.fallback;
            }
            
            // Trigger custom event
            img.dispatchEvent(new CustomEvent('lazyError', { detail: { src } }));
        };
        
        // Start loading
        imageLoader.src = src;
    }

    loadBackgroundImage(element, src) {
        // Create a new image to test if it loads successfully
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            // Image loaded successfully
            element.style.backgroundImage = `url(${src})`;
            element.classList.remove(this.options.loadingClass);
            element.classList.add(this.options.loadedClass);
            element.removeAttribute('data-bg');
            element.setAttribute('data-lazy-loaded', 'true');
            
            // Trigger custom event
            element.dispatchEvent(new CustomEvent('lazyLoaded', { detail: { src } }));
        };
        
        imageLoader.onerror = () => {
            // Image failed to load
            element.classList.remove(this.options.loadingClass);
            element.classList.add(this.options.errorClass);
            element.setAttribute('data-lazy-error', 'true');
            
            // Set fallback background if available
            if (element.dataset.fallbackBg) {
                element.style.backgroundImage = `url(${element.dataset.fallbackBg})`;
            }
            
            // Trigger custom event
            element.dispatchEvent(new CustomEvent('lazyError', { detail: { src } }));
        };
        
        // Start loading
        imageLoader.src = src;
    }

    generatePlaceholder(img) {
        // Generate a simple colored placeholder
        const width = img.dataset.width || 300;
        const height = img.dataset.height || 200;
        
        // Create a minimal SVG placeholder
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <rect width="100%" height="100%" fill="${this.options.placeholderColor}"/>
            <rect x="20%" y="20%" width="60%" height="60%" fill="rgba(255,255,255,0.1)" rx="8"/>
            <circle cx="40%" cy="40%" r="8%" fill="rgba(255,255,255,0.2)"/>
            <rect x="30%" y="60%" width="40%" height="4%" fill="rgba(255,255,255,0.1)" rx="2"/>
            <rect x="30%" y="70%" width="25%" height="3%" fill="rgba(255,255,255,0.05)" rx="1"/>
        </svg>`;
        
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    }

    setupMutationObserver() {
        if ('MutationObserver' in window) {
            const mutationObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            // Check if the added node is a lazy image
                            if (node.matches && node.matches('img[data-src], [data-bg]')) {
                                if (this.imageObserver) {
                                    if (node.tagName === 'IMG') {
                                        this.prepareImage(node);
                                    } else {
                                        this.prepareBgElement(node);
                                    }
                                    this.imageObserver.observe(node);
                                }
                            }
                            
                            // Check for lazy images within the added node
                            const lazyImages = node.querySelectorAll ? node.querySelectorAll('img[data-src]:not([data-lazy-loaded])') : [];
                            const lazyBackgrounds = node.querySelectorAll ? node.querySelectorAll('[data-bg]:not([data-lazy-loaded])') : [];
                            
                            if (this.imageObserver) {
                                lazyImages.forEach(img => {
                                    this.prepareImage(img);
                                    this.imageObserver.observe(img);
                                });
                                
                                lazyBackgrounds.forEach(element => {
                                    this.prepareBgElement(element);
                                    this.imageObserver.observe(element);
                                });
                            }
                        }
                    });
                });
            });

            mutationObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    loadAllImages() {
        // Fallback for browsers without Intersection Observer
        const lazyImages = document.querySelectorAll('img[data-src]:not([data-lazy-loaded])');
        const lazyBackgrounds = document.querySelectorAll('[data-bg]:not([data-lazy-loaded])');
        
        lazyImages.forEach(img => this.loadImage(img));
        lazyBackgrounds.forEach(element => this.loadImage(element));
    }

    // Method to force load all remaining lazy images
    loadAll() {
        const lazyImages = document.querySelectorAll('img[data-src]:not([data-lazy-loaded])');
        const lazyBackgrounds = document.querySelectorAll('[data-bg]:not([data-lazy-loaded])');
        
        lazyImages.forEach(img => this.loadImage(img));
        lazyBackgrounds.forEach(element => this.loadImage(element));
    }

    // Method to refresh and observe new images
    refresh() {
        if (this.imageObserver) {
            this.observeImages();
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lazy loader with custom options
    window.lazyLoader = new LazyLoader({
        threshold: 0.1,
        rootMargin: '50px 0px',
        placeholderColor: '#0a0a0a'
    });
    
    console.log('✓ Lazy loading initialized');
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LazyLoader;
}