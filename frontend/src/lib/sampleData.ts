import { Product, Category, Banner, Testimonial, GalleryItem, BlogPost, SiteSettings } from './types';

export const initialSiteSettings: SiteSettings = {
  company_name: "Saboori Fashion",
  tagline: "Manufacturer, Wholesaler & Retailer of Women's Ethnic Wear from Surat",
  address: "Shop No. 238 to 241, Lower Ground Floor, Adarsh Market-2, Ring Road, Surat, Gujarat – 395002",
  phone_primary: "+91 87803 31600",
  phone_secondary: "+91 81602 21162",
  whatsapp_number: "918780331600",
  email: "contact@saboorifashion.com",
  business_hours: "Monday – Saturday: 10:00 AM – 8:30 PM (Sunday Closed)",
  announcement_bar: "Direct Factory Wholesale Rates • Pan-India Express Courier & Transport Dispatch • Adarsh Market-2, Surat",
  catalog_pdf_url: "#",
  map_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.0888279883584!2d72.8427771!3d21.1886111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e578c772e81%3A0x8670498b2c28bb07!2sAdarsh%20Market-2%2C%20Ring%20Rd%2C%20Surat%2C%20Gujarat%20395002!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
};

export const sampleCategories: Category[] = [
  {
    id: 1,
    name: "Sarees",
    slug: "sarees",
    description: "Exclusive Surat soft silk, designer, bandhani, wedding and daily wear sarees direct from factory.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    display_order: 1,
    product_count: 24,
    subcategories: [
      { id: 1, category_id: 1, name: "Designer Sarees", slug: "designer-sarees" },
      { id: 2, category_id: 1, name: "Wedding Sarees", slug: "wedding-sarees" },
      { id: 3, category_id: 1, name: "Bandhani Sarees", slug: "bandhani-sarees" },
      { id: 4, category_id: 1, name: "Organza Sarees", slug: "organza-sarees" },
      { id: 5, category_id: 1, name: "Silk Sarees", slug: "silk-sarees" },
      { id: 6, category_id: 1, name: "Daily-Wear Cotton Sarees", slug: "cotton-sarees" }
    ]
  },
  {
    id: 2,
    name: "Kurtis",
    slug: "kurtis",
    description: "Cotton cambric, rayon, embroidered 3-piece sets and catalog kurti packs at wholesale prices.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80",
    display_order: 2,
    product_count: 18,
    subcategories: [
      { id: 7, category_id: 2, name: "Cotton Kurtis", slug: "cotton-kurtis" },
      { id: 8, category_id: 2, name: "Catalog Set Kurtis", slug: "catalog-set-kurtis" }
    ]
  },
  {
    id: 3,
    name: "Lehenga Choli",
    slug: "lehenga-choli",
    description: "Bridal micro-velvet, festive zari work, and designer semi-stitched lehengas.",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80",
    display_order: 3,
    product_count: 15,
    subcategories: [
      { id: 9, category_id: 3, name: "Bridal Lehengas", slug: "bridal-lehengas" },
      { id: 10, category_id: 3, name: "Traditional Lehengas", slug: "traditional-lehengas" }
    ]
  },
  {
    id: 4,
    name: "Dress Materials",
    slug: "dress-materials",
    description: "Unstitched suit material sets in pure cotton, chanderi, georgette and organza.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80",
    display_order: 4,
    product_count: 12,
    subcategories: [
      { id: 11, category_id: 4, name: "Cotton Suit Materials", slug: "cotton-suit-materials" },
      { id: 12, category_id: 4, name: "Partywear Dress Materials", slug: "partywear-dress-materials" }
    ]
  },
  {
    id: 5,
    name: "Handwork Fabrics",
    slug: "handwork-fabrics",
    description: "Premium embroidered cuts, sequins and zari yardage fabrics for boutiques and designers.",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80",
    display_order: 5,
    product_count: 9
  },
  {
    id: 6,
    name: "Chaniya Choli",
    slug: "chaniya-choli",
    description: "Authentic Gujarati Navratri and traditional festive Chaniya Choli sets with real mirror and gamthi work.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80",
    display_order: 6,
    product_count: 11
  }
];

