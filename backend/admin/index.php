<?php
header('Content-Type: text/html; charset=utf-8');
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

$admin = validateAuth();

// Fetch statistics
$prodCount = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
$catCount = $pdo->query("SELECT COUNT(*) FROM categories")->fetchColumn();
$enqCount = $pdo->query("SELECT COUNT(*) FROM enquiries")->fetchColumn();
$newEnqCount = $pdo->query("SELECT COUNT(*) FROM enquiries WHERE status = 'new'")->fetchColumn();

// Fetch recent 5 enquiries
$recentEnquiries = $pdo->query("SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 5")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard | Saboori Fashion Admin</title>
  <link rel="stylesheet" href="css/admin.css">
</head>
<body>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <div class="brand-title">Saboori Fashion</div>
        <div class="brand-sub">Admin Dashboard</div>
      </div>
      <ul class="sidebar-menu">
        <li><a href="index.php" class="active">📊 Overview</a></li>
        <li><a href="products.php">👗 Products & Catalogs</a></li>
        <li><a href="categories.php">📁 Categories</a></li>
        <li><a href="enquiries.php">📩 Leads & Inquiries <span class="badge badge-new" style="margin-left:auto;"><?= $newEnqCount ?></span></a></li>
        <li><a href="settings.php">⚙️ Site Settings</a></li>
        <li><a href="../api/auth/logout.php" style="color: #f87171;">🚪 Logout</a></li>
      </ul>
    </aside>

    <!-- Main -->
    <main class="admin-main">
      <header class="admin-topbar">
        <h2>Dashboard Overview</h2>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 0.9rem; color: var(--gold);">Logged in: <strong><?= htmlspecialchars($admin['name']) ?></strong></span>
          <a href="/" target="_blank" class="btn btn-gold btn-sm">🌐 View Live Website</a>
        </div>
      </header>

      <div class="admin-body">
        <!-- Stats -->
        <div class="stat-grid">
          <div class="stat-card">
            <div>
              <div class="stat-label">Total Products</div>
              <div class="stat-val"><?= $prodCount ?></div>
            </div>
            <div style="font-size: 2rem;">👗</div>
          </div>
          <div class="stat-card">
            <div>
              <div class="stat-label">Categories</div>
              <div class="stat-val"><?= $catCount ?></div>
            </div>
            <div style="font-size: 2rem;">📁</div>
          </div>
          <div class="stat-card">
            <div>
              <div class="stat-label">Total Wholesale Leads</div>
              <div class="stat-val"><?= $enqCount ?></div>
            </div>
            <div style="font-size: 2rem;">📩</div>
          </div>
          <div class="stat-card" style="border-color: #3b82f6;">
            <div>
              <div class="stat-label">New Unhandled Leads</div>
              <div class="stat-val" style="color: #60a5fa;"><?= $newEnqCount ?></div>
            </div>
            <div style="font-size: 2rem;">🔔</div>
          </div>
        </div>

        <!-- Recent Inquiries -->
        <div class="card">
          <div class="card-header">
            <h3>Recent Wholesale Enquiries / Leads</h3>
            <a href="enquiries.php" class="btn btn-primary btn-sm">View All Leads</a>
          </div>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Enquiry No</th>
                  <th>Customer Name</th>
                  <th>Phone / WhatsApp</th>
                  <th>City</th>
                  <th>Product / Interest</th>
                  <th>Qty</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <?php if (empty($recentEnquiries)): ?>
                  <tr><td colspan="8" style="text-align: center; color: var(--text-muted);">No enquiries yet.</td></tr>
                <?php else: ?>
                  <?php foreach ($recentEnquiries as $enq): ?>
                    <tr>
                      <td><strong><?= htmlspecialchars($enq['enquiry_number']) ?></strong></td>
                      <td><?= htmlspecialchars($enq['name']) ?></td>
                      <td>
                        <a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', $enq['phone']) ?>" target="_blank" style="color:#34d399; text-decoration:none;">
                          💬 <?= htmlspecialchars($enq['phone']) ?>
                        </a>
                      </td>
                      <td><?= htmlspecialchars($enq['city'] ?: 'N/A') ?></td>
                      <td><?= htmlspecialchars($enq['product_name'] ?: 'General Catalog') ?></td>
                      <td><?= (int)$enq['quantity'] ?></td>
                      <td>
                        <span class="badge badge-<?= htmlspecialchars($enq['status']) ?>">
                          <?= ucfirst(htmlspecialchars($enq['status'])) ?>
                        </span>
                      </td>
                      <td><?= date('d M Y, h:i A', strtotime($enq['created_at'])) ?></td>
                    </tr>
                  <?php endforeach; ?>
                <?php endif; ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</body>
</html>
