# Website Development Brief: Saboori Fashion

## 1. Project Overview

**Business Name:** Saboori Fashion
**Industry:** Textile Manufacturing, Wholesale & Retail — Women's Ethnic Wear
**Location:** Shop No. 238 to 241, Lower Ground Floor, Adarsh Market-2, Ring Road, Surat, Gujarat – 395002
**Contact:** +91 87803 31600 / +91 81602 21162

**Goal:** Build a professional, mobile-friendly B2B + B2C catalog-style website that showcases Saboori Fashion's product range, communicates factory-rate pricing for bulk buyers, generates inquiries/leads (via WhatsApp, call, and contact form), and is fully manageable through a custom admin panel — without needing a developer for day-to-day updates.

**Primary Users:**
- **Bulk/Wholesale buyers** (boutique owners, retailers, resellers) — need catalogs, MOQ info, WhatsApp/call-to-order.
- **Retail/individual shoppers** — browsing sarees, kurtis, lehengas for personal use.
- **Admin/Staff** — need to manage products, inquiries, and content easily.

**Website Type:** Not a full e-commerce checkout site (typical for wholesale textile businesses) — instead, a **catalog + lead-generation** website with "Enquire Now" / "Order on WhatsApp" buttons on every product, PLUS an optional simple cart/enquiry-cart feature for bulk order requests. (Full payment gateway can be a future phase.)

---

## 2. Site Structure (Public-Facing Pages)

### 2.1 Home Page
- Hero banner/slider (rotating images of sarees, lehengas, kurtis — manageable from admin)
- Short intro: "Manufacturer, Wholesaler & Retailer of Women's Ethnic Wear from Surat"
- Highlight strip: Factory Rates | Bulk Orders Welcome | Manufacturer Direct | Pan-India Supply
- Featured Categories grid (Sarees, Kurtis, Lehenga Choli, Dress Materials, Chaniya Choli)
- Best-selling / New Arrivals product carousel
- "Why Choose Us" section (manufacturing capability, quality, pricing, experience)
- Customer/retailer testimonials (optional, admin-manageable)
- Call-to-action banner: "Get Wholesale Pricing – Enquire Now"
- Footer with address, map, phone numbers, business hours, social links

### 2.2 About Us Page
- Company story, years of experience, manufacturing facility overview
- Manufacturer + Wholesaler + Retailer positioning
- Mission/quality statement
- Photos of factory/showroom (admin-uploadable gallery)

### 2.3 Products / Catalog Pages
Structured by **Category → Sub-category → Product**:

- **Sarees**
  - Designer Sarees
  - Wedding Sarees
  - Printed Sarees
  - Bandhani Sarees
  - Organza Sarees
  - Silk Sarees
  - Daily-Wear Cotton Sarees
- **Kurtis**
  - Cotton Kurtis
  - Catalog/Set Kurtis
- **Lehenga Choli**
  - Traditional Lehengas
  - Bridal Lehengas
- **Dress Materials**
- **Handwork Fabrics**
- **Chaniya Choli**

**Each Product Listing Page includes:**
- Image gallery (multiple angles, zoom-enabled)
- Product name / catalog name
- Fabric type, work type, available colors/sizes
- MOQ (Minimum Order Quantity) for wholesale
- Price (or "Price on Enquiry" toggle — since wholesale pricing often varies)
- "Enquire on WhatsApp" button (pre-filled message with product name)
- "Add to Enquiry List" (mini cart for bulk enquiry, not payment)
- Related products section

**Category/Listing Page:**
- Filters: price range, fabric, color, occasion, new arrivals
- Sort by: newest, popularity, price
- Grid/list toggle
- Pagination or infinite scroll

### 2.4 Wholesale / Bulk Orders Page
- Explanation of wholesale process (MOQ, catalog booking, factory-rate pricing)
- Downloadable catalog (PDF) option per category
- Steps: Browse → Enquire → Get Quote → Confirm Order → Dispatch
- Trade terms (payment mode, shipping/logistics info, return policy for defects)

### 2.5 Gallery Page
- Factory/manufacturing unit photos
- Showroom photos
- Event/exhibition participation photos (if any)

### 2.6 Contact Us Page
- Shop address with embedded Google Map
- Phone numbers (click-to-call on mobile)
- WhatsApp chat button (floating on all pages)
- Contact/enquiry form (Name, Phone, Email, City, Product Interest, Message)
- Business hours

### 2.7 Blog / Updates (Optional, Good for SEO)
- New catalog launches
- Fashion trend articles (bandhani trends, wedding season lehenga guide, etc.)
- Helps rank for searches like "saree wholesaler Surat," "kurti manufacturer Surat"

### 2.8 Floating/Persistent Elements (All Pages)
- Floating WhatsApp chat icon
- Sticky "Call Now" button on mobile
- Cookie/consent banner (if using analytics)

---

## 3. Admin Panel — Detailed Operations

The admin panel is the core requirement: a secure, role-based dashboard so staff can manage the entire site without coding.

### 3.1 Authentication & Access Control
- Admin login (email/username + password, with optional OTP for extra security)
- Role-based access:
  - **Super Admin:** full access
  - **Staff/Editor:** manage products & enquiries only (no user/settings access)
- Password reset via email/OTP
- Activity log (who changed what, and when)

### 3.2 Dashboard (Overview)
- Total products, categories, active enquiries (at a glance)
- Recent enquiries/leads list
- Website traffic snapshot (if analytics integrated)
- Quick-add buttons (New Product, New Banner, New Blog Post)

