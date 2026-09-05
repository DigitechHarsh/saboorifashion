<?php
/**
 * Saboori Fashion - Authentication & Security Helper
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Generate a simple secure token for Admin API requests
 */
function generateAuthToken($admin) {
    $payload = [
        'id'       => $admin['id'],
        'username' => $admin['username'],
        'email'    => $admin['email'],
        'role'     => $admin['role'],
        'exp'      => time() + (86400 * 7) // 7 days validity
    ];
    $encoded = base64_encode(json_encode($payload));
    $signature = hash_hmac('sha256', $encoded, 'saboori_fashion_jwt_secret_surat_2026');
    return $encoded . '.' . $signature;
}

/**
 * Validate Token or Session
 */
function validateAuth() {
    // 1. Check Session (for direct PHP admin portal pages)
    if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
        return $_SESSION['admin_user'];
    }

    // 2. Check Authorization Header (for REST API calls)
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

    if (strpos($authHeader, 'Bearer ') === 0) {
        $token = substr($authHeader, 7);
        $parts = explode('.', $token);
        if (count($parts) === 2) {
            $payloadEncoded = $parts[0];
            $signature = $parts[1];
            $expectedSignature = hash_hmac('sha256', $payloadEncoded, 'saboori_fashion_jwt_secret_surat_2026');

            if (hash_equals($expectedSignature, $signature)) {
                $payload = json_decode(base64_decode($payloadEncoded), true);
                if ($payload && isset($payload['exp']) && $payload['exp'] > time()) {
                    return $payload;
                }
            }
        }
    }

    http_response_code(401);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Unauthorized access. Please login to continue.'
    ]);
    exit;
}
