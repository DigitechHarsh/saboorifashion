<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth.php';

validateAuth();

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    sendResponse('error', null, 'No valid file uploaded or upload error occurred.', 400);
}

$file = $_FILES['image'];
$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif'];

if (!in_array($file['type'], $allowedTypes)) {
    sendResponse('error', null, 'Invalid file type. Only JPG, PNG, WEBP and GIF are allowed.', 400);
}

// Max 8MB
if ($file['size'] > 8 * 1024 * 1024) {
    sendResponse('error', null, 'File exceeds maximum 8MB size limit.', 400);
}

$uploadDir = __DIR__ . '/../../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = 'saboori_' . date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '.' . $extension;
$destination = $uploadDir . $filename;

if (move_uploaded_file($file['tmp_name'], $destination)) {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $domain = $_SERVER['HTTP_HOST'];
    $baseUrl = $protocol . $domain . str_replace('/api/upload/upload_image.php', '', $_SERVER['SCRIPT_NAME']);
    $fileUrl = $baseUrl . '/uploads/' . $filename;

    sendResponse('success', [
        'filename' => $filename,
        'url'      => $fileUrl
    ], 'File uploaded successfully');
} else {
    sendResponse('error', null, 'Failed to save uploaded file on server.', 500);
}
