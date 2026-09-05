<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth.php';

$data = getRequestBody();
$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');

if (empty($username) || empty($password)) {
    sendResponse('error', null, 'Username/Email and Password are required.', 400);
}

try {
    $stmt = $pdo->prepare("SELECT * FROM admins WHERE (username = :user OR email = :user) AND status = 'active' LIMIT 1");
    $stmt->execute(['user' => $username]);
    $admin = $stmt->fetch();

    if ($admin && password_verify($password, $admin['password'])) {
        $token = generateAuthToken($admin);

        // Also set PHP session for direct browser dashboard navigation
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_user'] = [
            'id'       => $admin['id'],
            'name'     => $admin['name'],
            'email'    => $admin['email'],
            'username' => $admin['username'],
            'role'     => $admin['role']
        ];

        sendResponse('success', [
            'token' => $token,
            'user'  => $_SESSION['admin_user']
        ], 'Login successful');
    } else {
        sendResponse('error', null, 'Invalid username or password.', 401);
    }
} catch (Exception $e) {
    sendResponse('error', null, 'Login failed: ' . $e->getMessage(), 500);
}
