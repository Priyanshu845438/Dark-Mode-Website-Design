// Navbar Component JavaScript
class NavbarComponent {
    constructor() {
        this.navbar = null;
        this.init();
    }

    async init() {
        await this.loadNavbar();
        this.setupEventListeners();
        this.handleScroll();
        this.setupActiveStates();
    }

    async loadNavbar() {
        try {
            const response = await fetch('src/components/header/header.html');
            const navbarHTML = await response.text();
            
            // Insert navbar at the beginning of body
            document.body.insertAdjacentHTML('afterbegin', navbarHTML);
            this.navbar = document.getElementById('navbar');
        } catch (error) {
            console.error('Error loading navbar:', error);
        }
    }

    setupEventListeners() {
        if (!this.navbar) return;

        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        navToggle?.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });

        // Mega menu functionality - hover for desktop, click for mobile
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const megaMenu = dropdown.querySelector('.mega-menu');
            
            if (!toggle || !megaMenu) return;

            // Desktop hover behavior
            if (window.innerWidth >= 768) {
                dropdown.addEventListener('mouseenter', () => {
                    dropdown.classList.add('active');
                });
                
                dropdown.addEventListener('mouseleave', () => {
                    dropdown.classList.remove('active');
                });
            } else {
                // Mobile click behavior
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                });
            }
        });

        // Close mega menus when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        // Handle window resize for responsive behavior
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                // Desktop mode - remove mobile menu states
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }

    handleScroll() {
        if (!this.navbar) return;

        let lastScrollTop = 0;
        const scrollThreshold = 100;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class
            if (scrollTop > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            // Hide/show navbar based on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                // Scrolling down
                this.navbar.classList.add('nav-hidden');
            } else {
                // Scrolling up
                this.navbar.classList.remove('nav-hidden');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, { passive: true });
    }

    setupActiveStates() {
        // Set active state based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link[href]');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavbarComponent();
});