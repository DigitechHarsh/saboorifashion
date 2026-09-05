<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth.php';

validateAuth();

$data = getRequestBody();
$id = $_GET['id'] ?? $data['id'] ?? null;

if (!$id) {
    sendResponse('error', null, 'Product ID is required.', 400);
}

try {
    $stmt = $pdo->prepare("DELETE FROM products WHERE id = :id");
    $stmt->execute(['id' => $id]);

    sendResponse('success', null, 'Product deleted successfully');
} catch (Exception $e) {
    sendResponse('error', null, 'Failed to delete product: ' . $e->getMessage(), 500);
}
