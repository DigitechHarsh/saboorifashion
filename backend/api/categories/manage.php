<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth.php';

validateAuth();

$method = $_SERVER['REQUEST_METHOD'];
$data = getRequestBody();

try {
    if ($method === 'POST') {
        $name = trim($data['name'] ?? '');
        $type = $data['type'] ?? 'category'; // category or subcategory

        if (empty($name)) {
            sendResponse('error', null, 'Name is required.', 400);
        }

        $slug = !empty($data['slug']) ? $data['slug'] : strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));

        if ($type === 'subcategory') {
            $catId = $data['category_id'] ?? null;
            if (!$catId) sendResponse('error', null, 'Category ID is required for subcategory.', 400);
            
            $stmt = $pdo->prepare("INSERT INTO subcategories (category_id, name, slug) VALUES (:cat_id, :name, :slug)");
            $stmt->execute(['cat_id' => $catId, 'name' => $name, 'slug' => $slug . '-' . rand(100, 999)]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO categories (name, slug, description, image, display_order) VALUES (:name, :slug, :desc, :img, :order)");
            $stmt->execute([
                'name'  => $name,
                'slug'  => $slug . '-' . rand(100, 999),
                'desc'  => $data['description'] ?? '',
                'img'   => $data['image'] ?? '',
                'order' => (int)($data['display_order'] ?? 0)
            ]);
        }

        sendResponse('success', ['id' => $pdo->lastInsertId()], 'Created successfully');

    } elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? $data['id'] ?? null;
        $type = $_GET['type'] ?? $data['type'] ?? 'category';

        if (!$id) sendResponse('error', null, 'ID is required.', 400);

        if ($type === 'subcategory') {
            $stmt = $pdo->prepare("DELETE FROM subcategories WHERE id = :id");
        } else {
            $stmt = $pdo->prepare("DELETE FROM categories WHERE id = :id");
        }
        $stmt->execute(['id' => $id]);

        sendResponse('success', null, 'Deleted successfully');
    }
} catch (Exception $e) {
    sendResponse('error', null, 'Operation failed: ' . $e->getMessage(), 500);
}
