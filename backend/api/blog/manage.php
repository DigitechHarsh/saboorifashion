<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth.php';

validateAuth();

$method = $_SERVER['REQUEST_METHOD'];
$data = getRequestBody();

try {
    if ($method === 'POST') {
        $title = trim($data['title'] ?? '');
        $content = trim($data['content'] ?? '');

        if (empty($title) || empty($content)) {
            sendResponse('error', null, 'Title and Content are required.', 400);
        }

        $slug = !empty($data['slug']) ? $data['slug'] : strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title)));

        $stmt = $pdo->prepare("INSERT INTO blog_posts (title, slug, excerpt, content, image, author, tags, is_published) 
                               VALUES (:title, :slug, :exc, :content, :img, :author, :tags, :pub)");
        $stmt->execute([
            'title'   => $title,
            'slug'    => $slug . '-' . rand(100, 999),
            'exc'     => $data['excerpt'] ?? '',
            'content' => $content,
            'img'     => $data['image'] ?? '',
            'author'  => $data['author'] ?? 'Saboori Fashion Team',
            'tags'    => $data['tags'] ?? '',
            'pub'     => isset($data['is_published']) ? (int)$data['is_published'] : 1
        ]);

        sendResponse('success', ['id' => $pdo->lastInsertId()], 'Blog post created');
    } elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? $data['id'] ?? null;
        if (!$id) sendResponse('error', null, 'ID required', 400);
        $stmt = $pdo->prepare("DELETE FROM blog_posts WHERE id = :id");
        $stmt->execute(['id' => $id]);
        sendResponse('success', null, 'Post deleted');
    }
} catch (Exception $e) {
    sendResponse('error', null, 'Failed: ' . $e->getMessage(), 500);
}
