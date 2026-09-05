<?php
require_once __DIR__ . '/../../config/database.php';

$category = $_GET['category'] ?? null;

try {
    if ($category && $category !== 'all') {
        $stmt = $pdo->prepare("SELECT * FROM gallery WHERE category = :cat ORDER BY display_order ASC, id DESC");
        $stmt->execute(['cat' => $category]);
    } else {
        $stmt = $pdo->query("SELECT * FROM gallery ORDER BY display_order ASC, id DESC");
    }
    $gallery = $stmt->fetchAll();
    sendResponse('success', $gallery);
} catch (Exception $e) {
    sendResponse('error', null, 'Failed to fetch gallery: ' . $e->getMessage(), 500);
}
