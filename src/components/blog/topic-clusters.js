/**
 * Blog Topic Clusters System
 * Intelligently groups related blog posts for improved content discovery and SEO
 */

const topicClusters = {
    // Define main topic clusters with related posts
    clusters: {
        "frontend-development": {
            name: "Frontend Development",
            description: "Modern frontend technologies, frameworks, and best practices",
            icon: "fab fa-js-square",
            color: "#f7df1e",
            pillarPost: "react-development-2025.html",
            posts: [
                "react-development-2025.html",
                "progressive-web-apps.html",
                "design-systems-guide.html"
            ],
            relatedTopics: ["mobile-development", "ui-ux-design"],
            keywords: ["React", "JavaScript", "Frontend", "PWA", "Design Systems", "Component Libraries"]
        },
        
        "ai-machine-learning": {
            name: "AI & Machine Learning",
            description: "Artificial intelligence solutions and machine learning implementations",
            icon: "fas fa-brain",
            color: "#6c5ce7",
            pillarPost: "ai-chatbots-business.html",
            posts: [
                "ai-chatbots-business.html",
                "ml-model-deployment.html"
            ],
            relatedTopics: ["cloud-services", "data-analytics"],
            keywords: ["AI", "Machine Learning", "Chatbots", "Automation", "NLP", "Model Deployment"]
        },
        
        "mobile-development": {
            name: "Mobile Development",
            description: "Cross-platform and native mobile app development strategies",
            icon: "fas fa-mobile-alt",
            color: "#00b894",
            pillarPost: "flutter-vs-react-native.html",
            posts: [
                "flutter-vs-react-native.html",
                "progressive-web-apps.html"
            ],
            relatedTopics: ["frontend-development", "ui-ux-design"],
            keywords: ["Flutter", "React Native", "Mobile Apps", "Cross-platform", "iOS", "Android"]
        },
        
        "cloud-architecture": {
            name: "Cloud & Architecture",
            description: "Scalable cloud solutions and modern software architecture",
            icon: "fas fa-cloud",
            color: "#74b9ff",
            pillarPost: "microservices-architecture.html",
            posts: [
                "microservices-architecture.html",
                "cloud-security-guide.html"
            ],
            relatedTopics: ["ai-machine-learning", "devops-tools"],
            keywords: ["Microservices", "Cloud Computing", "Kubernetes", "Docker", "Security", "DevOps"]
        },
        
        "ui-ux-design": {
            name: "UI/UX Design",
            description: "User interface design and user experience optimization",
            icon: "fas fa-paint-brush",
            color: "#fd79a8",
            pillarPost: "design-systems-guide.html",
            posts: [
                "design-systems-guide.html"
            ],
            relatedTopics: ["frontend-development", "mobile-development"],
            keywords: ["Design Systems", "UI Design", "UX Research", "Prototyping", "User Interface"]
        },
        
        "digital-marketing": {
            name: "Digital Marketing & SEO",
            description: "SEO strategies and digital marketing best practices",
            icon: "fas fa-search",
            color: "#fd79a8",
            pillarPost: "seo-strategies-2025.html",
            posts: [
                "seo-strategies-2025.html"
            ],
            relatedTopics: ["frontend-development", "analytics"],
            keywords: ["SEO", "Digital Marketing", "Content Strategy", "Analytics", "Search Optimization"]
        }
    },

    // Get posts for a specific cluster
    getClusterPosts: function(clusterKey) {
        const cluster = this.clusters[clusterKey];
        if (!cluster) return [];
        
        // Get detailed post information from blog data
        return cluster.posts.map(postUrl => {
            const post = window.blogData?.posts?.find(p => p.url.includes(postUrl.replace('.html', '')));
            return {
                url: postUrl,
                title: post?.title || this.extractTitleFromUrl(postUrl),
                excerpt: post?.excerpt || "",
                category: post?.categoryDisplay || cluster.name,
                readTime: post?.readTime || "5 min read",
                author: post?.author || "Acadify Solution"
            };
        });
    },

    // Get related clusters for cross-linking
    getRelatedClusters: function(clusterKey) {
        const cluster = this.clusters[clusterKey];
        if (!cluster || !cluster.relatedTopics) return [];
        
        return cluster.relatedTopics.map(relatedKey => ({
            key: relatedKey,
            ...this.clusters[relatedKey]
        }));
    },

    // Find clusters that contain a specific post
    getClustersForPost: function(postUrl) {
        const matchingClusters = [];
        
        Object.entries(this.clusters).forEach(([key, cluster]) => {
            if (cluster.posts.some(post => post.includes(postUrl.replace('.html', '')))) {
                matchingClusters.push({
                    key: key,
                    ...cluster
                });
            }
        });
        
        return matchingClusters;
    },

    // Generate topic cluster navigation
    generateClusterNav: function() {
        return Object.entries(this.clusters).map(([key, cluster]) => ({
            key: key,
            name: cluster.name,
            icon: cluster.icon,
            color: cluster.color,
            postCount: cluster.posts.length,
            url: `#cluster-${key}`
        }));
    },

    // Get cluster statistics
    getClusterStats: function() {
        const totalPosts = Object.values(this.clusters).reduce((sum, cluster) => sum + cluster.posts.length, 0);
        const totalClusters = Object.keys(this.clusters).length;
        
        return {
            totalClusters,
            totalPosts,
            avgPostsPerCluster: Math.round(totalPosts / totalClusters),
            largestCluster: Object.entries(this.clusters).reduce((max, [key, cluster]) => 
                cluster.posts.length > max.posts ? { key, posts: cluster.posts.length, name: cluster.name } : max,
                { posts: 0 }
            )
        };
    },

    // Extract title from URL for fallback
    extractTitleFromUrl: function(url) {
        return url.replace('.html', '').split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },

    // Generate internal linking suggestions
    generateInternalLinks: function(currentPostUrl) {
        const currentClusters = this.getClustersForPost(currentPostUrl);
        const suggestions = [];
        
        currentClusters.forEach(cluster => {
            // Add other posts from same cluster
            cluster.posts.forEach(postUrl => {
                if (!postUrl.includes(currentPostUrl.replace('.html', ''))) {
                    suggestions.push({
                        url: postUrl,
                        reason: `Related ${cluster.name} content`,
                        strength: 'high'
                    });
                }
            });
            
            // Add posts from related clusters
            this.getRelatedClusters(cluster.key).forEach(relatedCluster => {
                relatedCluster.posts.slice(0, 2).forEach(postUrl => {
                    suggestions.push({
                        url: postUrl,
                        reason: `Related ${relatedCluster.name} content`,
                        strength: 'medium'
                    });
                });
            });
        });
        
        return suggestions.slice(0, 6); // Limit to top 6 suggestions
    }
};

