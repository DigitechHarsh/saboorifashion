'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Phone, MessageSquare, ShoppingBag, 
  Search, ChevronDown, Building2, Download, ShieldCheck
} from 'lucide-react';
import { useShop } from '@/lib/context';
import { sampleCategories } from '@/lib/sampleData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { enquiryItems, setIsEnquiryDrawerOpen, setIsWholesaleModalOpen } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalEnquiryCount = enquiryItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Products', href: '/products', hasDropdown: true },
    { name: 'B2B Wholesale', href: '/wholesale', badge: 'Factory Rates' },
    { name: 'About Factory', href: '/about' },
    { name: 'Showroom Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-brand-darkMaroon text-brand-goldLight text-xs py-2 px-4 border-b border-brand-gold/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-gold"></span>
            <span className="tracking-wide">Surat Wholesale Textile Manufacturer • Direct Factory Rates • Pan-India Transport</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="tel:+918780331600" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>+91 87803 31600</span>
            </a>
            <span className="text-brand-gold/40">|</span>
            <span className="hidden md:inline text-gray-300">Shop 238-241, Adarsh Market-2, Surat</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-white py-4 border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="Saboori Fashion"
                className="h-11 w-auto object-contain group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-brand-maroon tracking-wider">
                  SABOORI
                </span>
                <span className="text-[10px] tracking-[0.25em] text-brand-gold uppercase font-semibold">
                  Fashion • Surat
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                if (link.hasDropdown) {
                  return (
                    <div 
                      key={link.name} 
                      className="relative group"
                      onMouseEnter={() => setProductsDropdownOpen(true)}
                      onMouseLeave={() => setProductsDropdownOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-1 text-sm font-medium py-2 transition-colors ${
                          isActive ? 'text-brand-maroon font-bold' : 'text-gray-700 hover:text-brand-maroon'
                        }`}
                      >
                        {link.name}
                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-brand-maroon transition-transform group-hover:rotate-180" />
                      </Link>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {productsDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50"
                          >
                            <div className="px-4 py-2 border-b border-gray-100">
                              <span className="text-xs font-semibold uppercase tracking-wider text-brand-maroon">
                                Categories
                              </span>
                            </div>
                            {sampleCategories.map((cat) => (
                              <Link
                                key={cat.id}
                                href={`/products?category=${cat.slug}`}
                                className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-cream hover:text-brand-maroon transition-colors"
                              >
                                <span>{cat.name}</span>
                                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                  {cat.product_count || 10}+
                                </span>
                              </Link>
                            ))}
                            <div className="mt-2 pt-2 border-t border-gray-100 px-4">
                              <Link
                                href="/products"
                                className="text-xs font-semibold text-brand-gold hover:underline block text-center py-1"
                              >
                                View All Catalogs →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm font-medium transition-colors ${
                      isActive ? 'text-brand-maroon font-bold' : 'text-gray-700 hover:text-brand-maroon'
                    }`}
                  >
                    {link.name}
                    {link.badge && (
                      <span className="absolute -top-3 -right-6 bg-brand-gold text-brand-darkMaroon text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-tighter">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-600 hover:text-brand-maroon hover:bg-gray-100 rounded-full transition-colors"
                title="Search Catalogs"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wholesale PDF Catalog Modal Trigger */}
              <button
                onClick={() => setIsWholesaleModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold bg-brand-cream text-brand-maroon border border-brand-maroon/20 hover:bg-brand-maroon hover:text-white px-3 py-2 rounded-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>

              {/* Wholesale Enquiry Drawer / Cart Icon */}
              <button
                onClick={() => setIsEnquiryDrawerOpen(true)}
                className="relative p-2 bg-brand-cream text-brand-maroon hover:bg-brand-maroon hover:text-white rounded-full transition-all border border-brand-maroon/20 shadow-sm"
                title="Wholesale Enquiry List"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalEnquiryCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-brand-darkMaroon text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                    {totalEnquiryCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-brand-maroon hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Search Dropdown Input Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pt-3"
              >
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    placeholder="Search sarees, lehengas, kurtis, silk, bandhani, SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-maroon bg-gray-50"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 bg-brand-maroon text-white text-sm font-semibold rounded-lg hover:bg-brand-darkMaroon transition-colors"
                  >
                    Search
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-brand-cream">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/logo.png"
                    alt="Saboori Fashion"
                    className="h-9 w-auto object-contain"
                  />
                  <span className="font-serif font-bold text-brand-maroon text-lg">Saboori Fashion</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-900 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">
                  Navigation
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg text-gray-800 hover:bg-brand-cream hover:text-brand-maroon font-medium transition-colors"
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="bg-brand-gold text-brand-darkMaroon text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}

                <div className="pt-4 border-t border-gray-100">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
                    Popular Categories
                  </div>
                  {sampleCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 px-3 text-sm text-gray-600 hover:text-brand-maroon"
                    >
                      • {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-2">
                <a
                  href="https://wa.me/918780331600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 text-white rounded-lg font-semibold text-sm shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Wholesale Inquiry</span>
                </a>
                <a
                  href="tel:+918780331600"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-brand-maroon text-white rounded-lg font-semibold text-sm shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Surat Showroom</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
