'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageSquare, Plus, Eye, Check, Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';
import { useShop } from '@/lib/context';

export default function ProductCard({ product }: { product: Product }) {
  const { addToEnquiryCart, setQuickViewProduct, generateWhatsAppLink } = useShop();

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(generateWhatsAppLink(product), '_blank');
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToEnquiryCart(product, product.moq || 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-gold/30 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
        <Link href={`/products/${product.slug || product.id}`} className="block w-full h-full">
          <img
            src={product.primary_image}
            alt={product.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.is_bestseller && (
            <span className="bg-brand-maroon text-brand-goldLight text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-md tracking-wider">
              ★ Best Seller
            </span>
          )}
          {product.is_new_arrival && (
            <span className="bg-brand-gold text-brand-darkMaroon text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-md tracking-wider">
              New Arrival
            </span>
          )}
          <span className="bg-black/70 text-white backdrop-blur-sm text-[10px] font-semibold px-2 py-0.5 rounded-md">
            MOQ: {product.moq} pcs
          </span>
        </div>

        {/* Quick View Button on Desktop Hover */}
        <button
          onClick={handleQuickView}
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-xl shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
          title="Quick View Details"
        >
          <Eye className="w-4 h-4 text-brand-maroon" />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & SKU */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="text-brand-goldMuted font-semibold uppercase tracking-wider text-[11px]">
              {product.category_name || 'Ethnic Wear'}
            </span>
            <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] font-mono">
              {product.sku}
            </span>
          </div>

          {/* Title */}
          <Link href={`/products/${product.slug || product.id}`}>
            <h3 className="font-serif font-bold text-gray-900 text-sm sm:text-base line-clamp-2 hover:text-brand-maroon transition-colors mb-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Fabric & Work Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.fabric && (
              <span className="text-[11px] text-gray-600 bg-brand-cream px-2 py-0.5 rounded-md border border-brand-maroon/10">
                🧵 {product.fabric}
              </span>
            )}
            {product.work_type && (
              <span className="text-[11px] text-gray-600 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-200">
                ✨ {product.work_type}
              </span>
            )}
          </div>
        </div>

        {/* Price & Wholesale Strip */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              {product.price_on_enquiry ? (
                <div className="text-sm font-bold text-brand-maroon">
                  Price on Enquiry
                </div>
              ) : (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base sm:text-lg font-bold text-brand-maroon">
                    ₹{product.wholesale_price || product.price}
                  </span>
                  {product.wholesale_price > 0 && product.price > product.wholesale_price && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{product.price}
                    </span>
                  )}
                  <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.2 rounded">
                    Factory Rate
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {/* Direct WhatsApp button */}
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              title="Inquire on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            {/* Add to Enquiry Cart */}
            <button
              onClick={handleQuickAdd}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-brand-cream hover:bg-brand-maroon text-brand-maroon hover:text-white border border-brand-maroon/20 rounded-xl text-xs font-bold transition-all shadow-sm"
              title="Add to wholesale quotation list"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Quote</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
