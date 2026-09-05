<?php
header('Content-Type: text/html; charset=utf-8');
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

$admin = validateAuth();

$categories = $pdo->query("SELECT * FROM categories ORDER BY name ASC")->fetchAll();
$products = $pdo->query("SELECT p.*, c.name as cat_name FROM products p LEFT JOIN categories c ON p.category_id = c.id ORDER BY p.id DESC")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Management | Saboori Fashion Admin</title>
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
        <li><a href="products.php" class="active">👗 Products & Catalogs</a></li>
        <li><a href="categories.php">📁 Categories</a></li>
        <li><a href="enquiries.php">📩 Leads & Inquiries</a></li>
        <li><a href="settings.php">⚙️ Site Settings</a></li>
        <li><a href="../api/auth/logout.php" style="color: #f87171;">🚪 Logout</a></li>
      </ul>
    </aside>

    <main class="admin-main">
      <header class="admin-topbar">
        <h2>Product & Catalog Management</h2>
        <button onclick="openModal()" class="btn btn-gold">+ Add New Product</button>
      </header>

      <div class="admin-body">
        <div class="card">
          <div class="card-header">
            <h3>All Products (<?= count($products) ?> items)</h3>
          </div>

          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>SKU</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Retail Price</th>
                  <th>Wholesale Price</th>
                  <th>MOQ</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <?php foreach ($products as $p): ?>
                  <tr id="row-<?= $p['id'] ?>">
                    <td>
                      <img src="<?= htmlspecialchars($p['primary_image']) ?>" alt="" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border);">
                    </td>
                    <td><code><?= htmlspecialchars($p['sku']) ?></code></td>
                    <td><strong><?= htmlspecialchars($p['name']) ?></strong></td>
                    <td><?= htmlspecialchars($p['cat_name'] ?: 'Uncategorized') ?></td>
                    <td>₹<?= number_format($p['price'], 2) ?></td>
                    <td><strong style="color: #34d399;">₹<?= number_format($p['wholesale_price'], 2) ?></strong></td>
                    <td><?= (int)$p['moq'] ?> pcs</td>
                    <td>
                      <span class="badge badge-<?= $p['stock_status'] === 'in_stock' ? 'converted' : 'closed' ?>">
                        <?= htmlspecialchars($p['stock_status']) ?>
                      </span>
                    </td>
                    <td><?= ucfirst(htmlspecialchars($p['status'])) ?></td>
                    <td>
                      <button onclick="deleteProduct(<?= $p['id'] ?>)" class="btn btn-sm" style="background: rgba(239, 68, 68, 0.2); color: #ef4444;">Delete</button>
                    </td>
                  </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- Add Product Modal -->
  <div id="productModal" class="modal-overlay">
    <div class="modal-content">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3>Add New Product to Catalog</h3>
        <button onclick="closeModal()" style="background:none; border:none; color:#fff; font-size:1.5rem; cursor:pointer;">&times;</button>
      </div>
      <form id="addProductForm" onsubmit="handleCreateProduct(event)">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="form-group">
            <label class="form-label">Product Name *</label>
            <input type="text" name="name" class="form-control" required placeholder="e.g. Royal Silk Saree">
          </div>
          <div class="form-group">
            <label class="form-label">SKU / Catalog Code *</label>
            <input type="text" name="sku" class="form-control" required placeholder="e.g. SF-SR-901">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="form-group">
            <label class="form-label">Category *</label>
            <select name="category_id" class="form-control" required>
              <option value="">Select Category</option>
              <?php foreach ($categories as $c): ?>
                <option value="<?= $c['id'] ?>"><?= htmlspecialchars($c['name']) ?></option>
              <?php endforeach; ?>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Fabric</label>
            <input type="text" name="fabric" class="form-control" placeholder="e.g. Pure Georgette Silk">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
          <div class="form-group">
            <label class="form-label">Retail Price (₹)</label>
            <input type="number" step="0.01" name="price" class="form-control" placeholder="2500">
          </div>
          <div class="form-group">
            <label class="form-label">Wholesale Price (₹)</label>
            <input type="number" step="0.01" name="wholesale_price" class="form-control" placeholder="1650">
          </div>
          <div class="form-group">
            <label class="form-label">MOQ (Min Order Qty)</label>
            <input type="number" name="moq" class="form-control" value="4">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Primary Image URL *</label>
          <input type="url" name="primary_image" class="form-control" required placeholder="https://...">
        </div>

        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea name="description" class="form-control" rows="3" placeholder="Fabric, weaving, pallu details..."></textarea>
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px;">
          <button type="button" onclick="closeModal()" class="btn" style="background:#374151; color:#fff;">Cancel</button>
          <button type="submit" class="btn btn-gold">Save Product</button>
        </div>
      </form>
    </div>
  </div>

  <script>
    function openModal() { document.getElementById('productModal').classList.add('active'); }
    function closeModal() { document.getElementById('productModal').classList.remove('active'); }

    async function handleCreateProduct(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      try {
        const res = await fetch('../api/products/create.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const json = await res.json();
        if (json.status === 'success') {
          alert('Product created successfully!');
          window.location.reload();
        } else {
          alert(json.message || 'Error creating product');
        }
      } catch (err) {
        alert('Network or server error');
      }
    }

    async function deleteProduct(id) {
      if (!confirm('Are you sure you want to delete this product?')) return;
      try {
        const res = await fetch(`../api/products/delete.php?id=${id}`, { method: 'DELETE' });
        const json = await res.json();
        if (json.status === 'success') {
          document.getElementById('row-' + id).remove();
        } else {
          alert(json.message || 'Error deleting product');
        }
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  </script>
</body>
</html>
