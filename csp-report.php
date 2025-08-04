<?php
/**
 * CSP Violation Report Handler for Acadify Solution
 * Logs Content Security Policy violations for monitoring and debugging
 */

// Set proper headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get the raw POST data
$input = file_get_contents('php://input');

if (empty($input)) {
    http_response_code(400);
    echo json_encode(['error' => 'No data received']);
    exit;
}

// Decode JSON
$report = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Validate CSP report structure
if (!isset($report['csp-report'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid CSP report format']);
    exit;
}

$cspReport = $report['csp-report'];

// Sanitize and validate report data
$logEntry = [
    'timestamp' => date('Y-m-d H:i:s'),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
    'document_uri' => $cspReport['document-uri'] ?? 'unknown',
    'referrer' => $cspReport['referrer'] ?? 'unknown',
    'violated_directive' => $cspReport['violated-directive'] ?? 'unknown',
    'blocked_uri' => $cspReport['blocked-uri'] ?? 'unknown',
    'line_number' => $cspReport['line-number'] ?? 'unknown',
    'column_number' => $cspReport['column-number'] ?? 'unknown',
    'source_file' => $cspReport['source-file'] ?? 'unknown',
    'status_code' => $cspReport['status-code'] ?? 'unknown',
    'script_sample' => isset($cspReport['script-sample']) ? substr($cspReport['script-sample'], 0, 200) : 'unknown'
];

// Log file path
$logDir = 'logs';
$logFile = $logDir . '/csp-violations-' . date('Y-m') . '.log';

// Create logs directory if it doesn't exist
if (!file_exists($logDir)) {
    mkdir($logDir, 0755, true);
}

// Format log entry
$logMessage = json_encode($logEntry) . "\n";

// Write to log file
if (file_put_contents($logFile, $logMessage, FILE_APPEND | LOCK_EX) === false) {
    error_log('Failed to write CSP violation report to log file');
    http_response_code(500);
    echo json_encode(['error' => 'Failed to log violation']);
    exit;
}

// Optional: Send alert for critical violations
$criticalDirectives = [
    'script-src',
    'object-src',
    'base-uri',
    'form-action'
];

$violatedDirective = $logEntry['violated_directive'];
foreach ($criticalDirectives as $critical) {
    if (strpos($violatedDirective, $critical) !== false) {
        // Log critical violation
        error_log("CRITICAL CSP VIOLATION: {$violatedDirective} blocked {$logEntry['blocked_uri']} on {$logEntry['document_uri']}");
        
        // Optional: Send email notification (uncomment if needed)
        /*
        $subject = "Critical CSP Violation - Acadify Solution";
        $message = "Critical CSP violation detected:\n\n" . print_r($logEntry, true);
        mail('security@acadifysolution.com', $subject, $message);
        */
        break;
    }
}

// Return success response
http_response_code(204); // No Content
echo json_encode(['status' => 'logged']);

// Optional: Clean up old log files (older than 90 days)
$oldLogs = glob($logDir . '/csp-violations-*.log');
foreach ($oldLogs as $log) {
    if (filemtime($log) < time() - (90 * 24 * 60 * 60)) {
        unlink($log);
    }
}
?>