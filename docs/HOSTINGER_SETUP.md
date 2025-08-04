# Hostinger Hosting Setup Guide

Complete guide for setting up Acadify Solution on Hostinger hosting platform.

## Account Setup

### 1. Choose Hosting Plan
**Recommended Plans:**
- **Premium Shared Hosting** (Best for small-medium websites)
  - 100 GB SSD storage
  - Unlimited bandwidth
  - Free SSL certificate
  - Free domain registration
  - PHP 8.1 support

- **Business Shared Hosting** (Best for growing businesses)
  - 200 GB SSD storage
  - Unlimited bandwidth
  - Daily backups
  - Free CDN
  - Advanced caching

### 2. Domain Configuration
1. **New Domain:** Register during hosting purchase
2. **Existing Domain:** Update nameservers to:
   - ns1.dns-parking.com
   - ns2.dns-parking.com

## Initial Setup

### 1. Access hPanel
1. Login to your Hostinger account
2. Navigate to hPanel dashboard
3. Select your hosting account

### 2. File Upload Methods

#### Method A: File Manager (Recommended)
1. Go to **Files → File Manager**
2. Navigate to `public_html` folder
3. Upload project files:
   ```
   - Select all project files except docs/
   - Maintain folder structure
   - Extract ZIP if uploaded as archive
   ```

#### Method B: FTP Upload
```bash
FTP Settings:
Host: ftp.yourdomain.com
Username: [Your hosting username]
Password: [Your hosting password]
Port: 21
```

### 3. PHP Configuration
1. Go to **Advanced → PHP Configuration**
2. Select **PHP 8.1** or latest stable version
3. Enable extensions:
   - ✅ OpenSSL
   - ✅ cURL
   - ✅ mbstring
   - ✅ fileinfo
   - ✅ json

## Email Configuration

### 1. Create Professional Email
1. Go to **Email → Email Accounts**
2. Create account: `contact@yourdomain.com`
3. Set strong password
4. Note SMTP settings:
   ```
   SMTP Server: smtp.hostinger.com
   Port: 587 (STARTTLS) or 465 (SSL)
   Authentication: Required
   ```

### 2. Update Contact Handler
Edit `contact-handler.php`:
```php
$mail->Host = 'smtp.hostinger.com';
$mail->Username = 'contact@yourdomain.com';
$mail->Password = 'your_email_password';
$mail->Port = 587;
```

## Security Setup

### 1. SSL Certificate
1. Go to **Security → SSL/TLS**
2. **Force HTTPS Redirect**: Enable
3. Verify certificate status: Active

### 2. File Permissions
Set via File Manager:
```
Folders: 755 permissions
PHP files: 644 permissions
submissions/ folder: 755 (writable)
```

### 3. Security Headers (.htaccess)
Create/update `.htaccess` in public_html:
```apache
# Security Headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

# Disable server signature
ServerTokens Prod
ServerSignature Off

# Prevent access to sensitive files
<Files ~ "^\.(htaccess|htpasswd)$">
    deny from all
</Files>
```

## Performance Optimization

### 1. Enable Caching
Add to `.htaccess`:
```apache
# Browser Caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType application/pdf "access plus 1 month"
</IfModule>

# Compression
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
```

### 2. Image Optimization
- Compress images before upload
- Use WebP format for modern browsers
- Optimize PNG/JPG files (TinyPNG recommended)

## Database Setup (If Needed)

### 1. Create MySQL Database
1. Go to **Databases → MySQL Databases**
2. Create new database
3. Create database user
4. Assign user to database

### 2. Database Connection
```php
$servername = "localhost";
$username = "your_db_user";
$password = "your_db_password";
$dbname = "your_database_name";
```

## Testing Checklist

### 1. Functionality Tests
- [ ] Homepage loads (https://yourdomain.com)
- [ ] All navigation links work
- [ ] Contact form sends emails
- [ ] Meeting scheduler works
- [ ] All service pages load
- [ ] Mobile responsive design
- [ ] Page load speed < 3 seconds

### 2. Email Testing
- [ ] Contact form submissions received
- [ ] Auto-reply emails work
- [ ] Meeting notifications sent
- [ ] Email formatting correct

### 3. Security Verification
- [ ] SSL certificate active (green padlock)
- [ ] HTTPS redirect working
- [ ] No mixed content warnings
- [ ] Security headers present

## Monitoring and Maintenance

### 1. Setup Monitoring
1. **Website Uptime:** Use Hostinger's monitoring tools
2. **Form Submissions:** Check submissions/ folder regularly
3. **Error Logs:** Monitor via hPanel → Advanced → Error Logs

### 2. Regular Tasks
- **Weekly:** Check contact form submissions
- **Monthly:** Review error logs and site performance
- **Quarterly:** Update any dependencies if needed
- **Annually:** Renew domain and hosting

## Backup Strategy

### 1. Automated Backups
- Hostinger Business plans include daily backups
- Access via **Files → Backups**

### 2. Manual Backups
1. Download complete website via File Manager
2. Export database if used
3. Store backups securely

## Support Resources

### Hostinger Resources
- **Knowledge Base:** https://support.hostinger.com
- **Live Chat:** 24/7 support available
- **Community:** Hostinger Tutorials

### Technical Documentation
- **PHP Manual:** https://www.php.net/manual/
- **PHPMailer Guide:** https://github.com/PHPMailer/PHPMailer
- **HTML/CSS/JS:** MDN Web Docs

## Troubleshooting

### Common Issues

**1. White Screen (PHP Error):**
- Check error logs in hPanel
- Verify PHP version compatibility
- Check file permissions

**2. Contact Form Not Working:**
- Verify SMTP credentials
- Check email account exists
- Ensure submissions/ folder is writable
- Review PHP error logs

**3. Slow Loading:**
- Enable caching in .htaccess
- Optimize images
- Check PHP memory limits

**4. SSL Issues:**
- Verify SSL is enabled
- Update internal links to HTTPS
- Check for mixed content

### Getting Help
1. Check Hostinger knowledge base first
2. Use live chat for urgent issues
3. Submit ticket for complex problems
4. Community forums for general questions

---

**Note:** This guide is specific to Hostinger shared hosting. Some features may vary based on your hosting plan.