export const sampleProducts: Product[] = [
  {
    id: 1,
    category_id: 1,
    subcategory_id: 5,
    sku: "SF-SR-101",
    name: "Royal Kanjivaram Soft Silk Saree with Rich Pallu",
    slug: "royal-kanjivaram-soft-silk-saree",
    description: "Mastercrafted Kanjivaram soft silk saree featuring authentic gold zari woven floral borders and heavy contrast designer pallu. Includes unstitched heavy brocade blouse piece. Ideal for boutique collections and wedding seasons.",
    price: 2450,
    wholesale_price: 1650,
    price_on_enquiry: false,
    moq: 4,
    fabric: "Pure Soft Silk",
    work_type: "Pure Gold Zari Weaving",
    occasion: "Wedding, Festive, Reception",
    available_colors: "Royal Maroon, Peacock Blue, Deep Rani Pink, Bottle Green",
    available_sizes: "Free Size (5.5m + 0.8m Blouse)",
    stock_status: "in_stock",
    primary_image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80"
    ],
    is_featured: true,
    is_new_arrival: true,
    is_bestseller: true,
    category_name: "Sarees",
    category_slug: "sarees",
    subcategory_name: "Silk Sarees",
    subcategory_slug: "silk-sarees"
  },
  {
    id: 2,
    category_id: 1,
    subcategory_id: 3,
    sku: "SF-BD-204",
    name: "Surat Heritage Bandhani Saree with Hand Gota Patti",
    slug: "surat-heritage-bandhani-saree-gota-patti",
    description: "Traditional Gujarati tie-dye Bandhej saree with exquisite handcrafted Gota Patti border work and fine Kundan highlights. Crafted in Surat for pan-India retailers seeking high-turnover festive stock.",
    price: 1890,
    wholesale_price: 1250,
    price_on_enquiry: false,
    moq: 6,
    fabric: "Georgette Silk",
    work_type: "Hand Bandhej & Gota Patti",
    occasion: "Puja, Traditional, Karva Chauth",
    available_colors: "Red & Yellow, Orange & Pink, Royal Blue",
    available_sizes: "Free Size",
    stock_status: "in_stock",
    primary_image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    is_featured: true,
    is_new_arrival: true,
    is_bestseller: true,
    category_name: "Sarees",
    category_slug: "sarees",
    subcategory_name: "Bandhani Sarees",
    subcategory_slug: "bandhani-sarees"
  },
  {
    id: 3,
    category_id: 3,
    subcategory_id: 9,
    sku: "SF-LH-301",
    name: "Bridal Velvet Semi-Stitched Lehenga with Dori & Sequin Work",
    slug: "bridal-velvet-semi-stitched-lehenga",
    description: "Luxurious micro-velvet bridal lehenga choli with rich 3D multi-color thread, dori embroidery, and sparkling micro-sequin embellishment. Comes with heavy double net dupattas and bridal blouse piece.",
    price: 8500,
    wholesale_price: 5600,
    price_on_enquiry: false,
    moq: 2,
    fabric: "Micro 9000 Velvet",
    work_type: "Heavy Dori, Zari & Multi Sequin",
    occasion: "Bridal, Wedding, Engagement",
    available_colors: "Crimson Red, Wine Burgundy, Royal Emerald",
    available_sizes: "Semi-Stitched (Up to 44 Bust)",
    stock_status: "in_stock",
    primary_image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80"
    ],
    is_featured: true,
    is_new_arrival: true,
    is_bestseller: true,
    category_name: "Lehenga Choli",
    category_slug: "lehenga-choli",
    subcategory_name: "Bridal Lehengas",
    subcategory_slug: "bridal-lehengas"
  },
  {
    id: 4,
    category_id: 2,
    subcategory_id: 8,
    sku: "SF-KT-402",
    name: "Embroidered Cotton Kurti & Pant Set (Catalog 8 Pcs)",
    slug: "embroidered-cotton-kurti-pant-set-catalog",
    description: "Pure 60/60 Cambric Cotton printed straight kurti paired with matching trouser pants and malmal dupatta. Fine mirror and thread yoke work. Sold as full catalog pack for retail stores.",
    price: 1150,
    wholesale_price: 750,
    price_on_enquiry: false,
    moq: 8,
    fabric: "100% Pure Cambric Cotton",
    work_type: "Foil Print with Thread & Mirror Work",
    occasion: "Casual, Office Wear, Daily",
    available_colors: "Assorted 4 Color Combinations",
    available_sizes: "M, L, XL, XXL, 3XL",
    stock_status: "in_stock",
    primary_image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80"
    ],
    is_featured: true,
    is_new_arrival: false,
    is_bestseller: true,
    category_name: "Kurtis",
    category_slug: "kurtis",
    subcategory_name: "Catalog Set Kurtis",
    subcategory_slug: "catalog-set-kurtis"
  },
  {
    id: 5,
    category_id: 1,
    subcategory_id: 4,
    sku: "SF-OG-503",
    name: "Pastel Organza Saree with Cutwork Border & Pearl Work",
    slug: "pastel-organza-saree-cutwork-border",
    description: "Featherweight premium sheer organza saree with delicate scalloped cutwork border, thread embroidery, and hand-embellished pearl beads.",
    price: 2100,
    wholesale_price: 1400,
    price_on_enquiry: false,
    moq: 4,
    fabric: "Premium Viscose Organza",
    work_type: "Scallop Cutwork with Hand Pearls",
    occasion: "Party Wear, Cocktail, Farewell",
    available_colors: "Lavender, Mint Green, Peach, Baby Pink",
    available_sizes: "Free Size",
    stock_status: "in_stock",
    primary_image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80"
    ],
    is_featured: true,
    is_new_arrival: true,
    is_bestseller: false,
    category_name: "Sarees",
    category_slug: "sarees",
    subcategory_name: "Organza Sarees",
    subcategory_slug: "organza-sarees"
  },
  {
    id: 6,
    category_id: 4,
    subcategory_id: 11,
    sku: "SF-DM-601",
    name: "Chanderi Silk Unstitched Dress Material 3-Piece Suit",
    slug: "chanderi-silk-unstitched-dress-material",
    description: "Pure Chanderi woven zari suit piece with heavy jacquard dupatta and premium santoon bottom fabric. Complete factory pack.",
    price: 1450,
    wholesale_price: 950,
    price_on_enquiry: false,
    moq: 5,
    fabric: "Chanderi Silk & Santoon",
    work_type: "Zari Jacquard Weave",
    occasion: "Festive, Boutique Special",
    available_colors: "Mustard Yellow, Teal Green, Rani, Maroon",
    available_sizes: "Top 2.5m, Bottom 2.5m, Dupatta 2.25m",
    stock_status: "in_stock",
    primary_image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80"
    ],
    is_featured: true,
    is_new_arrival: false,
    is_bestseller: false,
    category_name: "Dress Materials",
    category_slug: "dress-materials",
    subcategory_name: "Cotton Suit Materials",
    subcategory_slug: "cotton-suit-materials"
  },
  {
    id: 7,
    category_id: 6,
    subcategory_id: null,
    sku: "SF-CC-702",
    name: "Navratri Special Gamthi Work Chaniya Choli with Real Mirrors",
    slug: "navratri-special-gamthi-work-chaniya-choli",
    description: "Authentic Gujarati traditional cotton Chaniya Choli with 8-meter flaring ghagra, heavy real glass mirror work, gamthi thread embroidery, and tie-up koti blouse with matching bandhani dupatta.",
    price: 3800,
    wholesale_price: 2600,
    price_on_enquiry: true,
    moq: 3,
    fabric: "Heavy Pure Cotton",
    work_type: "Real Mirror & Traditional Gamthi Work",
    occasion: "Navratri, Garba Night, Folk Festival",
    available_colors: "Black & Multicolour, Yellow & Rani, Parrot Green",
    available_sizes: "Free Size (Up to 42 Waist, 42 Length)",
    stock_status: "in_stock",
    primary_image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80"
    ],
    is_featured: true,
    is_new_arrival: true,
    is_bestseller: true,
    category_name: "Chaniya Choli",
    category_slug: "chaniya-choli"
  },
  {
    id: 8,
    category_id: 1,
    subcategory_id: 1,
    sku: "SF-DS-809",
    name: "Designer Georgette Sequence Saree with Mono Net Blouse",
    slug: "designer-georgette-sequence-saree",
    description: "Contemporary bollywood style 5mm multi-tonal sequin work saree on flowy premium 60-gram georgette base with unstitched heavy tone-to-tone designer blouse piece.",
    price: 1950,
    wholesale_price: 1300,
    price_on_enquiry: false,
    moq: 4,
    fabric: "60-Gram Georgette",
    work_type: "5mm Sparkling Micro Sequin Work",
    occasion: "Cocktail Party, Reception, Sangeet",
    available_colors: "Wine, Midnight Blue, Emerald Green, Rose Gold",
    available_sizes: "Free Size (5.5m + 0.8m Blouse)",
    stock_status: "in_stock",
    primary_image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    is_featured: false,
    is_new_arrival: true,
    is_bestseller: true,
    category_name: "Sarees",
    category_slug: "sarees",
    subcategory_name: "Designer Sarees",
    subcategory_slug: "designer-sarees"
  }
];