### 3.3 Product Management (CRUD)
- **Add/Edit/Delete Product** with fields:
  - Product name / catalog code
  - Category & sub-category (dropdown, linked to category management)
  - Description, fabric details, work type, occasion tags
  - Multiple images upload (drag-drop, reorder, set primary image)
  - Price / "Price on Enquiry" toggle
  - MOQ, available sizes, available colors (variant management)
  - Stock status: In Stock / Made-to-Order / Out of Stock
  - SEO fields: meta title, meta description, URL slug
  - Featured product toggle (shows on homepage)
  - New Arrival toggle & auto-expire date
  - Publish/Unpublish (draft vs live)
- **Bulk operations:** bulk upload via CSV/Excel (for adding many catalog items at once), bulk category assignment, bulk publish/unpublish
- **Product duplication** (clone existing product to speed up similar entries)

### 3.4 Category & Sub-Category Management
- Add/edit/delete categories and sub-categories (Sarees → Bandhani Sarees, etc.)
- Reorder categories (drag-drop) to control homepage/menu order
- Category banner image & description (for SEO and category landing pages)
- Enable/disable category visibility

### 3.5 Banner / Slider Management
- Upload/edit/delete homepage slider banners
- Set banner order, link (to category/product/page), and active date range
- Manage promotional strip text (e.g., "Wedding Season Sale — Enquire Now")

### 3.6 Enquiry / Lead Management (CRM-lite)
- View all enquiries (from contact form, product enquiry, WhatsApp click-tracking if integrated)
- Fields captured: name, phone, email, product interested, message, date/time, source page
- Status tagging: New / Contacted / Quoted / Converted / Closed
- Assign enquiry to staff member
- Export enquiries to Excel/CSV
- Search & filter by date, status, product/category
- Notes/follow-up log per enquiry

### 3.7 Catalog/PDF Management
- Upload downloadable PDF catalogs per category
- Track number of downloads (optional analytics)
- Enable/disable catalog visibility

### 3.8 Gallery Management
- Upload/organize/delete factory & showroom images
- Create photo albums (e.g., "Factory Tour," "Exhibition 2026")

### 3.9 Blog Management (if included)
- Add/edit/delete blog posts with rich text editor, images, SEO fields
- Draft/Publish/Schedule posts
- Category/tag management for blog

### 3.10 Testimonials Management
- Add/edit/delete customer/retailer testimonials
- Approve/reject if submitted via a public form
- Reorder display sequence

### 3.11 Pages / Content Management
- Edit static page content (About Us, Wholesale Info, Contact Us) via a simple WYSIWYG editor
- Edit footer content, business hours, social media links
- Manage site-wide announcement bar (e.g., "Closed on Sundays")

### 3.12 SEO & Marketing Tools
- Global meta tags, sitemap.xml auto-generation, robots.txt editor
- Google Analytics / Meta Pixel integration fields
- Redirect manager (301 redirects for old/changed URLs)

### 3.13 User & Staff Management
- Add/remove admin/staff accounts
- Assign roles/permissions
- View staff activity logs

### 3.14 Settings
- Business info (address, phone, email, map coordinates) — reflected sitewide
- WhatsApp number(s) used for chat buttons
- Theme/color settings (basic branding controls)
- Backup & restore option for database/media

### 3.15 Notifications
- Email/SMS/WhatsApp notification to admin on new enquiry submission
- Optional auto-reply to customer confirming enquiry received

---

## 4. Suggested Technology Stack

| Layer | Recommended Options |
|---|---|
| Frontend | React.js / Next.js (SEO-friendly, fast) or WordPress (faster to launch, easier for non-tech staff) |
| Backend/Admin | Custom Node.js + Express admin panel, or WordPress + WooCommerce (catalog mode), or headless CMS (Strapi) |
| Database | MySQL / PostgreSQL / MongoDB |
| Hosting | Any Indian/global hosting supporting Node or PHP (e.g., Hostinger, AWS, DigitalOcean) |
| Image Storage/CDN | Cloudinary / AWS S3 + CloudFront for fast image loading |
| Communication | WhatsApp Business API/click-to-chat links, Twilio/MSG91 for SMS, SMTP for email |

*Note: For a business at this stage, a WordPress + WooCommerce (in catalog-only mode) or a CMS like Strapi/Next.js combo is often faster and more cost-effective to launch than fully custom code, while still supporting all admin operations listed above.*

---

## 5. Design Guidelines
- Warm, rich color palette reflecting ethnic wear (maroon, gold, jewel tones) balanced with a clean white/neutral background for product clarity
- High-quality product photography is critical — recommend a consistent white/light backdrop for catalog shots
- Mobile-first design (majority of B2B textile buyers browse/order via mobile & WhatsApp)
- Fast-loading image galleries (lazy loading, compressed images)
- Trust signals: years in business, "Manufacturer Direct," GST number (if to be displayed), certifications if any

---

## 6. Suggested Development Phases

1. **Phase 1:** Core site (Home, About, Product Catalog, Contact) + Admin panel for Products, Categories, Enquiries
2. **Phase 2:** Banners, Gallery, Testimonials, Blog, PDF catalogs
3. **Phase 3:** SEO tools, analytics integration, staff roles, notifications
4. **Phase 4 (Optional):** Full e-commerce cart + payment gateway + shipment tracking if the business wants to move into direct online selling

---

*This brief can be handed directly to a web developer/agency, or used as a structured prompt for an AI website-building tool.*
