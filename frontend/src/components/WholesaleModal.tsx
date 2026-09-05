'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, CheckCircle2, ShieldCheck, FileText, Send } from 'lucide-react';
import { useShop } from '@/lib/context';
import { submitEnquiry } from '@/lib/api';

export default function WholesaleModal() {
  const { isWholesaleModalOpen, setIsWholesaleModalOpen } = useShop();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    category_interest: 'All Catalogs (Sarees & Lehengas)'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  if (!isWholesaleModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill your Name and WhatsApp number');
      return;
    }

    setIsSubmitting(true);
    await submitEnquiry({
      name: formData.name,
      phone: formData.phone,
      city: formData.city,
      buyer_type: 'boutique_owner',
      product_name: `Downloaded Wholesale PDF Catalog (${formData.category_interest})`,
      message: `Requested downloadable catalog for ${formData.category_interest}.`,
      source_page: 'B2B Catalog PDF Modal'
    });

    setIsSubmitting(false);
    setDownloadReady(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWholesaleModalOpen(false)}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-5 sm:p-8 z-10 border border-brand-gold/30"
        >
          <button
            onClick={() => setIsWholesaleModalOpen(false)}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-cream text-brand-maroon flex items-center justify-center mx-auto mb-3 border border-brand-maroon/20">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-gray-900">
              Download Wholesale Catalog
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Get our complete 2026 factory-rate PDF catalog with high-res saree & lehenga designs + MOQ price chart.
            </p>
          </div>

          {downloadReady ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg font-bold text-gray-900">
                Catalog Access Unlocked!
              </h4>
              <p className="text-xs text-gray-600">
                Click below to download the PDF, and our team has also sent a copy to your WhatsApp.
              </p>

              <a
                href="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600"
                download="Saboori_Fashion_Surat_Catalog_2026.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-brand-gold hover:bg-brand-goldLight text-brand-darkMaroon font-bold text-sm rounded-xl shadow-md transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Download Saboori Fashion PDF (28 MB)</span>
              </a>

              <button
                onClick={() => {
                  setDownloadReady(false);
                  setIsWholesaleModalOpen(false);
                }}
                className="text-xs text-gray-500 hover:underline block mx-auto mt-2"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name / Boutique Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Boutique"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-maroon bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98200 XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-maroon bg-gray-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your City / State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hyderabad"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-maroon bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Category Interest
                  </label>
                  <select
                    value={formData.category_interest}
                    onChange={(e) => setFormData({ ...formData, category_interest: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-maroon bg-gray-50"
                  >
                    <option value="All Catalogs">All Categories</option>
                    <option value="Silk & Bandhani Sarees">Silk & Bandhani Sarees</option>
                    <option value="Bridal Lehengas">Bridal Lehengas</option>
                    <option value="Cotton Kurtis">Cotton Kurtis</option>
                    <option value="Dress Materials">Dress Materials</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-brand-maroon hover:bg-brand-darkMaroon text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{isSubmitting ? 'Verifying...' : 'Unlock & Download PDF Catalog'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                <span>100% Privacy Protected • Direct Surat Factory Pricing</span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
