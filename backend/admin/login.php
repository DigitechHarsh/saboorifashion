<?php
header('Content-Type: text/html; charset=utf-8');
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (!empty($username) && !empty($password)) {
        try {
            $stmt = $pdo->prepare("SELECT * FROM admins WHERE (username = :u OR email = :u) AND status = 'active' LIMIT 1");
            $stmt->execute(['u' => $username]);
            $admin = $stmt->fetch();

            if ($admin && password_verify($password, $admin['password'])) {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_user'] = [
                    'id'       => $admin['id'],
                    'name'     => $admin['name'],
                    'email'    => $admin['email'],
                    'username' => $admin['username'],
                    'role'     => $admin['role']
                ];
                header("Location: index.php");
                exit;
            } else {
                $error = 'Invalid username or password.';
            }
        } catch (Exception $e) {
            $error = 'Database error: ' . $e->getMessage();
        }
    } else {
        $error = 'Please fill all fields.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login | Saboori Fashion Surat</title>
  <link rel="stylesheet" href="css/admin.css">
  <style>
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at top, #2e0f17 0%, #14141d 80%);
      padding: 20px;
    }
    .login-card {
      background: #1e1e2c;
      border: 1px solid #382c3c;
      border-radius: 16px;
      padding: 40px;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    .login-header {
      text-align: center;
      margin-bottom: 30px;
    }
    .login-header h1 {
      color: #d4af37;
      font-size: 1.6rem;
      margin-bottom: 6px;
    }
    .alert-error {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #fca5a5;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 0.85rem;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>Saboori Fashion</h1>
        <p class="brand-sub">Adarsh Market-2, Surat • Admin Portal</p>
      </div>

      <?php if (!empty($error)): ?>
        <div class="alert-error"><?= htmlspecialchars($error) ?></div>
      <?php endif; ?>

      <form method="POST" action="login.php">
        <div class="form-group">
          <label class="form-label">Username or Email</label>
          <input type="text" name="username" class="form-control" placeholder="admin" required autofocus>
        </div>

        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" name="password" class="form-control" placeholder="••••••••" required>
        </div>

        <button type="submit" class="btn btn-gold" style="width: 100%; padding: 12px; margin-top: 10px;">
          Sign In to Dashboard
        </button>
      </form>
      
      <div style="text-align: center; margin-top: 24px; color: #9ca3af; font-size: 0.8rem;">
        Default login: <code>admin</code> / <code>Password@123</code>
      </div>
    </div>
  </div>
</body>
</html>
