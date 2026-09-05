'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, Phone, Mail, Search, CheckCircle, 
  Clock, Download, Trash2, Filter 
} from 'lucide-react';

interface Enquiry {
  id: number;
  enquiry_number: string;
  name: string;
  phone: string;
  email?: string;
  city?: string;
  state?: string;
  buyer_type?: string;
  product_name?: string;
  quantity?: number;
  message?: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  created_at: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([
    {
      id: 201,
      enquiry_number: 'ENQ-892102',
      name: 'Radhika Sharma',
      phone: '9820012345',
      email: 'radhika.boutique@gmail.com',
      city: 'Jaipur',
      state: 'Rajasthan',
      buyer_type: 'Boutique Owner',
      product_name: 'Bulk Enquiry (3 styles, 45 pcs)',
      quantity: 45,
      message: 'Need wholesale price for upcoming festive exhibition. Please send color cards.',
      status: 'new',
      created_at: '2026-09-05 13:45'
    },
    {
      id: 202,
      enquiry_number: 'ENQ-783912',
      name: 'Vikram Mehta',
      phone: '9876543210',
      email: 'vikram@mehtasarees.com',
      city: 'Ahmedabad',
      state: 'Gujarat',
      buyer_type: 'Wholesaler / Reseller',
      product_name: 'Pure Kanjivaram Soft Silk Saree',
      quantity: 24,
      message: 'Interested in regular 100 pcs monthly order. What is your transport delivery timeline?',
      status: 'contacted',
      created_at: '2026-09-05 11:20'
    },
    {
      id: 203,
      enquiry_number: 'ENQ-654120',
      name: 'Sunita Rao',
      phone: '9123456780',
      email: 'sunita.rao@yahoo.com',
      city: 'Hyderabad',
      state: 'Telangana',
      buyer_type: 'Retail Shop Owner',
      product_name: 'Cotton Kurti Catalog Set',
      quantity: 32,
      message: 'Downloaded 2026 PDF catalog, want to order sample 8 pcs pack.',
      status: 'converted',
      created_at: '2026-09-04 17:10'
    },
    {
      id: 204,
      enquiry_number: 'ENQ-543219',
      name: 'Pooja Agarwal',
      phone: '9833445566',
      email: 'pooja.style@gmail.com',
      city: 'Kolkata',
      state: 'West Bengal',
      buyer_type: 'Boutique Owner',
      product_name: 'Bridal Velvet Lehenga Choli',
      quantity: 6,
      message: 'Looking for 6 bridal designs for wedding customer orders.',
      status: 'contacted',
      created_at: '2026-09-03 14:00'
    }
  ]);

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = enquiries.filter(e => {
    const matchesStatus = filterStatus === 'all' || e.status === filterStatus;
    const matchesSearch = !search.trim() ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      (e.city && e.city.toLowerCase().includes(search.toLowerCase())) ||
      (e.product_name && e.product_name.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const updateStatus = (id: number, status: Enquiry['status']) => {
    setEnquiries(enquiries.map(e => e.id === id ? { ...e, status } : e));
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this quotation enquiry record?')) {
      setEnquiries(enquiries.filter(e => e.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Wholesale Enquiries & B2B Leads</h1>
          <p className="text-xs text-gray-400">Total {enquiries.length} quote submissions from website & drawers</p>
        </div>

        <button
          onClick={() => alert('Exporting all quotation leads to CSV...')}
          className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 border border-white/10"
        >
          <Download className="w-4 h-4 text-brand-gold" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#171724] border border-[#2a2a3c] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, phone, city, SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-gold"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'new', 'contacted', 'converted'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filterStatus === st
                  ? 'bg-brand-gold text-brand-darkMaroon font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="rounded-3xl bg-[#171724] border border-[#2a2a3c] shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-white/5 uppercase tracking-wider text-[10px] text-gray-400 border-b border-[#2a2a3c]">
              <tr>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Location & Role</th>
                <th className="p-4">Product Inquiry</th>
                <th className="p-4">Message Note</th>
                <th className="p-4">Lead Status</th>
                <th className="p-4 text-right">Contact / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((enq) => (
                <tr key={enq.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <strong className="text-white block font-medium">{enq.name}</strong>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-0.5">
                      <Phone className="w-3 h-3 text-brand-gold" />
                      <a href={`tel:+91${enq.phone}`} className="hover:underline">{enq.phone}</a>
                    </div>
                    {enq.email && (
                      <span className="text-[10px] text-gray-500 block">{enq.email}</span>
                    )}
                  </td>

                  <td className="p-4">
                    <span className="text-white block font-medium">{enq.city || 'Surat'}, {enq.state || 'India'}</span>
                    <span className="text-[10px] text-brand-gold uppercase tracking-wider font-semibold">
                      {enq.buyer_type}
                    </span>
                  </td>

                  <td className="p-4">
                    <strong className="text-gray-200 block truncate max-w-xs">{enq.product_name}</strong>
                    <span className="text-[10px] text-gray-400">Qty: {enq.quantity || 1} pcs • ID: {enq.enquiry_number}</span>
                  </td>

                  <td className="p-4 max-w-xs">
                    <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed italic">
                      "{enq.message || 'No additional notes.'}"
                    </p>
                    <span className="text-[10px] text-gray-500 block mt-1">{enq.created_at}</span>
                  </td>

                  <td className="p-4">
                    <select
                      value={enq.status}
                      onChange={(e) => updateStatus(enq.id, e.target.value as any)}
                      className={`text-[10px] font-bold py-1 px-2.5 rounded-full border-0 focus:outline-none cursor-pointer ${
                        enq.status === 'new'
                          ? 'bg-amber-500/20 text-amber-300'
                          : enq.status === 'contacted'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-green-500/20 text-green-300'
                      }`}
                    >
                      <option value="new" className="bg-[#171724]">NEW LEAD</option>
                      <option value="contacted" className="bg-[#171724]">CONTACTED</option>
                      <option value="converted" className="bg-[#171724]">CONVERTED (ORDER)</option>
                      <option value="closed" className="bg-[#171724]">CLOSED</option>
                    </select>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`https://wa.me/91${enq.phone}?text=Hello%20${encodeURIComponent(enq.name)}%2C%20thank%20you%20for%20inquiring%20about%20${encodeURIComponent(enq.product_name || 'Saboori Fashion Catalogs')}.%20Our%20Surat%20wholesale%20team%20is%20ready%20with%20your%20quotation.`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xs shadow transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      <button
                        onClick={() => handleDelete(enq.id)}
                        className="p-1.5 text-gray-500 hover:text-red-400 rounded-lg hover:bg-white/5"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
