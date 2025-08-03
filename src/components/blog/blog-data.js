// Blog Data - Extracted from the main blog page
// This centralizes all blog data for reuse across components

const blogData = {
    posts: [
        {
            id: 1,
            category: "web-development",
            categoryDisplay: "Web Development",
            icon: "fab fa-react",
            title: "Modern React Development: Best Practices for 2025",
            excerpt: "Explore the latest React patterns, hooks optimization, and performance techniques that will elevate your development skills in 2025.",
            author: "Sarah Johnson",
            authorTitle: "Senior React Developer",
            date: "Aug 1, 2025",
            readTime: "8 min read",
            views: "2.5k views",
            url: "blogs/react-development-2025.html",
            featured: true
        },
        {
            id: 2,
            category: "ai-ml",
            categoryDisplay: "AI & Machine Learning",
            icon: "fas fa-brain",
            title: "Implementing AI-Powered Chatbots for Business Growth",
            excerpt: "Learn how to integrate intelligent chatbots into your business operations to enhance customer experience and boost productivity.",
            author: "Dr. Michael Chen",
            authorTitle: "AI Solutions Architect",
            date: "Jul 29, 2025",
            readTime: "12 min read",
            views: "3.2k views",
            url: "blogs/ai-chatbots-business.html",
            featured: true
        },
        {
            id: 3,
            category: "ui-ux",
            categoryDisplay: "UI/UX Design",
            icon: "fas fa-paint-brush",
            title: "Creating Stunning User Interfaces with Design Systems",
            excerpt: "Master the art of building scalable design systems that ensure consistency and enhance user experience across all platforms.",
            author: "Emily Rodriguez",
            authorTitle: "Senior UX Designer",
            date: "Jul 26, 2025",
            readTime: "10 min read",
            views: "1.8k views",
            url: "blogs/design-systems-guide.html",
            featured: true
        },
        {
            id: 4,
            category: "mobile-development",
            categoryDisplay: "Mobile Development",
            icon: "fas fa-mobile-alt",
            title: "Flutter vs React Native: Choosing the Right Framework",
            excerpt: "Comprehensive comparison of Flutter and React Native to help you make the best choice for your mobile app development project.",
            author: "David Kumar",
            authorTitle: "Mobile Development Lead",
            date: "Jul 23, 2025",
            readTime: "15 min read",
            views: "4.1k views",
            url: "blogs/flutter-vs-react-native.html",
            featured: false
        },
        {
            id: 5,
            category: "cloud-services",
            categoryDisplay: "Cloud Services",
            icon: "fas fa-cloud",
            title: "Microservices Architecture: Scaling Your Applications",
            excerpt: "Learn how to design and implement microservices architecture for building scalable, maintainable, and resilient applications.",
            author: "Alex Thompson",
            authorTitle: "Cloud Solutions Architect",
            date: "Jul 20, 2025",
            readTime: "14 min read",
            views: "2.9k views",
            url: "blogs/microservices-architecture.html",
            featured: false
        },
        {
            id: 6,
            category: "digital-marketing",
            categoryDisplay: "Digital Marketing",
            icon: "fas fa-chart-line",
            title: "SEO Strategies That Actually Work in 2025",
            excerpt: "Discover the latest SEO techniques and strategies that drive real results in today's competitive digital landscape.",
            author: "Lisa Martinez",
            authorTitle: "SEO Strategy Lead",
            date: "Jul 17, 2025",
            readTime: "11 min read",
            views: "3.7k views",
            url: "blogs/seo-strategies-2025.html",
            featured: false
        },
        {
            id: 7,
            category: "web-development",
            categoryDisplay: "Web Development",
            icon: "fas fa-code",
            title: "Building Progressive Web Apps (PWAs) for Better Performance",
            excerpt: "Step-by-step guide to creating Progressive Web Apps that deliver native app experiences with web technologies.",
            author: "James Wilson",
            authorTitle: "Frontend Architect",
            date: "Jul 14, 2025",
            readTime: "13 min read",
            views: "2.3k views",
            url: "blogs/progressive-web-apps.html",
            featured: false
        },
        {
            id: 8,
            category: "ai-ml",
            categoryDisplay: "AI & Machine Learning",
            icon: "fas fa-robot",
            title: "Machine Learning Model Deployment: From Development to Production",
            excerpt: "Complete guide to deploying machine learning models in production environments with best practices and optimization techniques.",
            author: "Dr. Rachel Green",
            authorTitle: "ML Engineer & Data Scientist",
            date: "Jul 11, 2025",
            readTime: "16 min read",
            views: "1.9k views",
            url: "blogs/ml-model-deployment.html",
            featured: false
        },
        {
            id: 9,
            category: "cloud-services",
            categoryDisplay: "Cloud Services",
            icon: "fas fa-shield-alt",
            title: "Cloud Security: Protecting Your Digital Assets",
            excerpt: "Essential security measures and best practices for protecting your applications and data in cloud environments.",
            author: "Robert Smith",
            authorTitle: "Cloud Security Architect",
            date: "Jul 8, 2025",
            readTime: "9 min read",
            views: "2.7k views",
            url: "blogs/cloud-security-guide.html",
            featured: false
        }
    ],
    
    categories: [
        { id: "all", name: "All Posts", count: 9 },
        { id: "web-development", name: "Web Development", count: 2 },
        { id: "mobile-development", name: "Mobile Development", count: 1 },
        { id: "ai-ml", name: "AI & Machine Learning", count: 2 },
        { id: "ui-ux", name: "UI/UX Design", count: 1 },
        { id: "cloud-services", name: "Cloud Services", count: 2 },
        { id: "digital-marketing", name: "Digital Marketing", count: 1 }
    ],
    
    stats: {
        totalPosts: 9,
        monthlyReaders: "50k+",
        readerSatisfaction: "95%",
        categories: 6
    }
};

