<?php
/**
 * Saboori Fashion - Database Configuration & API Helper
 * Tailored for Hostinger Subdomain: https://saboorifashion.harshaicreations.com
 * Server Path: /home/u315909654/domains/harshaicreations.com/public_html/saboorifashion
 */

// Handle CORS (Cross-Origin Resource Sharing for Vercel and Local Development)
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); // Cache preflight for 1 day
} else {
    header("Access-Control-Allow-Origin: *");
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

// Automatically set JSON Content-Type only for API endpoints, not HTML Admin pages
if (isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], '/api/') !== false) {
    header('Content-Type: application/json; charset=utf-8');
}

// Live Hostinger MySQL Database Credentials
$db_host = getenv('DB_HOST') ?: 'localhost';
$db_name = getenv('DB_NAME') ?: 'u315909654_sabfash';
$db_user = getenv('DB_USER') ?: 'u315909654_saboorifashion';
$db_pass = getenv('DB_PASS') ?: 'Saboorifashion1';

try {
    $pdo = new PDO("mysql:host={$db_host};dbname={$db_name};charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    if (isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], '/api/') !== false) {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'status'  => 'error',
            'message' => 'Database connection failed. Please verify credentials in config/database.php on Hostinger.',
            'error'   => $e->getMessage()
        ]);
        exit;
    } else {
        // On HTML admin pages, render user-friendly error
        die("<div style='font-family:sans-serif;padding:30px;background:#fff1f2;border:1px solid #fecdd3;color:#9f1239;border-radius:10px;margin:40px auto;max-width:500px;'><h3>Database Connection Error</h3><p>Could not connect to Hostinger database <code>{$db_name}</code>.</p><small>" . htmlspecialchars($e->getMessage()) . "</small></div>");
    }
}

/**
 * Send standard JSON Response
 */
function sendResponse($status = 'success', $data = null, $message = '', $httpCode = 200) {
    header('Content-Type: application/json; charset=utf-8');
    http_response_code($httpCode);
    echo json_encode([
        'status'    => $status,
        'message'   => $message,
        'data'      => $data,
        'timestamp' => date('Y-m-d H:i:s')
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Get Request Body (JSON)
 */
function getRequestBody() {
    $input = file_get_contents('php://input');
    return json_decode($input, true) ?: $_POST;
}
