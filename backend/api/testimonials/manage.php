<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth.php';

validateAuth();

$method = $_SERVER['REQUEST_METHOD'];
$data = getRequestBody();

try {
    if ($method === 'POST') {
        $name = trim($data['client_name'] ?? '');
        $review = trim($data['review'] ?? '');

        if (empty($name) || empty($review)) {
            sendResponse('error', null, 'Client name and review are required.', 400);
        }

        $stmt = $pdo->prepare("INSERT INTO testimonials (client_name, business_name, city, rating, review, image, display_order) 
                               VALUES (:name, :biz, :city, :rating, :rev, :img, :order)");
        $stmt->execute([
            'name'   => $name,
            'biz'    => $data['business_name'] ?? '',
            'city'   => $data['city'] ?? '',
            'rating' => (int)($data['rating'] ?? 5),
            'rev'    => $review,
            'img'    => $data['image'] ?? '',
            'order'  => (int)($data['display_order'] ?? 0)
        ]);

        sendResponse('success', ['id' => $pdo->lastInsertId()], 'Testimonial added');
    } elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? $data['id'] ?? null;
        if (!$id) sendResponse('error', null, 'ID required', 400);
        $stmt = $pdo->prepare("DELETE FROM testimonials WHERE id = :id");
        $stmt->execute(['id' => $id]);
        sendResponse('success', null, 'Testimonial deleted');
    }
} catch (Exception $e) {
    sendResponse('error', null, 'Failed: ' . $e->getMessage(), 500);
}
