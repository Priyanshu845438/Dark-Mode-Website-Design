<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Only POST method allowed']);
    exit;
}

// Get form data
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? 'New Contact Form Submission');
$message = trim($_POST['message'] ?? '');

// Basic validation
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Email configuration
$admin_email = 'contact@acadifysolution.com'; // Change this to your email
$from_email = 'noreply@acadifysolution.com'; // Change this to your domain

// Email subject and headers
$email_subject = "Contact Form: " . $subject;
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: " . $from_email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

// Email content for admin
$email_content = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #000; color: #00BFFF; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { background: white; padding: 10px; border-left: 3px solid #00BFFF; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                <div class='value'>" . htmlspecialchars($name) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'>" . htmlspecialchars($email) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Subject:</div>
                <div class='value'>" . htmlspecialchars($subject) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Submitted:</div>
                <div class='value'>" . date('F j, Y \a\t g:i A') . "</div>
            </div>
        </div>
    </div>
</body>
</html>";

// Send email to admin
$admin_mail_sent = mail($admin_email, $email_subject, $email_content, $headers);

// Send confirmation email to user
$user_subject = "Thank you for contacting Acadify Solution";
$user_headers = "MIME-Version: 1.0" . "\r\n";
$user_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$user_headers .= "From: " . $from_email . "\r\n";

$user_content = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #000; color: #00BFFF; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Thank You for Contacting Us!</h2>
        </div>
        <div class='content'>
            <p>Dear " . htmlspecialchars($name) . ",</p>
            <p>Thank you for reaching out to Acadify Solution. We have received your message and will get back to you within 24 hours.</p>
            <p><strong>Your message:</strong></p>
            <p style='background: white; padding: 15px; border-left: 3px solid #00BFFF;'>" . nl2br(htmlspecialchars($message)) . "</p>
            <p>Best regards,<br>Acadify Solution Team</p>
        </div>
        <div class='footer'>
            <p>This is an automated confirmation email. Please do not reply to this email.</p>
            <p>If you need immediate assistance, please call us or visit our website.</p>
        </div>
    </div>
</body>
</html>";

$user_mail_sent = mail($email, $user_subject, $user_content, $user_headers);

// Check if emails were sent successfully
if ($admin_mail_sent && $user_mail_sent) {
    echo json_encode([
        'success' => true, 
        'message' => "Thank you " . $name . "! Your message has been sent successfully. Check your email for confirmation."
    ]);
} else if ($admin_mail_sent) {
    echo json_encode([
        'success' => true, 
        'message' => "Thank you " . $name . "! Your message has been sent successfully."
    ]);
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Failed to send email. Please try again or contact us directly.'
    ]);
}
?>