'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Plus, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { useShop } from '@/lib/context';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToEnquiryCart, generateWhatsAppLink } = useShop();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [qty, setQty] = useState<number>(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const activeImage = selectedImg || quickViewProduct.primary_image;
  const images = quickViewProduct.images && quickViewProduct.images.length > 0
    ? quickViewProduct.images
    : [quickViewProduct.primary_image];

  const handleAdd = () => {
    addToEnquiryCart(quickViewProduct, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 border border-brand-gold/20"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
            {/* Gallery Column */}
            <div className="space-y-3">
              <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={activeImage}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(img)}
                      className={`w-16 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        activeImage === img ? 'border-brand-maroon scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Information Column */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-brand-goldMuted font-bold uppercase tracking-wider mb-1">
                  <span>{quickViewProduct.category_name || 'Ethnic Wear'}</span>
                  <span>•</span>
                  <span className="font-mono text-gray-500">{quickViewProduct.sku}</span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {quickViewProduct.name}
                </h2>

                {/* Price Strip */}
                <div className="p-3 rounded-xl bg-brand-cream border border-brand-maroon/10 mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-brand-maroon">
                      ₹{quickViewProduct.wholesale_price || quickViewProduct.price}
                    </span>
                    {quickViewProduct.wholesale_price > 0 && quickViewProduct.price > quickViewProduct.wholesale_price && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{quickViewProduct.price}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full ml-auto">
                      Direct Wholesale Rate
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Minimum Order Quantity (MOQ): <strong>{quickViewProduct.moq} pieces</strong></span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  {quickViewProduct.description}
                </p>

                {/* Specs List */}
                <div className="space-y-1.5 text-xs text-gray-700 border-t border-b border-gray-100 py-3 mb-4">
                  {quickViewProduct.fabric && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Fabric:</span>
                      <span className="font-semibold">{quickViewProduct.fabric}</span>
                    </div>
                  )}
                  {quickViewProduct.work_type && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Work Type:</span>
                      <span className="font-semibold">{quickViewProduct.work_type}</span>
                    </div>
                  )}
                  {quickViewProduct.occasion && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Occasion:</span>
                      <span className="font-semibold">{quickViewProduct.occasion}</span>
                    </div>
                  )}
                  {quickViewProduct.available_colors && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Available Colors:</span>
                      <span className="font-semibold">{quickViewProduct.available_colors}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Controls */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                    <button
                      onClick={() => setQty(Math.max(quickViewProduct.moq || 1, qty - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-sm font-bold text-gray-800">{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="flex-1 py-2.5 px-4 bg-brand-maroon hover:bg-brand-darkMaroon text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    {added ? <Check className="w-4 h-4 text-brand-goldLight" /> : <Plus className="w-4 h-4" />}
                    <span>{added ? 'Added to Quote List!' : 'Add to Wholesale List'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={generateWhatsAppLink(quickViewProduct)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Order on WhatsApp</span>
                  </a>

                  <Link
                    href={`/products/${quickViewProduct.slug || quickViewProduct.id}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition-colors"
                  >
                    <span>Full Product Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
