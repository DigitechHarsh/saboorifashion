'use client';

import React from 'react';
import { MessageSquare, Phone, ShoppingBag, Download, ArrowUp } from 'lucide-react';
import { useShop } from '@/lib/context';

export default function FloatingActions() {
  const { enquiryItems, setIsEnquiryDrawerOpen, setIsWholesaleModalOpen } = useShop();
  const totalCount = enquiryItems.reduce((acc, i) => acc + i.quantity, 0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col gap-3">
        <a
          href="https://wa.me/918780331600?text=Hello%20Saboori%20Fashion%2C%20I%20am%20interested%20in%20your%20Surat%20wholesale%20catalogs."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl transition-all hover:scale-105 whatsapp-pulse border-2 border-white/40 group"
          title="Direct WhatsApp Wholesale Chat"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="font-bold text-xs">WhatsApp Wholesale</span>
        </a>
      </div>

      {/* Mobile Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl py-2 px-3">
        <div className="grid grid-cols-4 gap-2 text-center">
          
          {/* Call Now */}
          <a
            href="tel:+918780331600"
            className="flex flex-col items-center justify-center p-1 rounded-lg text-gray-700 hover:text-brand-maroon"
          >
            <div className="w-7 h-7 rounded-full bg-brand-cream flex items-center justify-center text-brand-maroon">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold mt-1">Call Now</span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/918780331600?text=Hello%20Saboori%20Fashion%2C%20I%20want%20to%20inquire%20about%20wholesale%20catalogs."
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-1 rounded-lg text-green-700"
          >
            <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-[10px] font-bold mt-1">WhatsApp</span>
          </a>

          {/* PDF Catalog */}
          <button
            onClick={() => setIsWholesaleModalOpen(true)}
            className="flex flex-col items-center justify-center p-1 rounded-lg text-gray-700 hover:text-brand-maroon"
          >
            <div className="w-7 h-7 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-darkMaroon">
              <Download className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold mt-1">B2B PDF</span>
          </button>

          {/* Quote List Drawer */}
          <button
            onClick={() => setIsEnquiryDrawerOpen(true)}
            className="relative flex flex-col items-center justify-center p-1 rounded-lg text-brand-maroon"
          >
            <div className="w-7 h-7 rounded-full bg-brand-maroon flex items-center justify-center text-brand-gold">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold mt-1">Quote List</span>
            {totalCount > 0 && (
              <span className="absolute top-0 right-5 bg-brand-gold text-brand-darkMaroon text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
