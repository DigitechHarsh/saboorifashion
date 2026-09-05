<?php
require_once __DIR__ . '/../../config/database.php';

$data = getRequestBody();

$name = trim($data['name'] ?? '');
$phone = trim($data['phone'] ?? '');

if (empty($name) || empty($phone)) {
    sendResponse('error', null, 'Name and Mobile/WhatsApp number are required.', 400);
}

try {
    $enquiryNumber = 'ENQ-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -4));
    $cartItemsJson = isset($data['cart_items']) ? json_encode($data['cart_items']) : null;

    $sql = "INSERT INTO enquiries (
        enquiry_number, name, phone, email, city, state,
        buyer_type, product_name, product_sku, quantity, message,
        cart_items, source_page, status
    ) VALUES (
        :enquiry_number, :name, :phone, :email, :city, :state,
        :buyer_type, :product_name, :product_sku, :quantity, :message,
        :cart_items, :source_page, 'new'
    )";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'enquiry_number' => $enquiryNumber,
        'name'           => $name,
        'phone'          => $phone,
        'email'          => $data['email'] ?? '',
        'city'           => $data['city'] ?? '',
        'state'          => $data['state'] ?? '',
        'buyer_type'     => $data['buyer_type'] ?? 'boutique_owner',
        'product_name'   => $data['product_name'] ?? '',
        'product_sku'    => $data['product_sku'] ?? '',
        'quantity'       => (int)($data['quantity'] ?? 1),
        'message'        => $data['message'] ?? '',
        'cart_items'     => $cartItemsJson,
        'source_page'    => $data['source_page'] ?? 'Website'
    ]);

    sendResponse('success', [
        'enquiry_number' => $enquiryNumber
    ], 'Thank you! Your enquiry has been received. Our wholesale team in Surat will contact you on WhatsApp/Call shortly.');
} catch (Exception $e) {
    sendResponse('error', null, 'Failed to submit enquiry: ' . $e->getMessage(), 500);
}
