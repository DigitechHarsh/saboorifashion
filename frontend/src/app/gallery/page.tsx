'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Building2, Factory, Eye } from 'lucide-react';
import { sampleGallery } from '@/lib/sampleData';
import { GalleryItem } from '@/lib/types';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'all'
    ? sampleGallery
    : sampleGallery.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-goldMuted uppercase tracking-widest block">
          Showroom & Production Tour
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-maroon">
          Saboori Fashion Gallery
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          A glimpse into our Adarsh Market-2 wholesale showroom, jacquard weaving looms, and manual embroidery artisan unit in Surat.
        </p>
        <div className="w-20 h-1 bg-brand-gold mx-auto mt-3 rounded-full" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { id: 'all', label: 'All Photos' },
          { id: 'showroom', label: 'Adarsh Market Showroom' },
          { id: 'manufacturing', label: 'Weaving & Looms Unit' },
          { id: 'events', label: 'Textile Exhibitions' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeCategory === tab.id
                ? 'bg-brand-maroon text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-brand-cream border border-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            onClick={() => setSelectedItem(item)}
            className="group relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] shadow-md border border-gray-200/80 cursor-pointer hover:shadow-xl transition-all"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-1">
                {item.category}
              </span>
              <h3 className="font-serif font-bold text-base line-clamp-1">{item.title}</h3>
              <p className="text-xs text-gray-300 line-clamp-1 mt-0.5">{item.description}</p>
            </div>

            <div className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-brand-darkMaroon rounded-2xl overflow-hidden border border-brand-gold/40 shadow-2xl z-10 text-white"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[70vh] w-full bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 space-y-2">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                  {selectedItem.category}
                </span>
                <h3 className="font-serif text-xl font-bold">{selectedItem.title}</h3>
                <p className="text-xs sm:text-sm text-gray-300">{selectedItem.description}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
