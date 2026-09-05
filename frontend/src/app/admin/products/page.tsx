'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Edit2, Trash2, Check, X, 
  Eye, Filter, ArrowUpDown, Image as ImageIcon, CheckCircle2 
} from 'lucide-react';
import { sampleProducts, sampleCategories } from '@/lib/sampleData';
import { Product } from '@/lib/types';
import { getStoredProducts, saveStoredProducts } from '@/lib/api';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    setProducts(getStoredProducts());
  }, []);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category_id: 1,
    wholesale_price: 1500,
    price: 2500,
    moq: 4,
    fabric: 'Pure Silk',
    work_type: 'Jacquard Zari Weaving',
    occasion: 'Wedding & Festive',
    available_colors: 'Red, Royal Blue, Wine, Mustard',
    primary_image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
    description: 'Authentic Surat ethnic wear manufactured with high grade yarns and precision finish.',
    is_bestseller: false,
    is_new_arrival: true,
  });

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category_slug === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.fabric && p.fabric.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      sku: 'SF-' + Math.floor(1000 + Math.random() * 9000),
      category_id: 1,
      wholesale_price: 1450,
      price: 2400,
      moq: 4,
      fabric: 'Pure Silk',
      work_type: 'Jacquard Zari',
      occasion: 'Festive',
      available_colors: 'Red, Navy, Rani Pink',
      primary_image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
      description: 'Exclusive Surat factory wholesale design.',
      is_bestseller: false,
      is_new_arrival: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      sku: p.sku,
      category_id: p.category_id || 1,
      wholesale_price: p.wholesale_price || p.price,
      price: p.price,
      moq: p.moq || 4,
      fabric: p.fabric || '',
      work_type: p.work_type || '',
      occasion: p.occasion || '',
      available_colors: p.available_colors || '',
      primary_image: p.primary_image,
      description: p.description,
      is_bestseller: !!p.is_bestseller,
      is_new_arrival: !!p.is_new_arrival,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to remove this product from the catalog?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveStoredProducts(updated);
      showToast('Product deleted from catalog.');

      // Also call backend API in background
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://saboorifashion.harshaicreations.com';
        fetch(`${apiUrl}/api/products/delete.php?id=${id}`, { method: 'DELETE' }).catch(() => {});
      } catch (e) {}
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = sampleCategories.find(c => c.id === Number(formData.category_id)) || sampleCategories[0];

    let updatedList: Product[] = [];
    if (editingProduct) {
      updatedList = products.map(p => p.id === editingProduct.id ? {
        ...p,
        ...formData,
        category_name: cat.name,
        category_slug: cat.slug,
        id: editingProduct.id
      } : p);
      showToast(`Product "${formData.name}" updated successfully!`);
    } else {
      const newProd: Product = {
        id: Date.now(),
        name: formData.name,
        slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        sku: formData.sku,
        category_id: cat.id,
        category_name: cat.name,
        category_slug: cat.slug,
        wholesale_price: Number(formData.wholesale_price),
        price: Number(formData.price),
        moq: Number(formData.moq),
        fabric: formData.fabric,
        work_type: formData.work_type,
        occasion: formData.occasion,
        available_colors: formData.available_colors,
        primary_image: formData.primary_image,
        description: formData.description,
        is_bestseller: formData.is_bestseller,
        is_new_arrival: formData.is_new_arrival,
        is_active: true,
        created_at: new Date().toISOString()
      };
      updatedList = [newProd, ...products];
      showToast(`New product "${formData.name}" added to catalog!`);
    }

    setProducts(updatedList);
    saveStoredProducts(updatedList);
    setIsModalOpen(false);

    // Call backend API in background
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://saboorifashion.harshaicreations.com';
      const endpoint = editingProduct ? '/api/products/update.php' : '/api/products/create.php';
      fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(editingProduct ? { id: editingProduct.id } : {}),
          ...formData,
          category_id: cat.id
        })
      }).catch(() => {});
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-green-950/80 border border-green-700 text-green-200 text-xs flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
            <span className="font-semibold">{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-green-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Product Catalog Management</h1>
          <p className="text-xs text-gray-400">Total {products.length} products live in catalog</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-brand-gold hover:bg-brand-goldLight text-brand-darkMaroon font-bold text-xs rounded-xl shadow transition-transform hover:scale-105 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="p-4 rounded-2xl bg-[#171724] border border-[#2a2a3c] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product title, SKU, fabric..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-gold"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto text-xs py-2 px-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-gold"
          >
            <option value="all" className="bg-[#171724]">All Categories</option>
            {sampleCategories.map((c) => (
              <option key={c.id} value={c.slug} className="bg-[#171724]">{c.name}</option>
            ))}
          </select>

          <span className="text-xs text-gray-400 whitespace-nowrap">
            Showing <strong>{filteredProducts.length}</strong> items
          </span>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-3xl bg-[#171724] border border-[#2a2a3c] shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-white/5 uppercase tracking-wider text-[10px] text-gray-400 border-b border-[#2a2a3c]">
              <tr>
                <th className="p-4">Product Details</th>
                <th className="p-4">Category & SKU</th>
                <th className="p-4">Wholesale Rate</th>
                <th className="p-4">MOQ</th>
                <th className="p-4">Fabric & Work</th>
                <th className="p-4">Badges</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.primary_image}
                        alt={p.name}
                        className="w-12 h-14 object-cover rounded-lg shrink-0 border border-white/10 bg-white/5"
                      />
                      <div className="min-w-0">
                        <strong className="text-white block font-medium truncate max-w-xs">{p.name}</strong>
                        <span className="text-[11px] text-gray-400">ID #{p.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="text-brand-gold font-semibold block">{p.category_name}</span>
                    <span className="text-[10px] text-gray-400 font-mono">SKU: {p.sku}</span>
                  </td>

                  <td className="p-4">
                    <div className="text-white font-bold">₹{p.wholesale_price || p.price}</div>
                    {p.wholesale_price > 0 && p.price > p.wholesale_price && (
                      <span className="text-[10px] text-gray-500 line-through">₹{p.price}</span>
                    )}
                  </td>

                  <td className="p-4 font-semibold text-gray-200">
                    {p.moq} pcs
                  </td>

                  <td className="p-4">
                    <span className="block text-gray-200">{p.fabric || 'Pure Silk'}</span>
                    <span className="text-[10px] text-gray-400">{p.work_type}</span>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      {p.is_bestseller && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 w-max">
                          Best Seller
                        </span>
                      )}
                      {p.is_new_arrival && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-green-500/20 text-green-300 w-max">
                          New Season
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors"
                        title="Delete Product"
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

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#1a1a28] border border-brand-gold/30 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-white shadow-2xl my-8 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-xl font-bold text-brand-goldLight mb-4">
              {editingProduct ? 'Edit Product Details' : 'Add New Ethnic Catalog'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
                    placeholder="e.g. Pure Kanjivaram Soft Silk Saree"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold font-mono"
                    placeholder="e.g. SF-701"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Category</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
                    className="w-full text-xs p-3 bg-[#171724] border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
                  >
                    {sampleCategories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Wholesale Rate (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.wholesale_price}
                    onChange={(e) => setFormData({ ...formData, wholesale_price: Number(e.target.value) })}
                    className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Retail MRP (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">MOQ (Pieces)</label>
                  <input
                    type="number"
                    value={formData.moq}
                    onChange={(e) => setFormData({ ...formData, moq: Number(e.target.value) })}
                    className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Fabric</label>
                  <input
                    type="text"
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                    className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
                    placeholder="e.g. Pure Silk, Georgette"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Work Type</label>
                  <input
                    type="text"
                    value={formData.work_type}
                    onChange={(e) => setFormData({ ...formData, work_type: e.target.value })}
                    className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
                    placeholder="e.g. Zari Jacquard Weaving"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Primary Image URL *</label>
                <input
                  type="text"
                  required
                  value={formData.primary_image}
                  onChange={(e) => setFormData({ ...formData, primary_image: e.target.value })}
                  className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_bestseller}
                    onChange={(e) => setFormData({ ...formData, is_bestseller: e.target.checked })}
                    className="rounded text-brand-gold focus:ring-brand-gold"
                  />
                  <span>Mark as Best Seller</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_new_arrival}
                    onChange={(e) => setFormData({ ...formData, is_new_arrival: e.target.checked })}
                    className="rounded text-brand-gold focus:ring-brand-gold"
                  />
                  <span>Mark as New Season Arrival</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-gold hover:bg-brand-goldLight text-brand-darkMaroon rounded-xl text-xs font-bold shadow-lg"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
