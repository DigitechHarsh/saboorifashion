export interface Product {
  id: number;
  category_id: number;
  subcategory_id?: number | null;
  sku: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  wholesale_price: number;
  price_on_enquiry: boolean;
  moq: number;
  fabric: string;
  work_type: string;
  occasion: string;
  available_colors: string;
  available_sizes: string;
  stock_status: 'in_stock' | 'made_to_order' | 'out_of_stock';
  primary_image: string;
  images: string[];
  is_featured: boolean;
  is_new_arrival: boolean;
  is_bestseller: boolean;
  category_name?: string;
  category_slug?: string;
  subcategory_name?: string;
  subcategory_slug?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  display_order: number;
  product_count?: number;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: number;
  category_id: number;
  name: string;
  slug: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  link: string;
  cta_text: string;
}

export interface Testimonial {
  id: number;
  client_name: string;
  business_name: string;
  city: string;
  rating: number;
  review: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: 'manufacturing' | 'showroom' | 'events' | 'catalogs';
  image: string;
  description: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  tags: string;
  created_at: string;
}

export interface SiteSettings {
  company_name: string;
  tagline: string;
  address: string;
  phone_primary: string;
  phone_secondary: string;
  whatsapp_number: string;
  email: string;
  business_hours: string;
  announcement_bar: string;
  catalog_pdf_url: string;
  map_embed_url: string;
}

export interface EnquiryItem {
  product: Product;
  quantity: number;
  notes?: string;
}
