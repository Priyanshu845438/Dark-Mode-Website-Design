// Navbar Component JavaScript - Completely Rewritten
class NewNavbarComponent {
    constructor() {
        this.navbar = null;
        this.navToggle = null;
        this.mobileNav = null;
        this.dropdowns = [];
        this.isScrolled = false;
        this.lastScrollTop = 0;
        
        this.init();
    }

    async init() {
        await this.loadNavbar();
        await this.loadMobileNavigation();
        this.setupEventListeners();
        this.setupScrollHandling();
        this.setupDropdowns();
        this.setupMobileNavigation();
    }

    async loadNavbar() {
        try {
            console.log('Loading new navbar with all 18 services...');
            const response = await fetch('src/components/header/header-new.html?v=' + Date.now());
            const navbarHTML = await response.text();
            
            // Remove any existing navbar first
            const existingNavbar = document.getElementById('navbar');
            if (existingNavbar) {
                existingNavbar.remove();
            }
            
            // Insert navbar at the beginning of body
            document.body.insertAdjacentHTML('afterbegin', navbarHTML);
            this.navbar = document.getElementById('navbar');
            this.navToggle = document.getElementById('nav-toggle');
            
            console.log('New navbar loaded successfully with', document.querySelectorAll('.dropdown-link').length, 'service links');
        } catch (error) {
            console.error('Error loading navbar:', error);
        }
    }

    setupEventListeners() {
        if (!this.navbar) return;

        // Mobile toggle functionality
        if (this.navToggle && this.mobileNav) {
            this.navToggle.addEventListener('click', () => {
                this.toggleMobileNav();
            });
        }

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (this.mobileNav && 
                !this.mobileNav.contains(e.target) && 
                !this.navToggle.contains(e.target) &&
                this.mobileNav.classList.contains('active')) {
                this.closeMobileNav();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileNav();
                this.closeAllDropdowns();
            }
        });
    }

    setupScrollHandling() {
        if (!this.navbar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class
            if (scrollTop > 50 && !this.isScrolled) {
                this.navbar.classList.add('scrolled');
                this.isScrolled = true;
            } else if (scrollTop <= 50 && this.isScrolled) {
                this.navbar.classList.remove('scrolled');
                this.isScrolled = false;
            }

            this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, { passive: true });
    }

    setupDropdowns() {
        if (!this.navbar) return;

        const dropdowns = this.navbar.querySelectorAll('.nav-dropdown');
        this.dropdowns = Array.from(dropdowns);

        // Completely disable all JavaScript hover interactions
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            if (!trigger) return;

            // Remove any existing event listeners and hover classes
            dropdown.classList.remove('active');
            
            // Only handle mobile clicks
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth < 1024) {
                    e.preventDefault();
                    this.closeAllDropdowns();
                    dropdown.classList.add('active');
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-dropdown')) {
                this.closeAllDropdowns();
            }
        });
    }

    async loadMobileNavigation() {
        try {
            const response = await fetch('src/components/navigation/mobile-nav/mobile-nav.html');
            const mobileNavHTML = await response.text();
            
            let mobileNavContainer = document.getElementById('mobile-nav-component');
            if (!mobileNavContainer) {
                document.body.insertAdjacentHTML('afterbegin', '<div id="mobile-nav-component"></div>');
                mobileNavContainer = document.getElementById('mobile-nav-component');
            }
            mobileNavContainer.innerHTML = mobileNavHTML;
            
            this.mobileNav = document.getElementById('mobile-nav');
        } catch (error) {
            console.error('Error loading mobile navigation:', error);
        }
    }

    setupMobileNavigation() {
        // Mobile navigation is handled by the separate mobile nav component
        // This method ensures proper integration
        const mobileNavClose = document.getElementById('mobile-nav-close');
        
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', () => {
                this.closeMobileNav();
            });
        }

        // Handle mobile dropdown toggles
        document.addEventListener('click', (e) => {
            if (e.target.matches('.dropdown-toggle') || e.target.closest('.dropdown-toggle')) {
                e.preventDefault();
                const button = e.target.matches('.dropdown-toggle') ? e.target : e.target.closest('.dropdown-toggle');
                const targetId = button.dataset.target;
                const dropdown = document.getElementById(targetId);
                
                if (dropdown) {
                    const isActive = dropdown.classList.contains('active');
                    
                    // Close all mobile dropdowns
                    document.querySelectorAll('.mobile-dropdown').forEach(dd => {
                        dd.classList.remove('active');
                    });
                    document.querySelectorAll('.dropdown-toggle').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    // Toggle current dropdown
                    if (!isActive) {
                        dropdown.classList.add('active');
                        button.classList.add('active');
                    }
                }
            }
        });
    }

    toggleMobileNav() {
        if (!this.mobileNav || !this.navToggle) return;

        const isActive = this.mobileNav.classList.contains('active');
        
        if (isActive) {
            this.closeMobileNav();
        } else {
            this.openMobileNav();
        }
    }

    openMobileNav() {
        if (!this.mobileNav || !this.navToggle) return;

        this.mobileNav.classList.add('active');
        this.navToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMobileNav() {
        if (!this.mobileNav || !this.navToggle) return;

        this.mobileNav.classList.remove('active');
        this.navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeAllDropdowns() {
        this.dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }

    handleResize() {
        // Close mobile nav when switching to desktop
        if (window.innerWidth >= 1024) {
            this.closeMobileNav();
        }
        
        // Close all dropdowns on resize
        this.closeAllDropdowns();
    }

    // Public method to set active nav link
    setActiveLink(section) {
        const navLinks = this.navbar.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === section || 
                link.getAttribute('href').includes(section)) {
                link.classList.add('active');
            }
        });
    }

    // Public method to show/hide navbar
    showNavbar() {
        if (this.navbar) {
            this.navbar.style.transform = 'translateY(0)';
        }
    }

    hideNavbar() {
        if (this.navbar) {
            this.navbar.style.transform = 'translateY(-100%)';
        }
    }
}

// Initialize the new navbar component
document.addEventListener('DOMContentLoaded', () => {
    window.navbarComponent = new NewNavbarComponent();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NewNavbarComponent;
}