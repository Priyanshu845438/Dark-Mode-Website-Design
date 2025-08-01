# Acadify Solution Website

## Overview
Acadify Solution is a professional technology services company website showcasing comprehensive technology services including web development, mobile app development, UI/UX design, cloud services, AI solutions, and data analytics. The project aims to present these services through an elegant black-themed interface with electric blue, neon green, and orange accent colors, demonstrating a modern, responsive multi-page application.

**Migration Status**: Successfully migrated from Replit Agent to Replit environment on August 1, 2025. Project runs cleanly with http-server on port 5000 with enhanced hero section positioning.

**Recent Updates**: Technologies section expanded with 40+ technologies across 6 categories (Frontend, Backend, Database, Cloud & DevOps, Mobile Development, AI & Machine Learning) using professional compact grid layout.

## User Preferences
Preferred communication style: Simple, everyday language.
Navigation preference: Responsive mega menu for desktop only, mobile sidebar navigation with Schedule Meeting button included.
Mobile navigation structure: Must exactly match desktop menu format with organized sections and working dropdowns.
Content overlap: Mobile navigation must not overlap with page content (resolved with z-index: 99999).
Navigation consistency: All pages must use consistent navigation system with correct path references to avoid 404 errors.
Cache-busting approach: Mobile navigation embedded directly in JavaScript to eliminate browser cache conflicts.
Technologies section: Professional, compact layout with comprehensive technology coverage across all development areas.

## System Architecture

### Frontend Architecture
The website is a Multi-Page Application (MPA) built with vanilla HTML, CSS, and JavaScript, optimized for SEO and navigation. It utilizes a component-based structure with reusable elements like the navbar and footer, dynamically loaded. A mobile-first responsive design approach is implemented with breakpoints at 768px (mobile), 1024px (tablet), and desktop.

### Design System
The visual design is based on a pure black background theme (#000000) accented with electric blue (#00BFFF), neon green (#39FF14), and orange (#FFA500). Typography uses the Poppins font family. A consistent component system dictates spacing, shadows, borders, and animation patterns.

### JavaScript Architecture
JavaScript is organized modularly with separate files for components and main functionality. It follows a class-based ES6 organization for logic and component management. Performance is optimized using Intersection Observers, throttled events, and optimized animations within an event-driven architecture.

### Navigation System
The navigation features a mega menu for Services and Industries, providing organized dropdown panels. It supports multi-page navigation with dynamic component loading. A mobile-responsive hamburger menu with smooth animations is included, along with active states for dynamic page highlighting.

### Page Structure
The website includes key pages such as Home, About, Services, Portfolio, Blog, Contact, Schedule Meeting, Careers, Privacy Policy, Terms & Conditions, and Sitemap. It also features dedicated sub-pages for 18 specific services (e.g., Web Development, Mobile App Development, UI/UX Design, Cloud Services, AI Solutions, Digital Marketing, Data Analytics, SEO, SMM, Email Marketing, Google Ads, WhatsApp Marketing, QA & Testing, Technology Consulting, Maintenance & Support, Logo Design, Brand Strategy, Custom Software) and 14 industry-specific pages (e.g., Healthcare, Education, Finance, Retail, Wellness & Beauty, E-commerce, Real Estate, FinTech, Travel, IT, NGOs, Media, Logistics). Additionally, there are 6 product pages (Acadify ERP, CRM, Inventory, POS, LMS, Task).

### Performance Considerations
Performance is addressed through dynamic HTML component injection (navbar/footer), modular CSS with design system variables, optimized Poppins web font loading with display swap, and hardware-accelerated transforms and Intersection Observer for animations.

## External Dependencies

### CDN Resources
- **Font Awesome 6.4.0**: Used for various UI icons.
- **Google Fonts**: Specifically, the Poppins font family, with preconnect for improved loading.

### Browser APIs
- **Intersection Observer API**: Utilized for scroll-triggered animations and lazy loading effects.
- **RequestAnimationFrame API**: Employed for smooth and performant animations.
- **CSS Custom Properties**: Used for a comprehensive design token system.