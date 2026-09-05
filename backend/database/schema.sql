-- ==========================================================
-- Saboori Fashion Database Schema (MySQL / phpMyAdmin)
-- Business: Saboori Fashion - Surat Ethnic Wear Manufacturer
-- Location: Shop 238-241, Lower Ground Floor, Adarsh Market-2, Ring Road, Surat
-- ==========================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+05:30";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------
-- Table structure for `admins`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `username` VARCHAR(60) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('superadmin', 'staff', 'editor') DEFAULT 'superadmin',
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default Super Admin (Username: admin, Password: Password@123)
-- Password hash generated with password_hash('Password@123', PASSWORD_BCRYPT)
INSERT INTO `admins` (`id`, `name`, `email`, `username`, `password`, `role`, `status`) VALUES
(1, 'Saboori Admin', 'admin@saboorifashion.com', 'admin', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 'superadmin', 'active')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- --------------------------------------------------------
-- Table structure for `categories`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(120) NOT NULL UNIQUE,
  `description` TEXT NULL,
  `image` VARCHAR(255) NULL,
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image`, `display_order`, `is_active`) VALUES
(1, 'Sarees', 'sarees', 'Exclusive Surat silk, designer, bandhani, wedding and daily wear sarees direct from factory.', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80', 1, 1),
(2, 'Kurtis', 'kurtis', 'Cotton, rayon, designer embroidered and catalog set kurtis at wholesale rates.', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80', 2, 1),
(3, 'Lehenga Choli', 'lehenga-choli', 'Bridal, festive, semi-stitched and traditional partywear lehengas.', 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80', 3, 1),
(4, 'Dress Materials', 'dress-materials', 'Unstitched suit sets in pure cotton, chanderi, georgette and organza.', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80', 4, 1),
(5, 'Handwork Fabrics', 'handwork-fabrics', 'Premium embroidered cuts, sequins and zari yardage fabrics for boutiques.', 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80', 5, 1),
(6, 'Chaniya Choli', 'chaniya-choli', 'Authentic Gujarati Navratri and traditional festive Chaniya Choli sets.', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80', 6, 1)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- --------------------------------------------------------
-- Table structure for `subcategories`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `subcategories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(120) NOT NULL UNIQUE,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `subcategories` (`id`, `category_id`, `name`, `slug`, `is_active`) VALUES
(1, 1, 'Designer Sarees', 'designer-sarees', 1),
(2, 1, 'Wedding Sarees', 'wedding-sarees', 1),
(3, 1, 'Bandhani Sarees', 'bandhani-sarees', 1),
(4, 1, 'Organza Sarees', 'organza-sarees', 1),
(5, 1, 'Silk Sarees', 'silk-sarees', 1),
(6, 1, 'Daily-Wear Cotton Sarees', 'cotton-sarees', 1),
(7, 2, 'Cotton Kurtis', 'cotton-kurtis', 1),
(8, 2, 'Catalog Set Kurtis', 'catalog-set-kurtis', 1),
(9, 3, 'Bridal Lehengas', 'bridal-lehengas', 1),
(10, 3, 'Traditional Lehengas', 'traditional-lehengas', 1),
(11, 4, 'Cotton Suit Materials', 'cotton-suit-materials', 1),
(12, 4, 'Partywear Dress Materials', 'partywear-dress-materials', 1)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- --------------------------------------------------------
-- Table structure for `products`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT NOT NULL,
  `subcategory_id` INT NULL,
  `sku` VARCHAR(60) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `description` TEXT NULL,
  `price` DECIMAL(10, 2) DEFAULT 0.00,
  `wholesale_price` DECIMAL(10, 2) DEFAULT 0.00,
  `price_on_enquiry` TINYINT(1) DEFAULT 0,
  `moq` INT DEFAULT 1,
  `fabric` VARCHAR(120) NULL,
  `work_type` VARCHAR(150) NULL,
  `occasion` VARCHAR(150) NULL,
  `available_colors` VARCHAR(255) NULL,
  `available_sizes` VARCHAR(255) NULL,
  `stock_status` ENUM('in_stock', 'made_to_order', 'out_of_stock') DEFAULT 'in_stock',
  `primary_image` VARCHAR(255) NOT NULL,
  `images` JSON NULL,
  `is_featured` TINYINT(1) DEFAULT 0,
  `is_new_arrival` TINYINT(1) DEFAULT 1,
  `is_bestseller` TINYINT(1) DEFAULT 0,
  `status` ENUM('published', 'draft') DEFAULT 'published',
  `meta_title` VARCHAR(255) NULL,
  `meta_description` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT,
  FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `products` (`id`, `category_id`, `subcategory_id`, `sku`, `name`, `slug`, `description`, `price`, `wholesale_price`, `price_on_enquiry`, `moq`, `fabric`, `work_type`, `occasion`, `available_colors`, `available_sizes`, `stock_status`, `primary_image`, `images`, `is_featured`, `is_new_arrival`, `is_bestseller`, `status`, `meta_title`, `meta_description`) VALUES
