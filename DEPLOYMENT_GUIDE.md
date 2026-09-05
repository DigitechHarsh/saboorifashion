# Saboori Fashion - Deployment Guide for `saboorifashion.harshaicreations.com`

This guide has been pre-configured with your exact server credentials:
- **Subdomain URL:** `https://saboorifashion.harshaicreations.com`
- **Hostinger Server Directory:** `/home/u315909654/domains/harshaicreations.com/public_html/saboorifashion`
- **Hostinger Database:** `u315909654_sabfash`
- **Hostinger DB User:** `u315909654_saboorifashion`
- **Hostinger DB Password:** `Saboorifashion1`

---

## Step 1: Import Schema in phpMyAdmin on Hostinger

1. Log in to your **Hostinger hPanel**.
2. Go to **Databases** → **MySQL Databases**.
3. Click **Enter phpMyAdmin** next to `u315909654_sabfash`.
4. In phpMyAdmin, click the **Import** tab at the top.
5. Choose [`backend/database/schema.sql`](file:///c:/Users/HP/OneDrive/Desktop/saboorifashion/backend/database/schema.sql) from your computer.
6. Click **Import** (or **Go**).
   - *This creates all tables and sample catalog products immediately.*

---

## Step 2: Upload Backend Files to Hostinger Subdomain Directory

1. Open **File Manager** in Hostinger hPanel (or connect via FTP / FileZilla).
2. Navigate to your subdomain directory:
   ```
   /home/u315909654/domains/harshaicreations.com/public_html/saboorifashion/
   ```
3. Upload all files from the local [`backend/`](file:///c:/Users/HP/OneDrive/Desktop/saboorifashion/backend) folder directly into that directory:
   ```
   saboorifashion/
   ├── .htaccess
   ├── admin/
   │   ├── css/
   │   ├── js/
   │   ├── index.php
   │   ├── login.php
   │   ├── products.php
   │   ├── categories.php
   │   ├── enquiries.php
   │   └── settings.php
   ├── api/
   │   ├── auth/
   │   ├── products/
   │   ├── categories/
   │   ├── enquiries/
   │   ├── banners/
   │   ├── gallery/
   │   ├── blog/
   │   ├── settings/
   │   └── upload/
   ├── config/
   │   ├── database.php    (Pre-configured with u315909654_sabfash credentials)
   │   └── auth.php
   ├── database/
   │   └── schema.sql
   └── uploads/
   ```
4. In File Manager, right-click on the `uploads/` directory and ensure its permissions are set to **755** (or **775**).

---

## Step 3: Access Your Live Admin Panel & API

1. **Test the Live API:**
   - Open: `https://saboorifashion.harshaicreations.com/api/products/read.php`
   - You should see the live JSON response containing products and categories.
2. **Open the Admin Panel:**
   - URL: `https://saboorifashion.harshaicreations.com/admin/login.php`
   - **Default Admin Username:** `admin` (or `admin@saboorifashion.com`)
   - **Default Admin Password:** `Password@123`

---

## Step 4: Deploy Frontend to Vercel

1. Push your repository to **GitHub**.
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Select your repository and set:
   - **Root Directory:** `frontend`
   - **Framework Preset:** `Next.js`
4. Add the Environment Variable under **Environment Variables**:
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://saboorifashion.harshaicreations.com`
5. Click **Deploy**.
