/**
 * Contextual Internal Linking System
 * Intelligently connects blogs, services, and industry pages for enhanced SEO and user experience
 */

const contextualLinks = {
    // Define relationships between content types
    relationships: {
        blogs: {
            "react-development-2025": {
                services: [
                    "pages/services/web-development.html",
                    "pages/services/frontend-development.html",
                    "pages/services/ui-ux-design.html"
                ],
                industries: [
                    "pages/industries/startup-solutions.html",
                    "pages/industries/technology-companies.html",
                    "pages/industries/ecommerce-solutions.html"
                ],
                keywords: ["React", "Frontend", "JavaScript", "Web Development", "UI Components"]
            },
            
            "ai-chatbots-business": {
                services: [
                    "pages/services/ai-ml-solutions.html",
                    "pages/services/automation-services.html",
                    "pages/services/custom-software-development.html"
                ],
                industries: [
                    "pages/industries/healthcare-solutions.html",
                    "pages/industries/financial-services.html",
                    "pages/industries/ecommerce-solutions.html",
                    "pages/industries/education-solutions.html"
                ],
                keywords: ["AI", "Chatbots", "Automation", "Customer Service", "Machine Learning"]
            },
            
            "design-systems-guide": {
                services: [
                    "pages/services/ui-ux-design.html",
                    "pages/services/frontend-development.html",
                    "pages/services/web-development.html"
                ],
                industries: [
                    "pages/industries/startup-solutions.html",
                    "pages/industries/technology-companies.html",
                    "pages/industries/media-entertainment.html"
                ],
                keywords: ["Design Systems", "UI/UX", "Brand Consistency", "Component Libraries"]
            },
            
            "flutter-vs-react-native": {
                services: [
                    "pages/services/mobile-app-development.html",
                    "pages/services/cross-platform-development.html",
                    "pages/services/ui-ux-design.html"
                ],
                industries: [
                    "pages/industries/startup-solutions.html",
                    "pages/industries/ecommerce-solutions.html",
                    "pages/industries/healthcare-solutions.html",
                    "pages/industries/financial-services.html"
                ],
                keywords: ["Mobile Development", "Cross-platform", "Flutter", "React Native", "Mobile Apps"]
            },
            
            "microservices-architecture": {
                services: [
                    "pages/services/cloud-solutions.html",
                    "pages/services/backend-development.html",
                    "pages/services/devops-consulting.html",
                    "pages/services/custom-software-development.html"
                ],
                industries: [
                    "pages/industries/technology-companies.html",
                    "pages/industries/financial-services.html",
                    "pages/industries/healthcare-solutions.html"
                ],
                keywords: ["Microservices", "Cloud Architecture", "Scalability", "Backend Development"]
            },
            
            "seo-strategies-2025": {
                services: [
                    "pages/services/digital-marketing.html",
                    "pages/services/web-development.html",
                    "pages/services/content-management.html"
                ],
                industries: [
                    "pages/industries/ecommerce-solutions.html",
                    "pages/industries/startup-solutions.html",
                    "pages/industries/media-entertainment.html",
                    "pages/industries/real-estate-solutions.html"
                ],
                keywords: ["SEO", "Digital Marketing", "Content Strategy", "Search Optimization"]
            },
            
            "progressive-web-apps": {
                services: [
                    "pages/services/web-development.html",
                    "pages/services/frontend-development.html",
                    "pages/services/mobile-app-development.html"
                ],
                industries: [
                    "pages/industries/ecommerce-solutions.html",
                    "pages/industries/media-entertainment.html",
                    "pages/industries/startup-solutions.html"
                ],
                keywords: ["PWA", "Web Development", "Mobile Experience", "Performance"]
            },
            
            "ml-model-deployment": {
                services: [
                    "pages/services/ai-ml-solutions.html",
                    "pages/services/cloud-solutions.html",
                    "pages/services/data-analytics.html"
                ],
                industries: [
                    "pages/industries/healthcare-solutions.html",
                    "pages/industries/financial-services.html",
                    "pages/industries/technology-companies.html"
                ],
                keywords: ["Machine Learning", "AI Deployment", "Data Science", "Model Training"]
            },
            
            "cloud-security-guide": {
                services: [
                    "pages/services/cloud-solutions.html",
                    "pages/services/cybersecurity-services.html",
                    "pages/services/devops-consulting.html"
                ],
                industries: [
                    "pages/industries/financial-services.html",
                    "pages/industries/healthcare-solutions.html",
                    "pages/industries/government-solutions.html"
                ],
                keywords: ["Cloud Security", "Cybersecurity", "Data Protection", "Compliance"]
            }
        },
        
        services: {
            "web-development": {
                blogs: ["react-development-2025", "progressive-web-apps", "design-systems-guide", "seo-strategies-2025"],
                industries: ["ecommerce-solutions", "startup-solutions", "technology-companies"]
            },
            
            "ai-ml-solutions": {
                blogs: ["ai-chatbots-business", "ml-model-deployment"],
                industries: ["healthcare-solutions", "financial-services", "technology-companies"]
            },
            
            "mobile-app-development": {
                blogs: ["flutter-vs-react-native", "progressive-web-apps"],
                industries: ["startup-solutions", "ecommerce-solutions", "healthcare-solutions"]
            },
            
            "cloud-solutions": {
                blogs: ["microservices-architecture", "cloud-security-guide", "ml-model-deployment"],
                industries: ["technology-companies", "financial-services", "healthcare-solutions"]
            },
            
            "ui-ux-design": {
                blogs: ["design-systems-guide", "react-development-2025"],
                industries: ["startup-solutions", "media-entertainment", "ecommerce-solutions"]
            }
        },
        
        industries: {
            "startup-solutions": {
                blogs: ["react-development-2025", "flutter-vs-react-native", "design-systems-guide", "seo-strategies-2025"],
                services: ["web-development", "mobile-app-development", "ui-ux-design", "digital-marketing"]
            },
            
            "healthcare-solutions": {
                blogs: ["ai-chatbots-business", "cloud-security-guide", "ml-model-deployment"],
                services: ["ai-ml-solutions", "cloud-solutions", "cybersecurity-services", "mobile-app-development"]
            },
            
            "financial-services": {
                blogs: ["cloud-security-guide", "microservices-architecture", "ai-chatbots-business"],
                services: ["cloud-solutions", "cybersecurity-services", "ai-ml-solutions", "backend-development"]
            },
            
            "ecommerce-solutions": {
                blogs: ["seo-strategies-2025", "progressive-web-apps", "flutter-vs-react-native"],
                services: ["web-development", "mobile-app-development", "digital-marketing", "ui-ux-design"]
            },
            
            "technology-companies": {
                blogs: ["microservices-architecture", "react-development-2025", "ml-model-deployment"],
                services: ["cloud-solutions", "ai-ml-solutions", "web-development", "devops-consulting"]
            }
        }
    },

    // Generate contextual links for a specific page
    generateContextualLinks: function(pageType, pageId, currentUrl = "") {
        const relationships = this.relationships[pageType];
        if (!relationships || !relationships[pageId]) return [];
        
        const pageData = relationships[pageId];
        const contextualLinks = [];
        
        // Add service links
        if (pageData.services) {
            pageData.services.forEach(serviceUrl => {
                if (!currentUrl.includes(serviceUrl)) {
                    contextualLinks.push({
                        type: 'service',
                        url: serviceUrl,
                        title: this.extractTitleFromUrl(serviceUrl),
                        description: this.getServiceDescription(serviceUrl),
                        relevance: 'high',
                        category: 'Our Services'
                    });
                }
            });
        }
        
        // Add industry links
        if (pageData.industries) {
            pageData.industries.forEach(industryUrl => {
                if (!currentUrl.includes(industryUrl)) {
                    contextualLinks.push({
                        type: 'industry',
                        url: industryUrl,
                        title: this.extractTitleFromUrl(industryUrl),
                        description: this.getIndustryDescription(industryUrl),
                        relevance: 'medium',
                        category: 'Industry Solutions'
                    });
                }
            });
        }
        
        // Add blog links (for non-blog pages)
        if (pageType !== 'blogs' && pageData.blogs) {
            pageData.blogs.forEach(blogId => {
                const blogUrl = `pages/blogs/${blogId}.html`;
                if (!currentUrl.includes(blogUrl)) {
                    contextualLinks.push({
                        type: 'blog',
                        url: blogUrl,
                        title: this.extractTitleFromUrl(blogUrl),
                        description: this.getBlogDescription(blogId),
                        relevance: 'medium',
                        category: 'Related Insights'
                    });
                }
            });
        }
        
        return contextualLinks.slice(0, 6); // Limit to top 6 suggestions
    },

    // Generate keyword-based contextual links
    generateKeywordLinks: function(pageKeywords, currentUrl = "") {
        const keywordLinks = [];
        const allRelationships = this.relationships;
        
        pageKeywords.forEach(keyword => {
            // Search through all content types for keyword matches
            Object.entries(allRelationships).forEach(([contentType, pages]) => {
                Object.entries(pages).forEach(([pageId, pageData]) => {
                    if (pageData.keywords && pageData.keywords.some(k => 
                        k.toLowerCase().includes(keyword.toLowerCase()) || 
                        keyword.toLowerCase().includes(k.toLowerCase())
                    )) {
                        let linkUrl;
                        if (contentType === 'blogs') {
                            linkUrl = `pages/blogs/${pageId}.html`;
                        } else {
                            linkUrl = pageData.services?.[0] || pageData.industries?.[0] || '';
                        }
                        
                        if (linkUrl && !currentUrl.includes(linkUrl)) {
                            keywordLinks.push({
                                type: contentType.slice(0, -1), // Remove 's' from plural
                                url: linkUrl,
                                title: this.extractTitleFromUrl(linkUrl),
                                keyword: keyword,
                                relevance: 'medium',
                                category: 'Related by Topic'
                            });
                        }
                    }
                });
            });
        });
        
        return keywordLinks.slice(0, 4); // Limit keyword-based suggestions
    },

    // Extract readable title from URL
    extractTitleFromUrl: function(url) {
        const filename = url.split('/').pop().replace('.html', '');
        return filename.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },

    // Get service descriptions
    getServiceDescription: function(serviceUrl) {
        const serviceDescriptions = {
            'web-development.html': 'Custom web applications built with modern technologies and best practices',
            'ai-ml-solutions.html': 'Intelligent AI and machine learning solutions for business automation',
            'mobile-app-development.html': 'Cross-platform mobile applications for iOS and Android',
            'cloud-solutions.html': 'Scalable cloud infrastructure and migration services',
            'ui-ux-design.html': 'User-centered design for exceptional digital experiences',
            'digital-marketing.html': 'Data-driven marketing strategies for online growth',
            'cybersecurity-services.html': 'Comprehensive security solutions for digital assets',
            'devops-consulting.html': 'DevOps implementation for efficient development workflows',
            'backend-development.html': 'Robust backend systems and API development',
            'automation-services.html': 'Business process automation and workflow optimization'
        };
        
        const filename = serviceUrl.split('/').pop();
        return serviceDescriptions[filename] || 'Professional technology services tailored to your business needs';
    },

    // Get industry descriptions
    getIndustryDescription: function(industryUrl) {
        const industryDescriptions = {
            'startup-solutions.html': 'Technology solutions designed for startups and growing businesses',
            'healthcare-solutions.html': 'HIPAA-compliant healthcare technology and digital health solutions',
            'financial-services.html': 'Secure fintech solutions and financial software development',
            'ecommerce-solutions.html': 'Complete e-commerce platforms and online retail solutions',
            'technology-companies.html': 'Enterprise solutions for technology and software companies',
            'education-solutions.html': 'Educational technology and e-learning platform development',
            'media-entertainment.html': 'Digital solutions for media, entertainment, and content industries',
            'government-solutions.html': 'Secure government technology solutions and civic applications'
        };
        
        const filename = industryUrl.split('/').pop();
        return industryDescriptions[filename] || 'Industry-specific technology solutions and expertise';
    },

    // Get blog descriptions
    getBlogDescription: function(blogId) {
        const blogDescriptions = {
            'react-development-2025': 'Latest React patterns, hooks optimization, and performance techniques',
            'ai-chatbots-business': 'How to integrate intelligent chatbots for business growth',
            'design-systems-guide': 'Building scalable design systems for consistent user experiences',
            'flutter-vs-react-native': 'Comprehensive comparison for mobile app development decisions',
            'microservices-architecture': 'Design and implement scalable microservices architecture',
            'seo-strategies-2025': 'Effective SEO techniques for improved search visibility',
            'progressive-web-apps': 'Building PWAs for enhanced mobile web experiences',
            'ml-model-deployment': 'Complete guide to deploying machine learning models in production',
            'cloud-security-guide': 'Essential security measures for cloud environments'
        };
        
        return blogDescriptions[blogId] || 'Expert insights and practical guidance for technology professionals';
    }
};