(1, 1, 5, 'SF-SR-101', 'Royal Kanjivaram Soft Silk Saree with Rich Pallu', 'royal-kanjivaram-soft-silk-saree', 'Mastercrafted Kanjivaram soft silk saree featuring authentic gold zari woven floral borders and heavy contrast designer pallu. Includes unstitched heavy brocade blouse piece. Ideal for boutique collections and wedding seasons.', 2450.00, 1650.00, 0, 4, 'Pure Soft Silk', 'Pure Gold Zari Weaving', 'Wedding, Festive, Reception', 'Royal Maroon, Peacock Blue, Deep Rani Pink, Bottle Green', 'Free Size (5.5m + 0.8m Blouse)', 'in_stock', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80', '["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80"]', 1, 1, 1, 'published', 'Royal Kanjivaram Soft Silk Saree - Surat Wholesale', 'Direct factory wholesale silk sarees from Saboori Fashion Surat.'),

(2, 1, 3, 'SF-BD-204', 'Surat Heritage Bandhani Saree with Gota Patti', 'surat-heritage-bandhani-saree-gota-patti', 'Traditional Gujarati tie-dye Bandhej saree with exquisite handcrafted Gota Patti border work and fine Kundan highlights. Crafted in Surat for pan-India retailers.', 1890.00, 1250.00, 0, 6, 'Georgette Silk', 'Hand Bandhej & Gota Patti', 'Puja, Traditional, Karva Chauth', 'Red & Yellow, Orange & Pink, Royal Blue', 'Free Size', 'in_stock', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80', '["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80"]', 1, 1, 1, 'published', 'Bandhani Saree Wholesale Surat', 'Authentic Surat Bandhani Saree manufacturer pricing.'),

(3, 3, 9, 'SF-LH-301', 'Bridal Velvet Semi-Stitched Lehenga with Dori & Sequin Work', 'bridal-velvet-semi-stitched-lehenga', 'Luxurious micro-velvet bridal lehenga choli with rich 3D multi-color thread, dori embroidery, and sparkling micro-sequin embellishment. Comes with heavy double net dupattas and bridal blouse piece.', 8500.00, 5600.00, 0, 2, 'Micro 9000 Velvet', 'Heavy Dori, Zari & Multi Sequin', 'Bridal, Wedding, Engagement', 'Crimson Red, Wine Burgundy, Royal Emerald', 'Semi-Stitched (Up to 44 Bust)', 'in_stock', 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80', '["https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80"]', 1, 1, 1, 'published', 'Bridal Lehenga Wholesale Surat Direct Manufacturer', 'Factory-direct bridal lehengas in wholesale MOQ from Surat.'),

(4, 2, 8, 'SF-KT-402', 'Embroidered Cotton Kurti & Pant Set (Catalog 8 Pcs)', 'embroidered-cotton-kurti-pant-set-catalog', 'Pure 60/60 Cambric Cotton printed straight kurti paired with matching trouser pants and malmal dupatta. Fine mirror and thread yoke work. Sold as full catalog pack for retail stores.', 1150.00, 750.00, 0, 8, '100% Pure Cambric Cotton', 'Foil Print with Thread & Mirror Work', 'Casual, Office Wear, Daily', 'Assorted 4 Color Combinations', 'M, L, XL, XXL, 3XL', 'in_stock', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80', '["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80"]', 1, 0, 1, 'published', 'Cotton Kurti Sets Wholesale Surat', 'Bulk cotton kurti set catalogs directly from Saboori Fashion factory.'),

(5, 1, 4, 'SF-OG-503', 'Pastel Organza Saree with Cutwork Border & Pearl Work', 'pastel-organza-saree-cutwork-border', 'Featherweight premium sheer organza saree with delicate scalloped cutwork border, thread embroidery, and hand-embellished pearl beads.', 2100.00, 1400.00, 0, 4, 'Premium Viscose Organza', 'Scallop Cutwork with Hand Pearls', 'Party Wear, Cocktail, Farewell', 'Lavender, Mint Green, Peach, Baby Pink', 'Free Size', 'in_stock', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80', '["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80"]', 1, 1, 0, 'published', 'Organza Sarees Surat Wholesale', 'Trending organza saree factory price in Surat.'),

(6, 4, 11, 'SF-DM-601', 'Chanderi Silk Unstitched Dress Material 3-Piece Suit', 'chanderi-silk-unstitched-dress-material', 'Pure Chanderi woven zari suit piece with heavy jacquard dupatta and premium santoon bottom fabric. Complete factory pack.', 1450.00, 950.00, 0, 5, 'Chanderi Silk & Santoon', 'Zari Jacquard Weave', 'Festive, Boutique Special', 'Mustard Yellow, Teal Green, Rani, Maroon', 'Top 2.5m, Bottom 2.5m, Dupatta 2.25m', 'in_stock', 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80', '["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80"]', 1, 0, 0, 'published', 'Dress Material Wholesale Surat', 'Direct wholesale dress material from Surat manufacturers.')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- --------------------------------------------------------
-- Table structure for `banners`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `banners` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` VARCHAR(255) NULL,
  `tagline` VARCHAR(150) NULL,
  `image` VARCHAR(255) NOT NULL,
  `link` VARCHAR(255) DEFAULT '/products',
  `cta_text` VARCHAR(60) DEFAULT 'Explore Catalog',
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `banners` (`id`, `title`, `subtitle`, `tagline`, `image`, `link`, `cta_text`, `display_order`, `is_active`) VALUES
(1, 'Surat’s Premier Ethnic Wear Manufacturer', 'Direct Factory Rates for Boutiques, Wholesalers & Resellers across India & Worldwide.', 'MANUFACTURER DIRECT • ADARSH MARKET-2, SURAT', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&auto=format&fit=crop&q=80', '/products', 'View Sarees & Lehengas', 1, 1),
(2, 'Exclusive Wedding & Bridal Lehengas 2026', 'Handcrafted Zari, Micro-Velvet & Sequin Masterpieces with Factory MOQ Options.', 'NEW WEDDING SEASON CATALOGS', 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=1600&auto=format&fit=crop&q=80', '/products?category=lehenga-choli', 'Explore Bridal Range', 2, 1),
(3, 'Wholesale Daily & Partywear Cotton Kurtis', 'Full Catalog Sets with Verified Fast Pan-India Transport & Logistics Support.', 'BULK ORDER SPECIAL RATES', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600&auto=format&fit=crop&q=80', '/wholesale', 'Download Wholesale PDF', 3, 1)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- --------------------------------------------------------
-- Table structure for `enquiries`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `enquiry_number` VARCHAR(30) NOT NULL UNIQUE,
  `name` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `email` VARCHAR(150) NULL,
  `city` VARCHAR(100) NULL,
  `state` VARCHAR(100) NULL,
  `buyer_type` ENUM('boutique_owner', 'retailer', 'wholesaler', 'reseller', 'personal_shopper') DEFAULT 'boutique_owner',
  `product_name` VARCHAR(255) NULL,
  `product_sku` VARCHAR(60) NULL,
  `quantity` INT DEFAULT 1,
  `message` TEXT NULL,
  `cart_items` JSON NULL,
  `source_page` VARCHAR(255) DEFAULT 'Website',
  `status` ENUM('new', 'contacted', 'quoted', 'converted', 'closed') DEFAULT 'new',
  `admin_notes` TEXT NULL,
  `assigned_to` VARCHAR(100) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `enquiries` (`id`, `enquiry_number`, `name`, `phone`, `email`, `city`, `state`, `buyer_type`, `product_name`, `product_sku`, `quantity`, `message`, `status`) VALUES
(1, 'ENQ-2026-001', 'Pooja Sharma', '+91 9820011223', 'pooja.boutique@gmail.com', 'Mumbai', 'Maharashtra', 'boutique_owner', 'Royal Kanjivaram Soft Silk Saree', 'SF-SR-101', 12, 'Need wholesale rate quotation for 12 pieces across 4 colors for wedding season.', 'new'),
(2, 'ENQ-2026-002', 'Rajesh Patel', '+91 9426098765', 'rajesh.sarees@yahoo.com', 'Ahmedabad', 'Gujarat', 'retailer', 'Surat Heritage Bandhani Saree with Gota Patti', 'SF-BD-204', 24, 'Looking for regular weekly dispatch of Bandhani catalog sets.', 'contacted')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- --------------------------------------------------------
-- Table structure for `gallery`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `category` ENUM('manufacturing', 'showroom', 'events', 'catalogs') DEFAULT 'showroom',
  `image` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `display_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `gallery` (`id`, `title`, `category`, `image`, `description`, `display_order`) VALUES
(1, 'Saboori Fashion Adarsh Market Showroom Display', 'showroom', 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop&q=80', 'Surat wholesale showroom showcase at Adarsh Market-2.', 1),
(2, 'Weaving & Embroidery Unit Operations', 'manufacturing', 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80', 'In-house precision jacquard looms and multi-head embroidery machines.', 2),
(3, 'Wholesale Dispatch & Quality Inspection', 'manufacturing', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80', '100% individual quality check before parcel packing.', 3)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- --------------------------------------------------------
-- Table structure for `testimonials`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `client_name` VARCHAR(120) NOT NULL,
  `business_name` VARCHAR(150) NULL,
  `city` VARCHAR(100) NULL,
  `rating` INT DEFAULT 5,
  `review` TEXT NOT NULL,
  `image` VARCHAR(255) NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `display_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `testimonials` (`id`, `client_name`, `business_name`, `city`, `rating`, `review`, `is_active`, `display_order`) VALUES
(1, 'Meena Aggarwal', 'Meena Sarees & Boutique', 'Jaipur', 5, 'We have been ordering silk sarees and designer bridal lehengas from Saboori Fashion for the last 3 years. The factory pricing and timely parcel dispatch to Rajasthan are unmatched.', 1, 1),
(2, 'Vipul Shah', 'Shreeji Ethnic Hub', 'Bengaluru', 5, 'Best wholesale manufacturer in Surat Ring Road. High-grade fabrics, genuine wholesale rates and quick response on WhatsApp. Highly recommended for boutique owners.', 1, 2),
(3, 'Ananya Sen', 'Parampara Silks', 'Kolkata', 5, 'Their Kanjivaram and Bandhani collection flies off the shelves during Durga Puja and wedding season. Transparent dealings and reliable quality.', 1, 3)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- --------------------------------------------------------
-- Table structure for `blog_posts`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `excerpt` TEXT NULL,
  `content` LONGTEXT NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `author` VARCHAR(100) DEFAULT 'Saboori Fashion Team',
  `tags` VARCHAR(255) NULL,
  `is_published` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `blog_posts` (`id`, `title`, `slug`, `excerpt`, `content`, `image`, `author`, `tags`, `is_published`) VALUES
(1, 'Surat Textile Market Guide: How to Buy Sarees Direct from Factory', 'surat-textile-market-guide-buy-sarees-factory-rates', 'A practical guide for boutique owners on sourcing direct from Surat manufacturers like Saboori Fashion without middleman commissions.', '<h2>Why Source Sarees Directly from Surat?</h2><p>Surat produces over 60% of India’s manmade fabric and ethnic wear. When boutique owners buy direct from Saboori Fashion at Adarsh Market-2, they gain a 25-40% profit margin advantage compared to buying from local regional distributors.</p><h3>Key Benefits</h3><ul><li>Factory-direct wholesale pricing</li><li>Direct custom color batch orders</li><li>Fast door-to-door transport tie-ups</li></ul>', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80', 'Saboori Fashion Editorial', 'Surat Wholesale, Saree Sourcing, Boutique Guide', 1),
(2, 'Top 5 Trending Ethnic Wear Fabrics for Wedding Season 2026', 'top-5-trending-ethnic-wear-fabrics-wedding-season-2026', 'From sheer organzas to rich micro 9000 velvets, here are the fabric textures dominating Indian bridal and festive retail.', '<h2>Trending Fabrics in 2026</h2><p>Organza sarees with scalloped cutwork and soft Kanjivaram silks are leading the wedding collections. Explore our latest catalog directly available for bulk booking.</p>', 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80', 'Saboori Fashion Editorial', 'Trends 2026, Lehengas, Organza Sarees', 1)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- --------------------------------------------------------
-- Table structure for `site_settings`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_settings` (
  `setting_key` VARCHAR(60) PRIMARY KEY,
  `setting_value` TEXT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES
('company_name', 'Saboori Fashion'),
('tagline', 'Manufacturer, Wholesaler & Retailer of Women\'s Ethnic Wear from Surat'),
('address', 'Shop No. 238 to 241, Lower Ground Floor, Adarsh Market-2, Ring Road, Surat, Gujarat – 395002'),
('phone_primary', '+91 87803 31600'),
('phone_secondary', '+91 81602 21162'),
('whatsapp_number', '918780331600'),
('email', 'contact@saboorifashion.com'),
('business_hours', 'Monday – Saturday: 10:00 AM – 8:30 PM (Sunday Closed)'),
('announcement_bar', 'Factory-Direct Wholesale Rates • Bulk Orders Welcome • Pan-India Fast Dispatch • Adarsh Market-2, Surat'),
('catalog_pdf_url', 'https://saboorifashion.com/catalogs/Saboori_Fashion_Wholesale_Catalog_2026.pdf'),
('map_embed_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.0888279883584!2d72.8427771!3d21.1886111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e578c772e81%3A0x8670498b2c28bb07!2sAdarsh%20Market-2%2C%20Ring%20Rd%2C%20Surat%2C%20Gujarat%20395002!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin')
ON DUPLICATE KEY UPDATE `setting_value`=VALUES(`setting_value`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
