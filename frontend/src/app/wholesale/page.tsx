'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Factory, Download, ShieldCheck, Truck, MessageSquare, 
  Send, CheckCircle2, ChevronRight, Sparkles, Building2, Package
} from 'lucide-react';
import { useShop } from '@/lib/context';
import { submitEnquiry } from '@/lib/api';

export default function WholesalePage() {
  const { setIsWholesaleModalOpen } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    business_name: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    buyer_type: 'boutique_owner',
    estimated_volume: '20-50 pcs',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill Name and WhatsApp Number.');
      return;
    }

    setIsSubmitting(true);
    const res = await submitEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      state: formData.state,
      buyer_type: formData.buyer_type,
      product_name: `B2B Wholesale Inquiry (${formData.business_name || 'Boutique'}, Vol: ${formData.estimated_volume})`,
      message: formData.message,
      source_page: 'B2B Wholesale Portal'
    });

    setIsSubmitting(false);
    if (res.success) {
      setSubmittedId(res.enquiry_number || 'ENQ-CONFIRMED');
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-darkMaroon via-brand-maroon to-[#4a0e1c] text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-brand-gold/30">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-goldLight text-xs font-bold tracking-widest uppercase">
              <Factory className="w-3.5 h-3.5 text-brand-gold" />
              <span>DIRECT SURAT FACTORY SUPPLY</span>
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              B2B Wholesale & Bulk Orders at True Factory Rates
            </h1>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
              Empower your boutique, retail store, or wholesale business with factory-direct sarees, bridal lehengas, and kurti sets from Surat’s renowned Adarsh Market-2.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setIsWholesaleModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-gold hover:bg-brand-goldLight text-brand-darkMaroon font-bold text-sm rounded-xl shadow-lg transition-all hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Download Wholesale PDF (2026)</span>
              </button>

              <a
                href="https://wa.me/918780331600?text=Hello%20Saboori%20Fashion%2C%20I%20am%20interested%20in%20becoming%20a%20wholesale%20buyer."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl shadow-lg transition-all hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Factory Manager</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Order Flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-goldMuted uppercase tracking-widest block mb-1">
            Seamless Wholesale Buying
          </span>
          <h2 className="font-serif text-3xl font-bold text-gray-900">
            How Wholesale Ordering Works
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Browse Catalogs', desc: 'Explore online designs or request high-res catalog PDFs via WhatsApp.' },
            { step: '02', title: 'Add to Quote List', desc: 'Select your required pieces & color sets with low MOQ criteria.' },
            { step: '03', title: 'Get Factory Quote', desc: 'Our Surat team sends instant wholesale invoice with GST details.' },
            { step: '04', title: 'Quality Check & Pack', desc: 'Every piece is 100% inspected and packed in waterproof parcel bales.' },
            { step: '05', title: 'Fast Doorstep Dispatch', desc: 'Dispatched via trusted Surat transport with live tracking receipt.' },
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl border border-gray-200/80 shadow-sm relative space-y-2">
              <span className="font-serif font-extrabold text-3xl text-brand-gold/60">{item.step}</span>
              <h3 className="font-bold text-base text-gray-900">{item.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MOQ & Price Tiers */}
      <section id="moq" className="bg-white py-14 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-brand-goldMuted uppercase tracking-widest block mb-1">
              Transparent MOQ Policy
            </span>
            <h2 className="font-serif text-3xl font-bold text-gray-900">
              Low Minimum Order Quantities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-brand-cream/50 border border-brand-maroon/20 space-y-4">
              <h3 className="font-serif text-xl font-bold text-brand-maroon">Silk & Bandhani Sarees</h3>
              <div className="text-2xl font-bold text-gray-900">MOQ: 4 to 6 pcs</div>
              <p className="text-xs text-gray-600">Assorted color sets per design. High profit margins for boutique festive racks.</p>
              <span className="inline-block text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">Factory Rates from ₹1,250</span>
            </div>

            <div className="p-6 rounded-2xl bg-brand-maroon text-white border border-brand-gold/30 space-y-4 shadow-xl">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-xl font-bold text-brand-goldLight">Bridal Lehengas</h3>
                <span className="text-[10px] uppercase font-bold bg-brand-gold text-brand-darkMaroon px-2 py-0.5 rounded">Most Popular</span>
              </div>
              <div className="text-2xl font-bold text-white">MOQ: 2 pcs</div>
              <p className="text-xs text-gray-200">Heavy micro-velvet & zari work. Includes double dupatta sets for bridal boutiques.</p>
              <span className="inline-block text-xs font-bold text-brand-darkMaroon bg-brand-goldLight px-3 py-1 rounded-full">Factory Rates from ₹4,500</span>
            </div>

            <div className="p-6 rounded-2xl bg-brand-cream/50 border border-brand-maroon/20 space-y-4">
              <h3 className="font-serif text-xl font-bold text-brand-maroon">Cotton Kurti Catalogs</h3>
              <div className="text-2xl font-bold text-gray-900">MOQ: 8 pcs Pack</div>
              <p className="text-xs text-gray-600">Pure 60/60 cambric cotton with matching pants & malmal dupattas in full catalog sets.</p>
              <span className="inline-block text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">Factory Rates from ₹650</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Inquiry Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-white rounded-3xl border border-brand-gold/30 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-gray-900">
              Submit Direct Wholesale Quote Request
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Fill in your shop details below. Our wholesale manager will contact you with exact factory rates and catalog links.
            </p>
          </div>

          {submittedId ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900">
                Inquiry Received Successfully!
              </h3>
              <p className="text-sm text-gray-600">
                Reference ID: <strong className="text-brand-maroon font-mono">{submittedId}</strong>. Our Surat team is reviewing your requirements and will reach out shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sumanth Jain"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-brand-maroon focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Boutique / Shop Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Shringar Sarees"
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-brand-maroon focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-brand-maroon focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="shop@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-brand-maroon focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    placeholder="e.g. Pune"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-brand-maroon focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    placeholder="e.g. Maharashtra"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-brand-maroon focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Expected Monthly Volume</label>
                  <select
                    value={formData.estimated_volume}
                    onChange={(e) => setFormData({ ...formData, estimated_volume: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-brand-maroon focus:outline-none"
                  >
                    <option value="10-25 pcs">10 - 25 pieces</option>
                    <option value="25-50 pcs">25 - 50 pieces</option>
                    <option value="50-200 pcs">50 - 200 pieces</option>
                    <option value="200+ pcs">200+ pieces (Bulk Wholesaler)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Specific Requirements or Styles Interested In</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Need 20 Silk Sarees and 5 Bridal Lehengas for upcoming wedding season..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs p-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-brand-maroon focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-brand-maroon hover:bg-brand-darkMaroon text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting...' : 'Request Wholesale Quote & Callback'}</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
