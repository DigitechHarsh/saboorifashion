'use client';

import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, MessageSquare, 
  Send, CheckCircle2, ShieldCheck, Building2 
} from 'lucide-react';
import { submitEnquiry } from '@/lib/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    buyer_type: 'boutique_owner',
    product_interest: 'Silk Sarees & Lehengas',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedNumber, setSubmittedNumber] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill your Name and WhatsApp Mobile Number.');
      return;
    }

    setIsSubmitting(true);
    const res = await submitEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      buyer_type: formData.buyer_type,
      product_name: `Contact Page Inquiry (${formData.product_interest})`,
      message: formData.message,
      source_page: 'Contact Us Page'
    });

    setIsSubmitting(false);
    if (res.success) {
      setSubmittedNumber(res.enquiry_number || 'ENQ-CONFIRMED');
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-goldMuted uppercase tracking-widest block">
          Surat Wholesale Head Office
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-maroon">
          Contact Saboori Fashion
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Get in touch with our sales and manufacturing support team at Adarsh Market-2, Surat for instant catalog quotes, sample requests, and transport inquiries.
        </p>
        <div className="w-20 h-1 bg-brand-gold mx-auto mt-3 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-gray-200/80 shadow-md space-y-6">
            <h2 className="font-serif text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
              Showroom & Factory Location
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-cream text-brand-maroon flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-bold mb-0.5">Surat Showroom Address:</strong>
                  <span>Shop No. 238 to 241, Lower Ground Floor, Adarsh Market-2, Ring Road, Surat, Gujarat – 395002</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-cream text-brand-maroon flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-bold mb-0.5">Direct Call / Helpline:</strong>
                  <div className="flex flex-wrap gap-2 text-brand-maroon font-bold">
                    <a href="tel:+918780331600" className="hover:underline">+91 87803 31600</a>
                    <span>•</span>
                    <a href="tel:+918160221162" className="hover:underline">+91 81602 21162</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-bold mb-0.5">WhatsApp Wholesale Desk:</strong>
                  <a href="https://wa.me/918780331600" target="_blank" rel="noreferrer" className="text-green-700 font-bold hover:underline">
                    +91 87803 31600 (Instant Chat & Video Calling)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-cream text-brand-maroon flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-bold mb-0.5">Email Support:</strong>
                  <a href="mailto:contact@saboorifashion.com" className="text-brand-maroon hover:underline">
                    contact@saboorifashion.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-cream text-brand-maroon flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-bold mb-0.5">Business Hours:</strong>
                  <span>Monday – Saturday: 10:00 AM – 8:30 PM (Sunday Closed)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-3xl overflow-hidden shadow-md border border-gray-200 h-64 sm:h-80 w-full bg-gray-100">
            <iframe
              title="Saboori Fashion Adarsh Market Surat Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.0888279883584!2d72.8427771!3d21.1886111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e578c772e81%3A0x8670498b2c28bb07!2sAdarsh%20Market-2%2C%20Ring%20Rd%2C%20Surat%2C%20Gujarat%20395002!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="p-6 sm:p-10 bg-white rounded-3xl border border-brand-gold/30 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Send Direct Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-6">
              Our Surat wholesale executives will answer your inquiry within 30 minutes during business hours.
            </p>

            {submittedNumber ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900">
                  Thank You! We Received Your Message
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto">
                  Enquiry ID: <strong className="text-brand-maroon font-mono">{submittedNumber}</strong>. We are connecting you with our sales desk on WhatsApp.
                </p>
                <button
                  onClick={() => setSubmittedNumber(null)}
                  className="px-6 py-2.5 bg-brand-maroon text-white text-xs font-bold rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anjali Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-brand-maroon focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs p-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-brand-maroon focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="anjali@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs p-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-brand-maroon focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">City, State</label>
                    <input
                      type="text"
                      placeholder="e.g. Lucknow, UP"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs p-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-brand-maroon focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Buyer Type</label>
                    <select
                      value={formData.buyer_type}
                      onChange={(e) => setFormData({ ...formData, buyer_type: e.target.value })}
                      className="w-full text-xs p-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-brand-maroon focus:outline-none"
                    >
                      <option value="boutique_owner">Boutique Owner</option>
                      <option value="retailer">Retail Store Owner</option>
                      <option value="wholesaler">Bulk Wholesaler</option>
                      <option value="personal_shopper">Personal / Wedding Shopper</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Product Category of Interest</label>
                  <select
                    value={formData.product_interest}
                    onChange={(e) => setFormData({ ...formData, product_interest: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-brand-maroon focus:outline-none"
                  >
                    <option value="Silk Sarees & Lehengas">Silk Sarees & Bridal Lehengas</option>
                    <option value="Bandhani & Organza Sarees">Bandhani & Organza Sarees</option>
                    <option value="Cotton Kurtis & Catalog Sets">Cotton Kurtis & Sets</option>
                    <option value="Unstitched Dress Materials">Unstitched Dress Materials</option>
                    <option value="Navratri Chaniya Choli">Navratri Chaniya Choli</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Message / Order Requirement</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you are looking for (e.g. Catalog PDF, sample order, wholesale price list)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs p-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-brand-maroon focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-brand-maroon hover:bg-brand-darkMaroon text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message to Surat Team'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