// Helper functions
const BlogDataHelper = {
    // Get all posts
    getAllPosts() {
        return blogData.posts;
    },
    
    // Get posts by category
    getPostsByCategory(category) {
        if (category === 'all') {
            return blogData.posts;
        }
        return blogData.posts.filter(post => post.category === category);
    },
    
    // Get featured posts
    getFeaturedPosts(limit = 3) {
        return blogData.posts.filter(post => post.featured).slice(0, limit);
    },
    
    // Get recent posts
    getRecentPosts(limit = 6) {
        return blogData.posts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    },
    
    // Get post by ID
    getPostById(id) {
        return blogData.posts.find(post => post.id === id);
    },
    
    // Get related posts by category
    getRelatedPosts(currentPostId, category, limit = 3) {
        return blogData.posts
            .filter(post => post.id !== currentPostId && post.category === category)
            .slice(0, limit);
    },
    
    // Search posts
    searchPosts(query) {
        const searchTerm = query.toLowerCase();
        return blogData.posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.author.toLowerCase().includes(searchTerm) ||
            post.categoryDisplay.toLowerCase().includes(searchTerm)
        );
    },
    
    // Get categories
    getCategories() {
        return blogData.categories;
    },
    
    // Get stats
    getStats() {
        return blogData.stats;
    },
    
    // Generate blog card HTML
    generateBlogCard(post, basePath = '') {
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
                        <a href="${basePath}${post.url}" class="blog-btn">
                            Read More
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </article>
        `;
    },
    
    // Generate category buttons HTML
    generateCategoryButtons(activeCategory = 'all') {
        return blogData.categories.map(category => `
            <button class="category-btn ${category.id === activeCategory ? 'active' : ''}" 
                    data-category="${category.id}">
                ${category.name}
            </button>
        `).join('');
    }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { blogData, BlogDataHelper };
}

// Make available globally for direct script inclusion
if (typeof window !== 'undefined') {
    window.blogData = blogData;
    window.BlogDataHelper = BlogDataHelper;
}