# Acadify Solution Website

## Overview
Acadify Solution is a professional technology services company website showcasing comprehensive technology services including web development, mobile app development, UI/UX design, cloud services, AI solutions, and data analytics. The project aims to present these services through an elegant black-themed interface with electric blue, neon green, and orange accent colors, demonstrating a modern, responsive multi-page application. The business vision is to provide a robust online presence that clearly communicates service offerings and establishes market leadership in technology solutions.

## User Preferences
Preferred communication style: Simple, everyday language.
Navigation preference: Responsive mega menu for desktop only, mobile sidebar navigation with Schedule Meeting button included.
Mobile navigation structure: Must exactly match desktop menu format with organized sections and working dropdowns.
Content overlap: Mobile navigation must not overlap with page content (resolved with z-index: 99999).
Navigation consistency: All pages must use consistent navigation system with correct path references to avoid 404 errors.
Cache-busting approach: Mobile navigation embedded directly in JavaScript to eliminate browser cache conflicts.
Technologies section: Dynamic responsive table layout preferred over grid layout, with row-wise technology organization and smaller icons (24px size).
Footer design: Ultra-modern professional footer with dark black background, advanced animations including floating particles, gradient waves, animated statistics, 3D hover effects, and comprehensive responsive design. Features animated stats counter, magnetic social links, quick contact CTA buttons, and back-to-top functionality. Complete unique CSS isolation system with 'acadify-footer-unique-container' namespace prevents style conflicts across all pages.
Component design preference: Blog component design should be used for testimonials component, with both components fetching 3 blog posts from the blog page data using the same design system.

## System Architecture

### Frontend Architecture
The website is a Multi-Page Application (MPA) built with vanilla HTML, CSS, and JavaScript, optimized for SEO and navigation. It utilizes a component-based structure with reusable elements like the navbar and footer, dynamically loaded. A mobile-first responsive design approach is implemented with breakpoints at 768px (mobile), 1024px (tablet), and desktop.

### Design System
The visual design is based on a pure black background theme (#000000) accented with electric blue (#00BFFF), neon green (#39FF14), and orange (#FFA500). Typography uses the Poppins font family. A consistent component system dictates spacing, shadows, borders, and animation patterns. UI/UX decisions prioritize a sleek, modern aesthetic with animated elements and glassmorphism effects to enhance user engagement.

### JavaScript Architecture
JavaScript is organized modularly with separate files for components and main functionality. It follows a class-based ES6 organization for logic and component management. Performance is optimized using Intersection Observers, throttled events, and optimized animations within an event-driven architecture. Key interactive features include dynamic form validation, search functionality in FAQs, and scroll-triggered animations.

### Navigation System
The navigation features a mega menu for Services and Industries, providing organized dropdown panels. It supports multi-page navigation with dynamic component loading. A mobile-responsive hamburger menu with smooth animations is included, along with active states for dynamic page highlighting. All navigation elements, including product dropdowns, are implemented using clickable anchor links.

### Page Structure
The website includes key pages such as Home, About, Services, Portfolio, Blog, Contact, Schedule Meeting, Careers, Privacy Policy, Terms & Conditions, and Sitemap. It also features dedicated sub-pages for 18 specific services (e.g., Web Development, Mobile App Development, UI/UX Design, Cloud Services, AI Solutions, Digital Marketing, Data Analytics, SEO, SMM, Email Marketing, Google Ads, WhatsApp Marketing, QA & Testing, Technology Consulting, Maintenance & Support, Logo Design, Brand Strategy, Custom Software), 14 industry-specific pages (e.g., Healthcare, Education, Finance, Retail, Wellness & Beauty, E-commerce, Real Estate, FinTech, Travel, IT, NGOs, Media, Logistics), and 6 product pages (Acadify ERP, CRM, Inventory, POS, LMS, Task). Each service, industry, and product page adheres to a consistent, professional section-based template.

### Performance Considerations
Performance is addressed through dynamic HTML component injection (navbar/footer), modular CSS with design system variables, optimized Poppins web font loading with display swap, and hardware-accelerated transforms and Intersection Observer for animations.

### Technical Implementations
The contact form uses a PHP backend with PHPMailer for email sending, ensuring secure and reliable communication. Frontend validation is handled via JavaScript. The blog system features dynamic content management from `blog-data.js`, category filtering, and social sharing. Custom CSS classes (`acadify-`) are used for strong isolation in complex components like the footer.

**Recent Changes (Aug 4, 2025):** 
- Successfully migrated project from Replit Agent to Replit environment
- Configured SMTP email functionality with environment variables for secure email delivery
- Tested both contact and meeting forms - both working perfectly with email notifications
- PHP 8.2 server running on port 5000 with proper security configurations
- All 18 service pages, 14 industry pages, and 6 product pages fully functional
- Mobile-responsive design and navigation system working correctly
- Contact form submissions saved to backup files and emails sent to admin
- Meeting scheduler fully operational with email confirmations
- Fixed footer overlap issues by adjusting z-index and positioning
- Moved back-to-top button to fixed position in bottom right corner of screen
- Enhanced mobile responsiveness for back-to-top button positioning
- Created comprehensive deployment documentation for Hostinger hosting
- Updated README with deployment-focused content and business information
- Removed development files (contact-handler-dev.php, contact-test.html, link-validation.js)
- Unified blog and testimonials components with authentic client success stories
- Prepared project for production deployment with optimized file structure
- Added proper spacing between main content and footer to prevent overlapping
- Configured SMTP email functionality with environment variables for 100% working email delivery
- Fixed contact and meeting form handlers with proper error handling and debugging
- Updated form submission paths for nested pages directory structure
- Added toast notifications for enhanced user experience
- Removed Node.js package files (package.json, package-lock.json) as project uses pure PHP backend
- Successfully tested both contact and meeting forms with real email sending functionality
- **MAJOR UPDATE**: Enhanced all structured industry pages (7 pages) with standardized content:
  - Added 2 additional "Why Choose Acadify" cards to each page (now 8 total per page)
  - Added 2 additional "Successful Projects" cards to each page (now 6 total per page)
  - All pages now follow healthcare.html reference template structure
  - Updated: healthcare.html, education.html, finance.html, retail.html, wellness-beauty.html, fintech.html, real-estate.html
  - Enhanced content quality with industry-specific, detailed project examples and value propositions

## External Dependencies

### CDN Resources
- **Font Awesome 6.4.0**: Used for various UI icons.
- **Google Fonts**: Specifically, the Poppins font family, with preconnect for improved loading.

### Browser APIs
- **Intersection Observer API**: Utilized for scroll-triggered animations and lazy loading effects.
- **RequestAnimationFrame API**: Employed for smooth and performant animations.
- **CSS Custom Properties**: Used for a comprehensive design token system.

### Backend/Third-party Integrations
- **PHP Mailer**: Integrated for server-side email functionality within the contact form system.
- **Hostinger SMTP**: Configured for email sending.