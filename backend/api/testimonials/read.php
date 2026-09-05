<?php
require_once __DIR__ . '/../../config/database.php';

try {
    $stmt = $pdo->query("SELECT * FROM testimonials WHERE is_active = 1 ORDER BY display_order ASC, id DESC");
    $testimonials = $stmt->fetchAll();
    sendResponse('success', $testimonials);
} catch (Exception $e) {
    sendResponse('error', null, 'Failed to fetch testimonials: ' . $e->getMessage(), 500);
}
