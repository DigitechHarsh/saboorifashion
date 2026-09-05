<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth.php';

validateAuth();

$data = getRequestBody();

if (empty($data) || !is_array($data)) {
    sendResponse('error', null, 'Settings key-value map required.', 400);
}

try {
    $stmt = $pdo->prepare("INSERT INTO site_settings (setting_key, setting_value) 
                           VALUES (:k, :v) 
                           ON DUPLICATE KEY UPDATE setting_value = :v");

    foreach ($data as $key => $value) {
        $stmt->execute([
            'k' => $key,
            'v' => is_array($value) ? json_encode($value) : $value
        ]);
    }

    sendResponse('success', null, 'Settings saved successfully');
} catch (Exception $e) {
    sendResponse('error', null, 'Failed to update settings: ' . $e->getMessage(), 500);
}
