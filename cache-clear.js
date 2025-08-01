// Cache clearing utility
const timestamp = new Date().getTime();

// Update all CSS links with cache-busting parameter
document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.includes('?')) {
        link.setAttribute('href', href + '?v=' + timestamp);
    }
});

// Update all script sources with cache-busting parameter
document.querySelectorAll('script[src]').forEach(script => {
    const src = script.getAttribute('src');
    if (src && !src.includes('?')) {
        script.setAttribute('src', src + '?v=' + timestamp);
    }
});

console.log('Cache cleared with timestamp:', timestamp);