/**
 * CSP Monitoring and Security Enhancement Script for Acadify Solution
 * Monitors Content Security Policy violations and provides security utilities
 */

class CSPMonitor {
    constructor() {
        this.violations = [];
        this.reportEndpoint = '/csp-report';
        this.init();
    }

    init() {
        // Listen for CSP violations
        this.setupViolationListener();
        
        // Monitor for inline scripts and styles
        this.monitorInlineContent();
        
        // Set up security headers validation
        this.validateSecurityHeaders();
        
        // Initialize security utils
        this.initSecurityUtils();
        
        console.log('✓ CSP Monitor initialized');
    }

    setupViolationListener() {
        // Listen for security policy violations
        document.addEventListener('securitypolicyviolation', (event) => {
            const violation = {
                timestamp: new Date().toISOString(),
                documentURI: event.documentURI,
                referrer: event.referrer,
                blockedURI: event.blockedURI,
                violatedDirective: event.violatedDirective,
                effectiveDirective: event.effectiveDirective,
                originalPolicy: event.originalPolicy,
                disposition: event.disposition,
                statusCode: event.statusCode,
                lineNumber: event.lineNumber,
                columnNumber: event.columnNumber,
                sourceFile: event.sourceFile,
            };
            
            this.logViolation(violation);
        });
    }

    logViolation(violation) {
        this.violations.push(violation);
        
        // Log to console in development
        if (window.location.hostname === 'localhost' || window.location.hostname.includes('replit')) {
            console.warn('CSP Violation:', violation);
        }
        
        // Send to server for production logging
        this.reportViolation(violation);
    }

    async reportViolation(violation) {
        try {
            await fetch(this.reportEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'csp-report': {
                        'document-uri': violation.documentURI,
                        'referrer': violation.referrer,
                        'blocked-uri': violation.blockedURI,
                        'violated-directive': violation.violatedDirective,
                        'effective-directive': violation.effectiveDirective,
                        'original-policy': violation.originalPolicy,
                        'disposition': violation.disposition,
                        'status-code': violation.statusCode,
                        'line-number': violation.lineNumber,
                        'column-number': violation.columnNumber,
                        'source-file': violation.sourceFile
                    }
                })
            });
        } catch (error) {
            console.error('Failed to report CSP violation:', error);
        }
    }

    monitorInlineContent() {
        // Check for inline scripts and styles that might violate CSP
        const inlineScripts = document.querySelectorAll('script:not([src])');
        const inlineStyles = document.querySelectorAll('style');
        
        if (inlineScripts.length > 0) {
            console.warn(`Found ${inlineScripts.length} inline scripts. Consider moving to external files or using nonces.`);
        }
        
        if (inlineStyles.length > 0) {
            console.warn(`Found ${inlineStyles.length} inline styles. Consider moving to external stylesheets.`);
        }
    }

    validateSecurityHeaders() {
        // Check if security headers are properly set
        fetch(window.location.href, { method: 'HEAD' })
            .then(response => {
                const headers = response.headers;
                const securityHeaders = {
                    'content-security-policy': headers.get('content-security-policy'),
                    'x-content-type-options': headers.get('x-content-type-options'),
                    'x-frame-options': headers.get('x-frame-options'),
                    'x-xss-protection': headers.get('x-xss-protection'),
                    'referrer-policy': headers.get('referrer-policy'),
                    'permissions-policy': headers.get('permissions-policy')
                };
                
                console.log('Security Headers Status:', securityHeaders);
                
                // Warn about missing headers
                Object.entries(securityHeaders).forEach(([header, value]) => {
                    if (!value) {
                        console.warn(`Missing security header: ${header}`);
                    }
                });
            })
            .catch(error => {
                console.error('Failed to validate security headers:', error);
            });
    }

    initSecurityUtils() {
        // Sanitize HTML content
        window.AcadifySecurityUtils = {
            sanitizeHTML: (html) => {
                const div = document.createElement('div');
                div.textContent = html;
                return div.innerHTML;
            },
            
            // Validate URLs
            isSecureURL: (url) => {
                try {
                    const parsedURL = new URL(url);
                    return parsedURL.protocol === 'https:' || parsedURL.protocol === 'data:';
                } catch {
                    return false;
                }
            },
            
            // CSP-safe dynamic script loading
            loadScript: (src, nonce = null) => {
                return new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = src;
                    if (nonce) script.nonce = nonce;
                    
                    script.onload = resolve;
                    script.onerror = reject;
                    
                    document.head.appendChild(script);
                });
            },
            
            // CSP-safe dynamic style loading
            loadStyle: (href, nonce = null) => {
                return new Promise((resolve, reject) => {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = href;
                    if (nonce) link.nonce = nonce;
                    
                    link.onload = resolve;
                    link.onerror = reject;
                    
                    document.head.appendChild(link);
                });
            },
            
            // Get current CSP policy
            getCSPPolicy: () => {
                const metaCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
                return metaCSP ? metaCSP.content : null;
            },
            
            // Generate nonce for inline scripts/styles
            generateNonce: () => {
                const array = new Uint8Array(16);
                crypto.getRandomValues(array);
                return btoa(String.fromCharCode.apply(null, array)).replace(/[+/=]/g, '');
            }
        };
    }

    // Get violation report
    getViolations() {
        return this.violations;
    }

    // Clear violation log
    clearViolations() {
        this.violations = [];
    }

    // Export violations for analysis
    exportViolations() {
        const dataStr = JSON.stringify(this.violations, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `csp-violations-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    }
}

// Initialize CSP Monitor when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.CSPMonitor = new CSPMonitor();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CSPMonitor;
}