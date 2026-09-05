<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth.php';

validateAuth();

$method = $_SERVER['REQUEST_METHOD'];
$data = getRequestBody();

try {
    if ($method === 'POST') {
        $title = trim($data['title'] ?? '');
        $image = trim($data['image'] ?? '');

        if (empty($title) || empty($image)) {
            sendResponse('error', null, 'Title and Image URL are required.', 400);
        }

        $stmt = $pdo->prepare("INSERT INTO gallery (title, category, image, description, display_order) VALUES (:title, :cat, :img, :desc, :order)");
        $stmt->execute([
            'title' => $title,
            'cat'   => $data['category'] ?? 'showroom',
            'img'   => $image,
            'desc'  => $data['description'] ?? '',
            'order' => (int)($data['display_order'] ?? 0)
        ]);

        sendResponse('success', ['id' => $pdo->lastInsertId()], 'Gallery item added');
    } elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? $data['id'] ?? null;
        if (!$id) sendResponse('error', null, 'ID required', 400);
        $stmt = $pdo->prepare("DELETE FROM gallery WHERE id = :id");
        $stmt->execute(['id' => $id]);
        sendResponse('success', null, 'Item deleted');
    }
} catch (Exception $e) {
    sendResponse('error', null, 'Failed: ' . $e->getMessage(), 500);
}
