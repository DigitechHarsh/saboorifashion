# Saboori Fashion - Surat Ethnic Wear B2B + B2C Web Platform

A production-grade, mobile-first women's ethnic wear catalog and lead-generation web application for **Saboori Fashion** (Shop 238-241, Lower Ground Floor, Adarsh Market-2, Ring Road, Surat, Gujarat).

Built with **Next.js 14 (App Router) + Framer Motion** for the frontend (deployable on Vercel) and a **PHP 8.x + MySQL / phpMyAdmin** REST API and Admin Dashboard backend (deployable on Hostinger subdomain).

---

## 🌟 Key Features

### 🛍️ Public-Facing Web Store (Next.js + Framer Motion)
- **Luxury Aesthetic**: Rich ethnic palette (Royal Maroon `#6E1329`, Champagne Gold `#D4AF37`, Ivory `#FAF7F2`, Emerald accents) with smooth micro-animations.
- **Hero Motion Banner**: Dynamic Framer Motion carousel with factory direct trust indicators and instant wholesale lead CTAs.
- **Filterable Product Catalog**: Live client-side and API filters by Category (Sarees, Kurtis, Lehengas, Dress Materials, Chaniya Choli), Subcategory, Fabric, Work type, and Price sorting.
- **Single Product Experience**: High-resolution gallery with thumbnail switcher, factory MOQ guides, fabric care specs, and instant WhatsApp ordering.
- **Interactive Wholesale Enquiry Drawer (Quote Cart)**: Add multiple items, manage piece quantities, and export directly as a formatted WhatsApp quotation or submit to the backend CRM.
- **Downloadable B2B PDF Catalog**: Lead-capture modal that delivers the 2026 wholesale PDF catalog to boutique owners.
- **Mobile-First Responsive Layout**: Sticky bottom action bar on mobile with direct **Call Now**, **WhatsApp Chat**, and **Quote List Drawer**.
- **SEO & Textile Market Pages**: Dedicated pages for About Us, Factory Heritage, Adarsh Market Showroom Gallery, and Saree Sourcing SEO Blog.

### ⚙️ PHP Backend & Standalone Admin Panel (Hostinger Subdomain)
- **Hostinger-Ready**: Native PHP PDO backend with CORS headers configured for seamless connection to Vercel frontend.
- **phpMyAdmin Database Dump**: `backend/database/schema.sql` ready to import in 1 click.
- **Admin Dashboard (`/admin/login.php`)**:
  - **KPI Analytics**: Real-time overview of active products, categories, total leads, and unhandled inquiries.
  - **Product & Catalog Manager**: Add, edit, and delete products, set MOQs, upload photos, and toggle "Price on Enquiry".
  - **CRM Lead Pipeline**: Filter inquiries by status (`New`, `Contacted`, `Quoted`, `Converted`, `Closed`), 1-click WhatsApp customer reply, and instant CSV export.
  - **Category Hierarchy**: Manage parent categories and subcategories.
  - **Site Settings**: Live management of showroom address, phone numbers, WhatsApp number, and top announcement banner text.

---

## 📂 Project Architecture

```
saboorifashion/
├── frontend/                     # Next.js 14 + Framer Motion Frontend (Deploy to Vercel)
│   ├── src/
│   │   ├── app/                  # App Router Pages (Home, Products, Wholesale, About, Gallery, Contact, Blog)
│   │   ├── components/           # Navbar, Footer, HeroSlider, ProductCard, EnquiryDrawer, QuickViewModal, FloatingActions
│   │   └── lib/                  # API bridge (with mock fallback), Context, Types, Sample Data
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/                      # PHP Backend & Admin (Deploy to Hostinger Subdomain)
│   ├── admin/                    # Standalone responsive PHP Admin Dashboard
│   ├── api/                      # RESTful JSON APIs (auth, products, categories, enquiries, banners, gallery, blog, settings, upload)
│   ├── config/                   # PDO database connection & JWT/Session auth
│   ├── database/schema.sql       # Complete MySQL schema & seed data for phpMyAdmin
│   ├── uploads/                  # Product media uploads directory
│   └── .htaccess                 # Apache routing & CORS headers
│
├── DEPLOYMENT_GUIDE.md           # Step-by-step Hostinger & Vercel deployment guide
└── Saboori-Fashion-Website-Brief.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Run the Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Run the Backend (PHP Local Server - Optional)
```bash
cd backend
php -S localhost:8000
```

---

## 🌐 Deploy to Production

Follow the comprehensive instructions in [DEPLOYMENT_GUIDE.md](file:///c:/Users/HP/OneDrive/Desktop/saboorifashion/DEPLOYMENT_GUIDE.md):
1. **Backend & Database:** Import `backend/database/schema.sql` into phpMyAdmin on Hostinger, update `backend/config/database.php`, and upload the `backend/` directory to your subdomain.
2. **Frontend:** Deploy `frontend/` to Vercel and set `NEXT_PUBLIC_API_URL` to your Hostinger subdomain URL.
