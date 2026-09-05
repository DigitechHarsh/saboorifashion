'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, MessageSquare, Send, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '@/lib/context';
import { submitEnquiry } from '@/lib/api';

export default function EnquiryDrawer() {
  const {
    enquiryItems,
    isEnquiryDrawerOpen,
    setIsEnquiryDrawerOpen,
    removeFromEnquiryCart,
    updateQuantity,
    clearEnquiryCart,
    generateWhatsAppLink
  } = useShop();

  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    buyer_type: 'boutique_owner',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  if (!isEnquiryDrawerOpen) return null;

  const totalQty = enquiryItems.reduce((acc, item) => acc + item.quantity, 0);
  const estimatedTotal = enquiryItems.reduce((acc, item) => acc + (item.product.wholesale_price || item.product.price) * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your Name and WhatsApp Number.');
      return;
    }

    setIsSubmitting(true);
    const cartSummary = enquiryItems.map(item => ({
      product_id: item.product.id,
      name: item.product.name,
      sku: item.product.sku,
      quantity: item.quantity,
      wholesale_rate: item.product.wholesale_price || item.product.price
    }));

    const res = await submitEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      buyer_type: formData.buyer_type,
      product_name: `Bulk Enquiry (${enquiryItems.length} styles, ${totalQty} pcs)`,
      quantity: totalQty,
      message: formData.message,
      cart_items: cartSummary,
      source_page: 'Wholesale Enquiry Drawer'
    });

    setIsSubmitting(false);
    if (res.success) {
      setSubmitSuccess(res.enquiry_number || 'ENQ-CONFIRMED');
      clearEnquiryCart();
    } else {
      alert(res.message);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsEnquiryDrawerOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-brand-cream">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-maroon flex items-center justify-center text-brand-gold">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-gray-900 text-lg">
                    Wholesale Quote List
                  </h2>
                  <p className="text-xs text-brand-goldMuted font-semibold">
                    {enquiryItems.length} Products • {totalQty} Total Pieces
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEnquiryDrawerOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {submitSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-gray-900">
                    Quote Request Submitted!
                  </h3>
                  <p className="text-xs text-gray-600 max-w-xs mx-auto">
                    Enquiry ID: <strong className="text-brand-maroon font-mono">{submitSuccess}</strong>. Our Surat sales team will message you on WhatsApp with verified wholesale pricing and color swatches.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitSuccess(null);
                      setIsEnquiryDrawerOpen(false);
                    }}
                    className="mt-4 px-6 py-2.5 bg-brand-maroon text-white text-xs font-bold rounded-xl"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : enquiryItems.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-gray-800">
                    Your Quote List is Empty
                  </h3>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Browse our Surat sarees, lehengas, and kurtis to add items to your wholesale quotation list.
                  </p>
                  <Link
                    href="/products"
                    onClick={() => setIsEnquiryDrawerOpen(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-maroon text-white font-bold text-xs rounded-xl shadow"
                  >
                    <span>Browse Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="space-y-3">
                    {enquiryItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200/80 items-center justify-between"
                      >
                        <img
                          src={item.product.primary_image}
                          alt={item.product.name}
                          className="w-14 h-18 object-cover rounded-lg shrink-0 border border-gray-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-gray-900 truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-[10px] text-gray-500 font-mono">
                            SKU: {item.product.sku}
                          </span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-xs font-bold text-brand-maroon">
                              ₹{item.product.wholesale_price || item.product.price}
                            </span>
                            <span className="text-[10px] text-gray-400">/ piece</span>
                          </div>

                          {/* Quantity selector */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="px-2 py-0.5 text-xs font-bold text-gray-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-[10px] text-gray-400">
                              (MOQ: {item.product.moq})
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromEnquiryCart(item.product.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Submission Form Toggle */}
                  {formOpen && (
                    <form onSubmit={handleSubmit} className="mt-4 p-4 bg-brand-cream/60 rounded-xl border border-brand-maroon/20 space-y-3">
                      <h4 className="text-xs font-bold text-brand-maroon uppercase tracking-wider">
                        Your Contact Details for Quote
                      </h4>
                      <input
                        type="text"
                        placeholder="Your Name / Boutique Name *"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg bg-white"
                      />
                      <input
                        type="tel"
                        placeholder="WhatsApp / Mobile Number *"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg bg-white"
                      />
                      <input
                        type="text"
                        placeholder="City, State (e.g. Jaipur, Rajasthan)"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg bg-white"
                      />
                      <select
                        value={formData.buyer_type}
                        onChange={(e) => setFormData({ ...formData, buyer_type: e.target.value })}
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-lg bg-white"
                      >
                        <option value="boutique_owner">Boutique Owner</option>
                        <option value="retailer">Retail Shop Owner</option>
                        <option value="wholesaler">Wholesaler / Reseller</option>
                        <option value="personal_shopper">Personal / Wedding Shopper</option>
                      </select>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 bg-brand-maroon hover:bg-brand-darkMaroon text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSubmitting ? 'Sending Request...' : 'Confirm & Request Factory Quote'}</span>
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>

            {/* Footer Actions */}
            {enquiryItems.length > 0 && !submitSuccess && (
              <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 space-y-2.5">
                <div className="flex justify-between items-baseline text-sm mb-1">
                  <span className="text-gray-600 font-medium">Estimated Wholesale Value:</span>
                  <span className="text-lg font-extrabold text-brand-maroon">
                    ₹{estimatedTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Primary Action 1: Instant WhatsApp Export */}
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:scale-[1.02]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send List Directly on WhatsApp</span>
                </a>

                {/* Primary Action 2: Form Submit Toggle */}
                {!formOpen && (
                  <button
                    onClick={() => setFormOpen(true)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-brand-maroon hover:bg-brand-darkMaroon text-white font-bold text-xs rounded-xl transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Formal Quote Form</span>
                  </button>
                )}

                <button
                  onClick={clearEnquiryCart}
                  className="w-full text-center text-[11px] text-gray-400 hover:text-red-500 py-1"
                >
                  Clear All Items
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
