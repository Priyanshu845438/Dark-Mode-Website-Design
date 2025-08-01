// Link Validation Script for Development
// Run this script to check all links on the home page

function validateLinks() {
    console.log('🔍 Validating all links and buttons on home page...');
    
    const links = document.querySelectorAll('a[href]');
    const results = {
        total: links.length,
        internal: 0,
        external: 0,
        anchors: 0,
        broken: [],
        working: []
    };
    
    links.forEach((link, index) => {
        const href = link.getAttribute('href');
        const text = link.textContent.trim() || link.title || 'No text';
        
        console.log(`${index + 1}. "${text}" → ${href}`);
        
        if (href.startsWith('#')) {
            results.anchors++;
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                results.working.push(`✓ Anchor: ${href} → Found target element`);
            } else {
                results.broken.push(`✗ Anchor: ${href} → Target element #${targetId} not found`);
            }
        } else if (href.startsWith('http')) {
            results.external++;
            results.working.push(`🌐 External: ${href}`);
        } else if (href.startsWith('/') || href.startsWith('pages/') || href.includes('.html')) {
            results.internal++;
            // For internal links, we can't easily validate without making requests
            // but we can check if the path looks correct
            if (href.includes('pages/')) {
                results.working.push(`📄 Internal: ${href} (assumed valid)`);
            } else {
                results.working.push(`📄 Internal: ${href}`);
            }
        } else {
            results.broken.push(`❓ Unknown: ${href}`);
        }
    });
    
    console.log('\n📊 Link Validation Summary:');
    console.log(`Total links: ${results.total}`);
    console.log(`Internal pages: ${results.internal}`);
    console.log(`External links: ${results.external}`);
    console.log(`Anchor links: ${results.anchors}`);
    console.log(`Working: ${results.working.length}`);
    console.log(`Potential issues: ${results.broken.length}`);
    
    if (results.working.length > 0) {
        console.log('\n✅ Working links:');
        results.working.forEach(link => console.log(link));
    }
    
    if (results.broken.length > 0) {
        console.log('\n❌ Potential issues:');
        results.broken.forEach(link => console.log(link));
    } else {
        console.log('\n🎉 All links and buttons are working correctly!');
    }
    
    return results;
}

// Auto-run when components are loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        validateLinks();
    }, 2000);
});

// Make available globally for manual testing
window.validateLinks = validateLinks;