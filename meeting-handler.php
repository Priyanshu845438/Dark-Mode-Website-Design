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
error_log("Meeting Form SMTP Config: Host={$smtp_host}, Port={$smtp_port}, User={$smtp_username}, Encryption={$smtp_encryption}");

// Validate and sanitize input
function sanitize_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Get form data
$firstName = sanitize_input($_POST['firstName'] ?? '');
$lastName = sanitize_input($_POST['lastName'] ?? '');
$email = sanitize_input($_POST['email'] ?? '');
$phone = sanitize_input($_POST['phone'] ?? '');
$company = sanitize_input($_POST['company'] ?? '');
$meetingType = sanitize_input($_POST['meetingType'] ?? '');
$preferredDate = sanitize_input($_POST['preferredDate'] ?? '');
$preferredTime = sanitize_input($_POST['preferredTime'] ?? '');
$serviceInterest = sanitize_input($_POST['serviceInterest'] ?? '');
$projectDetails = sanitize_input($_POST['projectDetails'] ?? '');
$newsletter = isset($_POST['newsletter']) ? 'Yes' : 'No';

// Validation
$errors = [];

if (empty($firstName)) {
    $errors[] = 'First name is required';
}

if (empty($lastName)) {
    $errors[] = 'Last name is required';
}

if (empty($email) || !validate_email($email)) {
    $errors[] = 'Valid email is required';
}

if (empty($phone)) {
    $errors[] = 'Phone number is required';
}

if (empty($meetingType)) {
    $errors[] = 'Meeting type is required';
}

if (empty($preferredDate)) {
    $errors[] = 'Preferred date is required';
}

if (empty($preferredTime)) {
    $errors[] = 'Preferred time is required';
}

if (empty($serviceInterest)) {
    $errors[] = 'Service interest is required';
}

