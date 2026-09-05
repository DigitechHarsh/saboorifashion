<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth.php';

validateAuth();

$data = getRequestBody();
$id = $data['id'] ?? null;

if (!$id) {
    sendResponse('error', null, 'Product ID is required for update.', 400);
}

try {
    $imagesJson = isset($data['images']) ? json_encode($data['images']) : null;

    $fields = [];
    $params = ['id' => $id];

    $allowed = [
        'category_id', 'subcategory_id', 'sku', 'name', 'slug', 'description',
        'price', 'wholesale_price', 'price_on_enquiry', 'moq', 'fabric', 'work_type',
        'occasion', 'available_colors', 'available_sizes', 'stock_status', 'primary_image',
        'is_featured', 'is_new_arrival', 'is_bestseller', 'status', 'meta_title', 'meta_description'
    ];

    foreach ($allowed as $field) {
        if (isset($data[$field])) {
            $fields[] = "`$field` = :$field";
            $params[$field] = $data[$field];
        }
    }

    if ($imagesJson !== null) {
        $fields[] = "`images` = :images";
        $params['images'] = $imagesJson;
    }

    if (empty($fields)) {
        sendResponse('error', null, 'No fields provided to update.', 400);
    }

    $setSql = implode(', ', $fields);
    $sql = "UPDATE products SET {$setSql} WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    sendResponse('success', null, 'Product updated successfully');
} catch (Exception $e) {
    sendResponse('error', null, 'Failed to update product: ' . $e->getMessage(), 500);
}
