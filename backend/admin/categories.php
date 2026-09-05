<?php
header('Content-Type: text/html; charset=utf-8');
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

$admin = validateAuth();

$categories = $pdo->query("SELECT * FROM categories ORDER BY display_order ASC, name ASC")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Category Management | Saboori Fashion Admin</title>
  <link rel="stylesheet" href="css/admin.css">
</head>
<body>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="sidebar-header" style="display: flex; align-items: center; gap: 12px;">
        <img src="logo.png" alt="Saboori Fashion" style="height: 40px; width: auto; object-fit: contain;">
        <div>
          <div class="brand-title" style="font-size: 1.05rem;">Saboori Fashion</div>
          <div class="brand-sub" style="font-size: 0.7rem;">Admin Dashboard</div>
        </div>
      </div>
      <ul class="sidebar-menu">
        <li><a href="index.php">📊 Overview</a></li>
        <li><a href="products.php">👗 Products & Catalogs</a></li>
        <li><a href="categories.php" class="active">📁 Categories</a></li>
        <li><a href="enquiries.php">📩 Leads & Inquiries</a></li>
        <li><a href="settings.php">⚙️ Site Settings</a></li>
        <li><a href="../api/auth/logout.php" style="color: #f87171;">🚪 Logout</a></li>
      </ul>
    </aside>

    <main class="admin-main">
      <header class="admin-topbar">
        <h2>Category Management</h2>
      </header>

      <div class="admin-body">
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 24px;">
          <!-- Add Category Card -->
          <div class="card">
            <div class="card-header">
              <h3>Add Category</h3>
            </div>
            <form onsubmit="handleAddCategory(event)">
              <div class="form-group">
                <label class="form-label">Category Name *</label>
                <input type="text" name="name" class="form-control" required placeholder="e.g. Sarees">
              </div>
              <div class="form-group">
                <label class="form-label">Cover Image URL</label>
                <input type="url" name="image" class="form-control" placeholder="https://...">
              </div>
              <div class="form-group">
                <label class="form-label">Description</label>
                <textarea name="description" class="form-control" rows="3" placeholder="Category highlights..."></textarea>
              </div>
              <button type="submit" class="btn btn-gold" style="width:100%;">Create Category</button>
            </form>
          </div>

          <!-- Existing Categories -->
          <div class="card">
            <div class="card-header">
              <h3>Active Categories (<?= count($categories) ?>)</h3>
            </div>
            <div class="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Order</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <?php foreach ($categories as $cat): ?>
                    <tr id="cat-<?= $cat['id'] ?>">
                      <td>
                        <img src="<?= htmlspecialchars($cat['image'] ?: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100') ?>" 
                             style="width: 44px; height: 44px; object-fit: cover; border-radius: 6px;">
                      </td>
                      <td><strong><?= htmlspecialchars($cat['name']) ?></strong></td>
                      <td><code><?= htmlspecialchars($cat['slug']) ?></code></td>
                      <td><?= (int)$cat['display_order'] ?></td>
                      <td>
                        <button onclick="deleteCategory(<?= $cat['id'] ?>)" class="btn btn-sm" style="background:rgba(239,68,68,0.2); color:#ef4444;">Delete</button>
                      </td>
                    </tr>
                  <?php endforeach; ?>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <script>
    async function handleAddCategory(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      data.type = 'category';

      try {
        const res = await fetch('../api/categories/manage.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const json = await res.json();
        if (json.status === 'success') {
          alert('Category created!');
          window.location.reload();
        } else {
          alert(json.message || 'Failed');
        }
      } catch (err) {
        alert('Server error');
      }
    }

    async function deleteCategory(id) {
      if (!confirm('Are you sure you want to delete this category?')) return;
      try {
        const res = await fetch(`../api/categories/manage.php?id=${id}&type=category`, { method: 'DELETE' });
        const json = await res.json();
        if (json.status === 'success') {
          document.getElementById('cat-' + id).remove();
        } else {
          alert('Failed to delete category');
        }
      } catch (err) {
        alert('Error');
      }
    }
  </script>
</body>
</html>
