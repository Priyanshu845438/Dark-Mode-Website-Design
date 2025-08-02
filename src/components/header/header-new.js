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
        this.loadMobileNavigation(); // Make synchronous
        this.setupEventListeners();
        this.setupScrollHandling();
        this.setupDropdowns();
        this.setupMobileNavigation();
    }

    async loadNavbar() {
        try {
            console.log('Loading new navbar with all 18 services...');
            // Determine the correct path based on current location
            const basePath = this.getBasePath();
            const response = await fetch(`${basePath}src/components/header/header-new.html?v=` + Date.now());
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
            
            // Fix all relative paths in the loaded navbar
            this.fixNavbarPaths();
            
            console.log('New navbar loaded successfully with', document.querySelectorAll('.dropdown-link').length, 'service links');
        } catch (error) {
            console.error('Error loading navbar:', error);
        }
    }

    getBasePath() {
        // Determine if we're in a subdirectory
        const path = window.location.pathname;
        if (path.includes('/pages/') || path.includes('pages/')) {
            return '../';
        }
        return '';
    }

    fixNavbarPaths() {
        if (!this.navbar) return;
        
        const basePath = this.getBasePath();
        if (!basePath) return; // No need to fix if we're in root
        
        // Fix logo paths
        const logos = this.navbar.querySelectorAll('img');
        logos.forEach(logo => {
            const currentSrc = logo.getAttribute('src');
            if (currentSrc === '/assets/logos/logo.svg') {
                logo.setAttribute('src', basePath + 'assets/logos/logo.svg');
            }
        });
        
        // Fix all navigation links
        const links = this.navbar.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('pages/')) {
                link.setAttribute('href', basePath + href);
            } else if (href === '/') {
                link.setAttribute('href', basePath + 'index.html');
            }
        });
        
        console.log('✓ Fixed navbar paths for subdirectory');
    }

    setupEventListeners() {
        if (!this.navbar) return;

        // Mobile toggle functionality - setup after mobile nav is loaded
        this.setupMobileToggle();

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
        this.dropdownTimers = new Map(); // Store timers for each dropdown

        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (!trigger || !menu) return;

            // Remove any existing event listeners and hover classes
            dropdown.classList.remove('active');
            
            // Desktop hover behavior with delays
            if (window.innerWidth >= 1024) {
                this.setupDesktopHover(dropdown, trigger, menu);
            }
            
            // Mobile click behavior
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

        // Update hover behavior on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                dropdowns.forEach(dropdown => {
                    const trigger = dropdown.querySelector('.dropdown-trigger');
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (trigger && menu) {
                        this.setupDesktopHover(dropdown, trigger, menu);
                    }
                });
            }
        });
    }

    setupDesktopHover(dropdown, trigger, menu) {
        const dropdownId = dropdown.getAttribute('data-dropdown') || Math.random().toString(36);
        dropdown.setAttribute('data-dropdown', dropdownId);

        // Mouse enter - show dropdown with slight delay
        const handleMouseEnter = () => {
            // Clear any existing hide timer
            if (this.dropdownTimers.has(dropdownId + '_hide')) {
                clearTimeout(this.dropdownTimers.get(dropdownId + '_hide'));
                this.dropdownTimers.delete(dropdownId + '_hide');
            }

            // Set show timer (small delay to prevent accidental triggers)
            const showTimer = setTimeout(() => {
                this.closeAllDropdowns();
                dropdown.classList.add('hover-active');
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.pointerEvents = 'all';
                menu.style.transform = 'translateX(-50%) translateY(0)';
            }, 100); // 100ms delay before showing

            this.dropdownTimers.set(dropdownId + '_show', showTimer);
        };

        // Mouse leave - hide dropdown with delay
        const handleMouseLeave = () => {
            // Clear any existing show timer
            if (this.dropdownTimers.has(dropdownId + '_show')) {
                clearTimeout(this.dropdownTimers.get(dropdownId + '_show'));
                this.dropdownTimers.delete(dropdownId + '_show');
            }

            // Set hide timer (longer delay to prevent premature closing)
            const hideTimer = setTimeout(() => {
                dropdown.classList.remove('hover-active');
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.pointerEvents = 'none';
                menu.style.transform = 'translateX(-50%) translateY(-10px)';
            }, 300); // 300ms delay before hiding

            this.dropdownTimers.set(dropdownId + '_hide', hideTimer);
        };

        // Remove existing event listeners to prevent duplicates
        trigger.removeEventListener('mouseenter', handleMouseEnter);
        trigger.removeEventListener('mouseleave', handleMouseLeave);
        dropdown.removeEventListener('mouseenter', handleMouseEnter);
        dropdown.removeEventListener('mouseleave', handleMouseLeave);

        // Add event listeners
        trigger.addEventListener('mouseenter', handleMouseEnter);
        dropdown.addEventListener('mouseenter', handleMouseEnter);
        dropdown.addEventListener('mouseleave', handleMouseLeave);
    }

    loadMobileNavigation() {
        try {
            // Remove existing mobile navigation completely
            const existingMobileNav = document.getElementById('mobile-nav-component');
            if (existingMobileNav) {
                existingMobileNav.remove();
            }
            
            // Get the correct base path for assets
            const basePath = this.getBasePath();
            
            // Create mobile navigation with correct structure inline
            const mobileNavHTML = `
<!-- Mobile Navigation Component -->
<div class="mobile-nav" id="mobile-nav">
    <div class="mobile-nav-overlay"></div>
    <div class="mobile-nav-content">
        <div class="mobile-nav-header">
            <div class="mobile-nav-logo">
                <img src="${basePath}assets/logos/logo.svg" alt="Acadify Solution" class="nav-logo">
                <span class="nav-brand-text">Acadify Solution</span>
            </div>
            <button class="mobile-nav-close" id="mobile-nav-close" aria-label="Close Navigation">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        
        <nav class="mobile-nav-menu">
            <ul class="mobile-nav-list">
                <li class="mobile-nav-item">
                    <a href="${basePath}index.html" class="mobile-nav-link">
                        <div class="nav-link-content">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9,22 9,12 15,12 15,22"></polyline>
                            </svg>
                            Home
                        </div>
                    </a>
                </li>
                
                <li class="mobile-nav-item has-dropdown">
                    <button class="mobile-nav-link dropdown-toggle" data-target="services-dropdown">
                        <div class="nav-link-content">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                <path d="M2 17l10 5 10-5"></path>
                                <path d="M2 12l10 5 10-5"></path>
                            </svg>
                            Services
                        </div>
                        <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6,9 12,15 18,9"></polyline>
                        </svg>
                    </button>
                    <div class="mobile-dropdown" id="services-dropdown">
                        <div class="mobile-dropdown-section">
                            <h5 class="mobile-section-title">Development Services</h5>
                            <a href="${basePath}pages/services/web-development.html" class="mobile-dropdown-link">
                                <i class="fas fa-code"></i>
                                Web Development
                            </a>
                            <a href="${basePath}pages/services/mobile-development.html" class="mobile-dropdown-link">
                                <i class="fas fa-mobile-alt"></i>
                                Mobile Development
                            </a>
                            <a href="${basePath}pages/services/custom-software.html" class="mobile-dropdown-link">
                                <i class="fas fa-cogs"></i>
                                Custom Software
                            </a>
                            <a href="${basePath}pages/services/ui-ux-design.html" class="mobile-dropdown-link">
                                <i class="fas fa-paint-brush"></i>
                                UI/UX Design
                            </a>
                            <a href="${basePath}pages/services/qa-testing.html" class="mobile-dropdown-link">
                                <i class="fas fa-bug"></i>
                                QA & Testing
                            </a>
                        </div>
                        <div class="mobile-dropdown-section">
                            <h5 class="mobile-section-title">Cloud & AI</h5>
                            <a href="pages/services/cloud-services.html" class="mobile-dropdown-link">
                                <i class="fas fa-cloud"></i>
                                Cloud Services
                            </a>
                            <a href="pages/services/ai-solutions.html" class="mobile-dropdown-link">
                                <i class="fas fa-robot"></i>
                                AI Solutions
                            </a>
                            <a href="pages/services/data-analytics.html" class="mobile-dropdown-link">
                                <i class="fas fa-chart-line"></i>
                                Data Analytics
                            </a>
                            <a href="pages/services/consulting.html" class="mobile-dropdown-link">
                                <i class="fas fa-lightbulb"></i>
                                Consulting
                            </a>
                            <a href="pages/services/maintenance-support.html" class="mobile-dropdown-link">
                                <i class="fas fa-tools"></i>
                                IT Support
                            </a>
                        </div>
                        <div class="mobile-dropdown-section">
                            <h5 class="mobile-section-title">Digital Marketing</h5>
                            <a href="pages/services/digital-marketing.html" class="mobile-dropdown-link">
                                <i class="fas fa-bullhorn"></i>
                                Digital Marketing
                            </a>
                            <a href="pages/services/seo.html" class="mobile-dropdown-link">
                                <i class="fas fa-search"></i>
                                SEO Services
                            </a>
                            <a href="pages/services/smm.html" class="mobile-dropdown-link">
                                <i class="fas fa-share-alt"></i>
                                Social Media
                            </a>
                            <a href="pages/services/google-ads.html" class="mobile-dropdown-link">
                                <i class="fab fa-google"></i>
                                Google Ads
                            </a>
                            <a href="pages/services/email-marketing.html" class="mobile-dropdown-link">
                                <i class="fas fa-envelope"></i>
                                Email Marketing
                            </a>
                        </div>
                        <div class="mobile-dropdown-section">
                            <h5 class="mobile-section-title">Branding & Design</h5>
                            <a href="pages/services/logo-design.html" class="mobile-dropdown-link">
                                <i class="fas fa-palette"></i>
                                Logo Design
                            </a>
                            <a href="pages/services/brand-strategy.html" class="mobile-dropdown-link">
                                <i class="fas fa-star"></i>
                                Brand Strategy
                            </a>
                        </div>
                    </div>
                </li>
                
                <li class="mobile-nav-item has-dropdown">
                    <button class="mobile-nav-link dropdown-toggle" data-target="industries-dropdown">
                        <div class="nav-link-content">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                            Industries
                        </div>
                        <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6,9 12,15 18,9"></polyline>
                        </svg>
                    </button>
                    <div class="mobile-dropdown" id="industries-dropdown">
                        <div class="mobile-dropdown-section">
                            <h5 class="mobile-section-title">Core Industries</h5>
                            <a href="pages/industries/education-elearning.html" class="mobile-dropdown-link">
                                <i class="fas fa-graduation-cap"></i>
                                Education
                            </a>
                            <a href="pages/industries/healthcare.html" class="mobile-dropdown-link">
                                <i class="fas fa-heartbeat"></i>
                                Healthcare
                            </a>
                            <a href="pages/industries/ecommerce-retail.html" class="mobile-dropdown-link">
                                <i class="fas fa-shopping-cart"></i>
                                E-commerce
                            </a>
                        </div>
                        <div class="mobile-dropdown-section">
                            <h5 class="mobile-section-title">Technology</h5>
                            <a href="pages/industries/fintech-legal.html" class="mobile-dropdown-link">
                                <i class="fas fa-university"></i>
                                FinTech
                            </a>
                            <a href="pages/industries/real-estate-construction.html" class="mobile-dropdown-link">
                                <i class="fas fa-building"></i>
                                Real Estate
                            </a>
                            <a href="pages/industries/travel-hospitality-food.html" class="mobile-dropdown-link">
                                <i class="fas fa-plane"></i>
                                Travel
                            </a>
                        </div>
                    </div>
                </li>
                
                <li class="mobile-nav-item has-dropdown">
                    <button class="mobile-nav-link dropdown-toggle" data-target="products-dropdown">
                        <div class="nav-link-content">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                            </svg>
                            Products
                        </div>
                        <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6,9 12,15 18,9"></polyline>
                        </svg>
                    </button>
                    <div class="mobile-dropdown" id="products-dropdown">
                        <div class="mobile-dropdown-section">
                            <h5 class="mobile-section-title">Business Solutions</h5>
                            <a href="pages/products/acadify-erp.html" class="mobile-dropdown-link">
                                <i class="fas fa-building"></i>
                                Acadify ERP
                            </a>
                            <a href="pages/products/acadify-crm.html" class="mobile-dropdown-link">
                                <i class="fas fa-users"></i>
                                Acadify CRM
                            </a>
                            <a href="pages/products/acadify-inventory.html" class="mobile-dropdown-link">
                                <i class="fas fa-boxes"></i>
                                Acadify Inventory
                            </a>
                        </div>
                        <div class="mobile-dropdown-section">
                            <h5 class="mobile-section-title">Tools</h5>
                            <a href="pages/products/acadify-pos.html" class="mobile-dropdown-link">
                                <i class="fas fa-cash-register"></i>
                                Acadify POS
                            </a>
                            <a href="pages/products/acadify-lms.html" class="mobile-dropdown-link">
                                <i class="fas fa-book"></i>
                                Acadify LMS
                            </a>
                            <a href="pages/products/acadify-task.html" class="mobile-dropdown-link">
                                <i class="fas fa-tasks"></i>
                                Acadify Task
                            </a>
                        </div>
                    </div>
                </li>
                
                <li class="mobile-nav-item has-dropdown">
                    <button class="mobile-nav-link dropdown-toggle" data-target="company-dropdown">
                        <div class="nav-link-content">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            Company
                        </div>
                        <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6,9 12,15 18,9"></polyline>
                        </svg>
                    </button>
                    <div class="mobile-dropdown" id="company-dropdown">
                        <div class="mobile-dropdown-section">
                            <a href="${basePath}pages/about.html" class="mobile-dropdown-link">
                                <i class="fas fa-info-circle"></i>
                                About Us
                            </a>
                            <a href="${basePath}pages/portfolio.html" class="mobile-dropdown-link">
                                <i class="fas fa-briefcase"></i>
                                Portfolio
                            </a>
                            <a href="${basePath}pages/project.html" class="mobile-dropdown-link">
                                <i class="fas fa-tasks"></i>
                                Projects
                            </a>
                            <a href="${basePath}pages/contact.html" class="mobile-dropdown-link">
                                <i class="fas fa-envelope"></i>
                                Contact
                            </a>
                        </div>
                    </div>
                </li>
                
                <li class="mobile-nav-item has-dropdown">
                    <button class="mobile-nav-link dropdown-toggle" data-target="insights-dropdown">
                        <div class="nav-link-content">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14,2 14,8 20,8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10,9 9,9 8,9"></polyline>
                            </svg>
                            Insights
                        </div>
                        <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6,9 12,15 18,9"></polyline>
                        </svg>
                    </button>
                    <div class="mobile-dropdown" id="insights-dropdown">
                        <div class="mobile-dropdown-section">
                            <a href="blog.html" class="mobile-dropdown-link">
                                <i class="fas fa-blog"></i>
                                Blog
                            </a>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
        
        <div class="mobile-nav-cta">
            <a href="pages/schedule-meeting.html" class="mobile-cta">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Schedule Meeting
            </a>
        </div>
        
        <div class="mobile-nav-footer">
            <div class="mobile-social-links">
                <a href="#" class="mobile-social-link" aria-label="LinkedIn">
                    <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="#" class="mobile-social-link" aria-label="Twitter">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="mobile-social-link" aria-label="GitHub">
                    <i class="fab fa-github"></i>
                </a>
            </div>
            <div class="mobile-nav-copyright">
                <p>&copy; 2025 Acadify Solution</p>
            </div>
        </div>
    </div>
</div>`;
            
            // Create fresh mobile navigation container
            document.body.insertAdjacentHTML('afterbegin', `<div id="mobile-nav-component">${mobileNavHTML}</div>`);
            
            this.mobileNav = document.getElementById('mobile-nav');
            this.initializeMobileDropdowns();
            this.setupMobileToggle(); // Setup hamburger button after mobile nav is loaded
            console.log('Mobile navigation loaded with inline structure');
        } catch (error) {
            console.error('Error loading mobile navigation:', error);
        }
    }

    initializeMobileDropdowns() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = toggle.getAttribute('data-target');
                const dropdown = document.getElementById(targetId);
                const arrow = toggle.querySelector('.dropdown-arrow');
                
                if (dropdown) {
                    const isOpen = dropdown.classList.contains('show');
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.mobile-dropdown.show').forEach(dd => {
                        dd.classList.remove('show');
                    });
                    document.querySelectorAll('.dropdown-arrow.rotated').forEach(arr => {
                        arr.classList.remove('rotated');
                    });
                    
                    // Toggle current dropdown
                    if (!isOpen) {
                        dropdown.classList.add('show');
                        arrow.classList.add('rotated');
                    }
                }
            });
        });
    }

    setupMobileToggle() {
        // Setup hamburger button click handler
        if (this.navToggle) {
            // Remove any existing listeners
            this.navToggle.replaceWith(this.navToggle.cloneNode(true));
            this.navToggle = document.getElementById('nav-toggle');
            
            this.navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Hamburger clicked, toggling mobile nav');
                this.toggleMobileNav();
            });
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
        
        // Setup overlay click to close
        const overlay = document.querySelector('.mobile-nav-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.closeMobileNav();
            });
        }

        // Handle mobile dropdown toggles with improved functionality
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.dropdown-toggle');
            if (button) {
                e.preventDefault();
                console.log('Mobile dropdown toggle clicked:', button.dataset.target);
                
                const targetId = button.dataset.target;
                const dropdown = document.getElementById(targetId);
                
                if (dropdown) {
                    const isActive = dropdown.classList.contains('active');
                    
                    // Close all OTHER mobile dropdowns (not the current one)
                    document.querySelectorAll('.mobile-dropdown').forEach(dd => {
                        if (dd !== dropdown) {
                            dd.classList.remove('active');
                        }
                    });
                    document.querySelectorAll('.dropdown-toggle').forEach(btn => {
                        if (btn !== button) {
                            btn.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    if (!isActive) {
                        dropdown.classList.add('active');
                        button.classList.add('active');
                        console.log('Dropdown activated:', targetId);
                        
                        // Scroll dropdown into view if needed
                        setTimeout(() => {
                            dropdown.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'nearest' 
                            });
                        }, 100);
                    } else {
                        dropdown.classList.remove('active');
                        button.classList.remove('active');
                        console.log('Dropdown closed:', targetId);
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
            dropdown.classList.remove('active', 'hover-active');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.pointerEvents = 'none';
                menu.style.transform = 'translateX(-50%) translateY(-10px)';
            }
        });

        // Clear all dropdown timers
        if (this.dropdownTimers) {
            this.dropdownTimers.forEach(timer => clearTimeout(timer));
            this.dropdownTimers.clear();
        }
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