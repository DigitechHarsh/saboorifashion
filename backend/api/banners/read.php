<?php
require_once __DIR__ . '/../../config/database.php';

try {
    $stmt = $pdo->query("SELECT * FROM banners WHERE is_active = 1 ORDER BY display_order ASC, id DESC");
    $banners = $stmt->fetchAll();
    sendResponse('success', $banners);
} catch (Exception $e) {
    sendResponse('error', null, 'Failed to fetch banners: ' . $e->getMessage(), 500);
}
