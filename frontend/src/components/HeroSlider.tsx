'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageSquare, ArrowRight, ShieldCheck, Truck, Factory } from 'lucide-react';
import { Banner } from '@/lib/types';
import { sampleBanners } from '@/lib/sampleData';
import { useShop } from '@/lib/context';

export default function HeroSlider({ banners = sampleBanners }: { banners?: Banner[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { setIsWholesaleModalOpen } = useShop();

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners.length, isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const currentBanner = banners[currentIndex] || sampleBanners[0];

  return (
    <div 
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] bg-brand-darkMaroon overflow-hidden select-none"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image Carousel with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentBanner.image})` }}
        >
          {/* Multi-layered luxury dark gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-darkMaroon/90 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl text-white space-y-5">
          
          {/* Tagline Badge */}
          <motion.div
            key={`tag-${currentIndex}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/35 backdrop-blur-md text-brand-goldLight text-xs font-bold tracking-widest uppercase"
          >
            <Factory className="w-3.5 h-3.5 text-brand-gold" />
            <span>{currentBanner.tagline || 'SURAT FACTORY DIRECT'}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-2xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-md"
          >
            {currentBanner.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            key={`sub-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs sm:text-lg text-gray-200 leading-relaxed max-w-xl font-light line-clamp-3 sm:line-clamp-none"
          >
            {currentBanner.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            key={`cta-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-1 sm:pt-2"
          >
            <Link
              href={currentBanner.link || '/products'}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-darkMaroon font-bold text-xs sm:text-base transition-all shadow-lg hover:shadow-brand-gold/30 hover:scale-105 active:scale-95"
            >
              <span>{currentBanner.cta_text || 'Explore Catalogs'}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>

            <a
              href="https://wa.me/918780331600?text=Hello%20Saboori%20Fashion%2C%20I%20want%20to%20inquire%20about%20bulk%20wholesale%20rates."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs sm:text-base transition-all shadow-lg hover:shadow-green-600/30 hover:scale-105 active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => setIsWholesaleModalOpen(true)}
              className="hidden xs:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 backdrop-blur-md transition-colors"
            >
              <span>Download B2B PDF</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-brand-maroon text-white flex items-center justify-center backdrop-blur-sm border border-white/10 transition-all opacity-60 hover:opacity-100 hover:scale-110"
        aria-label="Previous Banner Slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-brand-maroon text-white flex items-center justify-center backdrop-blur-sm border border-white/10 transition-all opacity-60 hover:opacity-100 hover:scale-110"
        aria-label="Next Banner Slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Slider Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentIndex(idx);
            }}
            className={`transition-all rounded-full ${
              currentIndex === idx
                ? 'w-7 h-2 bg-brand-gold'
                : 'w-2 h-2 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
