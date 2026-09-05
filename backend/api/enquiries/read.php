<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth.php';

validateAuth();

$status = $_GET['status'] ?? null;
$search = $_GET['search'] ?? null;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 100;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $limit;

try {
    $where = ["1=1"];
    $params = [];

    if ($status && $status !== 'all') {
        $where[] = "status = :status";
        $params['status'] = $status;
    }

    if ($search) {
        $where[] = "(name LIKE :s OR phone LIKE :s OR email LIKE :s OR city LIKE :s OR product_name LIKE :s OR enquiry_number LIKE :s)";
        $params['s'] = "%$search%";
    }

    $whereSql = implode(" AND ", $where);

    $countStmt = $pdo->prepare("SELECT COUNT(*) FROM enquiries WHERE $whereSql");
    $countStmt->execute($params);
    $total = (int)$countStmt->fetchColumn();

    $stmt = $pdo->prepare("SELECT * FROM enquiries WHERE $whereSql ORDER BY created_at DESC LIMIT $limit OFFSET $offset");
    $stmt->execute($params);
    $enquiries = $stmt->fetchAll();

    foreach ($enquiries as &$enq) {
        $enq['cart_items'] = json_decode($enq['cart_items'] ?? '[]', true);
    }

    sendResponse('success', [
        'enquiries' => $enquiries,
        'total' => $total,
        'page' => $page
    ]);
} catch (Exception $e) {
    sendResponse('error', null, 'Failed to fetch enquiries: ' . $e->getMessage(), 500);
}
