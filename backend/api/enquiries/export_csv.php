<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth.php';

validateAuth();

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=saboori_fashion_leads_' . date('Ymd_His') . '.csv');

$output = fopen('php://output', 'w');

// Header row
fputcsv($output, ['Enquiry No', 'Date', 'Customer Name', 'Phone', 'Email', 'City', 'State', 'Buyer Type', 'Product Interested', 'SKU', 'Qty', 'Status', 'Message', 'Notes']);

try {
    $stmt = $pdo->query("SELECT * FROM enquiries ORDER BY created_at DESC");
    while ($row = $stmt->fetch()) {
        fputcsv($output, [
            $row['enquiry_number'],
            $row['created_at'],
            $row['name'],
            $row['phone'],
            $row['email'],
            $row['city'],
            $row['state'],
            $row['buyer_type'],
            $row['product_name'],
            $row['product_sku'],
            $row['quantity'],
            $row['status'],
            $row['message'],
            $row['admin_notes']
        ]);
    }
} catch (Exception $e) {
    // Handle error
}
fclose($output);
exit;
