import React from 'react';
import Link from 'next/link';
import { 
  Phone, Mail, MapPin, Clock, MessageSquare, 
  ShieldCheck, Truck, Award, Factory, ChevronRight
} from 'lucide-react';
import { sampleCategories } from '@/lib/sampleData';

export default function Footer() {
  return (
    <footer className="bg-brand-darkMaroon text-white pt-16 pb-24 md:pb-12 border-t-2 border-brand-gold/30">
      {/* Top Highlights Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-goldLight">Manufacturer Direct</h4>
              <p className="text-xs text-gray-300">Unbeatable factory wholesale rates</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-goldLight">Pan-India Transport</h4>
              <p className="text-xs text-gray-300">Fast dispatch to all states & cities</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-goldLight">100% Quality Check</h4>
              <p className="text-xs text-gray-300">Every piece inspected before packing</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-goldLight">B2B + B2C Friendly</h4>
              <p className="text-xs text-gray-300">Low MOQ for boutique owners</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand & Address Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
              <img
                src="/logo.png"
                alt="Saboori Fashion"
                className="h-10 w-auto object-contain brightness-110"
              />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-brand-goldLight">
                SABOORI FASHION
              </span>
              <p className="text-xs text-brand-gold/80 tracking-widest uppercase">Surat Textile Hub</p>
            </div>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed pr-4">
            Leading manufacturer, wholesaler, and exporter of authentic Indian ethnic wear. Sourcing the finest Surat silk sarees, designer bridal lehengas, cotton kurtis, and unstitched dress materials direct from our state-of-the-art weaving facilities.
          </p>

          <div className="space-y-2 pt-2 text-sm text-gray-200">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
              <span>Shop No. 238 to 241, Lower Ground Floor, Adarsh Market-2, Ring Road, Surat, Gujarat – 395002</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-brand-gold shrink-0" />
              <div className="flex gap-2">
                <a href="tel:+918780331600" className="hover:text-brand-gold transition-colors">+91 87803 31600</a>
                <span>/</span>
                <a href="tel:+918160221162" className="hover:text-brand-gold transition-colors">+91 81602 21162</a>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand-gold shrink-0" />
              <a href="mailto:contact@saboorifashion.com" className="hover:text-brand-gold transition-colors">contact@saboorifashion.com</a>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Mon – Sat: 10:00 AM – 8:30 PM (Sun Closed)</span>
            </div>
          </div>
        </div>

        {/* Categories Column */}
        <div className="space-y-3">
          <h3 className="font-serif text-base font-bold text-brand-gold tracking-wide uppercase border-b border-brand-gold/20 pb-2">
            Catalog Categories
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {sampleCategories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="hover:text-brand-gold transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-brand-gold/60" />
                  <span>{cat.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Wholesale & Quick Links */}
        <div className="space-y-3">
          <h3 className="font-serif text-base font-bold text-brand-gold tracking-wide uppercase border-b border-brand-gold/20 pb-2">
            Wholesale & B2B
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/wholesale" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-brand-gold/60" />
                <span>Wholesale Ordering Process</span>
              </Link>
            </li>
            <li>
              <Link href="/wholesale#moq" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-brand-gold/60" />
                <span>MOQ & Pricing Tiers</span>
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-brand-gold/60" />
                <span>Surat Manufacturing Unit</span>
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-brand-gold/60" />
                <span>Adarsh Market Showroom</span>
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-brand-gold/60" />
                <span>Surat Saree Sourcing Blog</span>
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-gold transition-colors flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-brand-gold/60" />
                <span>Location Map & Inquiry</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* WhatsApp & Fast Inquiry */}
        <div className="space-y-4">
          <h3 className="font-serif text-base font-bold text-brand-gold tracking-wide uppercase border-b border-brand-gold/20 pb-2">
            Direct WhatsApp Desk
          </h3>
          <p className="text-xs text-gray-300">
            Get instant wholesale rates, video-call showroom selections, and bulk catalog PDF downloads directly on WhatsApp:
          </p>

          <a
            href="https://wa.me/918780331600?text=Hello%20Saboori%20Fashion%2C%20I%20am%20interested%20in%20your%20wholesale%20catalogs."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-green-600/30"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Chat with Surat Sales Team</span>
          </a>

          <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-gray-300">
            <span className="text-brand-gold font-semibold">📍 Visiting Surat?</span> Walk in at Adarsh Market-2, Ring Road for live physical inspection of all running catalogs!
          </div>
        </div>
      </div>

      {/* Copyright Sub-footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <p>© {new Date().getFullYear()} Saboori Fashion (Surat). All Rights Reserved. Women’s Ethnic Wear Manufacturer & Wholesaler.</p>
        <div className="flex items-center gap-4">
          <span>Adarsh Market-2, Surat</span>
          <span>•</span>
          <a href="https://wa.me/918780331600" className="text-brand-gold hover:underline">WhatsApp: +91 87803 31600</a>
        </div>
      </div>
    </footer>
  );
}
