<?php
// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    exit('Method not allowed');
}

// CORS headers for frontend
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// SMTP Configuration - Use environment variables or defaults
$smtp_host = $_ENV['SMTP_HOST'] ?? 'smtp.hostinger.com';
$smtp_port = (int)($_ENV['SMTP_PORT'] ?? 465);
$smtp_username = $_ENV['SMTP_USERNAME'] ?? 'contact@acadifysolution.com';
$smtp_password = $_ENV['SMTP_PASSWORD'] ?? '';
$smtp_encryption = $smtp_port == 587 ? 'tls' : 'ssl';

// Admin email (where form submissions are sent)
$admin_email = $_ENV['ADMIN_EMAIL'] ?? 'contact@acadifysolution.com';

// Log configuration for debugging
error_log("SMTP Config: Host={$smtp_host}, Port={$smtp_port}, User={$smtp_username}, Encryption={$smtp_encryption}");

// Validate and sanitize input
function sanitize_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Get form data
$name = sanitize_input($_POST['name'] ?? '');
$email = sanitize_input($_POST['email'] ?? '');
$phone = sanitize_input($_POST['phone'] ?? '');
$subject = sanitize_input($_POST['subject'] ?? '');
$message = sanitize_input($_POST['message'] ?? '');
$service = sanitize_input($_POST['service'] ?? '');
$budget = sanitize_input($_POST['budget'] ?? '');

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required';
}

if (empty($email) || !validate_email($email)) {
    $errors[] = 'Valid email is required';
}

if (empty($subject)) {
    $errors[] = 'Subject is required';
}

if (empty($message)) {
    $errors[] = 'Message is required';
}

// Return errors if validation fails
if (!empty($errors)) {
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Include PHPMailer - Manual Installation
require_once 'PHPMailer/src/PHPMailer.php';
require_once 'PHPMailer/src/SMTP.php';
require_once 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

try {
    // Create PHPMailer instance (only for admin)
    $mail = new PHPMailer(true);

    // Configure SMTP
    $mail->isSMTP();
    $mail->Host = $smtp_host;
    $mail->SMTPAuth = true;
    $mail->Username = $smtp_username;
    $mail->Password = $smtp_password;
    $mail->SMTPSecure = $smtp_encryption;
    $mail->Port = $smtp_port;
    $mail->CharSet = 'UTF-8';

    // Email to Admin only (New Contact Form Submission)
    $mail->setFrom($smtp_username, 'Acadify Solution Contact Form');
    $mail->addAddress($admin_email, 'Acadify Solution Admin');
    $mail->addReplyTo($email, $name);
    
    $mail->isHTML(true);
    $mail->Subject = '📧 New Contact Form Submission: ' . $subject;
    
    // Admin email template
    $admin_email_body = file_get_contents('email-templates/admin-notification.html');
    $admin_email_body = str_replace([
        '{{name}}',
        '{{email}}',
        '{{phone}}',
        '{{subject}}',
        '{{service}}',
        '{{budget}}',
        '{{message}}',
        '{{date}}',
        '{{time}}'
    ], [
        $name,
        $email,
        $phone ?: 'Not provided',
        $subject,
        $service ?: 'Not specified',
        $budget ?: 'Not specified',
        nl2br($message),
        date('F j, Y'),
        date('g:i A')
    ], $admin_email_body);
    
    $mail->Body = $admin_email_body;

    // Send email to admin
    $admin_email_sent = $mail->send();
    
    // Debug logging
    error_log("Contact form: Admin email sent status = " . ($admin_email_sent ? 'true' : 'false'));
    error_log("Contact form: Admin email = " . $admin_email);
    error_log("Contact form: Subject = " . $mail->Subject);

    // Send confirmation email to user
    $user_email_sent = false;
    try {
        $userMail = new PHPMailer(true);
        
        // Configure SMTP for user email
        $userMail->isSMTP();
        $userMail->Host = $smtp_host;
        $userMail->SMTPAuth = true;
        $userMail->Username = $smtp_username;
        $userMail->Password = $smtp_password;
        $userMail->SMTPSecure = $smtp_encryption;
        $userMail->Port = $smtp_port;
        $userMail->CharSet = 'UTF-8';

        // User confirmation email settings
        $userMail->setFrom($smtp_username, 'Acadify Solution');
        $userMail->addAddress($email, $name);
        $userMail->isHTML(true);
        $userMail->Subject = '✅ Thank You for Contacting Acadify Solution!';
        
        // User email template
        $user_email_body = file_get_contents('email-templates/user-confirmation.html');
        $user_email_body = str_replace([
            '{{name}}',
            '{{subject}}',
            '{{service}}',
            '{{date}}',
            '{{time}}'
        ], [
            $name,
            $subject,
            $service ?: 'General Inquiry',
            date('F j, Y'),
            date('g:i A')
        ], $user_email_body);
        
        $userMail->Body = $user_email_body;
        
        // Send user confirmation email
        $user_email_sent = $userMail->send();
        error_log("Contact form: User confirmation email sent status = " . ($user_email_sent ? 'true' : 'false'));
        
    } catch (Exception $e) {
        error_log("Contact form: User email error = " . $e->getMessage());
    }

    if ($admin_email_sent) {
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your message has been sent successfully. ' . 
                        ($user_email_sent ? 'A confirmation email has been sent to your inbox. ' : '') .
                        'We will get back to you within 24 hours.'
        ]);
    } else {
        throw new Exception('Failed to send email to admin');
    }

} catch (Exception $e) {
    error_log('Contact form error: ' . $e->getMessage());
    error_log('Contact form full error: ' . $e->getTraceAsString());
    
    // More detailed error response
    $error_message = 'Sorry, there was an error sending your message. Please try again later or contact us directly.';
    
    // Include specific error details for debugging (remove in production)
    if (strpos($e->getMessage(), 'SMTP') !== false) {
        $error_message .= ' (SMTP configuration issue)';
    }
    
    echo json_encode([
        'success' => false,
        'message' => 'We apologize, but there was an issue sending your message. Please try again or contact us directly at contact@acadifysolution.com'
    ]);
}
?>