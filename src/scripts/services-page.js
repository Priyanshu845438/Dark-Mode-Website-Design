// Services Page JavaScript

class ServicesPage {
    constructor() {
        this.initializeComponents();
    }

    initializeComponents() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeFAQ();
            this.initializeSearch();
            this.initializeFilters();
            this.initializeAnimations();
        });
    }

    // FAQ Functionality
    initializeFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }

    // Search Functionality
    initializeSearch() {
        const searchInput = document.getElementById('faq-search');
        const faqItems = document.querySelectorAll('.faq-item');
        const noResults = document.getElementById('no-results');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                let visibleCount = 0;

                faqItems.forEach(item => {
                    const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                    const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                    
                    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                        item.style.display = 'block';
                        visibleCount++;
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('active');
                    }
                });

                // Show/hide no results message
                if (visibleCount === 0 && searchTerm !== '') {
                    noResults.style.display = 'block';
                } else {
                    noResults.style.display = 'none';
                }
            });
        }
    }

    // Filter Functionality
    initializeFilters() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        const faqItems = document.querySelectorAll('.faq-item');
        const searchInput = document.getElementById('faq-search');
        const noResults = document.getElementById('no-results');

        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const filterValue = tab.dataset.filter;
                
                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Clear search
                if (searchInput) {
                    searchInput.value = '';
                }
                
                // Filter FAQ items
                let visibleCount = 0;
                faqItems.forEach(item => {
                    const category = item.dataset.category;
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                        visibleCount++;
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('active');
                    }
                });

                // Hide no results when filtering
                noResults.style.display = 'none';
            });
        });
    }

    // Initialize Animations
    initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe animated elements
        const animatedElements = document.querySelectorAll('.service-card, .about-card, .faq-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Stagger animation for service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });

        // Stats counter animation
        this.animateStats();
    }

    // Animate statistics numbers
    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateNumber = (element, target) => {
            const duration = 2000; // 2 seconds
            const start = 0;
            const increment = target / (duration / 16); // 60fps
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format number based on content
                let displayValue = Math.floor(current);
                if (element.textContent.includes('+')) {
                    displayValue += '+';
                } else if (element.textContent.includes('%')) {
                    displayValue += '%';
                }
                
                element.textContent = displayValue;
            }, 16);
        };

        // Observe stats section
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        const number = parseInt(text.replace(/[^0-9]/g, ''));
                        animateNumber(stat, number);
                    });
                    statsObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });

        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            statsObserver.observe(heroStats);
        }
    }

    // Utility method to debounce function calls
    debounce(func, wait) {
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
}

// Initialize Services Page
const servicesPage = new ServicesPage();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ServicesPage;
}