// Return errors if validation fails
if (!empty($errors)) {
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Include PHPMailer
require_once 'PHPMailer/src/PHPMailer.php';
require_once 'PHPMailer/src/SMTP.php';
require_once 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

try {
    // Create PHPMailer instance
    $mail = new PHPMailer(true);

    // Server settings
    $mail->isSMTP();
    $mail->Host = $smtp_host;
    $mail->SMTPAuth = true;
    $mail->Username = $smtp_username;
    $mail->Password = $smtp_password;
    $mail->SMTPSecure = $smtp_encryption;
    $mail->Port = $smtp_port;
    $mail->CharSet = 'UTF-8';

    // Format meeting type and service interest for display
    $meetingTypeFormatted = match($meetingType) {
        'video' => 'Video Conference',
        'phone' => 'Phone Consultation',
        'in-person' => 'In-Person Meeting',
        default => ucfirst($meetingType)
    };

    $serviceInterestFormatted = match($serviceInterest) {
        'web-development' => 'Web Development',
        'mobile-development' => 'Mobile App Development',
        'ui-ux-design' => 'UI/UX Design',
        'custom-software' => 'Custom Software Development',
        'cloud-services' => 'Cloud Services & DevOps',
        'ai-solutions' => 'AI & Machine Learning',
        'data-analytics' => 'Data Analytics & BI',
        'digital-marketing' => 'Digital Marketing',
        'multiple-services' => 'Multiple Services',
        'general-consultation' => 'General Consultation',
        default => ucfirst(str_replace('-', ' ', $serviceInterest))
    };

    // Format date and time
    $formattedDate = date('F j, Y', strtotime($preferredDate));
    $formattedTime = date('g:i A', strtotime($preferredTime));

    // Recipients
    $mail->setFrom($smtp_username, 'Acadify Solution - Meeting Scheduler');
    $mail->addAddress($admin_email, 'Acadify Solution');
    $mail->addReplyTo($email, $firstName . ' ' . $lastName);

    // Content
    $mail->isHTML(true);
    $mail->Subject = "New Meeting Request from {$firstName} {$lastName}";

    // Email body
    $mail->Body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8f9fa; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #00BFFF, #39FF14); padding: 30px; text-align: center; }
            .header h1 { color: #000; margin: 0; font-size: 24px; font-weight: bold; }
            .content { padding: 30px; }
            .meeting-info { background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .info-row { display: flex; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
            .info-row:last-child { border-bottom: none; margin-bottom: 0; }
            .info-label { font-weight: bold; color: #00BFFF; min-width: 140px; }
            .info-value { color: #333; }
            .priority { background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 15px; margin: 20px 0; }
            .priority strong { color: #856404; }
            .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
            .btn { display: inline-block; background: linear-gradient(135deg, #00BFFF, #39FF14); color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🗓️ New Meeting Request</h1>
                <p style='margin: 10px 0 0 0; color: #000; font-size: 16px;'>Someone wants to schedule a consultation</p>
            </div>
            
            <div class='content'>
                <div class='priority'>
                    <strong>⚡ Priority Request:</strong> Please respond within 4 hours to confirm availability.
                </div>
                
                <div class='meeting-info'>
                    <h3 style='margin-top: 0; color: #00BFFF;'>👤 Client Information</h3>
                    <div class='info-row'>
                        <div class='info-label'>Name:</div>
                        <div class='info-value'>{$firstName} {$lastName}</div>
                    </div>
                    <div class='info-row'>
                        <div class='info-label'>Email:</div>
                        <div class='info-value'><a href='mailto:{$email}'>{$email}</a></div>
                    </div>
                    <div class='info-row'>
                        <div class='info-label'>Phone:</div>
                        <div class='info-value'><a href='tel:{$phone}'>{$phone}</a></div>
                    </div>
                    " . (!empty($company) ? "
                    <div class='info-row'>
                        <div class='info-label'>Company:</div>
                        <div class='info-value'>{$company}</div>
                    </div>
                    " : "") . "
                </div>
                
                <div class='meeting-info'>
                    <h3 style='margin-top: 0; color: #39FF14;'>📅 Meeting Details</h3>
                    <div class='info-row'>
                        <div class='info-label'>Type:</div>
                        <div class='info-value'>{$meetingTypeFormatted}</div>
                    </div>
                    <div class='info-row'>
                        <div class='info-label'>Preferred Date:</div>
                        <div class='info-value'>{$formattedDate}</div>
                    </div>
                    <div class='info-row'>
                        <div class='info-label'>Preferred Time:</div>
                        <div class='info-value'>{$formattedTime}</div>
                    </div>
                    <div class='info-row'>
                        <div class='info-label'>Service Interest:</div>
                        <div class='info-value'>{$serviceInterestFormatted}</div>
                    </div>
                </div>
                
                " . (!empty($projectDetails) ? "
                <div class='meeting-info'>
                    <h3 style='margin-top: 0; color: #FFA500;'>📝 Project Details</h3>
                    <p style='margin: 0; line-height: 1.6;'>{$projectDetails}</p>
                </div>
                " : "") . "
                
                <div class='meeting-info'>
                    <h3 style='margin-top: 0; color: #666;'>📧 Additional Info</h3>
                    <div class='info-row'>
                        <div class='info-label'>Newsletter:</div>
                        <div class='info-value'>{$newsletter}</div>
                    </div>
                    <div class='info-row'>
                        <div class='info-label'>Submitted:</div>
                        <div class='info-value'>" . date('F j, Y \a\t g:i A T') . "</div>
                    </div>
                </div>
                
                <div style='text-align: center; margin-top: 30px;'>
                    <a href='mailto:{$email}' class='btn'>Reply to Client</a>
                </div>
            </div>
            
            <div class='footer'>
                <p><strong>Acadify Solution</strong><br>
                Professional Technology Services<br>
                Vadodara, Gujarat, India<br>
                <a href='mailto:contact@acadifysolution.com'>contact@acadifysolution.com</a> | 
                <a href='tel:+916206698170'>+91 62066 98170</a></p>
            </div>
        </div>
    </body>
    </html>
    ";

    // Send email to admin
    $admin_email_sent = $mail->send();
    error_log("Meeting form: Admin email sent status = " . ($admin_email_sent ? 'true' : 'false'));

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
        $userMail->addAddress($email, $firstName . ' ' . $lastName);
        $userMail->isHTML(true);
        $userMail->Subject = '✅ Meeting Request Confirmed - Acadify Solution';
        
        // User confirmation email body
        $userMail->Body = "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <style>
                body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8f9fa; }
                .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #00BFFF, #39FF14); padding: 30px; text-align: center; }
                .header h1 { color: #000; margin: 0; font-size: 24px; font-weight: bold; }
                .content { padding: 30px; }
                .meeting-details { background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
                .detail-row { display: flex; margin-bottom: 10px; }
                .detail-label { font-weight: bold; color: #00BFFF; min-width: 120px; }
                .detail-value { color: #333; }
                .success-message { background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 6px; padding: 15px; margin: 20px 0; color: #155724; }
                .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
                .logo { width: 32px; height: 32px; display: inline-block; margin-right: 10px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>✅ Meeting Request Received!</h1>
                    <p style='margin: 10px 0 0 0; color: #000; font-size: 16px;'>Thank you for scheduling a consultation with us</p>
                </div>
                
                <div class='content'>
                    <div class='success-message'>
                        <strong>✅ Success!</strong> Your meeting request has been received and is being processed.
                    </div>
                    
                    <p>Dear {$firstName} {$lastName},</p>
                    
                    <p>Thank you for your interest in our services! We have received your meeting request and our team will contact you within 4 hours to confirm your appointment.</p>
                    
                    <div class='meeting-details'>
                        <h3 style='margin-top: 0; color: #00BFFF;'>📋 Your Meeting Details</h3>
                        <div class='detail-row'>
                            <div class='detail-label'>Meeting Type:</div>
                            <div class='detail-value'>{$meetingTypeFormatted}</div>
                        </div>
                        <div class='detail-row'>
                            <div class='detail-label'>Preferred Date:</div>
                            <div class='detail-value'>{$formattedDate}</div>
                        </div>
                        <div class='detail-row'>
                            <div class='detail-label'>Preferred Time:</div>
                            <div class='detail-value'>{$formattedTime}</div>
                        </div>
                        <div class='detail-row'>
                            <div class='detail-label'>Service Interest:</div>
                            <div class='detail-value'>{$serviceInterestFormatted}</div>
                        </div>
                        <div class='detail-row'>
                            <div class='detail-label'>Company:</div>
                            <div class='detail-value'>{$company}</div>
                        </div>
                    </div>
                    
                    <p><strong>What happens next?</strong></p>
                    <ul>
                        <li>Our team will review your request</li>
                        <li>We'll contact you within 4 hours to confirm availability</li>
                        <li>You'll receive a calendar invitation with meeting details</li>
                        <li>We'll prepare a customized presentation based on your needs</li>
                    </ul>
                    
                    <p>If you have any urgent questions, please contact us directly at <a href='mailto:contact@acadifysolution.com'>contact@acadifysolution.com</a> or call us at +91 62066 98170.</p>
                    
                    <p>We look forward to discussing how we can help transform your business with cutting-edge technology solutions!</p>
                    
                    <p>Best regards,<br><strong>Acadify Solution Team</strong></p>
                </div>
                
                <div class='footer'>
                    <p><strong>Acadify Solution</strong><br>
                    Professional Technology Services<br>
                    Vadodara, Gujarat, India<br>
                    <a href='mailto:contact@acadifysolution.com'>contact@acadifysolution.com</a> | 
                    <a href='tel:+916206698170'>+91 62066 98170</a></p>
                </div>
            </div>
        </body>
        </html>
        ";
        
        // Send user confirmation email
        $user_email_sent = $userMail->send();
        error_log("Meeting form: User confirmation email sent status = " . ($user_email_sent ? 'true' : 'false'));
        
    } catch (Exception $e) {
        error_log("Meeting form: User email error = " . $e->getMessage());
    }

    // Save submission to file for backup
    $submission_data = [
        'timestamp' => date('Y-m-d H:i:s'),
        'name' => $firstName . ' ' . $lastName,
        'email' => $email,
        'phone' => $phone,
        'company' => $company,
        'meetingType' => $meetingType,
        'preferredDate' => $preferredDate,
        'preferredTime' => $preferredTime,
        'serviceInterest' => $serviceInterest,
        'projectDetails' => $projectDetails,
        'newsletter' => $newsletter,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'Unknown'
    ];

    // Ensure submissions directory exists
    if (!file_exists('submissions')) {
        mkdir('submissions', 0755, true);
    }

    // Save to file
    $filename = 'submissions/meeting_' . date('Y-m-d') . '.log';
    file_put_contents($filename, json_encode($submission_data) . PHP_EOL, FILE_APPEND | LOCK_EX);

    if ($admin_email_sent) {
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your meeting request has been submitted successfully. ' . 
                        ($user_email_sent ? 'A confirmation email has been sent to your inbox. ' : '') .
                        'We will contact you within 4 hours to confirm your appointment.'
        ]);
    } else {
        throw new Exception('Failed to send meeting request to admin');
    }

} catch (Exception $e) {
    error_log("Meeting form error: " . $e->getMessage());
    error_log("Meeting form full error: " . $e->getTraceAsString());
    
    // More detailed error response
    $error_message = 'Sorry, there was an error processing your meeting request. Please try again or contact us directly.';
    
    // Include specific error details for debugging (remove in production)
    if (strpos($e->getMessage(), 'SMTP') !== false) {
        $error_message .= ' (SMTP configuration issue)';
    }
    
    echo json_encode([
        'success' => false,
        'message' => 'We apologize, but there was an issue processing your meeting request. Please try again or contact us directly at contact@acadifysolution.com'
    ]);
}
?>