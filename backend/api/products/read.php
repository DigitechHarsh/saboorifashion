<?php
require_once __DIR__ . '/../../config/database.php';

// Parameters
$category_slug = $_GET['category'] ?? null;
$subcategory_slug = $_GET['subcategory'] ?? null;
$featured = isset($_GET['featured']) ? (int)$_GET['featured'] : null;
$new_arrival = isset($_GET['new_arrival']) ? (int)$_GET['new_arrival'] : null;
$bestseller = isset($_GET['bestseller']) ? (int)$_GET['bestseller'] : null;
$search = $_GET['search'] ?? null;
$sort = $_GET['sort'] ?? 'newest';
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $limit;

try {
    $where = ["p.status = 'published'"];
    $params = [];

    if ($category_slug) {
        $where[] = "c.slug = :category";
        $params['category'] = $category_slug;
    }

    if ($subcategory_slug) {
        $where[] = "sc.slug = :subcategory";
        $params['subcategory'] = $subcategory_slug;
    }

    if ($featured !== null) {
        $where[] = "p.is_featured = :featured";
        $params['featured'] = $featured;
    }

    if ($new_arrival !== null) {
        $where[] = "p.is_new_arrival = :new_arrival";
        $params['new_arrival'] = $new_arrival;
    }

    if ($bestseller !== null) {
        $where[] = "p.is_bestseller = :bestseller";
        $params['bestseller'] = $bestseller;
    }

    if ($search) {
        $where[] = "(p.name LIKE :search OR p.sku LIKE :search OR p.fabric LIKE :search OR p.work_type LIKE :search OR p.description LIKE :search)";
        $params['search'] = "%{$search}%";
    }

    $whereSql = implode(" AND ", $where);

    // Sorting
    $orderBy = "p.created_at DESC";
    if ($sort === 'price_low') {
        $orderBy = "p.price ASC";
    } elseif ($sort === 'price_high') {
        $orderBy = "p.price DESC";
    } elseif ($sort === 'name_asc') {
        $orderBy = "p.name ASC";
    }

    // Total Count
    $countSql = "SELECT COUNT(*) as total 
                 FROM products p 
                 LEFT JOIN categories c ON p.category_id = c.id 
                 LEFT JOIN subcategories sc ON p.subcategory_id = sc.id 
                 WHERE {$whereSql}";
    $countStmt = $pdo->prepare($countSql);
    $countStmt->execute($params);
    $total = (int)$countStmt->fetchColumn();

    // Fetch Products
    $sql = "SELECT p.*, c.name as category_name, c.slug as category_slug, sc.name as subcategory_name, sc.slug as subcategory_slug 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            LEFT JOIN subcategories sc ON p.subcategory_id = sc.id 
            WHERE {$whereSql} 
            ORDER BY {$orderBy} 
            LIMIT {$limit} OFFSET {$offset}";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $products = $stmt->fetchAll();

    foreach ($products as &$item) {
        $item['images'] = json_decode($item['images'] ?? '[]', true) ?: [$item['primary_image']];
        $item['price'] = (float)$item['price'];
        $item['wholesale_price'] = (float)$item['wholesale_price'];
        $item['moq'] = (int)$item['moq'];
        $item['price_on_enquiry'] = (bool)$item['price_on_enquiry'];
        $item['is_featured'] = (bool)$item['is_featured'];
        $item['is_new_arrival'] = (bool)$item['is_new_arrival'];
        $item['is_bestseller'] = (bool)$item['is_bestseller'];
    }

    sendResponse('success', [
        'products' => $products,
        'pagination' => [
            'total' => $total,
            'page' => $page,
            'limit' => $limit,
            'totalPages' => ceil($total / $limit)
        ]
    ]);
} catch (Exception $e) {
    sendResponse('error', null, 'Failed to fetch products: ' . $e->getMessage(), 500);
}
