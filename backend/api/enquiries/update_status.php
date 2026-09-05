<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth.php';

validateAuth();

$data = getRequestBody();
$id = $data['id'] ?? null;
$status = $data['status'] ?? null;
$notes = $data['admin_notes'] ?? null;

if (!$id) {
    sendResponse('error', null, 'Enquiry ID is required.', 400);
}

try {
    $fields = [];
    $params = ['id' => $id];

    if ($status) {
        $fields[] = "`status` = :status";
        $params['status'] = $status;
    }

    if ($notes !== null) {
        $fields[] = "`admin_notes` = :notes";
        $params['notes'] = $notes;
    }

    if (empty($fields)) {
        sendResponse('error', null, 'No updates specified.', 400);
    }

    $sql = "UPDATE enquiries SET " . implode(', ', $fields) . " WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    sendResponse('success', null, 'Enquiry updated successfully');
} catch (Exception $e) {
    sendResponse('error', null, 'Update failed: ' . $e->getMessage(), 500);
}
