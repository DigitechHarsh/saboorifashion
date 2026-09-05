'use client';

import React, { useState } from 'react';
import { Save, CheckCircle2, Shield, MapPin, Phone, Mail, MessageSquare, Download } from 'lucide-react';
import { initialSiteSettings } from '@/lib/sampleData';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    company_name: initialSiteSettings.company_name || 'Saboori Fashion',
    tagline: initialSiteSettings.tagline || 'Surat Textile Manufacturer',
    phone_primary: initialSiteSettings.phone_primary || '+91 87803 31600',
    phone_secondary: initialSiteSettings.phone_secondary || '+91 81602 21162',
    whatsapp_number: initialSiteSettings.whatsapp_number || '+91 87803 31600',
    email: initialSiteSettings.email || 'contact@saboorifashion.com',
    address: initialSiteSettings.address || 'Shop No. 238 to 241, Lower Ground Floor, Adarsh Market-2, Ring Road, Surat',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '395002',
    announcement_text: initialSiteSettings.announcement_bar || 'Surat Wholesale Textile Manufacturer • Direct Factory Rates • Pan-India Transport',
    pdf_catalog_url: initialSiteSettings.catalog_pdf_url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600'
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">Showroom & Website Settings</h1>
        <p className="text-xs text-gray-400">Configure your Surat showroom contact details, WhatsApp desk numbers, and announcement ticker.</p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-green-950/60 border border-green-800 text-green-200 text-xs flex items-center gap-2.5 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
          <span>Settings updated successfully! Changes are live across the storefront.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Contact Information Card */}
        <div className="p-6 rounded-3xl bg-[#171724] border border-[#2a2a3c] shadow-lg space-y-4">
          <h2 className="font-serif text-base font-bold text-brand-goldLight border-b border-[#2a2a3c] pb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-gold" />
            <span>Communication & WhatsApp Desk</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Primary Showroom Call Number *</label>
              <input
                type="text"
                required
                value={settings.phone_primary}
                onChange={(e) => setSettings({ ...settings, phone_primary: e.target.value })}
                className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Secondary Helpline Number</label>
              <input
                type="text"
                value={settings.phone_secondary}
                onChange={(e) => setSettings({ ...settings, phone_secondary: e.target.value })}
                className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">WhatsApp Business Number (with country code) *</label>
              <input
                type="text"
                required
                value={settings.whatsapp_number}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Support Email Address *</label>
              <input
                type="email"
                required
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>
        </div>

        {/* Location & Address Card */}
        <div className="p-6 rounded-3xl bg-[#171724] border border-[#2a2a3c] shadow-lg space-y-4">
          <h2 className="font-serif text-base font-bold text-brand-goldLight border-b border-[#2a2a3c] pb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-gold" />
            <span>Surat Wholesale Showroom Location</span>
          </h2>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Full Showroom Address *</label>
            <input
              type="text"
              required
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">City</label>
              <input
                type="text"
                value={settings.city}
                onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">State</label>
              <input
                type="text"
                value={settings.state}
                onChange={(e) => setSettings({ ...settings, state: e.target.value })}
                className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Pincode</label>
              <input
                type="text"
                value={settings.pincode}
                onChange={(e) => setSettings({ ...settings, pincode: e.target.value })}
                className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold font-mono"
              />
            </div>
          </div>
        </div>

        {/* Announcement Bar & PDF Catalog URL */}
        <div className="p-6 rounded-3xl bg-[#171724] border border-[#2a2a3c] shadow-lg space-y-4">
          <h2 className="font-serif text-base font-bold text-brand-goldLight border-b border-[#2a2a3c] pb-3 flex items-center gap-2">
            <Download className="w-4 h-4 text-brand-gold" />
            <span>Announcement Ticker & PDF Catalog</span>
          </h2>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Top Announcement Bar Text</label>
            <input
              type="text"
              value={settings.announcement_text}
              onChange={(e) => setSettings({ ...settings, announcement_text: e.target.value })}
              className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Downloadable B2B PDF Catalog Link</label>
            <input
              type="text"
              value={settings.pdf_catalog_url}
              onChange={(e) => setSettings({ ...settings, pdf_catalog_url: e.target.value })}
              className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3.5 bg-gradient-to-r from-brand-gold to-brand-goldLight text-brand-darkMaroon font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Showroom Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
