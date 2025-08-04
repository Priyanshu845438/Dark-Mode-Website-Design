// Blog Component JavaScript
// This file handles the dynamic loading of blog content from the centralized blog data

class BlogComponent {
    constructor() {
        this.blogContainer = null;
        this.maxPosts = 3; // Number of posts to show in the component
        this.init();
    }

    init() {
        // Use a more reliable method to wait for components to load
        this.waitForContainer();
    }
    
    waitForContainer() {
        const checkContainer = () => {
            this.blogContainer = document.getElementById('blog-posts-container');
            if (this.blogContainer) {
                console.log('✓ Blog container found, loading content...');
                this.loadBlogContent();
            } else {
                console.log('⏳ Waiting for blog container...');
                setTimeout(checkContainer, 100);
            }
        };
        checkContainer();
    }

    loadBlogContent() {
        // Container should already be found by waitForContainer
        if (!this.blogContainer) {
            console.error('Blog container not found in loadBlogContent');
            return;
        }

        console.log('🔍 Checking for blog data...');
        // Check if blog data is available
        if (typeof BlogDataHelper !== 'undefined' && typeof window.blogData !== 'undefined') {
            console.log('✓ Blog data found, rendering posts...');
            this.renderBlogPosts();
        } else {
            console.log('⏳ Blog data not ready, loading script...');
            // Load blog data script if not available
            this.loadBlogDataScript().then(() => {
                console.log('✓ Blog data script loaded, rendering posts...');
                this.renderBlogPosts();
            }).catch(error => {
                console.error('Failed to load blog data:', error);
                console.log('📝 Using fallback content...');
                this.renderFallbackContent();
            });
        }
    }

