// About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('About page JavaScript loaded');
    
    // Initialize all components
    initializeCounters();
    initializeFAQ();
    initializeAnimations();
    
    console.log('✓ About page fully initialized');
});

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
        }
    };

    updateCounter();
}

// FAQ Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    const searchInput = document.getElementById('faq-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const noResults = document.getElementById('no-results');

    // FAQ Toggle
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active', !isActive);
        });
    });

    // Search Functionality with debouncing
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = e.target.value.toLowerCase().trim();
                filterFAQs(searchTerm, getActiveFilter());
            }, 300);
        });
    }

    // Filter Functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            filterFAQs(searchTerm, btn.dataset.filter);
        });
    });

    function getActiveFilter() {
        const activeBtn = document.querySelector('.filter-btn.active');
        return activeBtn ? activeBtn.dataset.filter : 'all';
    }

    function filterFAQs(searchTerm, category) {
        let visibleCount = 0;

        faqItems.forEach(item => {
            const questionElement = item.querySelector('.faq-question h3');
            const answerElement = item.querySelector('.faq-answer p');
            
            if (!questionElement || !answerElement) {
                console.warn('FAQ item missing question or answer element:', item);
                return;
            }
            
            const question = questionElement.textContent.toLowerCase();
            const answer = answerElement.textContent.toLowerCase();
            const itemCategory = item.dataset.category || '';

            const matchesSearch = searchTerm === '' || 
                                question.includes(searchTerm) || 
                                answer.includes(searchTerm);
            const matchesCategory = category === 'all' || itemCategory === category;

            if (matchesSearch && matchesCategory) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
                item.classList.remove('active');
            }
        });

        // Show/hide no results message
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
        
        console.log(`Filtered FAQs: ${visibleCount} visible items`);
    }
}

// Scroll Animations
function initializeAnimations() {
    const animateElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transition = 'all 0.6s ease-out';
        
        const animationType = element.dataset.animate;
        switch(animationType) {
            case 'slide-up':
                element.style.transform = 'translateY(30px)';
                break;
            case 'slide-right':
                element.style.transform = 'translateX(-30px)';
                break;
            case 'slide-left':
                element.style.transform = 'translateX(30px)';
                break;
            case 'fade-in':
                element.style.transform = 'none';
                break;
            default:
                element.style.transform = 'translateY(30px)';
        }
        
        observer.observe(element);
    });
}

// Utility function for smooth scrolling
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Export functions for global use
window.AboutPage = {
    smoothScrollTo,
    initializeCounters,
    initializeFAQ,
    initializeAnimations
};

console.log('✓ About page JavaScript initialized');