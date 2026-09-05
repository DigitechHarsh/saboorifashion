<?php
require_once __DIR__ . '/../../config/database.php';

try {
    $stmt = $pdo->query("SELECT setting_key, setting_value FROM site_settings");
    $rows = $stmt->fetchAll();

    $settings = [];
    foreach ($rows as $row) {
        $settings[$row['setting_key']] = $row['setting_value'];
    }

    sendResponse('success', $settings);
} catch (Exception $e) {
    sendResponse('error', null, 'Failed to fetch settings: ' . $e->getMessage(), 500);
}