    loadBlogDataScript() {
        return new Promise((resolve, reject) => {
            // Check if script is already loaded
            if (document.querySelector('script[src*="blog-data.js"]')) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'src/components/blog/blog-data.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    renderBlogPosts() {
        try {
            console.log('📝 Starting to render blog posts...');
            console.log('🔍 BlogDataHelper available:', typeof BlogDataHelper !== 'undefined');
            console.log('🔍 window.blogData available:', typeof window.blogData !== 'undefined');
            
            // Get featured posts first, then recent posts as fallback
            let posts = BlogDataHelper.getFeaturedPosts(this.maxPosts);
            console.log('📊 Featured posts found:', posts.length);
            
            if (posts.length < this.maxPosts) {
                const recentPosts = BlogDataHelper.getRecentPosts(this.maxPosts);
                // Merge and deduplicate
                const existingIds = posts.map(p => p.id);
                const additionalPosts = recentPosts.filter(p => !existingIds.includes(p.id));
                posts = [...posts, ...additionalPosts].slice(0, this.maxPosts);
            }

            if (posts.length === 0) {
                console.warn('⚠️ No posts found, using fallback content');
                this.renderFallbackContent();
                return;
            }

            // Generate HTML for each post
            console.log('🎨 Generating HTML for', posts.length, 'posts');
            const blogHTML = posts.map(post => this.generateBlogCard(post)).join('');
            this.blogContainer.innerHTML = blogHTML;
            console.log('✅ Blog posts rendered successfully');

            // Add event listeners for analytics if needed
            this.attachEventListeners();

        } catch (error) {
            console.error('Error rendering blog posts:', error);
            this.renderFallbackContent();
        }
    }

    generateBlogCard(post) {
        return `
            <article class="blog-card" data-category="${post.category}">
                <div class="blog-image">
                    <div class="blog-overlay">
                        <div class="blog-icon">
                            <i class="${post.icon}"></i>
                        </div>
                    </div>
                    <div class="blog-category-tag">${post.categoryDisplay}</div>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <div class="author-info">
                            <div class="author-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <span class="author-name">${post.author}</span>
                        </div>
                        <div class="blog-date">
                            <i class="fas fa-calendar"></i>
                            <span>${post.date}</span>
                        </div>
                    </div>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <div class="blog-footer">
                        <div class="blog-stats">
                            <span class="read-time">
                                <i class="fas fa-clock"></i>
                                ${post.readTime}
                            </span>
                            <span class="views">
                                <i class="fas fa-eye"></i>
                                ${post.views}
                            </span>
                        </div>
                        <a href="pages/${post.url}" class="blog-btn" data-post-id="${post.id}">
                            Read More
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </article>
        `;
    }

    renderFallbackContent() {
        // Fallback content if blog data fails to load
        this.blogContainer.innerHTML = `
            <article class="blog-card">
                <div class="blog-image">
                    <div class="blog-overlay">
                        <div class="blog-icon">
                            <i class="fab fa-react"></i>
                        </div>
                    </div>
                    <div class="blog-category">Web Development</div>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-date">
                            <i class="fas fa-calendar"></i>
                            Aug 1, 2025
                        </span>
                        <span class="blog-read-time">
                            <i class="fas fa-clock"></i>
                            8 min read
                        </span>
                    </div>
                    <h3 class="blog-title">Modern React Development: Best Practices for 2025</h3>
                    <p class="blog-excerpt">
                        Explore the latest React patterns, hooks optimization, and performance techniques that will elevate your development skills in 2025.
                    </p>
                    <div class="blog-footer">
                        <div class="blog-author">
                            <div class="author-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <span class="author-name">Sarah Johnson</span>
                        </div>
                        <a href="pages/blogs/react-development-2025.html" class="blog-btn">
                            Read More
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </article>
            <article class="blog-card">
                <div class="blog-image">
                    <div class="blog-overlay">
                        <div class="blog-icon">
                            <i class="fas fa-brain"></i>
                        </div>
                    </div>
                    <div class="blog-category">AI & ML</div>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-date">
                            <i class="fas fa-calendar"></i>
                            Jul 29, 2025
                        </span>
                        <span class="blog-read-time">
                            <i class="fas fa-clock"></i>
                            12 min read
                        </span>
                    </div>
                    <h3 class="blog-title">Implementing AI-Powered Chatbots for Business Growth</h3>
                    <p class="blog-excerpt">
                        Learn how to integrate intelligent chatbots into your business operations to enhance customer experience and boost productivity.
                    </p>
                    <div class="blog-footer">
                        <div class="blog-author">
                            <div class="author-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <span class="author-name">Dr. Michael Chen</span>
                        </div>
                        <a href="pages/blogs/ai-chatbots-business.html" class="blog-btn">
                            Read More
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </article>
            <article class="blog-card">
                <div class="blog-image">
                    <div class="blog-overlay">
                        <div class="blog-icon">
                            <i class="fas fa-paint-brush"></i>
                        </div>
                    </div>
                    <div class="blog-category">UI/UX Design</div>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-date">
                            <i class="fas fa-calendar"></i>
                            Jul 26, 2025
                        </span>
                        <span class="blog-read-time">
                            <i class="fas fa-clock"></i>
                            10 min read
                        </span>
                    </div>
                    <h3 class="blog-title">Creating Stunning User Interfaces with Design Systems</h3>
                    <p class="blog-excerpt">
                        Master the art of building scalable design systems that ensure consistency and enhance user experience across all platforms.
                    </p>
                    <div class="blog-footer">
                        <div class="blog-author">
                            <div class="author-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <span class="author-name">Emily Rodriguez</span>
                        </div>
                        <a href="pages/blogs/design-systems-guide.html" class="blog-btn">
                            Read More
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </article>
        `;
    }

    attachEventListeners() {
        // Add click tracking for blog links
        const blogLinks = this.blogContainer.querySelectorAll('.blog-btn');
        blogLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const postId = link.getAttribute('data-post-id');
                // Track blog click event (for analytics)
                this.trackBlogClick(postId);
            });
        });
    }

    trackBlogClick(postId) {
        // Analytics tracking can be implemented here
        console.log(`Blog post clicked: ${postId}`);
        
        // Example: Send to analytics service
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', 'blog_click', {
        //         'post_id': postId,
        //         'component': 'homepage_blog'
        //     });
        // }
    }

    // Method to refresh blog content
    refresh() {
        this.loadBlogContent();
    }

    // Method to update the number of posts displayed
    setMaxPosts(count) {
        this.maxPosts = count;
        this.loadBlogContent();
    }
}

// Initialize the blog component when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if not already initialized
    if (!window.blogComponentInstance) {
        window.blogComponentInstance = new BlogComponent();
    }
});

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlogComponent;
}

// Make available globally
if (typeof window !== 'undefined') {
    window.BlogComponent = BlogComponent;
}