export const sampleBanners: Banner[] = [
  {
    id: 1,
    title: "Surat’s Premier Ethnic Wear Manufacturer",
    subtitle: "Direct Factory Wholesale Rates for Boutiques, Wholesalers & Resellers Pan-India & Worldwide.",
    tagline: "MANUFACTURER DIRECT • ADARSH MARKET-2, SURAT",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&auto=format&fit=crop&q=80",
    link: "/products",
    cta_text: "Explore Full Catalog"
  },
  {
    id: 2,
    title: "Exclusive Wedding & Bridal Lehengas 2026",
    subtitle: "Handcrafted Zari, Micro-Velvet & Sequin Masterpieces with Low MOQ Factory Booking.",
    tagline: "NEW BRIDAL SEASON ARRIVALS",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=1600&auto=format&fit=crop&q=80",
    link: "/products?category=lehenga-choli",
    cta_text: "View Bridal Collection"
  },
  {
    id: 3,
    title: "Daily & Festive Cotton Kurti Catalog Sets",
    subtitle: "Pure 60/60 Cambric cotton sets with verified fast express dispatch across all states.",
    tagline: "BULK ORDER SPECIAL FACTORY RATES",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600&auto=format&fit=crop&q=80",
    link: "/wholesale",
    cta_text: "Download Wholesale PDF"
  }
];

