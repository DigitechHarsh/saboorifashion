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

        $stmt = $pdo->prepare("INSERT INTO banners (title, subtitle, tagline, image, link, cta_text, display_order) 
                              VALUES (:title, :sub, :tag, :img, :link, :cta, :order)");
        $stmt->execute([
            'title' => $title,
            'sub'   => $data['subtitle'] ?? '',
            'tag'   => $data['tagline'] ?? '',
            'img'   => $image,
            'link'  => $data['link'] ?? '/products',
            'cta'   => $data['cta_text'] ?? 'Explore Catalog',
            'order' => (int)($data['display_order'] ?? 0)
        ]);

        sendResponse('success', ['id' => $pdo->lastInsertId()], 'Banner created');
    } elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? $data['id'] ?? null;
        if (!$id) sendResponse('error', null, 'ID required', 400);
        $stmt = $pdo->prepare("DELETE FROM banners WHERE id = :id");
        $stmt->execute(['id' => $id]);
        sendResponse('success', null, 'Banner deleted');
    }
} catch (Exception $e) {
    sendResponse('error', null, 'Operation failed: ' . $e->getMessage(), 500);
}
