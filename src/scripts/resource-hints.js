/**
 * Dynamic Resource Hints Manager for Acadify Solution
 * Intelligently manages preload, prefetch, and preconnect hints
 */

class ResourceHintsManager {
    constructor() {
        this.hints = new Map();
        this.observers = new Map();
        this.intersectionObserver = null;
        this.prefetchThreshold = 0.1;
        this.maxPrefetchResources = 10;
        this.prefetchedResources = new Set();
        
        this.init();
    }

    init() {
        // Initialize intersection observer for intelligent prefetching
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        }
        
        // Add hover-based prefetching
        this.setupHoverPrefetch();
        
        // Add visibility change handling
        this.setupVisibilityChangeHandler();
        
        // Add connection-aware prefetching
        this.setupConnectionAwarePrefetch();
    }

    /**
     * Add a resource hint dynamically
     */
    addResourceHint(url, as, type = 'preload', options = {}) {
        const key = `${type}-${url}`;
        
        if (this.hints.has(key)) {
            return; // Already added
        }

        const link = document.createElement('link');
        link.rel = type;
        link.href = url;
        
        if (as) link.as = as;
        if (options.type) link.type = options.type;
        if (options.crossorigin) link.crossOrigin = options.crossorigin;
        if (options.media) link.media = options.media;
        if (options.integrity) link.integrity = options.integrity;

        // Add onload handler for dynamic CSS loading
        if (type === 'preload' && as === 'style' && options.loadImmediately) {
            link.onload = function() {
                this.onload = null;
                this.rel = 'stylesheet';
            };
        }

        document.head.appendChild(link);
        this.hints.set(key, link);
        
        console.log(`✓ Added ${type} hint for ${url}`);
    }

    /**
     * Preload critical resources
     */
    preloadCriticalResources() {
        const criticalResources = [
            // Critical CSS
            { url: 'src/styles/global.css', as: 'style' },
            { url: 'src/styles/utilities.css', as: 'style' },
            
            // Critical fonts
            { 
                url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap', 
                as: 'style',
                options: { crossorigin: 'anonymous' }
            },
            
            // Critical JavaScript
            { url: 'src/scripts/main.js', as: 'script' },
            
            // Critical images
            { url: 'assets/logos/logo.png', as: 'image', options: { type: 'image/png' } },
            { url: 'assets/logos/logo.svg', as: 'image', options: { type: 'image/svg+xml' } }
        ];

        criticalResources.forEach(resource => {
            this.addResourceHint(resource.url, resource.as, 'preload', resource.options || {});
        });
    }

    /**
     * Setup intersection observer for intelligent prefetching
     */
    setupIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const prefetchUrl = element.dataset.prefetch;
                    
                    if (prefetchUrl && !this.prefetchedResources.has(prefetchUrl)) {
                        this.prefetchResource(prefetchUrl);
                    }
                }
            });
        }, { threshold: this.prefetchThreshold });
    }

    /**
     * Setup hover-based prefetching for links
     */
    setupHoverPrefetch() {
        document.addEventListener('mouseover', (event) => {
            const link = event.target.closest('a[href]');
            if (link && this.shouldPrefetchLink(link)) {
                const href = link.href;
                if (!this.prefetchedResources.has(href)) {
                    this.prefetchResource(href);
                }
            }
        });
    }

    /**
     * Setup visibility change handler to pause/resume prefetching
     */
    setupVisibilityChangeHandler() {
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                this.resumePrefetching();
            } else {
                this.pausePrefetching();
            }
        });
    }

    /**
     * Setup connection-aware prefetching
     */
    setupConnectionAwarePrefetch() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            // Adjust prefetch behavior based on connection
            const updatePrefetchStrategy = () => {
                if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                    this.maxPrefetchResources = 3;
                    this.prefetchThreshold = 0.5;
                } else if (connection.effectiveType === '3g') {
                    this.maxPrefetchResources = 5;
                    this.prefetchThreshold = 0.3;
                } else {
                    this.maxPrefetchResources = 10;
                    this.prefetchThreshold = 0.1;
                }
            };

            connection.addEventListener('change', updatePrefetchStrategy);
            updatePrefetchStrategy();
        }
    }

    /**
     * Prefetch a resource
     */
    prefetchResource(url) {
        if (this.prefetchedResources.size >= this.maxPrefetchResources) {
            return; // Limit reached
        }

        this.addResourceHint(url, null, 'prefetch');
        this.prefetchedResources.add(url);
    }

    /**
     * Check if a link should be prefetched
     */
    shouldPrefetchLink(link) {
        const href = link.href;
        
        // Don't prefetch external links
        if (!href.startsWith(window.location.origin)) {
            return false;
        }
        
        // Don't prefetch if already prefetched
        if (this.prefetchedResources.has(href)) {
            return false;
        }
        
        // Don't prefetch certain file types
        const excludeExtensions = ['.pdf', '.zip', '.exe', '.dmg'];
        if (excludeExtensions.some(ext => href.toLowerCase().includes(ext))) {
            return false;
        }
        
        return true;
    }

    /**
     * Observe elements for prefetching
     */
    observeForPrefetch(selector) {
        if (!this.intersectionObserver) return;
        
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            this.intersectionObserver.observe(element);
        });
    }

    /**
     * Preload next page resources based on current page
     */
    preloadNextPageResources() {
        const currentPage = window.location.pathname;
        const nextPageResources = this.getNextPageResources(currentPage);
        
        nextPageResources.forEach(resource => {
            this.prefetchResource(resource);
        });
    }

    /**
     * Get likely next page resources based on current page
     */
    getNextPageResources(currentPage) {
        const resourceMap = {
            '/': [
                'pages/services.html',
                'pages/about.html',
                'pages/contact.html',
                'pages/portfolio.html'
            ],
            '/pages/services.html': [
                'pages/services/web-development.html',
                'pages/services/mobile-development.html',
                'pages/services/ai-solutions.html',
                'pages/contact.html'
            ],
            '/pages/about.html': [
                'pages/services.html',
                'pages/contact.html',
                'pages/portfolio.html'
            ],
            '/pages/contact.html': [
                'pages/schedule-meeting.html',
                'pages/services.html',
                '/'
            ]
        };
        
        return resourceMap[currentPage] || [];
    }

    /**
     * Pause prefetching (e.g., when page is hidden)
     */
    pausePrefetching() {
        this.prefetchingPaused = true;
    }

    /**
     * Resume prefetching
     */
    resumePrefetching() {
        this.prefetchingPaused = false;
    }

    /**
     * Preload font variations
     */
    preloadFontVariations() {
        const fontVariations = [
            {
                url: 'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2',
                options: { type: 'font/woff2', crossorigin: 'anonymous' }
            },
            {
                url: 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2',
                options: { type: 'font/woff2', crossorigin: 'anonymous' }
            }
        ];

        fontVariations.forEach(font => {
            this.addResourceHint(font.url, 'font', 'preload', font.options);
        });
    }

    /**
     * Add module preload hints
     */
    preloadModules() {
        const modules = [
            'src/scripts/lazy-loading.js',
            'src/components/header/header-new.js',
            'src/components/footer/footer.js'
        ];

        modules.forEach(module => {
            this.addResourceHint(module, 'script', 'modulepreload');
        });
    }

    /**
     * Intelligent resource prioritization
     */
    prioritizeResources() {
        // High priority resources (preload)
        this.preloadCriticalResources();
        
        // Medium priority resources (prefetch on hover/scroll)
        this.preloadNextPageResources();
        
        // Low priority resources (prefetch when idle)
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.preloadFontVariations();
                this.preloadModules();
            });
        }
    }

    /**
     * Clean up unused resource hints
     */
    cleanup() {
        this.hints.forEach((link, key) => {
            if (link.parentNode) {
                link.parentNode.removeChild(link);
            }
        });
        this.hints.clear();
        this.prefetchedResources.clear();
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.resourceHintsManager = new ResourceHintsManager();
    
    // Prioritize resources based on page
    window.resourceHintsManager.prioritizeResources();
    
    // Observe navigation elements for prefetching
    window.resourceHintsManager.observeForPrefetch('nav a, .nav-link, .menu-item a');
    
    console.log('✓ Resource hints manager initialized');
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResourceHintsManager;
}