export const sampleTestimonials: Testimonial[] = [
  {
    id: 1,
    client_name: "Meena Aggarwal",
    business_name: "Meena Sarees & Bridal Boutique",
    city: "Jaipur, Rajasthan",
    rating: 5,
    review: "We have been ordering silk sarees and designer bridal lehengas from Saboori Fashion for the last 3 years. Their factory direct pricing and prompt transport dispatch to Rajasthan give us unbeatable margins."
  },
  {
    id: 2,
    client_name: "Vipul Shah",
    business_name: "Shreeji Ethnic Hub",
    city: "Bengaluru, Karnataka",
    rating: 5,
    review: "Best wholesale manufacturer in Surat Adarsh Market. High quality finishing, accurate MOQs, and their instant WhatsApp customer response makes stock re-ordering effortless."
  },
  {
    id: 3,
    client_name: "Ananya Sen",
    business_name: "Parampara Silks & Textiles",
    city: "Kolkata, West Bengal",
    rating: 5,
    review: "Their Kanjivaram and Bandhani collection flies off our store shelves during festive and wedding seasons. Honest pricing and authentic Surat craftsmanship!"
  }
];

export const sampleGallery: GalleryItem[] = [
  {
    id: 1,
    title: "Adarsh Market Showroom Display",
    category: "showroom",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop&q=80",
    description: "Our main wholesale showroom display at Lower Ground Floor, Adarsh Market-2, Ring Road, Surat."
  },
  {
    id: 2,
    title: "In-House Looms & Weaving Unit",
    category: "manufacturing",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80",
    description: "State-of-the-art jacquard looms producing signature soft silks and zari borders."
  },
  {
    id: 3,
    title: "100% Quality Check & Packing Division",
    category: "manufacturing",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
    description: "Every single saree and lehenga is inspected for defects before secure bulk parcel packing."
  },
  {
    id: 4,
    title: "Textile Expo Participation",
    category: "events",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=80",
    description: "Showcasing Surat's finest ethnic wear craftsmanship at national textile exhibitions."
  }
];

export const sampleBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Surat Textile Market Guide: How Boutique Owners Can Buy Sarees Direct from Factory",
    slug: "surat-textile-market-guide-buy-sarees-factory-rates",
    excerpt: "A practical guide for boutique owners on sourcing direct from Surat manufacturers like Saboori Fashion without middleman commissions.",
    content: "Surat produces over 60% of India’s ethnic wear. By sourcing directly from Saboori Fashion at Adarsh Market-2, retailers enjoy 25-40% higher profit margins and direct color batch selection.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    author: "Saboori Fashion Editorial",
    tags: "Surat Wholesale, Saree Sourcing, Boutique Business",
    created_at: "2026-08-15"
  },
  {
    id: 2,
    title: "Top 5 Trending Ethnic Wear Fabrics for Wedding Season 2026",
    slug: "top-5-trending-ethnic-wear-fabrics-wedding-season-2026",
    excerpt: "From sheer cutwork organzas to rich micro 9000 velvets, here are the fabric textures dominating Indian bridal and festive retail.",
    content: "Organza sarees with scalloped cutwork and soft Kanjivaram silks are dominating bulk bookings this season. Learn how to stock for maximum turnover.",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80",
    author: "Saboori Fashion Editorial",
    tags: "Trends 2026, Lehengas, Organza Sarees",
    created_at: "2026-08-28"
  }
];
