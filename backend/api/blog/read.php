<?php
require_once __DIR__ . '/../../config/database.php';

$slug = $_GET['slug'] ?? null;

try {
    if ($slug) {
        $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE slug = :slug AND is_published = 1 LIMIT 1");
        $stmt->execute(['slug' => $slug]);
        $post = $stmt->fetch();
        if (!$post) sendResponse('error', null, 'Post not found', 404);
        sendResponse('success', $post);
    } else {
        $stmt = $pdo->query("SELECT id, title, slug, excerpt, image, author, tags, created_at FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC");
        $posts = $stmt->fetchAll();
        sendResponse('success', $posts);
    }
} catch (Exception $e) {
    sendResponse('error', null, 'Failed to fetch blog posts: ' . $e->getMessage(), 500);
}
