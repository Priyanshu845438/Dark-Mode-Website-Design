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

// For development: Save submissions to a file
$submission_data = [
    'timestamp' => date('Y-m-d H:i:s'),
    'name' => $name,
    'email' => $email,
    'subject' => $subject,
    'message' => $message,
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
];

// Create submissions directory if it doesn't exist
if (!file_exists('submissions')) {
    mkdir('submissions', 0755, true);
}

// Save to file
$filename = 'submissions/contact_' . date('Y-m-d') . '.json';
$submissions = [];

// Load existing submissions if file exists
if (file_exists($filename)) {
    $existing_content = file_get_contents($filename);
    $submissions = json_decode($existing_content, true) ?: [];
}

// Add new submission
$submissions[] = $submission_data;

// Save updated submissions
file_put_contents($filename, json_encode($submissions, JSON_PRETTY_PRINT));

// Try to send email (will work in production with proper mail setup)
$admin_email = 'contact@acadifysolution.com';
$from_email = 'noreply@acadifysolution.com';

$email_subject = "Contact Form: " . $subject;
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: " . $from_email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

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

// Attempt to send email (will fail in dev but work in production)
$mail_sent = @mail($admin_email, $email_subject, $email_content, $headers);

// Return success response
echo json_encode([
    'success' => true, 
    'message' => "Thank you " . $name . "! Your message has been received and saved. " . 
                ($mail_sent ? "Email sent successfully." : "In development mode - check submissions folder for saved data.")
]);
?>