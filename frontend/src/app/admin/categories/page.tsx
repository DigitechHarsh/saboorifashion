'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, FolderTree } from 'lucide-react';
import { sampleCategories } from '@/lib/sampleData';
import { Category } from '@/lib/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(sampleCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
    display_order: 1,
    is_active: true,
  });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
      display_order: categories.length + 1,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Category) => {
    setEditingCategory(c);
    setFormData({
      name: c.name,
      slug: c.slug,
      description: c.description || '',
      image: c.image || '',
      display_order: c.display_order || 1,
      is_active: c.is_active !== false,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? {
        ...c,
        ...formData,
        id: editingCategory.id
      } : c));
    } else {
      const newCat: Category = {
        id: Date.now(),
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: formData.description,
        image: formData.image,
        display_order: Number(formData.display_order),
        product_count: 0,
        is_active: formData.is_active,
        created_at: new Date().toISOString()
      };
      setCategories([...categories, newCat]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Categories Management</h1>
          <p className="text-xs text-gray-400">Total {categories.length} active collection categories</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-brand-gold hover:bg-brand-goldLight text-brand-darkMaroon font-bold text-xs rounded-xl shadow transition-transform hover:scale-105 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-3xl bg-[#171724] border border-[#2a2a3c] shadow-lg flex flex-col justify-between space-y-4"
          >
            <div className="flex gap-4">
              <img
                src={c.image}
                alt={c.name}
                className="w-16 h-20 rounded-xl object-cover shrink-0 border border-white/10 bg-white/5"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider block">
                  Slug: {c.slug}
                </span>
                <h3 className="font-serif text-base font-bold text-white truncate mt-0.5">
                  {c.name}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                  {c.description || 'Surat ethnic wear collection.'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                <strong>{c.product_count || 10}+</strong> catalog designs
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenEdit(c)}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1a1a28] border border-brand-gold/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-xl font-bold text-brand-goldLight mb-4">
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
                  placeholder="e.g. Bandhani Sarees"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">URL Slug (e.g. bandhani-sarees)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold font-mono"
                  placeholder="bandhani-sarees"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Cover Image URL *</label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full text-xs p-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-gold"
                />
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
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
