# Acadify Solution Website

A professional, modern website for Acadify Solution built with HTML, CSS, and JavaScript featuring clean architecture and component-based design.

## 📁 File Structure

```
/
├── index.html                      # Main homepage
├── README.md                       # Project documentation
├── replit.md                       # Technical documentation
│
├── pages/                          # All website pages
│   ├── index.html                  # Homepage
│   ├── about.html                  # About page
│   ├── services.html               # Services page
│   ├── contact.html                # Contact page
│   ├── portfolio.html              # Portfolio showcase
│   ├── blog.html                   # Blog listing
│   ├── careers.html                # Careers page
│   ├── schedule-meeting.html       # Meeting scheduler
│   ├── privacy-policy.html         # Privacy policy
│   ├── terms-conditions.html       # Terms & conditions
│   └── sitemap.html                # Site navigation
│
└── src/                            # Source files
    ├── assets/                     # Images, logos, SVGs
    │   ├── logo.svg
    │   └── hero-bg.svg
    │
    ├── components/                 # Reusable components
    │   ├── header/                 # Header component
    │   │   ├── header.html         # Header HTML structure
    │   │   ├── header.css          # Header styles
    │   │   └── header.js           # Header functionality
    │   │
    │   └── footer/                 # Footer component
    │       ├── footer.html         # Footer HTML structure
    │       ├── footer.css          # Footer styles
    │       └── footer.js           # Footer functionality
    │
    ├── styles/                     # CSS stylesheets
    │   ├── global.css              # Global styles & variables
    │   ├── utilities.css           # Utility classes
    │   └── pages/                  # Page-specific styles
    │       └── home.css            # Homepage styles
    │
    └── scripts/                    # JavaScript files
        └── main.js                 # Main application logic
```

## 🚀 Features

### Header
- **Sticky Navigation**: Fixed header with glassmorphism effect
- **Mega Dropdown Menus**: Multi-column dropdowns for Services and Products
- **Glowing CTA Button**: Schedule Meeting button with hover animations
- **Mobile Responsive**: Hamburger menu with slide-in animation
- **SVG Icons**: Custom SVG icons for modern look

### Footer
- **4-Column Layout**: Company, Services, Resources, Contact & Social
- **Newsletter Signup**: Email subscription with glowing focus effect
- **Social Media Icons**: Animated SVG social media links
- **Gradient Underlines**: Smooth hover effects on links
- **Mobile Responsive**: Stacks vertically on mobile devices

### Design System
- **Colors**: Black background (#000), white/gray text, electric blue (#00BFFF), neon green (#39FF14)
- **Typography**: Poppins/Inter fonts with proper hierarchy
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design with breakpoints

## 🛠️ Development

### Local Development
1. Start the Python HTTP server: `python -m http.server 5000`
2. Open browser to `http://localhost:5000`

### File Organization
- **Components**: Self-contained HTML, CSS, JS for each component
- **Styles**: Global design system with utility classes
- **Assets**: Optimized SVG graphics and images
- **Scripts**: Modular JavaScript for functionality

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement approach

## 📝 Component Structure

Each component follows a consistent pattern:
- `component.html` - HTML structure
- `component.css` - Component-specific styles
- `component.js` - Component functionality and interactions

This modular approach makes the codebase:
- Easy to maintain and update
- Reusable across different pages
- Clear separation of concerns
- Simple to understand and navigate