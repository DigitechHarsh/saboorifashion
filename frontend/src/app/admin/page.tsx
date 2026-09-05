'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, FolderTree, MessageSquare, TrendingUp, 
  ArrowRight, Plus, Eye, Phone, CheckCircle2, Clock, Factory
} from 'lucide-react';
import { sampleProducts, sampleCategories } from '@/lib/sampleData';

export default function AdminDashboardPage() {
  const [productsCount, setProductsCount] = useState(sampleProducts.length);
  const [categoriesCount, setCategoriesCount] = useState(sampleCategories.length);
  const [enquiries, setEnquiries] = useState<any[]>([
    {
      id: 101,
      name: 'Radhika Sharma',
      business_name: 'Radhika Ethnic Boutique',
      phone: '9820012345',
      city: 'Jaipur, RJ',
      buyer_type: 'Boutique Owner',
      product_name: 'Bulk Saree & Lehenga Order (45 pcs)',
      status: 'new',
      created_at: 'Just now'
    },
    {
      id: 102,
      name: 'Vikram Mehta',
      business_name: 'Mehta Sarees & Silks',
      phone: '9876543210',
      city: 'Ahmedabad, GJ',
      buyer_type: 'Wholesaler',
      product_name: 'Pure Kanjivaram Soft Silk Saree (24 pcs)',
      status: 'contacted',
      created_at: '2 hours ago'
    },
    {
      id: 103,
      name: 'Sunita Rao',
      business_name: 'Rao Fashion Hub',
      phone: '9123456780',
      city: 'Hyderabad, TS',
      buyer_type: 'Retailer',
      product_name: 'Cotton Kurti Catalog Set (32 pcs)',
      status: 'converted',
      created_at: 'Yesterday'
    }
  ]);

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-darkMaroon via-[#45101d] to-[#1f1a28] border border-brand-gold/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-goldLight text-[11px] font-bold tracking-wider uppercase">
            <Factory className="w-3.5 h-3.5 text-brand-gold" />
            <span>Surat Adarsh Market-2 • Direct Looms</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Welcome to Saboori Fashion Admin
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Manage your ethnic wear catalog products, wholesale quotation leads, and factory rates.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/products"
            className="px-4 py-2.5 bg-brand-gold hover:bg-brand-goldLight text-brand-darkMaroon font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Product</span>
          </Link>
          <Link
            href="/admin/enquiries"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 border border-white/15"
          >
            <MessageSquare className="w-4 h-4 text-green-400" />
            <span>View Leads</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-[#171724] border border-[#2a2a3c] shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Products</span>
            <div className="w-9 h-9 rounded-xl bg-brand-maroon/30 text-brand-gold flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-serif">{productsCount}</div>
          <span className="text-[11px] text-green-400 flex items-center gap-1">
            <span>●</span> All Live in Storefront
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#171724] border border-[#2a2a3c] shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Categories</span>
            <div className="w-9 h-9 rounded-xl bg-brand-gold/15 text-brand-gold flex items-center justify-center">
              <FolderTree className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-serif">{categoriesCount}</div>
          <span className="text-[11px] text-gray-400">Sarees, Lehengas, Kurtis</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#171724] border border-[#2a2a3c] shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">B2B Enquiries</span>
            <div className="w-9 h-9 rounded-xl bg-green-950/50 text-green-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-serif">{enquiries.length}</div>
          <span className="text-[11px] text-brand-gold">1 New Lead Today</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#171724] border border-[#2a2a3c] shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Direct Factory Supply</span>
            <div className="w-9 h-9 rounded-xl bg-blue-950/50 text-blue-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-serif">500+</div>
          <span className="text-[11px] text-gray-400">Cities Dispatch Network</span>
        </div>
      </div>

      {/* Recent Enquiries & Leads Section */}
      <div className="p-6 rounded-3xl bg-[#171724] border border-[#2a2a3c] shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#2a2a3c] pb-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-white">Recent Wholesale Leads</h2>
            <p className="text-xs text-gray-400">Customer requests from website & quotation drawer</p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs text-brand-gold hover:underline font-semibold flex items-center gap-1"
          >
            <span>View All Enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-white/5 uppercase tracking-wider text-[10px] text-gray-400">
              <tr>
                <th className="p-3">Customer / Boutique</th>
                <th className="p-3">City</th>
                <th className="p-3">Buyer Type</th>
                <th className="p-3">Requested Catalog</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3">
                    <strong className="text-white block font-medium">{enq.name}</strong>
                    <span className="text-gray-400 text-[11px]">{enq.business_name}</span>
                  </td>
                  <td className="p-3 text-gray-300">{enq.city}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-gray-300 text-[10px]">
                      {enq.buyer_type}
                    </span>
                  </td>
                  <td className="p-3 max-w-xs truncate text-gray-300">{enq.product_name}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      enq.status === 'new'
                        ? 'bg-amber-500/20 text-amber-300'
                        : enq.status === 'contacted'
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-green-500/20 text-green-300'
                    }`}>
                      {enq.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <a
                      href={`https://wa.me/91${enq.phone}?text=Hello%20${encodeURIComponent(enq.name)}%2C%20thank%20you%20for%20inquiring%20with%20Saboori%20Fashion%20Surat.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-[11px] shadow"
                    >
                      <Phone className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Catalog Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-[#171724] border border-[#2a2a3c] shadow-md space-y-3">
          <h3 className="font-serif text-base font-bold text-white">Popular Catalog Categories</h3>
          <p className="text-xs text-gray-400">Overview of current running products per category</p>
          <div className="space-y-2 pt-2">
            {sampleCategories.slice(0, 4).map((cat) => (
              <div key={cat.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs">
                <span className="font-semibold text-white">{cat.name}</span>
                <span className="text-brand-gold font-bold">{cat.product_count || 12} Designs</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#171724] border border-[#2a2a3c] shadow-md space-y-3">
          <h3 className="font-serif text-base font-bold text-white">Direct Surat Showroom Actions</h3>
          <p className="text-xs text-gray-400">Quick links for showroom operations & catalog updates</p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link
              href="/admin/products"
              className="p-3 rounded-xl bg-brand-cream/10 border border-brand-gold/20 hover:bg-brand-cream/20 text-brand-goldLight text-xs font-bold text-center block transition-all"
            >
              Manage Products
            </Link>
            <Link
              href="/admin/categories"
              className="p-3 rounded-xl bg-brand-cream/10 border border-brand-gold/20 hover:bg-brand-cream/20 text-brand-goldLight text-xs font-bold text-center block transition-all"
            >
              Manage Categories
            </Link>
            <Link
              href="/admin/enquiries"
              className="p-3 rounded-xl bg-brand-cream/10 border border-brand-gold/20 hover:bg-brand-cream/20 text-brand-goldLight text-xs font-bold text-center block transition-all"
            >
              Wholesale Quotes
            </Link>
            <Link
              href="/admin/settings"
              className="p-3 rounded-xl bg-brand-cream/10 border border-brand-gold/20 hover:bg-brand-cream/20 text-brand-goldLight text-xs font-bold text-center block transition-all"
            >
              Showroom Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
