<?php
header('Content-Type: text/html; charset=utf-8');
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

$admin = validateAuth();

$stmt = $pdo->query("SELECT setting_key, setting_value FROM site_settings");
$rows = $stmt->fetchAll();
$settings = [];
foreach ($rows as $r) {
    $settings[$r['setting_key']] = $r['setting_value'];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Store Settings | Saboori Fashion Admin</title>
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
        <li><a href="enquiries.php">📩 Leads & Inquiries</a></li>
        <li><a href="settings.php" class="active">⚙️ Site Settings</a></li>
        <li><a href="../api/auth/logout.php" style="color: #f87171;">🚪 Logout</a></li>
      </ul>
    </aside>

    <main class="admin-main">
      <header class="admin-topbar">
        <h2>Store & Business Settings</h2>
      </header>

      <div class="admin-body">
        <div class="card" style="max-width: 800px;">
          <form onsubmit="handleSaveSettings(event)">
            <div class="form-group">
              <label class="form-label">Company Name</label>
              <input type="text" name="company_name" value="<?= htmlspecialchars($settings['company_name'] ?? 'Saboori Fashion') ?>" class="form-control" required>
            </div>

            <div class="form-group">
              <label class="form-label">Full Address (Surat Showroom)</label>
              <textarea name="address" class="form-control" rows="2" required><?= htmlspecialchars($settings['address'] ?? '') ?></textarea>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label">Primary Phone (Click-to-Call)</label>
                <input type="text" name="phone_primary" value="<?= htmlspecialchars($settings['phone_primary'] ?? '+91 87803 31600') ?>" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="form-label">Secondary Phone</label>
                <input type="text" name="phone_secondary" value="<?= htmlspecialchars($settings['phone_secondary'] ?? '+91 81602 21162') ?>" class="form-control">
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label">WhatsApp Number (with country code, digits only)</label>
                <input type="text" name="whatsapp_number" value="<?= htmlspecialchars($settings['whatsapp_number'] ?? '918780331600') ?>" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" name="email" value="<?= htmlspecialchars($settings['email'] ?? 'contact@saboorifashion.com') ?>" class="form-control">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Site Announcement Bar Text</label>
              <input type="text" name="announcement_bar" value="<?= htmlspecialchars($settings['announcement_bar'] ?? '') ?>" class="form-control">
            </div>

            <div class="form-group">
              <label class="form-label">Business Hours</label>
              <input type="text" name="business_hours" value="<?= htmlspecialchars($settings['business_hours'] ?? '') ?>" class="form-control">
            </div>

            <button type="submit" class="btn btn-gold" style="padding: 12px 24px; margin-top: 10px;">💾 Save All Settings</button>
          </form>
        </div>
      </div>
    </main>
  </div>

  <script>
    async function handleSaveSettings(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      try {
        const res = await fetch('../api/settings/update.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const json = await res.json();
        if (json.status === 'success') {
          alert('Settings updated successfully!');
        } else {
          alert(json.message || 'Error updating settings');
        }
      } catch (err) {
        alert('Server connection error');
      }
    }
  </script>
</body>
</html>
