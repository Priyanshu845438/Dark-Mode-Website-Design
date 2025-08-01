# Acadify Solution Website

## Overview

Acadify Solution is a professional technology services company website built as a modern, responsive multi-page application. The project showcases comprehensive technology services including web development, mobile app development, UI/UX design, cloud services, AI solutions, and data analytics through an elegant black-themed interface with electric blue, neon green, and orange accent colors.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Multi-Page Application (MPA)**: Built with vanilla HTML, CSS, and JavaScript for optimal SEO and navigation
- **Component-Based Structure**: Modular design with reusable navbar and footer components loaded dynamically
- **CSS Architecture**: Comprehensive design system with global styles, utilities, and page-specific styles
- **Responsive Design**: Mobile-first approach with breakpoints at 768px (mobile), 1024px (tablet), and desktop

### Design System
- **Black Background Theme**: Pure black (#000000) background with modern styling
- **Color Palette**: Electric blue (#00BFFF), neon green (#39FF14), and orange accent (#FFA500)
- **Typography**: Poppins font family as primary typeface with system fallbacks
- **Component System**: Consistent spacing, shadows, borders, and animation patterns

### JavaScript Architecture
- **Modular Component System**: Separate JS files for navbar, footer, slider, and main functionality
- **Class-Based Organization**: ES6 classes for component management and application logic
- **Performance Optimization**: Intersection observers, throttled events, and optimized animations
- **Event-Driven Architecture**: Component-based event handling with proper cleanup

### File Structure (Updated 2025-08-01)
```
/acadify-solution/
├── index.html               # Landing page
├── about.html               # About page  
├── services.html            # Services page
├── contact.html             # Contact page
├── schedule-meeting.html    # Meeting scheduler page
├── /assets/                 # Images, logos, SVGs
│   ├── logo.svg
│   └── hero-bg.svg
├── /components/             # HTML/CSS/JS components
│   ├── navbar.html          # Navbar component with mega menu
│   ├── navbar.js            # Navbar functionality & interactions
│   ├── navbar.module.css    # Navbar-specific styles
│   ├── footer.html          # Footer component with links
│   ├── footer.js            # Footer functionality
│   └── footer.module.css    # Footer-specific styles  
├── /styles/
│   ├── global.css           # Design system & global styles
│   ├── utilities.css        # Helper classes 
│   └── pages.css           # Page-specific styles
└── /scripts/
    └── main.js             # Core application logic
```

### Navigation System
- **Mega Menu**: Services and Industries with organized dropdown panels
- **Multi-page Structure**: Proper page navigation with dynamic component loading
- **Mobile Responsive**: Hamburger menu with smooth animations
- **Active States**: Dynamic highlighting based on current page

### Page Structure
- **Home**: Hero section with company overview and service highlights
- **About**: Company story, team members, and statistics counter
- **Services**: Comprehensive service grid with 8 core offerings
- **Contact**: Contact form with FAQ section and business information
- **Schedule Meeting**: Meeting booking form with consultation details

### Performance Considerations
- **Component Loading**: Dynamic HTML component injection for navbar/footer
- **CSS Architecture**: Modular stylesheets with design system variables
- **Font Loading**: Poppins web font with display swap optimization
- **Animation Optimization**: Hardware-accelerated transforms and intersection observers

## External Dependencies

### CDN Resources
- **Font Awesome 6.4.0**: Icon library for UI elements and visual enhancements
- **Google Fonts**: Poppins font family with display swap optimization
- **Google Fonts Preconnect**: DNS prefetching for improved font loading performance

### Planned Integrations
- **Contact Form Processing**: Backend service integration for form submissions and lead management
- **Meeting Scheduler**: Calendar service integration for appointment booking functionality
- **Analytics**: Web analytics tracking for user behavior and conversion optimization

### Browser APIs
- **Intersection Observer API**: For scroll-triggered animations and lazy loading
- **RequestAnimationFrame API**: For smooth, performant animations
- **CSS Custom Properties**: For comprehensive design token system