<?php
header('Content-Type: text/html; charset=utf-8');
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

$admin = validateAuth();

$statusFilter = $_GET['status'] ?? 'all';
$search = $_GET['search'] ?? '';

$where = ["1=1"];
$params = [];

if ($statusFilter !== 'all') {
    $where[] = "status = :status";
    $params['status'] = $statusFilter;
}

if (!empty($search)) {
    $where[] = "(name LIKE :s OR phone LIKE :s OR city LIKE :s OR enquiry_number LIKE :s)";
    $params['s'] = "%$search%";
}

$whereSql = implode(" AND ", $where);
$stmt = $pdo->prepare("SELECT * FROM enquiries WHERE $whereSql ORDER BY created_at DESC");
$stmt->execute($params);
$enquiries = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Leads & Enquiries CRM | Saboori Fashion Admin</title>
  <link rel="stylesheet" href="css/admin.css">
</head>
<body>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <div class="brand-title">Saboori Fashion</div>
        <div class="brand-sub">Admin Dashboard</div>
      </div>
      <ul class="sidebar-menu">
        <li><a href="index.php">📊 Overview</a></li>
        <li><a href="products.php">👗 Products & Catalogs</a></li>
        <li><a href="categories.php">📁 Categories</a></li>
        <li><a href="enquiries.php" class="active">📩 Leads & Inquiries</a></li>
        <li><a href="settings.php">⚙️ Site Settings</a></li>
        <li><a href="../api/auth/logout.php" style="color: #f87171;">🚪 Logout</a></li>
      </ul>
    </aside>

    <main class="admin-main">
      <header class="admin-topbar">
        <h2>Wholesale Leads & Inquiries CRM</h2>
        <a href="../api/enquiries/export_csv.php" class="btn btn-gold btn-sm">📥 Export All Leads (CSV)</a>
      </header>

      <div class="admin-body">
        <div class="card" style="margin-bottom: 20px;">
          <form method="GET" style="display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-end;">
            <div style="flex: 1; min-width: 200px;">
              <label class="form-label">Search Inquiries</label>
              <input type="text" name="search" value="<?= htmlspecialchars($search) ?>" class="form-control" placeholder="Name, Phone, City, Enquiry #">
            </div>
            <div style="width: 180px;">
              <label class="form-label">Status Filter</label>
              <select name="status" class="form-control" onchange="this.form.submit()">
                <option value="all" <?= $statusFilter === 'all' ? 'selected' : '' ?>>All Statuses</option>
                <option value="new" <?= $statusFilter === 'new' ? 'selected' : '' ?>>New</option>
                <option value="contacted" <?= $statusFilter === 'contacted' ? 'selected' : '' ?>>Contacted</option>
                <option value="quoted" <?= $statusFilter === 'quoted' ? 'selected' : '' ?>>Quoted</option>
                <option value="converted" <?= $statusFilter === 'converted' ? 'selected' : '' ?>>Converted</option>
                <option value="closed" <?= $statusFilter === 'closed' ? 'selected' : '' ?>>Closed</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Filter</button>
          </form>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Enquiry ID</th>
                  <th>Customer Info</th>
                  <th>Buyer Type</th>
                  <th>Product / Request</th>
                  <th>Qty</th>
                  <th>Status</th>
                  <th>WhatsApp Action</th>
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                <?php if (empty($enquiries)): ?>
                  <tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 30px;">No leads found matching criteria.</td></tr>
                <?php else: ?>
                  <?php foreach ($enquiries as $e): ?>
                    <tr id="enq-<?= $e['id'] ?>">
                      <td>
                        <strong><?= htmlspecialchars($e['enquiry_number']) ?></strong><br>
                        <small style="color: var(--text-muted);"><?= date('d M Y, h:i A', strtotime($e['created_at'])) ?></small>
                      </td>
                      <td>
                        <strong><?= htmlspecialchars($e['name']) ?></strong><br>
                        <span><?= htmlspecialchars($e['city'] ?: 'City N/A') ?>, <?= htmlspecialchars($e['state'] ?: '') ?></span><br>
                        <small style="color: var(--text-muted);"><?= htmlspecialchars($e['email'] ?: '') ?></small>
                      </td>
                      <td><span class="badge" style="background:#374151;"><?= ucwords(str_replace('_', ' ', $e['buyer_type'])) ?></span></td>
                      <td>
                        <strong><?= htmlspecialchars($e['product_name'] ?: 'Bulk Catalog Quote') ?></strong>
                        <?php if (!empty($e['product_sku'])): ?>
                          <br><small style="color: var(--gold);">SKU: <?= htmlspecialchars($e['product_sku']) ?></small>
                        <?php endif; ?>
                        <?php if (!empty($e['message'])): ?>
                          <p style="margin-top: 4px; font-size: 0.85rem; color: #d1d5db;"><?= htmlspecialchars($e['message']) ?></p>
                        <?php endif; ?>
                      </td>
                      <td><?= (int)$e['quantity'] ?></td>
                      <td>
                        <span class="badge badge-<?= htmlspecialchars($e['status']) ?>" id="status-badge-<?= $e['id'] ?>">
                          <?= ucfirst(htmlspecialchars($e['status'])) ?>
                        </span>
                      </td>
                      <td>
                        <a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', $e['phone']) ?>?text=<?= urlencode('Hello ' . $e['name'] . ', thank you for contacting Saboori Fashion Surat regarding ' . ($e['product_name'] ?: 'wholesale catalog') . '!') ?>" 
                           target="_blank" 
                           class="btn btn-gold btn-sm" style="background:#22c55e; color:#fff;">
                          💬 Chat
                        </a>
                      </td>
                      <td>
                        <select onchange="updateLeadStatus(<?= $e['id'] ?>, this.value)" class="form-control" style="padding: 4px 8px; font-size: 0.85rem;">
                          <option value="new" <?= $e['status'] === 'new' ? 'selected' : '' ?>>New</option>
                          <option value="contacted" <?= $e['status'] === 'contacted' ? 'selected' : '' ?>>Contacted</option>
                          <option value="quoted" <?= $e['status'] === 'quoted' ? 'selected' : '' ?>>Quoted</option>
                          <option value="converted" <?= $e['status'] === 'converted' ? 'selected' : '' ?>>Converted</option>
                          <option value="closed" <?= $e['status'] === 'closed' ? 'selected' : '' ?>>Closed</option>
                        </select>
                      </td>
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

  <script>
    async function updateLeadStatus(id, newStatus) {
      try {
        const res = await fetch('../api/enquiries/update_status.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id, status: newStatus })
        });
        const json = await res.json();
        if (json.status === 'success') {
          const badge = document.getElementById('status-badge-' + id);
          badge.className = 'badge badge-' + newStatus;
          badge.innerText = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
        } else {
          alert('Failed to update status');
        }
      } catch (err) {
        alert('Network error');
      }
    }
  </script>
</body>
</html>