// Topic Cluster UI Component
const TopicClusterComponent = {
    // Render cluster overview section
    renderClusterOverview: function(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const clusters = topicClusters.generateClusterNav();
        const stats = topicClusters.getClusterStats();
        
        container.innerHTML = `
            <div class="topic-clusters-overview">
                <div class="cluster-stats">
                    <h2>Content Topic Clusters</h2>
                    <p>Explore our ${stats.totalClusters} topic clusters covering ${stats.totalPosts} expert articles</p>
                </div>
                
                <div class="clusters-grid">
                    ${clusters.map(cluster => `
                        <div class="cluster-card" data-cluster="${cluster.key}">
                            <div class="cluster-header">
                                <i class="${cluster.icon}" style="color: ${cluster.color}"></i>
                                <h3>${cluster.name}</h3>
                            </div>
                            <p class="cluster-count">${cluster.postCount} article${cluster.postCount !== 1 ? 's' : ''}</p>
                            <button class="cluster-btn" onclick="TopicClusterComponent.showClusterPosts('${cluster.key}')">
                                Explore Topics
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // Render related posts section for individual blog pages
    renderRelatedPosts: function(containerId, currentPostUrl) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const suggestions = topicClusters.generateInternalLinks(currentPostUrl);
        const currentClusters = topicClusters.getClustersForPost(currentPostUrl);
        
        if (suggestions.length === 0) return;
        
        container.innerHTML = `
            <div class="related-posts-section">
                <h3>Related Articles</h3>
                <div class="related-posts-grid">
                    ${suggestions.slice(0, 3).map(suggestion => `
                        <article class="related-post-card">
                            <div class="related-post-content">
                                <p class="related-post-category">${suggestion.reason}</p>
                                <h4 class="related-post-title">
                                    <a href="../${suggestion.url}">${topicClusters.extractTitleFromUrl(suggestion.url)}</a>
                                </h4>
                                <div class="related-post-strength ${suggestion.strength}">
                                    ${suggestion.strength} relevance
                                </div>
                            </div>
                        </article>
                    `).join('')}
                </div>
                
                ${currentClusters.length > 0 ? `
                    <div class="topic-clusters-tags">
                        <span>Topics: </span>
                        ${currentClusters.map(cluster => `
                            <span class="cluster-tag" style="border-color: ${cluster.color}">
                                <i class="${cluster.icon}"></i>
                                ${cluster.name}
                            </span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    },

    // Show posts for a specific cluster
    showClusterPosts: function(clusterKey) {
        const cluster = topicClusters.clusters[clusterKey];
        const posts = topicClusters.getClusterPosts(clusterKey);
        const relatedClusters = topicClusters.getRelatedClusters(clusterKey);
        
        // Create modal or dedicated section
        const modal = document.createElement('div');
        modal.className = 'cluster-modal';
        modal.innerHTML = `
            <div class="cluster-modal-content">
                <div class="cluster-modal-header">
                    <h2>
                        <i class="${cluster.icon}" style="color: ${cluster.color}"></i>
                        ${cluster.name}
                    </h2>
                    <button class="close-modal" onclick="this.closest('.cluster-modal').remove()">×</button>
                </div>
                
                <p class="cluster-description">${cluster.description}</p>
                
                <div class="cluster-posts">
                    <h3>Articles in this topic:</h3>
                    ${posts.map(post => `
                        <article class="cluster-post-item">
                            <h4><a href="blogs/${post.url}">${post.title}</a></h4>
                            <p>${post.excerpt}</p>
                            <div class="post-meta">
                                <span>${post.readTime}</span> • <span>${post.author}</span>
                            </div>
                        </article>
                    `).join('')}
                </div>
                
                ${relatedClusters.length > 0 ? `
                    <div class="related-clusters">
                        <h3>Related Topics:</h3>
                        <div class="related-clusters-list">
                            ${relatedClusters.map(related => `
                                <button class="related-cluster-btn" onclick="TopicClusterComponent.showClusterPosts('${related.key}')">
                                    <i class="${related.icon}"></i>
                                    ${related.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
        
        document.body.appendChild(modal);
    }
};

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize clusters on blog listing page
    if (document.getElementById('topic-clusters-container')) {
        TopicClusterComponent.renderClusterOverview('topic-clusters-container');
    }
    
    // Initialize related posts on individual blog pages
    if (document.getElementById('related-posts-container')) {
        const currentUrl = window.location.pathname.split('/').pop();
        TopicClusterComponent.renderRelatedPosts('related-posts-container', currentUrl);
    }
});

// Export for use in other components
window.topicClusters = topicClusters;
window.TopicClusterComponent = TopicClusterComponent;