<?php
/**
 * Security Headers Implementation for Acadify Solution
 * Sets comprehensive security headers for enhanced protection
 */

class SecurityHeaders {
    
    public static function setHeaders() {
        // Content Security Policy
        $cspPolicy = "default-src 'self'; " .
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://fonts.googleapis.com https://www.google.com https://www.gstatic.com https://apis.google.com; " .
                    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; " .
                    "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; " .
                    "img-src 'self' data: https: blob:; " .
                    "media-src 'self' https:; " .
                    "object-src 'none'; " .
                    "frame-src 'self' https://www.google.com https://www.youtube.com; " .
                    "connect-src 'self' https: wss:; " .
                    "worker-src 'self'; " .
                    "manifest-src 'self'; " .
                    "base-uri 'self'; " .
                    "form-action 'self'; " .
                    "upgrade-insecure-requests; " .
                    "block-all-mixed-content";
        
        header("Content-Security-Policy: " . $cspPolicy);
        
        // CSP Report-Only for monitoring
        $cspReportOnly = "default-src 'self'; " .
                        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; " .
                        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " .
                        "report-uri /csp-report";
        
        header("Content-Security-Policy-Report-Only: " . $cspReportOnly);
        
        // X-Content-Type-Options
        header("X-Content-Type-Options: nosniff");
        
        // X-Frame-Options
        header("X-Frame-Options: SAMEORIGIN");
        
        // X-XSS-Protection
        header("X-XSS-Protection: 1; mode=block");
        
        // Referrer Policy
        header("Referrer-Policy: strict-origin-when-cross-origin");
        
        // Permissions Policy (Feature Policy)
        $permissionsPolicy = "geolocation=(), microphone=(), camera=(), payment=(), " .
                           "usb=(), magnetometer=(), gyroscope=(), speaker=(self), " .
                           "vibrate=(self), fullscreen=(self)";
        
        header("Permissions-Policy: " . $permissionsPolicy);
        
        // Additional security headers
        header("X-Permitted-Cross-Domain-Policies: none");
        header("Cross-Origin-Embedder-Policy: require-corp");
        header("Cross-Origin-Opener-Policy: same-origin");
        header("Cross-Origin-Resource-Policy: cross-origin");
        
        // Remove server information
        header_remove("Server");
        header_remove("X-Powered-By");
        
        // Cache control for security
        if (strpos($_SERVER['REQUEST_URI'], 'security.txt') !== false) {
            header("Cache-Control: public, max-age=86400");
        }
        
        // HSTS (only if HTTPS is available)
        if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
            header("Strict-Transport-Security: max-age=31536000; includeSubDomains; preload");
        }
    }
    
    public static function validateRequest() {
        // Validate request method
        $allowedMethods = ['GET', 'POST', 'HEAD', 'OPTIONS'];
        if (!in_array($_SERVER['REQUEST_METHOD'], $allowedMethods)) {
            http_response_code(405);
            header('Allow: ' . implode(', ', $allowedMethods));
            exit('Method Not Allowed');
        }
        
        // Basic rate limiting (simple implementation)
        self::simpleRateLimit();
        
        // Validate User-Agent (basic bot protection)
        if (empty($_SERVER['HTTP_USER_AGENT']) || 
            strlen($_SERVER['HTTP_USER_AGENT']) < 10) {
            // Log suspicious request
            error_log("Suspicious request from " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
        }
    }
    
    private static function simpleRateLimit() {
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $currentTime = time();
        $windowSize = 60; // 1 minute
        $maxRequests = 100; // requests per minute
        
        // Simple file-based rate limiting
        $rateFile = sys_get_temp_dir() . '/rate_limit_' . md5($ip);
        
        if (file_exists($rateFile)) {
            $data = json_decode(file_get_contents($rateFile), true);
            
            // Clean old entries
            $data['requests'] = array_filter($data['requests'], function($timestamp) use ($currentTime, $windowSize) {
                return ($currentTime - $timestamp) < $windowSize;
            });
            
            // Check rate limit
            if (count($data['requests']) >= $maxRequests) {
                http_response_code(429);
                header('Retry-After: 60');
                exit('Too Many Requests');
            }
            
            $data['requests'][] = $currentTime;
        } else {
            $data = ['requests' => [$currentTime]];
        }
        
        file_put_contents($rateFile, json_encode($data), LOCK_EX);
    }
    
    public static function secureSession() {
        // Secure session configuration
        ini_set('session.cookie_httponly', 1);
        ini_set('session.cookie_secure', isset($_SERVER['HTTPS']) ? 1 : 0);
        ini_set('session.cookie_samesite', 'Strict');
        ini_set('session.use_strict_mode', 1);
        ini_set('session.entropy_length', 32);
        ini_set('session.hash_function', 'sha256');
    }
}

// Only auto-initialize if this file is being included, not executed directly
if (basename($_SERVER['SCRIPT_NAME']) !== 'security-headers.php') {
    SecurityHeaders::setHeaders();
    SecurityHeaders::validateRequest();
    SecurityHeaders::secureSession();
}
?>