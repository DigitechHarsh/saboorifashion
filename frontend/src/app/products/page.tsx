'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Filter, Grid, List, Search, RotateCcw, 
  SlidersHorizontal, ChevronDown, Check, X, Loader2
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { sampleCategories, sampleProducts } from '@/lib/sampleData';
import { Product } from '@/lib/types';

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get('category') || 'all';
  const initialSearch = searchParams?.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [selectedWork, setSelectedWork] = useState<string>('all');
  const [priceSort, setPriceSort] = useState<string>('newest');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (searchParams) {
      const cat = searchParams.get('category');
      if (cat) setSelectedCategory(cat);
      const q = searchParams.get('search');
      if (q) setSearchQuery(q);
    }
  }, [searchParams]);

  const uniqueFabrics = useMemo(() => {
    const set = new Set<string>();
    sampleProducts.forEach(p => { if (p.fabric) set.add(p.fabric); });
    return Array.from(set);
  }, []);

  const uniqueWorkTypes = useMemo(() => {
    const set = new Set<string>();
    sampleProducts.forEach(p => { if (p.work_type) set.add(p.work_type); });
    return Array.from(set);
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...sampleProducts];

    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category_slug === selectedCategory);
    }

    if (selectedFabric !== 'all') {
      list = list.filter(p => p.fabric === selectedFabric);
    }

    if (selectedWork !== 'all') {
      list = list.filter(p => p.work_type === selectedWork);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.work_type.toLowerCase().includes(q)
      );
    }

    if (priceSort === 'price_low') {
      list.sort((a, b) => (a.wholesale_price || a.price) - (b.wholesale_price || b.price));
    } else if (priceSort === 'price_high') {
      list.sort((a, b) => (b.wholesale_price || b.price) - (a.wholesale_price || a.price));
    } else if (priceSort === 'name_asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [selectedCategory, selectedFabric, selectedWork, priceSort, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedFabric('all');
    setSelectedWork('all');
    setPriceSort('newest');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Title & Breadcrumb */}
      <div className="bg-brand-cream/80 p-6 sm:p-8 rounded-2xl border border-brand-maroon/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-goldMuted uppercase tracking-widest block mb-1">
            Surat Wholesale Textile Catalogs
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-maroon">
            Women's Ethnic Wear Collection
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Browse our factory-rate sarees, lehengas, kurtis, and unstitched dress materials direct from Surat.
          </p>
        </div>

        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-brand-maroon text-white text-xs font-bold rounded-xl shadow"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters & Sort</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filter (Desktop) */}
        <aside className="hidden lg:block space-y-6">
          <div className="p-5 bg-white rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="font-serif font-bold text-gray-900 text-base">Filter Catalogs</span>
              <button
                onClick={resetFilters}
                className="text-xs text-brand-maroon hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Categories
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-brand-maroon text-white'
                      : 'text-gray-700 hover:bg-brand-cream'
                  }`}
                >
                  <span>All Categories</span>
                  <span>{sampleProducts.length}</span>
                </button>
                {sampleCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? 'bg-brand-maroon text-white'
                        : 'text-gray-700 hover:bg-brand-cream'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span>{cat.product_count || 10}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Fabric
              </label>
              <select
                value={selectedFabric}
                onChange={(e) => setSelectedFabric(e.target.value)}
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-maroon"
              >
                <option value="all">All Fabrics</option>
                {uniqueFabrics.map((fab) => (
                  <option key={fab} value={fab}>{fab}</option>
                ))}
              </select>
            </div>

            {/* Work Type Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Work Type
              </label>
              <select
                value={selectedWork}
                onChange={(e) => setSelectedWork(e.target.value)}
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-maroon"
              >
                <option value="all">All Work Types</option>
                {uniqueWorkTypes.map((work) => (
                  <option key={work} value={work}>{work}</option>
                ))}
              </select>
            </div>

            {/* Quick WhatsApp Inquiry Box */}
            <div className="p-4 bg-brand-cream rounded-xl border border-brand-maroon/20 space-y-2">
              <span className="text-xs font-bold text-brand-maroon block">Need Custom Batch Orders?</span>
              <p className="text-[11px] text-gray-600">
                Contact our factory manager directly for customized color dyeing and large wholesale bookings.
              </p>
              <a
                href="https://wa.me/918780331600"
                target="_blank"
                rel="noreferrer"
                className="block text-center py-2 bg-green-600 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-green-700"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </aside>

        {/* Main Products Grid Column */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Controls Bar */}
          <div className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search styles, SKU, fabric..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-maroon"
              />
            </div>

            {/* Results Count & Sort Dropdown */}
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
              <span className="text-xs text-gray-500">
                Showing <strong>{filteredProducts.length}</strong> items
              </span>

              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
                className="text-xs p-2 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-maroon font-semibold"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="name_asc">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 p-8 space-y-3">
              <p className="text-gray-500 font-serif text-lg">No products found matching your filters.</p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-brand-maroon text-white text-xs font-bold rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="w-80 bg-white h-full p-5 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-serif font-bold text-gray-900 text-lg">Filter & Sort</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg"
                >
                  <option value="all">All Categories</option>
                  {sampleCategories.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Fabric</label>
                <select
                  value={selectedFabric}
                  onChange={(e) => setSelectedFabric(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg"
                >
                  <option value="all">All Fabrics</option>
                  {uniqueFabrics.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Sort By</label>
                <select
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-brand-maroon text-white font-bold text-xs rounded-xl shadow"
              >
                Apply Filters ({filteredProducts.length} Items)
              </button>
              <button
                onClick={resetFilters}
                className="w-full py-2 bg-gray-100 text-gray-700 font-semibold text-xs rounded-xl"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <Loader2 className="w-8 h-8 text-brand-maroon animate-spin mx-auto mb-3" />
        <p className="text-xs text-gray-500 font-medium">Loading Saboori Fashion Catalogs...</p>
      </div>
    }>
      <ProductsCatalogContent />
    </Suspense>
  );
}
