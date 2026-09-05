<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth.php';

$user = validateAuth();
sendResponse('success', ['user' => $user], 'Session is valid.');
