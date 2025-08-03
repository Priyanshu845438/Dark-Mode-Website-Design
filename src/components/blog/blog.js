// Blog Component JavaScript
// This file handles the dynamic loading of blog content from the centralized blog data

class BlogComponent {
    constructor() {
        this.blogContainer = null;
        this.maxPosts = 3; // Number of posts to show in the component
        this.init();
    }

    init() {
        // Wait for DOM content to be loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadBlogContent());
        } else {
            this.loadBlogContent();
        }
    }

    loadBlogContent() {
        this.blogContainer = document.getElementById('blog-posts-container');
        
        if (!this.blogContainer) {
            console.warn('Blog container not found');
            return;
        }

        // Check if blog data is available
        if (typeof BlogDataHelper !== 'undefined') {
            this.renderBlogPosts();
        } else {
            // Load blog data script if not available
            this.loadBlogDataScript().then(() => {
                this.renderBlogPosts();
            }).catch(error => {
                console.error('Failed to load blog data:', error);
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
            // Get featured posts first, then recent posts as fallback
            let posts = BlogDataHelper.getFeaturedPosts(this.maxPosts);
            
            if (posts.length < this.maxPosts) {
                const recentPosts = BlogDataHelper.getRecentPosts(this.maxPosts);
                // Merge and deduplicate
                const existingIds = posts.map(p => p.id);
                const additionalPosts = recentPosts.filter(p => !existingIds.includes(p.id));
                posts = [...posts, ...additionalPosts].slice(0, this.maxPosts);
            }

            if (posts.length === 0) {
                this.renderFallbackContent();
                return;
            }

            // Generate HTML for each post
            const blogHTML = posts.map(post => this.generateBlogCard(post)).join('');
            this.blogContainer.innerHTML = blogHTML;

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
                    <div class="blog-category">${post.categoryDisplay}</div>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-date">
                            <i class="fas fa-calendar"></i>
                            ${post.date}
                        </span>
                        <span class="blog-read-time">
                            <i class="fas fa-clock"></i>
                            ${post.readTime}
                        </span>
                    </div>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <div class="blog-footer">
                        <div class="blog-author">
                            <div class="author-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <span class="author-name">${post.author}</span>
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

// Initialize the blog component
const blogComponent = new BlogComponent();

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlogComponent;
}

// Make available globally
if (typeof window !== 'undefined') {
    window.BlogComponent = BlogComponent;
}