'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, Truck, Factory, 
  Award, MessageSquare, Star, ChevronRight, Download, Check, Layers
} from 'lucide-react';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';
import { sampleCategories, sampleProducts, sampleTestimonials } from '@/lib/sampleData';
import { useShop } from '@/lib/context';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'bestseller' | 'new_arrival' | 'sarees'>('bestseller');
  const { setIsWholesaleModalOpen } = useShop();

  const filteredProducts = sampleProducts.filter(p => {
    if (activeTab === 'bestseller') return p.is_bestseller;
    if (activeTab === 'new_arrival') return p.is_new_arrival;
    if (activeTab === 'sarees') return p.category_slug === 'sarees';
    return true;
  });

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. Hero Banner Slider */}
      <HeroSlider />

      {/* 2. Highlight Strip (Factory Direct Trust Indicators) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 p-3 sm:p-6 bg-white rounded-2xl shadow-xl border border-brand-gold/30">
          <div className="flex items-center gap-2.5 sm:gap-3.5 p-1.5 sm:p-2">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-brand-cream text-brand-maroon flex items-center justify-center shrink-0 border border-brand-maroon/10">
              <Factory className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-gray-900 text-xs sm:text-base">Surat Mill Direct</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 hidden xs:block">Zero middlemen margins</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3.5 p-1.5 sm:p-2">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-brand-cream text-brand-maroon flex items-center justify-center shrink-0 border border-brand-maroon/10">
              <Truck className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-gray-900 text-xs sm:text-base">Pan-India Dispatch</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 hidden xs:block">500+ cities logistics</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3.5 p-1.5 sm:p-2">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-brand-cream text-brand-maroon flex items-center justify-center shrink-0 border border-brand-maroon/10">
              <Award className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-gray-900 text-xs sm:text-base">Wholesale MOQ</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 hidden xs:block">From 2-4 pcs/design</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3.5 p-1.5 sm:p-2">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-brand-cream text-brand-maroon flex items-center justify-center shrink-0 border border-brand-maroon/10">
              <ShieldCheck className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-gray-900 text-xs sm:text-base">Adarsh Market-2</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 hidden xs:block">Ring Road, Surat</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold text-brand-goldMuted uppercase tracking-widest block mb-1">
            Curated Collections
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-gray-900">
            Explore Ethnic Wear Categories
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-brand-gold mx-auto mt-2 sm:mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6">
          {sampleCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className="group block relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md border border-gray-100 hover:border-brand-gold/50 transition-all hover:shadow-xl"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 text-white">
                  <h3 className="font-serif text-xs sm:text-base font-bold group-hover:text-brand-goldLight transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] text-gray-300 font-medium">
                    {cat.product_count || 12}+ Styles →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Products Tabbed Showcase (Best Sellers / New Arrivals / Sarees) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-bold text-brand-goldMuted uppercase tracking-widest">
              Direct from Surat Looms
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              Featured Wholesale Catalogs
            </h2>
          </div>

          {/* Interactive Scrollable Tabs */}
          <div className="w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl shadow-sm border border-gray-200 whitespace-nowrap min-w-max">
              <button
                onClick={() => setActiveTab('bestseller')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'bestseller'
                    ? 'bg-brand-maroon text-white shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Best Sellers
              </button>
              <button
                onClick={() => setActiveTab('new_arrival')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'new_arrival'
                    ? 'bg-brand-maroon text-white shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                New Season
              </button>
              <button
                onClick={() => setActiveTab('sarees')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'sarees'
                    ? 'bg-brand-maroon text-white shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Silk & Bandhani Sarees
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-maroon hover:bg-brand-darkMaroon text-white font-bold text-sm rounded-xl shadow-lg transition-all hover:scale-105"
          >
            <span>Explore All Factory Catalogs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. Wholesale Call-to-Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-darkMaroon via-[#540d1e] to-brand-maroon text-white p-8 sm:p-14 shadow-2xl border border-brand-gold/40">
          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 text-brand-goldLight text-xs font-bold tracking-wider uppercase border border-brand-gold/30">
              <Factory className="w-3.5 h-3.5 text-brand-gold" />
              <span>B2B Wholesale Advantage</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Get Surat Factory Rates for Your Boutique or Retail Store
            </h2>

            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              Order directly from Saboori Fashion with minimum order quantities as low as 2 to 4 pieces per design. We provide door-to-door courier & transport delivery across India.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setIsWholesaleModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-gold hover:bg-brand-goldLight text-brand-darkMaroon font-bold text-sm rounded-xl shadow-lg transition-all hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Download Wholesale PDF Catalog</span>
              </button>

              <a
                href="https://wa.me/918780331600?text=Hello%20Saboori%20Fashion%2C%20I%20am%20a%20retailer%20and%20need%20wholesale%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl shadow-lg transition-all hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Business Desk</span>
              </a>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-gold via-transparent to-transparent hidden lg:block" />
        </div>
      </section>

      {/* 6. Why Choose Saboori Fashion (Manufacturing Capabilities) */}
      <section className="bg-white py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-brand-goldMuted uppercase tracking-widest block mb-2">
              Surat Manufacturing Excellence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
              Why Boutique Owners Trust Saboori Fashion
            </h2>
            <div className="w-20 h-1 bg-brand-gold mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-brand-cream/50 border border-brand-maroon/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-maroon text-brand-gold flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900">Direct Factory Pricing</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                By producing fabrics and sarees on our own Surat jacquard looms and embroidery machines, we eliminate 2 to 3 layers of broker margins, giving you 30-40% higher retail profits.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-cream/50 border border-brand-maroon/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-maroon text-brand-gold flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900">100% Quality Inspection</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every single saree, kurti, and lehenga undergoes stringent manual checking for weaving flaws, zari finish, and color fastness before waterproof parcel dispatch.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-cream/50 border border-brand-maroon/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-maroon text-brand-gold flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900">Dedicated WhatsApp Support</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our sales team in Adarsh Market-2 shares real-time product videos, live catalog photos, and dispatch tracking details instantly over WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Client & Retailer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-goldMuted uppercase tracking-widest block mb-2">
            Verified Reviews
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
            What Retailers & Wholesalers Say
          </h2>
          <div className="w-20 h-1 bg-brand-gold mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleTestimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic leading-relaxed mb-4">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{t.client_name}</h4>
                  <p className="text-xs text-brand-maroon font-semibold">{t.business_name}</p>
                </div>
                <span className="text-xs text-gray-400">{t.city}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Surat Showroom Location Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="p-6 sm:p-8 rounded-2xl bg-brand-cream border border-brand-maroon/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-maroon mb-1">
              Visiting Surat Textile Market?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Visit our wholesale showroom at <strong>Shop No. 238 to 241, Lower Ground Floor, Adarsh Market-2, Ring Road, Surat</strong> for live inspection.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-maroon text-white text-xs sm:text-sm font-bold rounded-xl shadow hover:bg-brand-darkMaroon shrink-0 transition-colors"
          >
            <span>View Showroom Map</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
