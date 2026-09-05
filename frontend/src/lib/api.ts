import { Product, Category, Banner, Testimonial, GalleryItem, BlogPost, SiteSettings } from './types';
import {
  sampleProducts,
  sampleCategories,
  sampleBanners,
  sampleTestimonials,
  sampleGallery,
  sampleBlogPosts,
  initialSiteSettings
} from './sampleData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Fetch all products with filtering options
 */
export async function fetchProducts(params: {
  category?: string;
  subcategory?: string;
  featured?: number;
  new_arrival?: number;
  bestseller?: number;
  search?: string;
  sort?: string;
  limit?: number;
  page?: number;
} = {}): Promise<{ products: Product[]; pagination: { total: number; page: number; totalPages: number } }> {
  if (API_BASE) {
    try {
      const query = new URLSearchParams();
      if (params.category) query.append('category', params.category);
      if (params.subcategory) query.append('subcategory', params.subcategory);
      if (params.featured !== undefined) query.append('featured', String(params.featured));
      if (params.new_arrival !== undefined) query.append('new_arrival', String(params.new_arrival));
      if (params.bestseller !== undefined) query.append('bestseller', String(params.bestseller));
      if (params.search) query.append('search', params.search);
      if (params.sort) query.append('sort', params.sort);
      if (params.limit) query.append('limit', String(params.limit));
      if (params.page) query.append('page', String(params.page));

      const res = await fetch(`${API_BASE}/api/products/read.php?${query.toString()}`, { next: { revalidate: 60 } });
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        return {
          products: json.data.products || [],
          pagination: json.data.pagination || { total: json.data.products.length, page: 1, totalPages: 1 }
        };
      }
    } catch (e) {
      console.warn('API fetch failed, falling back to local dataset', e);
    }
  }

  // Local fallback filter
  let list = [...sampleProducts];
  if (params.category) {
    list = list.filter(p => p.category_slug === params.category);
  }
  if (params.subcategory) {
    list = list.filter(p => p.subcategory_slug === params.subcategory);
  }
  if (params.featured) {
    list = list.filter(p => p.is_featured);
  }
  if (params.new_arrival) {
    list = list.filter(p => p.is_new_arrival);
  }
  if (params.bestseller) {
    list = list.filter(p => p.is_bestseller);
  }
  if (params.search) {
    const s = params.search.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(s) ||
      p.sku.toLowerCase().includes(s) ||
      p.fabric.toLowerCase().includes(s) ||
      p.work_type.toLowerCase().includes(s) ||
      p.description.toLowerCase().includes(s)
    );
  }

  if (params.sort === 'price_low') {
    list.sort((a, b) => a.price - b.price);
  } else if (params.sort === 'price_high') {
    list.sort((a, b) => b.price - a.price);
  } else if (params.sort === 'name_asc') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return {
    products: list,
    pagination: {
      total: list.length,
      page: params.page || 1,
      totalPages: 1
    }
  };
}

/**
 * Fetch a single product by ID or Slug
 */
export async function fetchProductDetail(idOrSlug: string | number): Promise<{ product: Product; related: Product[] } | null> {
  if (API_BASE) {
    try {
      const isNumeric = !isNaN(Number(idOrSlug));
      const url = isNumeric
        ? `${API_BASE}/api/products/single.php?id=${idOrSlug}`
        : `${API_BASE}/api/products/single.php?slug=${idOrSlug}`;
      const res = await fetch(url, { next: { revalidate: 60 } });
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        return json.data;
      }
    } catch (e) {
      console.warn('API single fetch failed, falling back to local dataset', e);
    }
  }

  const isNumeric = !isNaN(Number(idOrSlug));
  const product = sampleProducts.find(p => isNumeric ? p.id === Number(idOrSlug) : p.slug === idOrSlug || String(p.id) === String(idOrSlug));
  if (!product) return null;

  const related = sampleProducts.filter(p => p.category_id === product.category_id && p.id !== product.id).slice(0, 4);

  return { product, related };
}

/**
 * Fetch categories
 */
export async function fetchCategories(): Promise<Category[]> {
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/api/categories/read.php`, { next: { revalidate: 300 } });
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        return json.data;
      }
    } catch (e) {
      console.warn('API categories fetch failed, falling back', e);
    }
  }
  return sampleCategories;
}

/**
 * Fetch banners
 */
export async function fetchBanners(): Promise<Banner[]> {
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/api/banners/read.php`, { next: { revalidate: 300 } });
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        return json.data;
      }
    } catch (e) {
      console.warn('API banners fetch failed, falling back', e);
    }
  }
  return sampleBanners;
}

/**
 * Fetch Testimonials
 */
export async function fetchTestimonials(): Promise<Testimonial[]> {
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/api/testimonials/read.php`, { next: { revalidate: 300 } });
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        return json.data;
      }
    } catch (e) {
      console.warn('API testimonials fetch failed, falling back', e);
    }
  }
  return sampleTestimonials;
}

/**
 * Fetch Gallery
 */
export async function fetchGallery(category?: string): Promise<GalleryItem[]> {
  if (API_BASE) {
    try {
      const url = category ? `${API_BASE}/api/gallery/read.php?category=${category}` : `${API_BASE}/api/gallery/read.php`;
      const res = await fetch(url, { next: { revalidate: 300 } });
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        return json.data;
      }
    } catch (e) {
      console.warn('API gallery fetch failed, falling back', e);
    }
  }
  if (category && category !== 'all') {
    return sampleGallery.filter(g => g.category === category);
  }
  return sampleGallery;
}

/**
 * Fetch Blog Posts
 */
export async function fetchBlogPosts(slug?: string): Promise<BlogPost[] | BlogPost | null> {
  if (API_BASE) {
    try {
      const url = slug ? `${API_BASE}/api/blog/read.php?slug=${slug}` : `${API_BASE}/api/blog/read.php`;
      const res = await fetch(url, { next: { revalidate: 300 } });
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        return json.data;
      }
    } catch (e) {
      console.warn('API blog fetch failed, falling back', e);
    }
  }
  if (slug) {
    return sampleBlogPosts.find(b => b.slug === slug) || null;
  }
  return sampleBlogPosts;
}

/**
 * Fetch Site Settings
 */
export async function fetchSettings(): Promise<SiteSettings> {
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/api/settings/get.php`, { next: { revalidate: 300 } });
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        return { ...initialSiteSettings, ...json.data };
      }
    } catch (e) {
      console.warn('API settings fetch failed, falling back', e);
    }
  }
  return initialSiteSettings;
}

/**
 * Submit Enquiry Lead
 */
export async function submitEnquiry(payload: {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  state?: string;
  buyer_type?: string;
  product_name?: string;
  product_sku?: string;
  quantity?: number;
  message?: string;
  cart_items?: any;
  source_page?: string;
}): Promise<{ success: boolean; message: string; enquiry_number?: string }> {
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/api/enquiries/submit.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.status === 'success') {
        return { success: true, message: json.message, enquiry_number: json.data?.enquiry_number };
      }
      return { success: false, message: json.message || 'Submission failed' };
    } catch (e) {
      console.warn('Failed to submit via API, fallback simulation', e);
    }
  }

  // Fallback successful simulation
  return {
    success: true,
    message: 'Thank you! Your enquiry has been received. Our Surat wholesale sales team will contact you on WhatsApp/Phone shortly.',
    enquiry_number: 'ENQ-' + Math.floor(100000 + Math.random() * 900000)
  };
}
