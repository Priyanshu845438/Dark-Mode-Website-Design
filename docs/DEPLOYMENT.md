# Deployment Guide - Hostinger

This guide covers the complete deployment process for Acadify Solution website on Hostinger hosting.

## Pre-Deployment Checklist

### 1. Files to Upload
Upload all files and folders EXCEPT:
- `contact-handler-dev.php` (development only)
- `contact-handler-simple.php` (testing only)
- `contact-test.html` (testing only)
- `link-validation.js` (development only)
- `.replit` file
- `docs/` folder (unless you want documentation on server)

### 2. Required Files Structure
```
public_html/
├── assets/
│   ├── icons/
│   └── logos/
├── email-templates/
├── pages/
├── PHPMailer/
├── src/
│   ├── components/
│   ├── scripts/
│   └── styles/
├── submissions/
├── index.html
├── contact-handler.php
├── meeting-handler.php
└── all_testimonials.txt
```

## Step 1: Domain and Hosting Setup

### 1.1 Purchase Hostinger Plan
- Recommended: Premium or Business plan for PHP support
- Ensure PHP 7.4+ is available
- SSL certificate included

### 1.2 Domain Configuration
- Point your domain to Hostinger nameservers
- Wait for DNS propagation (24-48 hours)

## Step 2: File Upload

### 2.1 Using File Manager (Recommended)
1. Login to Hostinger hPanel
2. Go to Files → File Manager
3. Navigate to `public_html` folder
4. Upload all project files maintaining folder structure
5. Extract if uploaded as ZIP

### 2.2 Using FTP/SFTP
```
Host: your-domain.com
Username: your-hostinger-username
Password: your-hostinger-password
Port: 21 (FTP) or 22 (SFTP)
```

## Step 3: PHP Configuration

### 3.1 Verify PHP Version
- Go to hPanel → Advanced → PHP Configuration
- Ensure PHP 7.4 or higher is selected
- Enable required extensions:
  - OpenSSL
  - cURL
  - mbstring

### 3.2 Email Configuration
Update `contact-handler.php` with your email settings:

```php
// SMTP Configuration
$mail->isSMTP();
$mail->Host = 'smtp.hostinger.com';
$mail->SMTPAuth = true;
$mail->Username = 'your-email@yourdomain.com';
$mail->Password = 'your-email-password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
```

## Step 4: Email Setup

### 4.1 Create Email Account
1. Go to hPanel → Email → Email Accounts
2. Create: `contact@yourdomain.com`
3. Set a strong password
4. Note the SMTP settings

### 4.2 Test Email Functionality
1. Visit: `https://yourdomain.com`
2. Use the contact form
3. Check email delivery
4. Verify email templates are working

## Step 5: SSL and Security

### 5.1 Enable SSL
1. Go to hPanel → Security → SSL/TLS
2. Enable "Force HTTPS Redirect"
3. Verify SSL certificate is active

### 5.2 File Permissions
Set proper permissions via File Manager:
- Folders: 755
- PHP files: 644
- submissions/ folder: 755 (writable)

## Step 6: Performance Optimization

### 6.1 Enable Caching
Add to `.htaccess` file in public_html:
```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 6.2 Image Optimization
- Ensure all images are optimized for web
- Use WebP format where possible
- Compress PNG/JPG files

## Step 7: Testing and Verification

### 7.1 Functionality Tests
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Contact form submissions work
- [ ] Meeting scheduling works
- [ ] All service pages accessible
- [ ] Mobile responsiveness
- [ ] Loading speed (under 3 seconds)

### 7.2 SEO Verification
- [ ] Meta tags present
- [ ] Structured data
- [ ] Sitemap accessible
- [ ] Robots.txt configured

## Step 8: Monitoring and Maintenance

### 8.1 Setup Monitoring
- Use Hostinger's website monitoring
- Monitor form submissions in submissions/ folder
- Check error logs regularly

### 8.2 Regular Maintenance
- Update contact form protection if needed
- Monitor email deliverability
- Check SSL certificate renewal
- Backup website files monthly

## Troubleshooting

### Common Issues

**Contact Form Not Working:**
- Check SMTP credentials
- Verify email account exists
- Check PHP error logs
- Ensure submissions/ folder is writable

**Pages Not Loading:**
- Check file paths are correct
- Verify .htaccess rules
- Check PHP version compatibility

**Slow Loading:**
- Enable caching
- Optimize images
- Use Hostinger's CDN

**SSL Issues:**
- Force HTTPS redirect
- Check mixed content warnings
- Update internal links to HTTPS

## Support Contacts

- **Hostinger Support:** https://support.hostinger.com
- **PHP Documentation:** https://www.php.net/docs.php
- **Acadify Solution:** contact@acadifysolution.com

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Contact form sends emails
- [ ] Meeting form works
- [ ] SSL certificate active
- [ ] Mobile version working
- [ ] Loading speed optimized
- [ ] SEO basics implemented
- [ ] Analytics tracking added (if needed)
- [ ] Error monitoring active
- [ ] Backup schedule set

---

**Last Updated:** August 4, 2025
**Version:** 1.0