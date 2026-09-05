<?php
require_once __DIR__ . '/../../config/database.php';

$id = $_GET['id'] ?? null;
$slug = $_GET['slug'] ?? null;

if (!$id && !$slug) {
    sendResponse('error', null, 'Product ID or Slug is required.', 400);
}

try {
    if ($id) {
        $stmt = $pdo->prepare("SELECT p.*, c.name as category_name, c.slug as category_slug, sc.name as subcategory_name, sc.slug as subcategory_slug 
                               FROM products p 
                               LEFT JOIN categories c ON p.category_id = c.id 
                               LEFT JOIN subcategories sc ON p.subcategory_id = sc.id 
                               WHERE p.id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
    } else {
        $stmt = $pdo->prepare("SELECT p.*, c.name as category_name, c.slug as category_slug, sc.name as subcategory_name, sc.slug as subcategory_slug 
                               FROM products p 
                               LEFT JOIN categories c ON p.category_id = c.id 
                               LEFT JOIN subcategories sc ON p.subcategory_id = sc.id 
                               WHERE p.slug = :slug LIMIT 1");
        $stmt->execute(['slug' => $slug]);
    }

    $product = $stmt->fetch();

    if (!$product) {
        sendResponse('error', null, 'Product not found.', 404);
    }

    $product['images'] = json_decode($product['images'] ?? '[]', true) ?: [$product['primary_image']];
    $product['price'] = (float)$product['price'];
    $product['wholesale_price'] = (float)$product['wholesale_price'];
    $product['moq'] = (int)$product['moq'];
    $product['price_on_enquiry'] = (bool)$product['price_on_enquiry'];
    $product['is_featured'] = (bool)$product['is_featured'];
    $product['is_new_arrival'] = (bool)$product['is_new_arrival'];
    $product['is_bestseller'] = (bool)$product['is_bestseller'];

    // Fetch Related Products in same category
    $relStmt = $pdo->prepare("SELECT id, name, slug, sku, price, wholesale_price, primary_image, moq, fabric, price_on_enquiry 
                              FROM products 
                              WHERE category_id = :cat_id AND id != :prod_id AND status = 'published' 
                              LIMIT 4");
    $relStmt->execute(['cat_id' => $product['category_id'], 'prod_id' => $product['id']]);
    $related = $relStmt->fetchAll();

    sendResponse('success', [
        'product' => $product,
        'related' => $related
    ]);
} catch (Exception $e) {
    sendResponse('error', null, 'Error fetching product: ' . $e->getMessage(), 500);
}
