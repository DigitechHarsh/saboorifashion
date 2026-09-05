import React from 'react';
import Link from 'next/link';
import { Factory, Award, ShieldCheck, MapPin, Phone, MessageSquare, Building2, Truck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-darkMaroon to-brand-maroon text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-brand-gold/30">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 text-brand-goldLight text-xs font-bold tracking-widest uppercase">
              <Factory className="w-3.5 h-3.5 text-brand-gold" />
              <span>SURAT TEXTILE HERITAGE</span>
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              About Saboori Fashion Surat
            </h1>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
              Manufacturer, Wholesaler & Exporter of Women’s Indian Ethnic Wear. Rooted in the textile capital of India, we craft premium sarees, bridal lehengas, and kurti sets for discerning retailers and boutique owners worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Heritage Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-goldMuted uppercase tracking-widest">
                Our Foundation
              </span>
              <h2 className="font-serif text-3xl font-bold text-gray-900">
                Crafting Indian Ethnic Luxury Directly from Surat Looms
              </h2>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              Situated in the heart of Surat's bustling textile corridor at <strong>Adarsh Market-2, Ring Road</strong>, Saboori Fashion stands as a trusted manufacturing partner for over 1,500+ boutiques, retail chain stores, and online resellers across India, the Middle East, the UK, and the USA.
            </p>

            <p className="text-sm text-gray-700 leading-relaxed">
              From pure Kanjivaram soft silks, authentic Gujarati Bandhani tie-dyes, to intricate 3D micro-velvet bridal lehengas, our production processes blend traditional craftsmanship with modern jacquard weaving and computerized embroidery technology.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-brand-cream rounded-xl border border-brand-maroon/10 text-center">
                <span className="font-serif text-2xl font-bold text-brand-maroon">15+</span>
                <span className="text-[11px] text-gray-600 block mt-1">Years Experience</span>
              </div>
              <div className="p-4 bg-brand-cream rounded-xl border border-brand-maroon/10 text-center">
                <span className="font-serif text-2xl font-bold text-brand-maroon">500+</span>
                <span className="text-[11px] text-gray-600 block mt-1">Cities Supplied</span>
              </div>
              <div className="p-4 bg-brand-cream rounded-xl border border-brand-maroon/10 text-center">
                <span className="font-serif text-2xl font-bold text-brand-maroon">100%</span>
                <span className="text-[11px] text-gray-600 block mt-1">Factory Direct</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
              alt="Silk Saree Weaving"
              className="rounded-2xl shadow-lg object-cover aspect-[3/4] w-full"
            />
            <img
              src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80"
              alt="Bridal Lehenga Work"
              className="rounded-2xl shadow-lg object-cover aspect-[3/4] w-full mt-6"
            />
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="bg-white py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-goldMuted uppercase tracking-widest block mb-1">
              Core Principles
            </span>
            <h2 className="font-serif text-3xl font-bold text-gray-900">
              The Saboori Fashion Commitment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-brand-cream/50 border border-brand-maroon/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-maroon text-brand-gold flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900">Uncompromising Fabric Quality</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                We use pure grade yarns, tested fast dyes, and genuine zari. Every catalog goes through multi-stage quality control before parcel dispatch.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-cream/50 border border-brand-maroon/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-maroon text-brand-gold flex items-center justify-center font-bold">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900">Direct Manufacturer Pricing</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                No middlemen commissions. Boutique owners gain direct access to original factory rates, maximizing their store profit margins.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-cream/50 border border-brand-maroon/10 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-maroon text-brand-gold flex items-center justify-center font-bold">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900">Reliable Logistics Network</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Same-day dispatch for ready catalog stocks with verified logistics partners across North, South, East, and West India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Visit CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-brand-darkMaroon text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-brand-gold/30 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-goldLight">
              Experience Our Showroom in Surat
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              We welcome retailers and boutique owners to visit our flagship wholesale showroom at <strong>Shop 238 to 241, Lower Ground Floor, Adarsh Market-2, Ring Road, Surat</strong> for live touch-and-feel selections.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 bg-brand-gold hover:bg-brand-goldLight text-brand-darkMaroon font-bold text-xs sm:text-sm rounded-xl transition-all shadow"
            >
              Get Showroom Directions
            </Link>
            <a
              href="https://wa.me/918780331600"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow"
            >
              Book Showroom Appointment
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
