<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth.php';

validateAuth();

$data = getRequestBody();

if (empty($data['name']) || empty($data['sku']) || empty($data['category_id'])) {
    sendResponse('error', null, 'Product Name, SKU, and Category are required.', 400);
}

try {
    $slug = !empty($data['slug']) ? $data['slug'] : strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $data['name'])));
    $imagesJson = json_encode($data['images'] ?? [$data['primary_image'] ?? '']);

    $sql = "INSERT INTO products (
        category_id, subcategory_id, sku, name, slug, description,
        price, wholesale_price, price_on_enquiry, moq, fabric, work_type,
        occasion, available_colors, available_sizes, stock_status, primary_image,
        images, is_featured, is_new_arrival, is_bestseller, status, meta_title, meta_description
    ) VALUES (
        :category_id, :subcategory_id, :sku, :name, :slug, :description,
        :price, :wholesale_price, :price_on_enquiry, :moq, :fabric, :work_type,
        :occasion, :available_colors, :available_sizes, :stock_status, :primary_image,
        :images, :is_featured, :is_new_arrival, :is_bestseller, :status, :meta_title, :meta_description
    )";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'category_id'      => $data['category_id'],
        'subcategory_id'   => !empty($data['subcategory_id']) ? $data['subcategory_id'] : null,
        'sku'              => $data['sku'],
        'name'             => $data['name'],
        'slug'             => $slug . '-' . substr(uniqid(), -4),
        'description'      => $data['description'] ?? '',
        'price'            => (float)($data['price'] ?? 0),
        'wholesale_price'  => (float)($data['wholesale_price'] ?? 0),
        'price_on_enquiry' => !empty($data['price_on_enquiry']) ? 1 : 0,
        'moq'              => (int)($data['moq'] ?? 1),
        'fabric'           => $data['fabric'] ?? '',
        'work_type'        => $data['work_type'] ?? '',
        'occasion'         => $data['occasion'] ?? '',
        'available_colors' => $data['available_colors'] ?? '',
        'available_sizes'  => $data['available_sizes'] ?? '',
        'stock_status'     => $data['stock_status'] ?? 'in_stock',
        'primary_image'    => $data['primary_image'] ?? '',
        'images'           => $imagesJson,
        'is_featured'      => !empty($data['is_featured']) ? 1 : 0,
        'is_new_arrival'   => !empty($data['is_new_arrival']) ? 1 : 0,
        'is_bestseller'    => !empty($data['is_bestseller']) ? 1 : 0,
        'status'           => $data['status'] ?? 'published',
        'meta_title'       => $data['meta_title'] ?? '',
        'meta_description' => $data['meta_description'] ?? ''
    ]);

    $newId = $pdo->lastInsertId();
    sendResponse('success', ['id' => $newId], 'Product created successfully', 201);
} catch (Exception $e) {
    sendResponse('error', null, 'Failed to create product: ' . $e->getMessage(), 500);
}
