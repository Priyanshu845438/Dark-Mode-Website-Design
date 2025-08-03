// Blog Post JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeBlogPost();
});

function initializeBlogPost() {
    initializeSocialShare();
    initializeSidebarNewsletter();
    initializeReadingProgress();
    initializeCodeBlocks();
    initializeScrollToTop();
}

// Social Share Functionality
function initializeSocialShare() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.classList.contains('twitter') ? 'twitter' :
                           this.classList.contains('linkedin') ? 'linkedin' :
                           this.classList.contains('facebook') ? 'facebook' : '';
            
            if (platform) {
                shareOnPlatform(platform);
            }
        });
    });
}

function shareOnPlatform(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const text = encodeURIComponent(document.querySelector('.post-subtitle')?.textContent || '');
    
    let shareUrl = '';
    
    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Sidebar Newsletter
function initializeSidebarNewsletter() {
    const newsletterForm = document.querySelector('.sidebar-newsletter');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                showNotification('Thank you for subscribing! You\'ll receive our latest insights soon.', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

// Reading Progress Indicator
function initializeReadingProgress() {
    const progressBar = createProgressBar();
    
    window.addEventListener('scroll', throttle(() => {
        updateReadingProgress(progressBar);
    }, 100));
}

function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    
    Object.assign(progressBar.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '0%',
        height: '4px',
        background: 'linear-gradient(45deg, #00BFFF, #39FF14)',
        zIndex: '9999',
        transition: 'width 0.1s ease'
    });
    
    document.body.appendChild(progressBar);
    return progressBar;
}

function updateReadingProgress(progressBar) {
    const article = document.querySelector('.post-article');
    if (!article) return;
    
    const articleRect = article.getBoundingClientRect();
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrolled = window.pageYOffset;
    const articleTop = article.offsetTop;
    
    const progress = Math.max(0, Math.min(100, 
        ((scrolled - articleTop + windowHeight) / articleHeight) * 100
    ));
    
    progressBar.style.width = progress + '%';
}

// Code Block Enhancements
function initializeCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        addCopyButton(block);
        addLineNumbers(block);
    });
}

function addCopyButton(codeBlock) {
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-btn';
    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    copyButton.title = 'Copy code';
    
    Object.assign(copyButton.style, {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'rgba(0, 191, 255, 0.8)',
        color: '#000000',
        border: 'none',
        padding: '8px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '12px',
        transition: 'all 0.3s ease'
    });
    
    codeBlock.style.position = 'relative';
    codeBlock.appendChild(copyButton);
    
    copyButton.addEventListener('click', function() {
        const code = codeBlock.querySelector('code').textContent;
        navigator.clipboard.writeText(code).then(() => {
            this.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        });
    });
}

function addLineNumbers(codeBlock) {
    const code = codeBlock.querySelector('code');
    const lines = code.textContent.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length > 3) {
        const lineNumbers = document.createElement('div');
        lineNumbers.className = 'line-numbers';
        
        Object.assign(lineNumbers.style, {
            position: 'absolute',
            left: '0',
            top: '0',
            padding: '1.5rem 0',
            background: 'rgba(0, 0, 0, 0.3)',
            color: '#666',
            fontSize: '0.8rem',
            lineHeight: '1.6',
            width: '40px',
            textAlign: 'center',
            borderRight: '1px solid rgba(0, 191, 255, 0.2)'
        });
        
        lineNumbers.innerHTML = lines.map((_, i) => i + 1).join('\n');
        
        codeBlock.style.paddingLeft = '60px';
        codeBlock.appendChild(lineNumbers);
    }
}

// Scroll to Top Button
function initializeScrollToTop() {
    const scrollTopBtn = createScrollTopButton();
    
    window.addEventListener('scroll', throttle(() => {
        toggleScrollTopButton(scrollTopBtn);
    }, 100));
    
    scrollTopBtn.addEventListener('click', scrollToTop);
}

function createScrollTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-top-btn';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    
    Object.assign(button.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        background: 'linear-gradient(45deg, #00BFFF, #39FF14)',
        color: '#000000',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '18px',
        zIndex: '1000',
        transition: 'all 0.3s ease',
        opacity: '0',
        visibility: 'hidden',
        transform: 'scale(0.8)'
    });
    
    document.body.appendChild(button);
    return button;
}

function toggleScrollTopButton(button) {
    if (window.pageYOffset > 300) {
        button.style.opacity = '1';
        button.style.visibility = 'visible';
        button.style.transform = 'scale(1)';
    } else {
        button.style.opacity = '0';
        button.style.visibility = 'hidden';
        button.style.transform = 'scale(0.8)';
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#39FF14' : '#FF4444',
        color: type === 'success' ? '#000000' : '#ffffff',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function throttle(func, limit) {
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

// Enhanced scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate article sections
    const sections = document.querySelectorAll('.article-content h2, .article-content h3, .code-block, .highlight-box');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(section);
    });
}