// Contextual Links UI Component
const ContextualLinksComponent = {
    // Render contextual links section
    renderContextualLinks: function(containerId, pageType, pageId, keywords = []) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const contextualLinks = contextualLinks.generateContextualLinks(pageType, pageId, window.location.href);
        const keywordLinks = keywords.length > 0 ? contextualLinks.generateKeywordLinks(keywords, window.location.href) : [];
        
        const allLinks = [...contextualLinks, ...keywordLinks];
        
        if (allLinks.length === 0) return;
        
        // Group links by category
        const groupedLinks = {};
        allLinks.forEach(link => {
            if (!groupedLinks[link.category]) {
                groupedLinks[link.category] = [];
            }
            groupedLinks[link.category].push(link);
        });
        
        container.innerHTML = `
            <div class="contextual-links-section">
                <h3>You Might Also Be Interested In</h3>
                ${Object.entries(groupedLinks).map(([category, links]) => `
                    <div class="contextual-category">
                        <h4 class="category-title">${category}</h4>
                        <div class="contextual-links-grid">
                            ${links.slice(0, 3).map(link => `
                                <article class="contextual-link-card ${link.relevance}">
                                    <div class="link-type-badge ${link.type}">
                                        ${this.getTypeIcon(link.type)}
                                        ${link.type.charAt(0).toUpperCase() + link.type.slice(1)}
                                    </div>
                                    <h5 class="link-title">
                                        <a href="../${link.url}">${link.title}</a>
                                    </h5>
                                    <p class="link-description">${link.description}</p>
                                    <div class="link-relevance">
                                        <span class="relevance-indicator ${link.relevance}">
                                            ${link.relevance} relevance
                                        </span>
                                        ${link.keyword ? `<span class="keyword-match">📍 ${link.keyword}</span>` : ''}
                                    </div>
                                </article>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    // Get icon for content type
    getTypeIcon: function(type) {
        const icons = {
            service: '<i class="fas fa-cogs"></i>',
            industry: '<i class="fas fa-industry"></i>',
            blog: '<i class="fas fa-blog"></i>'
        };
        return icons[type] || '<i class="fas fa-link"></i>';
    },

    // Render inline contextual links within content
    renderInlineLinks: function(contentElement, pageType, pageId) {
        if (!contentElement) return;
        
        const links = contextualLinks.generateContextualLinks(pageType, pageId);
        if (links.length === 0) return;
        
        // Insert contextual links naturally within content
        const paragraphs = contentElement.querySelectorAll('p');
        if (paragraphs.length >= 3) {
            const targetParagraph = paragraphs[Math.floor(paragraphs.length / 2)];
            
            const inlineLink = links.find(link => link.relevance === 'high');
            if (inlineLink) {
                const linkElement = document.createElement('div');
                linkElement.className = 'inline-contextual-link';
                linkElement.innerHTML = `
                    <div class="inline-link-content">
                        <span class="inline-link-prefix">💡 Related:</span>
                        <a href="../${inlineLink.url}" class="inline-link">
                            ${inlineLink.title}
                        </a>
                        <span class="inline-link-description">${inlineLink.description}</span>
                    </div>
                `;
                
                targetParagraph.insertAdjacentElement('afterend', linkElement);
            }
        }
    }
};

// Auto-initialize contextual links
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a blog page
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/blogs/')) {
        const blogId = currentPath.split('/').pop().replace('.html', '');
        
        // Render contextual links section
        if (document.getElementById('contextual-links-container')) {
            ContextualLinksComponent.renderContextualLinks('contextual-links-container', 'blogs', blogId);
        }
        
        // Render inline links within content
        const articleContent = document.querySelector('.article-content, .blog-content, .post-content');
        if (articleContent) {
            ContextualLinksComponent.renderInlineLinks(articleContent, 'blogs', blogId);
        }
    }
    
    // For service pages
    if (currentPath.includes('/services/')) {
        const serviceId = currentPath.split('/').pop().replace('.html', '');
        if (document.getElementById('contextual-links-container')) {
            ContextualLinksComponent.renderContextualLinks('contextual-links-container', 'services', serviceId);
        }
    }
    
    // For industry pages
    if (currentPath.includes('/industries/')) {
        const industryId = currentPath.split('/').pop().replace('.html', '');
        if (document.getElementById('contextual-links-container')) {
            ContextualLinksComponent.renderContextualLinks('contextual-links-container', 'industries', industryId);
        }
    }
});

// Export for global use
window.contextualLinks = contextualLinks;
window.ContextualLinksComponent = ContextualLinksComponent;