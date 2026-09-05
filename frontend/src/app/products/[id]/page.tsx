'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  MessageSquare, Plus, Check, ShieldCheck, Truck, 
  RotateCcw, ArrowLeft, Factory, Sparkles, ChevronRight
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { sampleProducts } from '@/lib/sampleData';
import { Product } from '@/lib/types';
import { useShop } from '@/lib/context';

export default function ProductDetailPage() {
  const params = useParams();
  const idOrSlug = params.id as string;
  const { addToEnquiryCart, generateWhatsAppLink } = useShop();

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'wholesale' | 'shipping'>('details');

  useEffect(() => {
    const isNumeric = !isNaN(Number(idOrSlug));
    const found = sampleProducts.find(p =>
      isNumeric ? p.id === Number(idOrSlug) : p.slug === idOrSlug || String(p.id) === idOrSlug
    );
    if (found) {
      setProduct(found);
      setActiveImage(found.primary_image);
      setQuantity(found.moq || 1);
    }
  }, [idOrSlug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-gray-900">Product Not Found</h2>
        <p className="text-xs text-gray-500">The product catalog you are looking for is unavailable or has moved.</p>
        <Link href="/products" className="inline-block px-5 py-2.5 bg-brand-maroon text-white text-xs font-bold rounded-xl">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.primary_image];
  const relatedProducts = sampleProducts.filter(p => p.category_id === product.category_id && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addToEnquiryCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-brand-maroon">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-brand-maroon">Catalog</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/products?category=${product.category_slug}`} className="hover:text-brand-maroon">
          {product.category_name || 'Ethnic Wear'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md relative">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            {product.is_bestseller && (
              <span className="absolute top-4 left-4 bg-brand-maroon text-brand-goldLight text-xs font-bold uppercase px-3 py-1 rounded-md shadow">
                ★ Best Seller
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImage === img ? 'border-brand-maroon shadow-md scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Wholesale Actions */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Category & SKU */}
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-brand-cream text-brand-maroon font-bold text-xs rounded-md uppercase tracking-wider border border-brand-maroon/15">
                {product.category_name}
              </span>
              <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-0.5 rounded">
                SKU: {product.sku}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-brand-cream border border-brand-maroon/15 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-brand-maroon">
                  ₹{product.wholesale_price || product.price}
                </span>
                {product.wholesale_price > 0 && product.price > product.wholesale_price && (
                  <span className="text-base text-gray-400 line-through">
                    ₹{product.price}
                  </span>
                )}
                <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                  Direct Factory Wholesale Rate
                </span>
              </div>
              <p className="text-xs text-gray-600 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>Minimum Order Quantity (MOQ): <strong>{product.moq} pieces</strong> for wholesale booking.</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Key Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs">
              <div>
                <span className="text-gray-500 block">Fabric:</span>
                <span className="font-bold text-gray-900">{product.fabric || 'Pure Fabric'}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Work Type:</span>
                <span className="font-bold text-gray-900">{product.work_type || 'Designer Work'}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Occasion:</span>
                <span className="font-bold text-gray-900">{product.occasion || 'Festive & Wedding'}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Available Colors:</span>
                <span className="font-bold text-gray-900">{product.available_colors || 'Multiple Color Sets'}</span>
              </div>
            </div>
          </div>

          {/* Quantity & CTA Actions */}
          <div className="space-y-3.5 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(product.moq || 1, quantity - 1))}
                  className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-2.5 text-sm font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-6 bg-brand-maroon hover:bg-brand-darkMaroon text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {added ? <Check className="w-4 h-4 text-brand-goldLight" /> : <Plus className="w-4 h-4" />}
                <span>{added ? 'Added to Quote List!' : 'Add to Wholesale Quote List'}</span>
              </button>
            </div>

            {/* Instant WhatsApp Order */}
            <a
              href={generateWhatsAppLink(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Inquire & Order on WhatsApp (+91 87803 31600)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Tabs Section (Product Details / Wholesale Terms / Dispatch) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'details'
                ? 'border-brand-maroon text-brand-maroon'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Product Overview & Fabric Care
          </button>
          <button
            onClick={() => setActiveTab('wholesale')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'wholesale'
                ? 'border-brand-maroon text-brand-maroon'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            B2B Wholesale Ordering Terms
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'shipping'
                ? 'border-brand-maroon text-brand-maroon'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Surat Dispatch & Logistics
          </button>
        </div>

        <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          {activeTab === 'details' && (
            <div className="space-y-3">
              <p>
                Crafted using precision jacquard weaving and master embroidery techniques in Surat, Gujarat. Designed with rich finish, soft drape, and fade-resistant color fastness suited for boutique displays.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Wash Care: Dry clean recommended for silk and heavy embroidery fabrics.</li>
                <li>Length: Saree (5.5m) + unstitched blouse piece (0.8m) included.</li>
                <li>Packaging: Individual polythene zipper packs with photo catalog inserts.</li>
              </ul>
            </div>
          )}

          {activeTab === 'wholesale' && (
            <div className="space-y-3">
              <p>
                <strong>Saboori Fashion</strong> supports retailers, resellers, and boutique owners across all states of India:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Low MOQ: Wholesale rates start from {product.moq} pcs per design.</li>
                <li>Sample Orders: Single piece sampling available for verified shop owners upon request.</li>
                <li>Payment: Bank NEFT/RTGS, UPI, or Cash at Adarsh Market Surat counter.</li>
              </ul>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-3">
              <p>
                We have daily transport tie-ups with leading logistics providers departing from Surat Textile Market:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Transport Dispatch: V-Trans, ARC, Mahaveer, TCI, and express air couriers (DTDC, Delhivery, BlueDart).</li>
                <li>Delivery Time: 2 to 4 days for major metros; 4 to 6 days for regional destinations.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-gray-900">
              Related Styles in {product.category_name}
            </h3>
            <Link href={`/products?category=${product.category_slug}`} className="text-xs font-bold text-brand-maroon hover:underline">
              View All Category Styles →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
