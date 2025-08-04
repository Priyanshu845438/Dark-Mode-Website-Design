# Overview

Acadify Solution is a professional technology services company website built as a Multi-Page Application (MPA) showcasing comprehensive digital solutions. The website serves as a business platform offering web development, mobile applications, AI solutions, cloud services, and digital marketing services across 14 specialized industries. Built with vanilla HTML, CSS, and JavaScript, the project emphasizes performance, SEO optimization, and security as core architectural principles.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Technology Stack**: Vanilla HTML5, CSS3, and ES6+ JavaScript with no frontend frameworks
- **Component System**: Modular component-based architecture with isolated CSS classes and reusable UI components
- **Design System**: Pure black (#000000) background with electric blue (#00BFFF), neon green (#39FF14), and orange (#FFA500) accent colors
- **Typography**: Poppins font family throughout with consistent sizing scale
- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 1024px
- **Performance Optimization**: Critical CSS preloading, lazy loading for images, and hardware-accelerated transforms

## Backend Architecture
- **Server Technology**: PHP 8.2+ for form processing and email functionality
- **Email System**: PHPMailer integration with SMTP support for professional email handling
- **Contact System**: PHP-powered contact forms with JSON-based submission storage
- **Meeting Scheduler**: Automated booking system for client consultations
- **Security Implementation**: Content Security Policy headers, input validation, and vulnerability disclosure system

## Content Management
- **Static Site Generation**: No CMS - direct HTML file management for optimal performance
- **Blog System**: Static HTML blog pages with manual content management
- **SEO Structure**: Comprehensive meta optimization, structured data (JSON-LD), and XML sitemaps
- **Multi-page Structure**: 40+ pages including services (18), industries (14), and products (6)

## Security Architecture
- **Content Security Policy**: Comprehensive CSP headers with violation reporting
- **Input Validation**: Server-side validation and sanitization for all forms
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, and Referrer-Policy implementation
- **Vulnerability Disclosure**: RFC 9116 compliant security.txt file and response procedures

## Performance Architecture
- **Resource Optimization**: Preload/prefetch strategies for critical resources
- **Font Loading**: Google Fonts with display:swap for optimal loading
- **Image Optimization**: SVG-first approach with optimized raster fallbacks
- **Core Web Vitals**: Optimized for LCP, FID, and CLS metrics

# External Dependencies

## Third-party Services
- **Google Fonts**: Poppins font family for typography consistency
- **Font Awesome 6.4.0**: Icon library for UI elements and visual enhancement
- **CDN Integration**: Cloudflare for external resource delivery optimization

## Development Tools
- **PHPMailer**: Email functionality library for contact forms and notifications
- **JSON Storage**: Local JSON files for contact form submissions and data persistence

## SEO and Analytics
- **Structured Data**: Schema.org implementation for rich snippets and search enhancement
- **Social Media Integration**: Open Graph and Twitter Cards for social sharing optimization
- **Sitemap Generation**: XML sitemaps for search engine crawling and indexing

## Security Dependencies
- **Content Security Policy**: Browser-native security framework implementation
- **Security Headers**: HTTP security headers for enhanced protection
- **Input Sanitization**: PHP native functions for data validation and cleaning

## Email Templates
- **Professional Templates**: Custom HTML email templates for admin notifications and user confirmations
- **SMTP Configuration**: External SMTP service integration capability for production environments