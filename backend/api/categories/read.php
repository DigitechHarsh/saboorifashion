<?php
require_once __DIR__ . '/../../config/database.php';

try {
    // Fetch all active categories with their active subcategories
    $catStmt = $pdo->query("SELECT * FROM categories WHERE is_active = 1 ORDER BY display_order ASC, name ASC");
    $categories = $catStmt->fetchAll();

    $subStmt = $pdo->query("SELECT * FROM subcategories WHERE is_active = 1 ORDER BY name ASC");
    $subcategories = $subStmt->fetchAll();

    // Map subcategories to categories
    $subsByCat = [];
    foreach ($subcategories as $sub) {
        $subsByCat[$sub['category_id']][] = $sub;
    }

    foreach ($categories as &$cat) {
        $cat['subcategories'] = $subsByCat[$cat['id']] ?? [];
        
        // Count products in this category
        $countStmt = $pdo->prepare("SELECT COUNT(*) FROM products WHERE category_id = :id AND status = 'published'");
        $countStmt->execute(['id' => $cat['id']]);
        $cat['product_count'] = (int)$countStmt->fetchColumn();
    }

    sendResponse('success', $categories);
} catch (Exception $e) {
    sendResponse('error', null, 'Failed to fetch categories: ' . $e->getMessage(), 500);
}
