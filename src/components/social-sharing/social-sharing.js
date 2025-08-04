// Social Sharing Component JavaScript with Rich Snippets Support
class AcadifySocialSharingComponent {
    constructor() {
        this.componentSelector = '.acadify-social-sharing';
        this.init();
    }

    init() {
        // Load the social sharing component
        this.loadComponent();
        
        // Initialize rich snippet metadata detection
        this.initRichSnippetMetadata();
        
        // Set up dynamic content updates
        this.setupDynamicUpdates();
    }

    async loadComponent() {
        try {
            const socialSharingElements = document.querySelectorAll('#social-sharing-component');
            
            if (socialSharingElements.length > 0) {
                const response = await fetch('src/components/social-sharing/social-sharing.html');
                const html = await response.text();
                
                socialSharingElements.forEach(element => {
                    element.innerHTML = html;
                });
                
                // Load CSS
                this.loadCSS();
                
                console.log('✓ Social sharing component loaded');
            }
        } catch (error) {
            console.error('Error loading social sharing component:', error);
        }
    }

    loadCSS() {
        const cssId = 'social-sharing-css';
        if (!document.getElementById(cssId)) {
            const link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.href = 'src/components/social-sharing/social-sharing.css';
            document.head.appendChild(link);
        }
    }

    initRichSnippetMetadata() {
        // Extract metadata from current page for rich snippets
        const pageData = this.extractPageMetadata();
        
        // Update global sharing data with rich snippet information
        if (window.AcadifySocialSharing) {
            window.AcadifySocialSharing.shareData = {
                ...window.AcadifySocialSharing.shareData,
                ...pageData
            };
        }
    }

    extractPageMetadata() {
        // Extract rich snippet data from the current page
        const metadata = {
            title: '',
            text: '',
            url: window.location.href,
            image: ''
        };

        // Try to get title from multiple sources
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        const pageTitle = document.querySelector('title');
        
        metadata.title = (ogTitle && ogTitle.content) || 
                        (twitterTitle && twitterTitle.content) || 
                        (pageTitle && pageTitle.textContent) || 
                        'Acadify Solution - Technology Services';

        // Try to get description from multiple sources
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const metaDescription = document.querySelector('meta[name="description"]');
        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        
        metadata.text = (ogDescription && ogDescription.content) || 
                       (metaDescription && metaDescription.content) || 
                       (twitterDescription && twitterDescription.content) || 
                       'Transform your business with expert technology services.';

        // Try to get image from multiple sources
        const ogImage = document.querySelector('meta[property="og:image"]');
        const twitterImage = document.querySelector('meta[name="twitter:image"]');
        
        metadata.image = (ogImage && ogImage.content) || 
                        (twitterImage && twitterImage.content) || 
                        'https://acadifysolution.com/assets/logos/logo.png';

        return metadata;
    }

    setupDynamicUpdates() {
        // Listen for page changes that might affect sharing metadata
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && 
                    (mutation.target.tagName === 'TITLE' || 
                     mutation.target.querySelector('meta[property^="og:"]') ||
                     mutation.target.querySelector('meta[name^="twitter:"]'))) {
                    this.updateSharingMetadata();
                }
            });
        });

        observer.observe(document.head, {
            childList: true,
            subtree: true
        });
    }

    updateSharingMetadata() {
        // Re-extract metadata when page content changes
        const newMetadata = this.extractPageMetadata();
        
        if (window.AcadifySocialSharing) {
            window.AcadifySocialSharing.shareData = {
                ...window.AcadifySocialSharing.shareData,
                ...newMetadata
            };
        }
        
        console.log('✓ Social sharing metadata updated:', newMetadata);
    }

    // Method to manually update sharing data for specific pages
    updateForPage(pageType, customData = {}) {
        const baseData = this.extractPageMetadata();
        
        // Page-specific customizations
        const pageSpecificData = {
            service: {
                title: `${customData.serviceName || 'Technology'} Services - Acadify Solution`,
                text: `Expert ${customData.serviceName || 'technology'} services by Acadify Solution. Professional solutions for your business needs.`
            },
            blog: {
                title: `${customData.postTitle || baseData.title}`,
                text: `${customData.excerpt || baseData.text}`
            },
            portfolio: {
                title: `${customData.projectName || 'Our Portfolio'} - Acadify Solution`,
                text: `Check out our successful ${customData.projectType || 'technology'} project. ${baseData.text}`
            }
        };

        const updatedData = {
            ...baseData,
            ...pageSpecificData[pageType],
            ...customData
        };

        if (window.AcadifySocialSharing) {
            window.AcadifySocialSharing.shareData = updatedData;
        }

        return updatedData;
    }
}

// Initialize social sharing component when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.AcadifySocialSharingComponent = new AcadifySocialSharingComponent();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AcadifySocialSharingComponent;
}